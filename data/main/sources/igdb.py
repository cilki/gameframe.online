# --------------------------------
# IGDB.com API scraper           -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

from datetime import date
from itertools import chain

import requests
from tqdm import tqdm

from cache import WS, KeyCache, load_working_set
from orm import Developer, Game, Genre, Image, Platform
from common import TC, load_registry
from registry import KeyIgdb

from .util import condition, condition_developer, url_normalize, xappend

"""
The API key cache
"""
KEYS = KeyCache(KeyIgdb)


"""
The range of game IDs to track
"""
GAME_RANGE = range(2124, 100001)
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


def rq_game_block(igdb_id):
    """
    Request a block of games starting at the given id using IGDB's API.
    """

    rq = requests.get("https://api-endpoint.igdb.com/games/%s"
                      % str(list(range(igdb_id, igdb_id + API_STRIDE)))[1:-1]
                      .replace(" ", ""), headers={'user-key': API_KEY})

    assert rq.status_code == requests.codes.ok
    return rq.json()


def rq_developer_block(igdb_id):
    """
    Request a block of developers starting at the given id using IGDB's API.
    """

    rq = requests.get("https://api-endpoint.igdb.com/companies/%s"
                      % str(list(range(igdb_id, igdb_id + API_STRIDE)))[1:-1]
                      .replace(" ", ""), headers={'user-key': API_KEY})

    assert rq.status_code == requests.codes.ok
    return rq.json()


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
    if game.steam_id is None or len(game.screenshots) == 0:
        for screenshot in game_json.get('screenshots', []):
            url = screenshot['url'][2:].replace("t_thumb", "t_original")
            if next((x for x in game.screenshots if x.url == url), None) is None:
                game.screenshots.append(Image(url=url))

    # Cover
    if game.cover is None and 'cover' in game_json:
        cover = game_json['cover']
        if cover['width'] <= cover['height']:
            game.cover = cover['url'][2:].replace("t_thumb", "t_original")

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
        dev.logo = dev_json['logo']['url'][2:].replace("t_thumb", "t_original")

    # Foundation Date
    if dev.foundation is None and 'start_date' in dev_json:
        dev.foundation = date.fromtimestamp(dev_json['start_date'] // 1000)


def collect_games():
    """
    Download missing games from IGDB.
    """
    load_registry('Game', 'igdb_id')

    for igdb_id in tqdm(GAME_RANGE, '[IGDB   ] Collecting Games'):
        if not TC['Game.igdb_id'].exists(igdb_id):
            load_game_json(igdb_id)


def collect_developers():
    """
    Download missing developers from IGDB.
    """
    load_registry('Developer', 'igdb_id')

    for igdb_id in tqdm(DEV_RANGE, '[IGDB   ] Collecting Developers'):
        if not TC['Developer.igdb_id'].exists(igdb_id):
            load_dev_json(igdb_id)


def link_developers():
    """
    Compute Game-Developer links according to IGDB ID for IGDB games
    """
    load_working_set()
    load_registry('Developer', 'igdb_id')

    for developer in tqdm(WS.developers.values(), '[IGDB    ] Linking Developers'):
        dev_json = TC['Developer.igdb_id'].get(developer.igdb_id).igdb_data

        for igdb_id in chain(dev_json.get('published', []), dev_json.get('developed', [])):
            game = WS.games_igdb.get(igdb_id)

            if game is not None:
                # Set the primary developer to the first one
                if game.developer is None:
                    game.developer = developer.name

                # Link the models
                xappend(developer.games, game)
