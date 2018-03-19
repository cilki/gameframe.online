# --------------------------------
# Steam API scraper              -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import json
import os
from codecs import open
from functools import lru_cache
from itertools import chain
from subprocess import call

import requests
from ratelimit import rate_limited
from tqdm import tqdm

from cache import (add_game, load_working_set, map_id_platform, map_name_genre,
                   name_developer, name_game, steamid_game)
from common import CACHE_GAMEFRAME, METRICS, CDN_URI
from orm import Developer, Game, Genre, Image

from .util import is_cached, parse_steam_date

"""
The game cache
"""
CACHE_GAME = "%s/steam/games" % CACHE_GAMEFRAME
assert os.path.isdir(CACHE_GAME)

"""
The header image cache
"""
CACHE_HEADER = "%s/steam/headers" % CACHE_GAMEFRAME
assert os.path.isdir(CACHE_HEADER)

"""
The CD image cache
"""
CACHE_CD = "%s/steam/cds" % CACHE_GAMEFRAME
assert os.path.isdir(CACHE_CD)


"""
Steam genres that should be filtered
"""
UNWANTED_GENRES = set(['Animation & Modeling', 'Photo Editing', 'Rol',
                       'Software Training', 'Accounting', 'Video Production',
                       'Utilities', 'Audio Production', 'Design & Illustration',
                       'Web Publishing'])


@rate_limited(period=40, every=60)
@lru_cache(maxsize=1)
def rq_app_list():
    """
    Request Steam's entire app list using the Steam API.
    """
    print("[STEAM] Downloading app list... ")

    rq = requests.get("https://api.steampowered.com/ISteamApps/GetAppList/v2")

    assert rq.status_code == requests.codes.ok
    return rq.json()['applist']['apps']


@rate_limited(period=35, every=60)
def rq_game(appid):
    """
    Request game metadata using the store API.
    """

    rq = requests.get("http://store.steampowered.com/api/appdetails",
                      {'appids': str(appid)})

    assert rq.status_code == requests.codes.ok
    return rq.json()


def load_game_json(appid):
    """
    Retrieve a filtered game from the cache or download it from Steam.
    """
    assert os.path.isdir(CACHE_GAME)

    if not is_cached(CACHE_GAME, appid):
        game = rq_game(appid)
        METRICS['steam.new_downloads'] += 1

        # Write to the cache
        with open("%s/%d" % (CACHE_GAME, appid), 'w', 'utf8') as h:
            h.write(json.dumps(game, ensure_ascii=False))
    else:
        with open("%s/%d" % (CACHE_GAME, appid), 'r', 'utf8') as h:
            game = json.load(h)

    game = game[str(appid)]

    # Filter failed queries
    if game['success'] == 'false':
        METRICS['steam.filtered.failed'] += 1
        return None

    # Ensure the game has data
    if 'data' not in game:
        METRICS['steam.filtered.no_data'] += 1
        return None

    game = game['data']

    # Filter non-games
    if not game['type'] == 'game':
        METRICS['steam.filtered.non_game'] += 1
        return None

    # Filter unwanted genres
    if any(x['description'] in UNWANTED_GENRES for x in game.get('genres', [])):
        METRICS['steam.filtered.genre'] += 1
        return None

    return game


