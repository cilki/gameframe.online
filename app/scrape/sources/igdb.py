# --------------------------------
# IGDB.com API scraper           -
# Copyright (C) 2018 GameFrame   -
# --------------------------------
from ratelimit import rate_limited
from codecs import open
from orm import Game
import requests
import os
import json


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


@rate_limited(period=40, every=60)
def rq_game(id):
    """
    Request game metadata using IGDB's API
    """
    print("[IGDB ] Downloading game metadata for: %d" % id)

    rq = requests.get("https://api-endpoint.igdb.com/games/%d" % id,
                      headers={'user-key': API_KEY,
                               'Accept': 'application/json'},
                      params={'fields': '*'})

    assert rq.status_code == requests.codes.ok
    return rq.json()


@rate_limited(period=40, every=60)
def rq_developer(id):
    """
    Request developer metadata using IGDB's API
    """
    print("[IGDB ] Downloading developer metadata for: %d" % id)

    rq = requests.get("https://api-endpoint.igdb.com/companies/%d" % id,
                      headers={'user-key': API_KEY,
                               'Accept': 'application/json'},
                      params={'fields': '*'})

    assert rq.status_code == requests.codes.ok
    return rq.json()


def get_game(id):
    """
    Retrieve a game from the cache or download it from IGDB.
    """
    assert os.path.isdir(CACHE_GAME_IGDB)

    if not os.path.isfile("%s/%d" % (CACHE_GAME_IGDB, id)):
        game = rq_game(id)

        # Write to the cache
        with open("%s/%d" % (CACHE_GAME_IGDB, id), 'w', 'utf8') as h:
            h.write(json.dumps(game, ensure_ascii=False))
    else:
        with open("%s/%d" % (CACHE_GAME_IGDB, id), 'r', 'utf8') as h:
            game = json.load(h)

    if len(game) == 0:
        return None

    return game[0]


def get_developer(id):
    """
    Retrieve a developer from the cache or download it from IGDB.
    """
    assert os.path.isdir(CACHE_DEV_IGDB)

    if not os.path.isfile("%s/%d" % (CACHE_DEV_IGDB, id)):
        dev = rq_developer(id)

        # Write to the cache
        with open("%s/%d" % (CACHE_DEV_IGDB, id), 'w', 'utf8') as h:
            h.write(json.dumps(dev, ensure_ascii=False))
    else:
        with open("%s/%d" % (CACHE_DEV_IGDB, id), 'r', 'utf8') as h:
            dev = json.load(h)

    if len(dev) == 0:
        return None

    return dev[0]


def gather_games():
    """
    Download any games missing from the cache.
    """
    assert len(GAME_RANGE) > 0
    print("[IGDB ] Gathering games")

    i = 0
    for id in GAME_RANGE:
        if not get_game(id) is None:
            i += 1

    print("[IGDB ] Gathered %d games" % i)


def filter_games():
    """
    Return a filtered list of games.
    """
    print("[IGDB ] Filtering games")

    filtered = []

    for id in GAME_RANGE:
        game_json = get_game(id)

        if game_json is None:
            continue

        if 'name' not in game_json:
            continue

        # TODO Apply more filtering
        filtered += [id]

    print("[IGDB ] Filtered out %d games" % (len(GAME_RANGE) - len(filtered)))
    return filtered


def populate_games(db):
    """
    Insert the filtered list of games into the database.
    """
    print("[IGDB ] Populating database")

    i = 0
    for id in filter_games():
        game_json = get_game(id)
        assert 'id' in game_json
        assert 'name' in game_json

        # TODO Find the same game in database if it already exists
        if True:
            game = Game()
            i += 1
        else:
            game = Game()

        game.igdb_id = game_json['id']

        if game.name is None:
            game.name = game_json['name']

        if game.genre is None and 'genres' in game_json:
            game.genre = game_json['genres']

        if game.summary is None and 'summary' in game_json:
            game.summary = game_json['summary']

        if game.release is None and 'release_dates' in game_json:
            game.release = game_json['release_dates']['date']

        db.session.add(game)
        db.session.commit()

    print("[IGDB ] Inserted %d games" % i)
