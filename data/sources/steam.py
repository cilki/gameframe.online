# --------------------------------
# Steam API scraper              -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import json
import os
import sys

from codecs import open
from functools import lru_cache

import requests
from ratelimit import rate_limited

sys.path.append(os.path.abspath('app'))
from orm import Game
from util import parse_steam_date, append_csv

"""
The game cache
"""
CACHE_GAME_STEAM = os.environ['CACHE_GAME_STEAM']


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
def rq_game(app):
    """
    Request game metadata using the store API
    """
    print("[STEAM] Downloading game metadata for: %s" %
          app['name'].encode('utf-8', 'ignore'))

    rq = requests.get("http://store.steampowered.com/api/appdetails",
                      {'appids': str(app['appid'])})

    assert rq.status_code == requests.codes.ok
    return rq.json()


def get_game(app):
    """
    Retrieve a game from the cache or download it from Steam.
    """
    assert os.path.isdir(CACHE_GAME_STEAM)

    if not os.path.isfile("%s/%d" % (CACHE_GAME_STEAM, app['appid'])):
        game = rq_game(app)

        # Write to the cache
        with open("%s/%d" % (CACHE_GAME_STEAM, app['appid']), 'w', 'utf8') as h:
            h.write(json.dumps(game, ensure_ascii=False))
    else:
        with open("%s/%d" % (CACHE_GAME_STEAM, app['appid']), 'r', 'utf8') as h:
            game = json.load(h)

    game = game[str(app['appid'])]

    # Filter failed queries
    if game['success'] == 'false':
        return None

    if 'data' not in game:
        return None

    game = game['data']

    # Filter non-games
    if not game['type'] == 'game':
        return None

    return game


def gather_games():
    """
    Download any games missing from the cache.
    """
    apps = rq_app_list()

    print("[STEAM] Gathering games")

    i = 0
    for app in apps:
        if not get_game(app) is None:
            i += 1

    print("[STEAM] Gathered %d games" % i)


def filter_games():
    """
    Return a filtered list of games.
    """
    apps = rq_app_list()

    print("[STEAM] Filtering games")
    filtered = []

    for app in apps:
        game_json = get_game(app)

        if game_json is None:
            continue

        if 'name' not in game_json:
            continue

        # TODO Apply more filtering
        filtered += [app]

    print("[STEAM] Filtered out %d games" % (len(apps) - len(filtered)))
    return filtered


def merge_games(db):
    """
    Insert the filtered list of games into the database.
    """

    i = 0
    for app in filter_games():
        game_json = get_game(app)
        assert 'name' in game_json

        # TODO Find the same game in database if it already exists
        if True:
            game = Game()
            i += 1
        else:
            game = Game()

        game.steam_id = int(game_json['steam_appid'])

        # Title
        if game.name is None:
            game.name = game_json['name']

        # Summary
        if game.summary is None and 'detailed_description' in game_json:
            game.summary = game_json['detailed_description']

        # Price
        if game.price is None and 'price_overview' in game_json:
            game.price = game_json['price_overview']['initial']

            # TODO Discounts

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

        print("Uploading game (%d): %s" %
              (game.steam_id, game.name.encode('utf-8', 'ignore')))

        db.session.add(game)
        db.session.commit()

    print("[STEAM] Inserted %d new games" % i)