def build_game(game_json):
    """
    Build a Game object from the raw data, taking into account previous Games.
    """
    # Steam ID matching
    if game_json['steam_appid'] in steamid_game:
        game = steamid_game[game_json['steam_appid']]
    # Exact name matching
    elif game_json['name'] in name_game:
        game = name_game[game_json['name']]
    # Build new Game
    else:
        game = Game()

    # Steam ID (overwrite)
    game.steam_id = game_json['steam_appid']

    # Title
    if game.name is None:
        game.name = game_json['name']

    # Summary
    if game.summary is None and 'detailed_description' in game_json:
        game.summary = game_json['detailed_description']

    # Price
    if game.price is None and 'is_free' in game_json and game_json['is_free']:
        game.price = 0
    elif game.price is None and 'price_overview' in game_json:
        game.price = game_json['price_overview']['final']

    # Background
    if game.background is None and 'background' in game_json:
        game.background = game_json['background']

    # Website
    if game.website is None and 'website' in game_json:
        game.website = game_json['website']

    # Platforms
    if game_json.get('platforms', {}).get('windows', False):
        windows = map_id_platform[6]
        if windows not in game.platforms:
            game.platforms.append(windows)

    if game_json.get('platforms', {}).get('linux', False):
        linux = map_id_platform[3]
        if linux not in game.platforms:
            game.platforms.append(linux)

    if game_json.get('platforms', {}).get('mac', False):
        mac = map_id_platform[14]
        if mac not in game.platforms:
            game.platforms.append(mac)

    # Screenshots
    for screenshot in game_json.get('screenshots', []):
        url = screenshot['path_full'].split('?', 1)[0]
        if next((x for x in game.screenshots if x.url == url), None) is None:
            game.screenshots.append(Image(url=url))

    # Genres
    for genre in game_json.get('genres', []):
        genre = map_name_genre[genre['description']]
        if genre not in game.genres:
            game.genres.append(genre)

    # Release date
    if game.release is None and 'release_date' in game_json:
        if game_json['release_date']['date']:
            game.release = parse_steam_date(
                game_json['release_date']['date'])

    # Metacritic rating
    if game.metacritic is None and 'metacritic' in game_json:
        game.metacritic = game_json['metacritic']['score']

    # Cover
    if game.cover is None and is_cached(CACHE_CD, "%d.png" % game.steam_id):
        game.cover = "%s/cover/steam/%d.png" % (CDN_URI, game.steam_id)

    return game


def collect_games():
    """
    Download missing games from Steam.
    """
    apps = rq_app_list()

    print("[STEAM] Collecting games")

    # Load games
    new_games = 0
    for app in tqdm(apps):
        if not is_cached(CACHE_GAME, app['appid']):
            load_game_json(app['appid'])
            new_games += 1

    print("[STEAM] Gathered %d new games" % new_games)


def collect_headers():
    """
    Download missing game headers from Steam and generate CDs.
    """
    apps = rq_app_list()

    print("[STEAM] Collecting game headers")

    for app in tqdm(apps):
        appid = app['appid']
        if not is_cached(CACHE_HEADER, appid):
            game_json = load_game_json(appid)
            if game_json is not None and 'header_image' in game_json:
                rq = requests.get(game_json['header_image'])

                assert rq.status_code == requests.codes.ok

                # Write the header to cache
                with open("%s/%d" % (CACHE_HEADER, appid), 'wb') as h:
                    h.write(rq.content)

        # Generate CD
        if not is_cached(CACHE_CD, "%d.png" % appid) and is_cached(CACHE_HEADER, appid):
            call(["./data/main/cd/steam-cd.sh", "%s/%d" % (CACHE_HEADER, appid),
                  "%s/%d" % (CACHE_CD, appid)])

    print("[STEAM] Collection complete")


def upload_covers():
    """
    Upload game covers
    """
    print("[STEAM] Uploading covers")

    for name, game in tqdm(name_game.items()):
        if game.cover is not None and 'cdn.gameframe' in game.cover:
            # Upload cover
            upload_image(cover, 'cover/steam/' + game.steam_id)

    print("[STEAM] Upload complete")


def merge_games(db):
    """
    Merge cached games into the working set and flush the database.
    """
    apps = rq_app_list()

    load_working_set()

    print("[STEAM] Merging games")
    for app in tqdm(apps):
        game_json = load_game_json(app['appid'])
        if game_json is None:
            continue

        game = build_game(game_json)

        # Add to working set
        add_game(game)

        # Add or replace in database
        db.session.add(game)

    db.session.commit()

    print("[STEAM] Merge complete")


def link_developers(db):
    """
    Perform the developer linking for Steam games according to name.
    """
    load_working_set()

    print("[STEAM] Linking developers")

    for appid, game in tqdm(steamid_game.items()):
        game_json = load_game_json(appid)
        if game_json is None:
            continue

        for name in chain(game_json.get('publishers', []), game_json.get('developers', [])):
            if name in name_developer:
                # Link the models if not already linked
                dev = name_developer[name]
                if not dev in game.developers:
                    dev.games.append(game)

    db.session.commit()
    print("[STEAM] Link complete")
