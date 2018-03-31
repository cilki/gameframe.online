# --------------------------------
# IGDB.com API scraper           -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import json
import os
from codecs import open
from datetime import datetime
from functools import lru_cache
from itertools import chain

import requests
from ratelimit import rate_limited
from tqdm import tqdm

from cache import WS, Cache, load_working_set
from common import METRICS
from orm import Developer, Game, Genre, Image, Platform

from .util import cond_game_name, xappend

"""
The API key
"""
API_KEY = os.environ['KEY_IGDB']

"""
The game cache
"""
CACHE_GAME = Cache("/igdb/games")

"""
The developer cache
"""
CACHE_DEV = Cache("/igdb/developers")

"""
The cover cache
"""
CACHE_COVER = Cache("/igdb/covers")

"""
2124 - 89252 seems to be the range of game IDs on IGDB
"""
GAME_RANGE = range(2124, 89253)

"""
1 - 15092 seems to be the range of developer IDs on IGDB
"""
DEV_RANGE = range(1, 15093)

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


def load_game_json(igdb_id):
    """
    Retrieve a filtered game from the cache or download it from IGDB
    """

    if not CACHE_GAME.exists(igdb_id):
        game_block = rq_game_block(igdb_id)
        if len(game_block) == 0:
            return None

        METRICS['igdb.new_downloads'] += len(game_block)

        # Write games to the cache
        for game_json in game_block:
            CACHE_GAME.write_json(game_json['id'], [game_json])

        # Write missing games
        for missing in set(range(igdb_id, igdb_id + API_STRIDE)) - set([g['id'] for g in game_block]):
            if not CACHE_GAME.exists(missing):
                CACHE_GAME.write_json(missing, [])

        if game_block[0]['id'] == igdb_id:
            return game_block[0]

    else:
        game_json = CACHE_GAME.read_json(igdb_id)
        if len(game_json) == 1:
            return game_json[0]

    return None


def load_dev_json(igdb_id):
    """
    Retrieve a filtered developer from the cache or download it from IGDB.
    """

    if not CACHE_DEV.exists(igdb_id):
        dev_block = rq_developer_block(igdb_id)
        if len(dev_block) == 0:
            return None

        METRICS['igdb.new_downloads'] += len(dev_block)

        # Write to the cache
        for dev_json in dev_block:
            CACHE_DEV.write_json(dev_json['id'], [dev_json])

        # Write missing developers
        for missing in set(range(igdb_id, igdb_id + API_STRIDE)) - set([g['id'] for g in game_block]):
            if not CACHE_DEV.exists(missing):
                CACHE_DEV.write_json(missing, [])

        if dev_block[0]['id'] == igdb_id:
            return dev_block[0]
    else:
        dev_json = CACHE_DEV.read_json(igdb_id)
        if len(dev_json) == 1:
            return dev_json[0]

    return None


def build_game(game_json):
    """
    Build a Game object from the raw data, taking into account previous Games.
    """

    # Steam ID matching
    if 'external' in game_json and 'steam' in game_json['external'] \
            and int(game_json['external']['steam']) in WS.game_steam:
        game = WS.game_steam[int(game_json['external']['steam'])]

    # IGDB ID matching
    elif game_json['id'] in WS.game_igdb:
        game = WS.game_igdb[game_json['id']]

    # Exact name matching
    elif cond_game_name(game_json['name']) in WS.game_name:
        game = WS.game_name[cond_game_name(game_json['name'])]

    # Build new Game
    else:
        game = Game()

    # IGDB ID (overwrite)
    game.igdb_id = int(game_json['id'])

    # Title
    if game.name is None:
        game.name = game_json['name']

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
        game.release = datetime.fromtimestamp(
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
        else:
            # TODO deal with landscape covers
            pass

    # ESRB rating
    if game.esrb is None and 'esrb' in game_json:
        game.esrb = game_json['esrb']['rating']

    return game


def build_dev(dev_json):
    """
    Build a Developer object from the raw data, taking into account previous Developers.
    """

    # Name matching
    # This is necessary because some developers from IGDB are duplicated
    if dev_json['name'] in WS.developers:
        dev = WS.developers[dev_json['name']]

    # IGDB ID matching
    elif dev_json['id'] in WS.developers:
        dev = WS.developers[dev_json['id']]

    # Build new Developer
    else:
        dev = Developer()

    # IGDB ID
    if dev.igdb_id is None:
        dev.igdb_id = int(dev_json['id'])

    # Name
    if dev.name is None:
        dev.name = dev_json['name']

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

    return dev


def collect_games():
    """
    Download missing games from IGDB.
    """
    assert len(GAME_RANGE) > 0
    print("[IGDB ] Collecting games")

    # Load games
    for id in tqdm(GAME_RANGE):
        if not is_cached(CACHE_GAME, id):
            load_game_json(id)

    print("[IGDB ] Collection complete")


def collect_developers():
    """
    Download missing developers from IGDB.
    """
    assert len(DEV_RANGE) > 0
    print("[IGDB ] Collecting developers")

    # Load developers
    for id in tqdm(DEV_RANGE):
        if not is_cached(CACHE_DEV, id):
            load_dev_json(id)

    print("[IGDB ] Collection complete")


def collect_covers():
    """
    Download missing game covers from IGDB.
    """

    print("[IGDB ] Collecting game covers")

    for id in tqdm(GAME_RANGE):
        if not is_cached(CACHE_COVER, id):
            game_json = load_game_json(id)
            if game_json is not None and 'cover' in game_json:
                rq = requests.get("http://" + game_json['cover']['url'][2:].replace(
                    "t_thumb", "t_original"))

                if not rq.status_code == requests.codes.ok:
                    print("[IGDB ] Failed to download cover for id: %d", id)
                    continue

                # Write the cover to cache
                with open("%s/%d" % (CACHE_COVER, id), 'wb') as h:
                    h.write(rq.content)

    print("[IGDB ] Collection complete")


def merge_games():
    """
    Merge cached games into the working set
    """
    load_working_set()

    print("[IGDB ] Merging games")
    for id in tqdm(GAME_RANGE):
        game_json = load_game_json(id)
        if game_json is None:
            continue

        game = build_game(game_json)
        if game is None:
            continue

        # Add to working set
        WS.add_game(game)

    print("[IGDB ] Merge complete")


def merge_developers():
    """
    Merge cached developers into the working set and flush the database.
    """
    load_working_set()

    print("[IGDB ] Merging developers")
    for id in tqdm(DEV_RANGE):
        dev_json = load_dev_json(id)
        if dev_json is None:
            continue

        dev = build_dev(dev_json)
        if dev is None:
            continue

        # Add to working set
        WS.add_developer(dev)

    print("[IGDB ] Merge complete")


def link_developers():
    """
    Perform the linking for IGDB developers according to IGDB ID
    """
    load_working_set()

    print("[IGDB ] Linking developers")

    for dev in tqdm(WS.developers.values()):
        dev_json = load_dev_json(dev.igdb_id)
        if dev_json is None:
            continue

        for igdb_id in chain(dev_json.get('published', []), dev_json.get('developed', [])):
            if igdb_id in WS.game_igdb:
                # Link the models if not already linked
                game = WS.game_igdb[igdb_id]
                if not dev in game.developers:
                    dev.games.append(game)

    print("[IGDB ] Link complete")
