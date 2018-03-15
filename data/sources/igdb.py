# --------------------------------
# IGDB.com API scraper           -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import json
import os
import sys
from codecs import open
from functools import lru_cache
from datetime import datetime
from tqdm import tqdm
from itertools import chain

import requests
from ratelimit import rate_limited

sys.path.append(os.path.abspath('app'))
from orm import Developer, Game
from util import append_csv, is_cached
from working_set import load_working_set, add_game, add_developer, name_game, steamid_game, name_developer, igdbid_developer, igdbid_game

"""
The API key
"""
API_KEY = os.environ['KEY_IGDB']

"""
The game cache
"""
CACHE_GAME_IGDB = os.environ['CACHE_GAME_IGDB']

"""
The developer cache
"""
CACHE_DEV_IGDB = os.environ['CACHE_DEV_IGDB']

"""
2124 - 89252 seems to be the range of game IDs on IGDB
"""
GAME_RANGE = range(2124, 89253)

"""
1 - ? seems to be the range of developer IDs on IGDB
"""
DEV_RANGE = range(1, 40001)

"""
The number of entities to request at a time
"""
API_STRIDE = 100

"""
The genre mapping that IGDB uses
"""
GENRES = {2: 'Point-and-click', 4: 'Fighting', 5: 'Shooter', 7: 'Music',
          8: 'Platform', 9: 'Puzzle', 10: 'Racing', 11: 'Real Time Strategy',
          12: 'Role-playing', 13: 'Simulator', 14: 'Sport', 15: 'Strategy',
          16: 'Turn-based strategy', 24: 'Tactical', 25: "Hack and slash",
          26: 'Trivia', 30: 'Pinball', 31: 'Adventure', 32: 'Indie', 33: 'Arcade'}


def rq_game(id):
    """
    Request a block of games starting at the given id using IGDB's API.
    """

    rq = requests.get("https://api-endpoint.igdb.com/games/%s"
                      % str(list(range(id, id + API_STRIDE)))[1:-1].replace(" ", ""),
                      headers={'user-key': API_KEY})

    assert rq.status_code == requests.codes.ok
    return rq.json()


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
    assert os.path.isdir(CACHE_GAME_IGDB)

    if not os.path.isfile("%s/%d" % (CACHE_GAME_IGDB, id)):
        game = rq_game(id)

        # Write to the cache
        for entity in game:
            with open("%s/%d" % (CACHE_GAME_IGDB, entity['id']), 'w', 'utf8') as h:
                h.write(json.dumps([entity], ensure_ascii=False))

        # Write empty files for skipped entities
        for i in range(id, id + API_STRIDE):
            if not os.path.isfile("%s/%d" % (CACHE_GAME_IGDB, i)):
                with open("%s/%d" % (CACHE_GAME_IGDB, i), 'w', 'utf8') as h:
                    h.write(json.dumps([]))
    else:
        with open("%s/%d" % (CACHE_GAME_IGDB, id), 'r', 'utf8') as h:
            game = json.load(h)

    if len(game) == 0 or not game[0]['id'] == id:
        return None

    return game[0]


def load_dev_json(id):
    """
    Retrieve a filtered developer from the cache or download it from IGDB.
    """
    assert os.path.isdir(CACHE_DEV_IGDB)

    if not os.path.isfile("%s/%d" % (CACHE_DEV_IGDB, id)):
        dev = rq_developer(id)

        # Write to the cache
        for entity in dev:
            with open("%s/%d" % (CACHE_DEV_IGDB, entity['id']), 'w', 'utf8') as h:
                h.write(json.dumps([entity], ensure_ascii=False))

        # Write empty files for skipped entities
        for i in range(id, id + API_STRIDE):
            if not os.path.isfile("%s/%d" % (CACHE_DEV_IGDB, i)):
                with open("%s/%d" % (CACHE_DEV_IGDB, i), 'w', 'utf8') as h:
                    h.write(json.dumps([]))
    else:
        with open("%s/%d" % (CACHE_DEV_IGDB, id), 'r', 'utf8') as h:
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
    if game.genres is None and 'genres' in game_json:
        for genre in game_json['genres']:
            game.genres = append_csv(game.genres, GENRES[genre])

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
    if 'screenshots' in game_json:
        for screenshot in game_json['screenshots']:
            game.screenshots = append_csv(
                game.screenshots, screenshot['url'][2:].replace("t_thumb", "t_original"))

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
        if not os.path.isfile("%s/%d" % (CACHE_GAME_IGDB, id)):
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

                if rq.status_code == requests.codes.ok:
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
