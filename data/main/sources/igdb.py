# --------------------------------
# IGDB API scraper               -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

from datetime import date
from itertools import chain

import requests
from tqdm import tqdm

from cache import WS, KeyCache, load_working_set
from orm import Developer, Game, Genre, Platform
from common import PROGRESS_FORMAT, TC, load_registry
from registry import KeyIgdb, CachedGame, CachedDeveloper
from sources.util import (condition, condition_developer,
                          generic_collect, url_normalize, vstrlen, xappend)

"""
The API key cache
"""
KEYS = KeyCache(KeyIgdb)

"""
The range of game IDs to track
"""
GAME_RANGE = range(2124, 110001)
assert len(GAME_RANGE) > 0

"""
The range of developer IDs to track
"""
DEV_RANGE = range(1, 16001)
assert len(DEV_RANGE) > 0

"""
The number of entities to request at a time
"""
API_STRIDE = 100


def rq_games(igdb_id):
    """
    Request a block of games starting at the given id using IGDB's API.
    """

    rq = requests.get("https://api-endpoint.igdb.com/games/%s"
                      % str(list(range(igdb_id, igdb_id + API_STRIDE)))[1:-1]
                      .replace(" ", ""), headers={'user-key': KEYS.get()})

    if rq.status_code == requests.codes.too_many_requests:
        KEYS.advance()
        return

    assert rq.status_code == requests.codes.ok

    for game_json in rq.json():
        TC['Game.igdb_id'].add(
            CachedGame(igdb_id=game_json['id'],
                       igdb_data=game_json
                       if validate_game(game_json) else None))


def rq_developers(igdb_id):
    """
    Request a block of developers starting at the given id using IGDB's API.
    """

    rq = requests.get("https://api-endpoint.igdb.com/companies/%s"
                      % str(list(range(igdb_id, igdb_id + API_STRIDE)))[1:-1]
                      .replace(" ", ""), headers={'user-key': KEYS.get()})

    if rq.status_code == requests.codes.too_many_requests:
        KEYS.advance()
        return

    assert rq.status_code == requests.codes.ok

    for dev_json in rq.json():
        TC['Developer.igdb_id'].add(
            CachedDeveloper(igdb_id=dev_json['id'],
                            igdb_data=dev_json
                            if validate_developer(dev_json) else None))


def build_game(game, game_json):
    """
    Build a Game object from the raw data
    """
    if game is None or game_json is None:
        return

    # IGDB ID
    if game.igdb_id is None:
        game.igdb_id = int(game_json['id'])

    # IGDB link
    if game.igdb_link is None and 'url' in game_json:
        game.igdb_link = game_json['url']

    # Title
    if game.name is None:
        game.name = game_json['name']
        game.c_name = condition(game.name)

    # Genre
    for numeric_genre in game_json.get('genres', []):
        xappend(game.genres, WS.genres[numeric_genre])

    # Platform
    for numeric_platform in game_json.get('platforms', []):
        xappend(game.platforms, WS.platforms[numeric_platform])

    # Summary
    if game.summary is None and 'summary' in game_json:
        game.summary = game_json['summary']

    # Steam ID
    if game.steam_id is None and 'external' in game_json \
            and 'steam' in game_json['external']:
        game.steam_id = int(game_json['external']['steam'])

    # Release date
    if game.release is None and 'first_release_date' in game_json:
        game.release = date.fromtimestamp(
            game_json['first_release_date'] // 1000)

    # Screenshots
    if game.steam_id is None or game.screenshots is None:
        for screenshot in game_json.get('screenshots', []):
            if game.screenshots is None:
                game.screenshots = []
            xappend(game.screenshots, {
                    'url': screenshot['url'][2:].replace("t_thumb", "t_original")})

    # Cover
    if game.cover is None and 'cover' in game_json:
        game.cover = game_json['cover']['url'][2:].replace(
            "t_thumb", "t_original")

    # ESRB rating
    if game.esrb is None and 'esrb' in game_json:
        game.esrb = game_json['esrb']['rating']

    # Website
    if game.website is None and 'websites' in game_json:
        for site_json in game_json['websites']:
            if 'category' in site_json and site_json['category'] == 1:
                game.website = site_json['url']
                break


def build_developer(dev, dev_json):
    """
    Build a Developer object from the raw data, taking into account previous Developers.
    """
    if dev is None or dev_json is None:
        return

    # Name
    if dev.name is None:
        dev.name = dev_json['name']
        dev.c_name = condition_developer(dev.name)

    # Description
    if dev.description is None and 'description' in dev_json:
        dev.description = dev_json['description']

    # Website
    if dev.website is None and 'website' in dev_json:
        dev.website = dev_json['website']

    # Country
    if dev.country is None and 'country' in dev_json:
        dev.country = dev_json['country']

    # Twitter
    if dev.twitter is None and 'twitter' in dev_json:
        dev.twitter = dev_json['twitter']

    # Logo
    if dev.logo is None and 'logo' in dev_json:
        dev.logo = url_normalize(
            dev_json['logo']['url'].replace("t_thumb", "t_original"))

    # Foundation Date
    if dev.foundation is None and 'start_date' in dev_json:
        dev.foundation = date.fromtimestamp(dev_json['start_date'] // 1000)


def validate_game(game_json):
    """
    Validate the content of a raw game
    """
    if game_json is None:
        return False

    try:
        # Filter title
        if not vstrlen(game_json['name']):
            return False

    except KeyError:
        return False
    return True


def validate_developer(dev_json):
    """
    Validate the content of a raw developer
    """
    if dev_json is None:
        return False

    try:
        # Filter name
        if not vstrlen(dev_json['name']):
            return False

    except KeyError:
        return False
    return True


def collect_games():
    """
    Download missing games from IGDB.
    """
    load_registry('Game', 'igdb_id')

    generic_collect(rq_games, TC['Game.igdb_id'], '[COLLECT] Downloading Games',
                    [igdb_id for igdb_id in GAME_RANGE if not
                     TC['Game.igdb_id'].exists(igdb_id)])


def collect_developers():
    """
    Download missing developers from IGDB.
    """
    load_registry('Developer', 'igdb_id')

    generic_collect(rq_developers, TC['Developer.igdb_id'], '[COLLECT] Downloading Developers',
                    [igdb_id for igdb_id in DEV_RANGE if not
                     TC['Developer.igdb_id'].exists(igdb_id)])


def link_developers():
    """
    Compute Game-Developer links according to IGDB ID for IGDB games
    """
    load_working_set()
    load_registry('Developer', 'igdb_id')

    for developer in tqdm(WS.developers.values(), '[LINK] Linking Developers',
                          bar_format=PROGRESS_FORMAT):
        dev_json = TC['Developer.igdb_id'].get(developer.igdb_id).igdb_data

        for igdb_id in chain(dev_json.get('published', []), dev_json.get('developed', [])):
            game = WS.games_igdb.get(igdb_id)

            if game is not None:
                # Set the primary developer to the first one
                if game.developer is None:
                    game.developer = developer.name

                # Link the models
                xappend(developer.games, game)
