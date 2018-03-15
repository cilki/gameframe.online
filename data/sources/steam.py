# --------------------------------
# Steam API scraper              -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import json
import os
import sys
import requests

from codecs import open
from functools import lru_cache
from tqdm import tqdm
from ratelimit import rate_limited
from itertools import chain

sys.path.append(os.path.abspath('app'))
from orm import Game, Developer
from util import parse_steam_date, append_csv, is_cached
from working_set import load_working_set, add_game, name_game, steamid_game, name_developer

"""
The game cache
"""
CACHE_GAME = "%s/steam/games" % os.environ['CACHE_GAMEFRAME']
assert os.path.isdir(CACHE_GAME)

CACHE_HEADER = "%s/steam/headers" % os.environ['CACHE_GAMEFRAME']
assert os.path.isdir(CACHE_HEADER)

CACHE_CD = "%s/steam/cds" % os.environ['CACHE_GAMEFRAME']
assert os.path.isdir(CACHE_CD)


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

        # Write to the cache
        with open("%s/%d" % (CACHE_GAME, appid), 'w', 'utf8') as h:
            h.write(json.dumps(game, ensure_ascii=False))
    else:
        with open("%s/%d" % (CACHE_GAME, appid), 'r', 'utf8') as h:
            game = json.load(h)

    game = game[str(appid)]

    # Filter failed queries
    if game['success'] == 'false':
        return None

    # Ensure the game has data
    if 'data' not in game:
        return None

    game = game['data']

    # Filter non-games
    if not game['type'] == 'game':
        return None

    # Ensure the game has a name
    if 'name' not in game:
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

    # Steam ID
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
    if 'platforms' in game_json:
        game.platform_win = game_json['platforms']['windows']
        game.platform_lin = game_json['platforms']['linux']
        game.platform_mac = game_json['platforms']['mac']

    # Screenshots
    if 'screenshots' in game_json:
        for screenshot in game_json['screenshots']:
            game.screenshots = append_csv(
                game.screenshots, screenshot['path_full'])

    # Genres
    if 'genres' in game_json:
        for genre in game_json['genres']:
            game.genres = append_csv(game.genres, genre['description'])

    # Release date
    if game.release is None and 'release_date' in game_json:
        if game_json['release_date']['date']:
            game.release = parse_steam_date(
                game_json['release_date']['date'])

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
    Download missing game headers from Steam.
    """
    apps = rq_app_list()

    print("[STEAM] Collecting game headers")

    for app in tqdm(apps):
        if not is_cached(CACHE_HEADER, app['appid']):
            game_json = load_game_json(app['appid'])
            if game_json is not None and 'header_image' in game_json:
                rq = requests.get(game_json['header_image'])

                assert rq.status_code == requests.codes.ok

                # Write the header to cache
                with open("%s/%d" % (CACHE_HEADER, app['appid']), 'wb') as h:
                    h.write(rq.content)

    print("[STEAM] Collection complete")


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
