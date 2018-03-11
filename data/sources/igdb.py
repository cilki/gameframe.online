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

import requests
from ratelimit import rate_limited

sys.path.append(os.path.abspath('app'))
from orm import Developer, Game
from util import append_csv

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
    Request game metadata using IGDB's API
    """

    rq = requests.get("https://api-endpoint.igdb.com/games/%s"
                      % str(list(range(id, id + API_STRIDE)))[1:-1].replace(" ", ""),
                      headers={'user-key': API_KEY})

    assert rq.status_code == requests.codes.ok
    return rq.json()


def rq_developer(id):
    """
    Request developer metadata using IGDB's API
    """

    rq = requests.get("https://api-endpoint.igdb.com/companies/%s"
                      % str(list(range(id, id + API_STRIDE)))[1:-1].replace(" ", ""),
                      headers={'user-key': API_KEY})

    assert rq.status_code == requests.codes.ok
    return rq.json()


def load_game(id):
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
    else:
        with open("%s/%d" % (CACHE_GAME_IGDB, id), 'r', 'utf8') as h:
            game = json.load(h)

    if len(game) == 0:
        return None

    return game[0]


def find_game(game_json):
    """
    Attempt to locate a game in the database
    """
    # IGDB ID matching
    game = Game.query.filter_by(igdb_id=game_json['id']).first()

    # Steam ID matching
    if game is None and 'external' in game_json and 'steam' in game_json['external']:
        game = Game.query.filter_by(
            steam_id=game_json['external']['steam']).first()

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


def load_developer(id):
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
    else:
        with open("%s/%d" % (CACHE_DEV_IGDB, id), 'r', 'utf8') as h:
            dev = json.load(h)

    if len(dev) == 0:
        return None

    return dev[0]


def find_dev(dev_json):
    """
    Attempt to locate a developer in the database.
    """
    # IGDB ID matching
    dev = Developer.query.filter_by(igdb_id=dev_json['id']).first()

    # Steam ID matching
    if dev is None and 'external' in dev_json and 'steam' in dev_json['external']:
        dev = Developer.query.filter_by(
            steam_id=dev_json['external']['steam']).first()

    # TODO Provide more robust searching with dev_json

    # Construct new Developer
    if dev is None:
        dev = Developer()

    return dev


def build_dev(dev_json):
    """
    Build a Developer object from the raw data, taking into account previous Developers.
    """
    dev = find_dev(dev_json)

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


@lru_cache(maxsize=1)
def gather_games():
    """
    Build a filtered list of Game objects.
    """
    assert len(GAME_RANGE) > 0
    print("[IGDB ] Gathering games")

    games = []

    # Load games
    for id in tqdm(GAME_RANGE):
        game_json = load_game(id)
        if game_json is None:
            continue
        games.append(build_game(game_json))

    print("[IGDB ] Gathered %d games" % len(games))
    return games


@lru_cache(maxsize=1)
def gather_developers():
    """
    Build a filtered list of Developer objects.
    """
    assert len(DEV_RANGE) > 0
    print("[IGDB ] Gathering developers")

    developers = []

    # Load developers
    for id in tqdm(DEV_RANGE):
        dev_json = load_developer(id)
        if dev_json is None:
            continue
        developers.append(build_dev(dev_json))

    print("[IGDB ] Gathered %d developers" % len(developers))
    return developers


def merge_games(db):
    """
    Insert the filtered list of games into the database.
    """
    games = gather_games()

    print("[IGDB ] Merging games")
    for game in games:
        db.session.add(game)
    db.session.commit()

    print("[IGDB ] Merge complete")


def merge_developers(db):
    """
    Insert the filtered list of developers into the database.
    """
    developers = gather_developers()

    print("[IGDB ] Merging developers")
    for dev in developers:
        db.session.add(dev)
    db.session.commit()

    print("[IGDB ] Merge complete")


def link_developers(db):
    """
    Perform the linking for IGDB developers according to IGDB ID
    """

    print("[IGDB ] Linking developers")

    # Load games with IGDB IDs into a hashtable for improved performance
    games = {game.igdb_id: game for game in Game.query.all()
             if game.igdb_id is not None}

    for dev in tqdm(Developer.query.all()):
        dev_json = load_developer(dev.igdb_id)

        if 'published' not in dev_json:
            dev_json['published'] = []
        if 'developed' not in dev_json:
            dev_json['developed'] = []

        for l in (dev_json['published'], dev_json['developed']):
            for id in l:
                if id in games:
                    # Link the models
                    game = games[id]
                    dev.games.append(game)
                    game.developers.append(dev)

    db.session.commit()
    print("[IGDB ] Link complete")
