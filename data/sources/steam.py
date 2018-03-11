# --------------------------------
# Steam API scraper              -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import json
import os
import sys

from codecs import open
from functools import lru_cache
from tqdm import tqdm

import requests
from ratelimit import rate_limited

sys.path.append(os.path.abspath('app'))
from orm import Game, Developer
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
def rq_game(appid):
    """
    Request game metadata using the store API.
    """

    rq = requests.get("http://store.steampowered.com/api/appdetails",
                      {'appids': str(appid)})

    assert rq.status_code == requests.codes.ok
    return rq.json()


def load_game(appid):
    """
    Retrieve a filtered game from the cache or download it from Steam.
    """
    assert os.path.isdir(CACHE_GAME_STEAM)

    if not os.path.isfile("%s/%d" % (CACHE_GAME_STEAM, appid)):
        game = rq_game(appid)

        # Write to the cache
        with open("%s/%d" % (CACHE_GAME_STEAM, appid), 'w', 'utf8') as h:
            h.write(json.dumps(game, ensure_ascii=False))
    else:
        with open("%s/%d" % (CACHE_GAME_STEAM, appid), 'r', 'utf8') as h:
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

    # TODO Apply more filtering
    return game


def find_game(game_json):
    """
    Attempt to locate a game in the database
    """
    # ID matching
    game = Game.query.filter_by(steam_id=game_json['steam_appid']).first()

    # TODO Provide more robust searching with game_json

    # Construct new Game
    if game is None:
        game = Game()

    return game


def build_game(game_json):
    """
    Build a Game object from the raw data, taking into account previous Games.
    """
    game = find_game(game_json)

    # Steam ID
    game.steam_id = game_json['steam_appid']

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

    return game


@lru_cache(maxsize=1)
def gather_games():
    """
    Build a filtered list of Game objects.
    """
    apps = rq_app_list()

    print("[STEAM] Gathering games")

    games = []

    # Load games
    for app in tqdm(apps):
        game_json = load_game(app['appid'])
        if game_json is None:
            continue
        games.append(build_game(game_json))

    # TODO Perform mutual filtering

    print("[STEAM] Gathered %d games" % len(games))
    return games


def merge_games(db):
    """
    Insert the filtered list of games into the database.
    """
    games = gather_games()

    print("[STEAM] Merging games")
    for game in games:
        db.session.add(game)
    db.session.commit()

    print("[STEAM] Merge complete")


def link_developers(db):
    """
    Perform the linking for developers Steam games according to name
    """

    print("[STEAM] Linking developers")

    # Load all developers into a hashtable for improved performance
    developers = {dev.name: dev for dev in Developer.query.all()}

    for game in tqdm(Game.query.all()):

        # Skip IGDB games
        if game.igdb_id is not None:
            continue
        game_json = load_game(game.steam_id)

        if 'publishers' not in game_json:
            game_json['publishers'] = []
        if 'developers' not in game_json:
            game_json['developers'] = []

        for l in (game_json['publishers'], game_json['developers']):
            for name in l:
                if name in developers:
                    # Link the models
                    dev = developers[name]
                    dev.games.append(game)
                    game.developers.append(dev)

    db.session.commit()
    print("[STEAM] Link complete")
