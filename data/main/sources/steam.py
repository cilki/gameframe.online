# --------------------------------
# Steam API scraper              -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import json
import os
from codecs import open
from functools import lru_cache
from itertools import chain

import requests
from ratelimit import rate_limited
from tqdm import tqdm

from aws import upload_image
from cache import WS, Cache, load_working_set
from cdgen.steam import generate
from common import METRICS, CDN_URI
from orm import Developer, Game, Genre, Image, Platform

from .util import parse_steam_date, xappend

"""
The game cache
"""
CACHE_GAME = Cache("/steam/games")

"""
The article cache
"""
CACHE_ARTICLE = Cache("/steam/articles")

"""
The header image cache
"""
CACHE_HEADER = Cache("/steam/headers")

"""
The CD image cache
"""
CACHE_CD = Cache("/steam/cds")


"""
Steam genres that should be filtered out
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


@rate_limited(period=35, every=60)
def rq_articles(appid):
    """
    Request game news using the store API.
    """

    rq = requests.get("https://api.steampowered.com/ISteamNews/GetNewsForApp/v2",
                      {'appid': appid, 'count': 500})

    assert rq.status_code == requests.codes.ok
    return rq.json()['appnews']['newsitems']


def load_game_json(appid):
    """
    Retrieve a filtered game from the cache or download it from Steam
    """

    if not CACHE_GAME.exists(appid):
        game_json = rq_game(appid)
        METRICS['steam.new_downloads'] += 1

        # Write to the cache
        CACHE_GAME.write_json(appid, game_json)
    else:
        game_json = CACHE_GAME.read_json(appid)

    # Advance
    game_json = game_json[str(appid)]

    # Filter failed queries
    if game_json['success'] == 'false':
        METRICS['steam.filtered.failed'] += 1
        return None

    # Ensure the game has data
    if 'data' not in game_json:
        METRICS['steam.filtered.failed'] += 1
        return None

    # Advance
    game_json = game_json['data']

    # Filter non-games
    if not game_json['type'] == 'game':
        METRICS['steam.filtered.genre'] += 1
        return None

    # Filter unwanted genres
    if any(x['description'] in UNWANTED_GENRES for x in game_json.get('genres', [])):
        METRICS['steam.filtered.genre'] += 1
        return None

    return game_json


def build_game(game_json):
    """
    Build a filtered Game object from the raw data, taking into account
    previous Games.
    """

    game = WS.game_steam.get(game_json['steam_appid'], None)
    if game is None:
        game = WS.game_name.get(game_json['name'], None)
    if game is None:
        # Build new Game
        game = Game()

    if game.steam_id is not None and game.igdb_id is None:
        # This game was already merged
        return game

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
    if game_json.get('platforms', {}).get('windows', False):
        xappend(game.platforms, WS.platforms[6])
    if game_json.get('platforms', {}).get('linux', False):
        xappend(game.platforms, WS.platforms[3])
    if game_json.get('platforms', {}).get('mac', False):
        xappend(game.platforms, WS.platforms[14])

    # Screenshots
    for screenshot in game_json.get('screenshots', []):
        url = screenshot['path_full'].split('?', 1)[0]
        if next((x for x in game.screenshots if x.url == url), None) is None:
            game.screenshots.append(Image(url=url))

    # Genres
    for genre in game_json.get('genres', []):
        xappend(game.genres, WS.genres[genre['description']])

    # Release date
    if game.release is None and 'release_date' in game_json:
        if game_json['release_date']['date']:
            game.release = parse_steam_date(
                game_json['release_date']['date'])

    # Metacritic rating
    if game.metacritic is None and 'metacritic' in game_json:
        game.metacritic = game_json['metacritic']['score']

    # Cover
    if game.cover is None and CACHE_CD.exists("%d.png" % game.steam_id):
        game.cover = "%s/cover/steam/%d.png" % (CDN_URI, game.steam_id)

    return game


def build_article(article_json):
    """
    Build a new Article object from the raw data
    """

    # Build new Article
    article = Article()

    # Title
    if 'title' in article_json:
        article.title = article_json['title']
    else:
        return None

    # Introduction
    if 'contents' in article_json:
        article.introduction = article_json['contents']
    else:
        return None

    # Author
    if 'author' in article_json:
        article.author = article_json['author']
    else:
        return None

    # URL
    if 'url' in article_json:
        article.article_link = article_json['url']
    else:
        return None

    # Timestamp
    if 'date' in article_json:
        article.timestamp = datetime.fromtimestamp(article_json['date'])
    else:
        return None

    # Outlet
    if 'feedlabel' in article_json:
        article.outlet = article_json['feedlabel']
    else:
        return None

    return article


def collect_games():
    """
    Download missing games from Steam.
    """
    apps = rq_app_list()

    print("[STEAM] Collecting games")

    # Load games
    for app in tqdm(apps):
        if not CACHE_GAME.exists(app['appid']):
            load_game_json(app['appid'])

    print("[STEAM] Collection complete")


def collect_headers():
    """
    Download missing game headers from Steam
    """
    apps = rq_app_list()

    print("[STEAM] Collecting game headers")

    for app in tqdm(apps):
        appid = app['appid']
        if not CACHE_HEADER.exists(appid):
            game_json = load_game_json(appid)
            if game_json is not None and 'header_image' in game_json:
                rq = requests.get(game_json['header_image'])

                assert rq.status_code == requests.codes.ok

                # Write the header to cache
                CACHE_HEADER.write(appid, rq.content)

    print("[STEAM] Collection complete")


def generate_covers():
    """
    Generate Steam covers using the cached headers
    """
    load_working_set()

    LIN = WS.platforms[3]
    WIN = WS.platforms[6]
    MAC = WS.platforms[14]

    print("[STEAM] Generating covers")
    for appid, game in tqdm(WS.game_steam.items()):
        if not CACHE_CD.exists(str(appid) + '.png') and CACHE_HEADER.exists(appid):
            generate("%s/%d" % (CACHE_HEADER, appid), "%s/%s" %
                     (CACHE_CD, str(appid) + '.png'),
                     LIN in game.platforms, WIN in game.platforms, MAC in game.platforms)

    print("[STEAM] Generation Complete")


def upload_covers():
    """
    Upload game covers for games in the working set
    """
    load_working_set()

    print("[STEAM] Uploading covers")

    for appid, game in tqdm(WS.game_steam.items()):
        if CACHE_CD.exists(str(appid) + '.png'):
            # Upload cover
            upload_image("%s/%d.png" % (CACHE_CD, appid),
                         "cover/steam/%d.png" % game.steam_id)

    print("[STEAM] Upload complete")


def gather_articles():
    """
    Search for articles related to games and download them to the cache
    """

    print("[STEAM] Gathering articles by game")
    for appid, game in tqdm(WS.game_steam.items()):
        if not CACHE_ARTICLE.exists(appid):
            # Write to the cache
            CACHE_ARTICLE.write_json(appid, rq_articles(appid))

    print("[STEAM] Gather Complete")


def merge_games():
    """
    Merge cached games into the working set and flush the database
    """
    load_working_set()
    apps = rq_app_list()

    print("[STEAM] Merging games")
    for app in tqdm(apps):
        game_json = load_game_json(app['appid'])
        if game_json is None:
            continue

        game = build_game(game_json)

        # Add to working set
        WS.add_game(game)

    print("[STEAM] Merge complete")


def link_developers():
    """
    Perform the developer linking for Steam games according to name
    """
    load_working_set()

    print("[STEAM] Linking developers")

    for game in tqdm(WS.game_steam.values()):
        game_json = load_game_json(game.steam_id)
        if game_json is None:
            continue

        for name in chain(game_json.get('publishers', []), game_json.get('developers', [])):
            if name in WS.developers:
                # Link the models if not already linked
                dev = WS.developers[name]
                if not dev in game.developers:
                    dev.games.append(game)

    print("[STEAM] Link complete")
