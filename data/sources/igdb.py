# --------------------------------
# IGDB.com API scraper           -
# Copyright (C) 2018 GameFrame   -
# --------------------------------
from ratelimit import rate_limited
from codecs import open

import requests
import os
import json

import sys
sys.path.append(os.path.abspath('app'))
from orm import Game, Developer

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

def gather_developers():
    """
    Download any developers missing from the cache.
    """
    assert len(DEV_RANGE) > 0
    print("[IGDB ] Gathering developers")

    i = 0
    for id in DEV_RANGE:
        if not get_developer(id) is None:
            i += 1

    print("[IGDB ] Gathered %d developers" % i)


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

def filter_developers():
    """
    Return a filtered list of developers.
    """
    print("[IGDB ] Filtering developers")

    filtered = []

    for id in DEV_RANGE:
        dev_json = get_developer(id)

        if dev_json is None:
            continue

        if 'name' not in dev_json:
            continue

        # TODO Apply more filtering
        filtered += [id]

    print("[IGDB ] Filtered out %d developers" % (len(DEV_RANGE) - len(filtered)))
    return filtered


def populate_games(db):
    """
    Insert the filtered list of games into the database.
    """

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

        game.igdb_id = int(game_json['id'])

        # Title
        if game.name is None:
            game.name = game_json['name']

        # Genre
        if game.genres is None and 'genres' in game_json:
            game.genres = str(game_json['genres'])

        # Summary
        if game.summary is None and 'summary' in game_json:
            game.summary = game_json['summary']

        # Steam ID
        if game.steam_id is None and 'external' in game_json \
                and 'steam' in game_json['external']:
            game.steam_id = int(game_json['external']['steam'])

        # Release date
        # TODO Consider release date for all platforms
        if game.release is None and 'release_dates' in game_json \
                and 'date' in game_json['release_dates'][0]:
            game.release = int(game_json['release_dates'][0]['date'])

        print("Uploading game (%d): %s" %
              (game.igdb_id, game.name.encode('utf-8', 'ignore')))

        db.session.add(game)
        db.session.commit()

    print("[IGDB ] Inserted %d new games" % i)


def populate_developers(db):
    """
    Insert the filtered list of developers into the database.
    """

    i = 0
    for id in filter_developers():
        dev_json = get_developer(id)
        assert 'id' in dev_json
        assert 'name' in dev_json

        # TODO Find the same dev in database if it already exists
        if True:
            dev = Developer()
            i += 1
        else:
            dev = Developer()

        # Title
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


        print("Uploading developer: %s" %
              (dev.name.encode('utf-8', 'ignore')))

        db.session.add(dev)
        db.session.commit()

    print("[IGDB ] Inserted %d new developers" % i)
