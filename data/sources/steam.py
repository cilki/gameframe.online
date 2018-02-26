# --------------------------------
# Steam API scraper              -
# Copyright (C) 2018 GameFrame   -
# --------------------------------
from ratelimit import rate_limited
from codecs import open
import requests
import json
import os


"""
The game cache
"""
CACHE_GAME_STEAM = os.environ['CACHE_GAME_STEAM']


@rate_limited(period=40, every=60)
def rq_app_list():
    """
    Request Steam's entire app list using the Steam API.
    """
    print("[STEAM] Downloading app list... ")

    rq = requests.get(
        "https://api.steampowered.com/ISteamApps/GetAppList/v2")

    assert rq.status_code == requests.codes.ok
    return rq.json()


@rate_limited(period=35, every=60)
def rq_game(app):
    """
    Request game metadata using the store API
    """
    print("[STEAM] Downloading game metadata for: %s" %
          app['name'].encode('utf-8', 'ignore'))

    rq = requests.get(
        "http://store.steampowered.com/api/appdetails", {'appids': str(app['appid'])})

    assert rq.status_code == requests.codes.ok
    return rq.json()


def get_game(app):
    """
    Retrieve a game from the cache or download it from Steam.
    """
    assert os.path.isdir(CACHE_GAME_STEAM)

    if not os.path.isfile("%s/%d" % (CACHE_GAME_STEAM, app['appid'])):
        game = rq_game(app)

        # Write to the cache
        with open("%s/%d" % (CACHE_GAME_STEAM, app['appid']), 'w', 'utf8') as h:
            h.write(json.dumps(game, ensure_ascii=False))
    else:
        with open("%s/%d" % (CACHE_GAME_STEAM, app['appid']), 'r', 'utf8') as h:
            game = json.load(h)

    if len(game) == 0:
        return None

    return game[0]


def gather_games():
    """
    Download any games missing from the cache.
    """
    apps = rq_app_list()

    print("[STEAM] Gathering games")

    i = 0
    for app in apps:
        if not get_game(id) is None:
            i += 1

    print("[STEAM] Gathered %d games" % i)
