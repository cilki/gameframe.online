# --------------------------------
# IGDB.com API scraper           -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import json
import os
import sys
import requests

from codecs import open
from functools import lru_cache
from datetime import datetime
from tqdm import tqdm
from itertools import chain
from ratelimit import rate_limited

from orm import Developer, Game, Image, Genre, Platform
from util import is_cached
from cache import load_working_set, add_game, add_developer, name_game, steamid_game, name_developer, igdbid_developer, igdbid_game, map_id_platform, map_id_genre

"""
The API key
"""
API_KEY = os.environ['KEY_IGDB']

"""
The game cache
"""
CACHE_GAME = "%s/igdb/games" % os.environ['CACHE_GAMEFRAME']
assert os.path.isdir(CACHE_GAME)

"""
The developer cache
"""
CACHE_DEV = "%s/igdb/developers" % os.environ['CACHE_GAMEFRAME']
assert os.path.isdir(CACHE_DEV)

"""
The cover cache
"""
CACHE_COVER = "%s/igdb/covers" % os.environ['CACHE_GAMEFRAME']
assert os.path.isdir(CACHE_COVER)

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


def rq_developer(id):
    """
    Request a block of developers starting at the given id using IGDB's API.
    """

    rq = requests.get("https://api-endpoint.igdb.com/companies/%s"
                      % str(list(range(id, id + API_STRIDE)))[1:-1].replace(" ", ""),
                      headers={'user-key': API_KEY})

    assert rq.status_code == requests.codes.ok
    return rq.json()


def load_game_json(id):
    """
    Retrieve a filtered game from the cache or download it from IGDB.
    """
    assert os.path.isdir(CACHE_GAME)

    if not is_cached(CACHE_GAME, id):
        game = rq_game(id)

        # Write to the cache
        for entity in game:
            with open("%s/%d" % (CACHE_GAME, entity['id']), 'w', 'utf8') as h:
                h.write(json.dumps([entity], ensure_ascii=False))

        # Write empty files for skipped entities
        for i in range(id, id + API_STRIDE):
            if not os.path.isfile("%s/%d" % (CACHE_GAME, i)):
                with open("%s/%d" % (CACHE_GAME, i), 'w', 'utf8') as h:
                    h.write(json.dumps([]))
    else:
        with open("%s/%d" % (CACHE_GAME, id), 'r', 'utf8') as h:
            game = json.load(h)

    if len(game) == 0 or not game[0]['id'] == id:
        return None

    return game[0]


def load_dev_json(id):
    """
    Retrieve a filtered developer from the cache or download it from IGDB.
    """
    assert os.path.isdir(CACHE_DEV)

    if not os.path.isfile("%s/%s" % (CACHE_DEV, id)):
        dev = rq_developer(id)

        # Write to the cache
        for entity in dev:
            with open("%s/%d" % (CACHE_DEV, entity['id']), 'w', 'utf8') as h:
                h.write(json.dumps([entity], ensure_ascii=False))

        # Write empty files for skipped entities
        for i in range(id, id + API_STRIDE):
            if not os.path.isfile("%s/%d" % (CACHE_DEV, i)):
                with open("%s/%d" % (CACHE_DEV, i), 'w', 'utf8') as h:
                    h.write(json.dumps([]))
    else:
        with open("%s/%d" % (CACHE_DEV, id), 'r', 'utf8') as h:
            dev = json.load(h)

    if len(dev) == 0 or not dev[0]['id'] == id:
        return None

    return dev[0]


def build_game(game_json):
    """
    Build a Game object from the raw data, taking into account previous Games.
    """

    try:
        # Steam ID matching
        game = steamid_game[game_json['external']['steam']]
    except KeyError:
        # IGDB ID matching
        if game_json['id'] in igdbid_game:
            game = igdbid_game[game_json['id']]
        # Exact name matching
        elif game_json['name'] in name_game:
            game = name_game[game_json['name']]
        # Build new Game
        else:
            game = Game()

    # IGDB ID
    game.igdb_id = int(game_json['id'])

    # Title
    if game.name is None:
        game.name = game_json['name']

    # Genre
    for numeric_genre in game_json.get('genres', []):
        genre = map_id_genre[numeric_genre]
        if genre not in game.genres:
            game.genres.append(genre)

    # Platform
    for numeric_platform in game_json.get('platforms', []):
        platform = map_id_platform[numeric_platform]
        if platform not in game.platforms:
            game.platforms.append(platform)

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
    for screenshot in game_json.get('screenshots', []):
        url = screenshot['url'][2:].replace("t_thumb", "t_original")
        game.screenshots.append(Image(url=url))

    # Cover
    if game.cover is None and 'cover' in game_json:
        game.cover = game_json['cover']['url'][2:].replace(
            "t_thumb", "t_original")

    return game


def build_dev(dev_json):
    """
    Build a Developer object from the raw data, taking into account previous Developers.
    """

    # IGDB ID matching
    if dev_json['id'] in igdbid_developer:
        dev = igdbid_developer[dev_json['id']]
    # Build new Developer
    else:
        dev = Developer()

    # IGDB ID
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


def merge_games(db):
    """
    Merge cached games into the working set and flush the database.
    """
    load_working_set()

    print("[IGDB ] Merging games")
    for id in tqdm(GAME_RANGE):
        game_json = load_game_json(id)
        if game_json is None:
            continue

        game = build_game(game_json)

        # Add to working set
        add_game(game)

        # Add or replace in database
        db.session.add(game)

    db.session.commit()

    print("[IGDB ] Merge complete")


def merge_developers(db):
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

        # Add to working set
        add_developer(dev)

        # Add or replace in database
        db.session.add(dev)

    db.session.commit()

    print("[IGDB ] Merge complete")


def link_developers(db):
    """
    Perform the linking for IGDB developers according to IGDB ID
    """
    load_working_set()

    print("[IGDB ] Linking developers")

    for name, dev in tqdm(name_developer.items()):
        dev_json = load_dev_json(dev.igdb_id)
        if dev_json is None:
            continue

        for id in chain(dev_json.get('published', []), dev_json.get('developed', [])):
            if id in igdbid_game:
                # Link the models if not already linked
                game = igdbid_game[id]
                if not dev in game.developers:
                    dev.games.append(game)

    db.session.commit()
    print("[IGDB ] Link complete")
