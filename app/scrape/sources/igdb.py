# --------------------------------
# IGDB.com API scraper           -
# Copyright (C) 2018 GameFrame   -
# --------------------------------
from ratelimit import rate_limited
from codecs import open
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

    assert(rq.status_code == requests.codes.ok)
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

    assert(rq.status_code == requests.codes.ok)
    return rq.json()


def get_game(id):
    """
    Retrieve a game from the cache or download it from IGDB.
    """

    if not os.path.isfile("%s/%d" % (CACHE_GAME_IGDB, id)):
        game = rq_game(id)

        # Write to the cache
        with open("%s/%d" % (CACHE_GAME_IGDB, id), 'w', 'utf8') as h:
            h.write(json.dumps(game, ensure_ascii=False))
        return game
    else:
        with open("%s/%d" % (CACHE_GAME_IGDB, id), 'r', 'utf8') as h:
            return json.loads(h)


def get_developer(id):
    """
    Retrieve a developer from the cache or download it from IGDB.
    """

    if not os.path.isfile("%s/%d" % (CACHE_DEV_IGDB, id)):
        dev = rq_game(id)

        # Write to the cache
        with open("%s/%d" % (CACHE_DEV_IGDB, id), 'w', 'utf8') as h:
            h.write(json.dumps(dev, ensure_ascii=False))
        return dev
    else:
        with open("%s/%d" % (CACHE_DEV_IGDB, id), 'r', 'utf8') as h:
            return json.loads(h)


def gather_games():
    """
    Download any games missing from the cache.
    """
    print("[IGDB ] Gathering games")

    i = 0
    # 2124 - 89252 seems to be the range of game IDs on IGDB
    for id in range(2124, 89253):
        get_game(id)
        i += 1

    print("[IGDB ] Gathered %d games" % i)
