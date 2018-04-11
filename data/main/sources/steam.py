# --------------------------------
# Steam API scraper              -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import os
import re
from functools import lru_cache
from itertools import chain

import requests
from ratelimit import rate_limited
from datetime import datetime
from tqdm import tqdm

from aws import upload_image
from cache import WS, FolderCache, load_working_set
from cdgen.steam import generate
from common import CDN_URI, TC, load_registry
from orm import Game, Article, Genre, Image, Platform
from registry import CachedGame, CachedArticle

from .util import condition, condition_developer, condition_heavy, parse_steam_date, xappend


"""
The header image cache
"""
CACHE_HEADER = FolderCache("/steam/headers")

"""
The CD image cache
"""
CACHE_CD = FolderCache("/steam/cds")


"""
Steam genres that should be filtered out
"""
UNWANTED_GENRES = set(['Animation & Modeling', 'Photo Editing', 'Rol',
                       'Software Training', 'Accounting', 'Video Production',
                       'Utilities', 'Audio Production', 'Design & Illustration',
                       'Web Publishing'])


@rate_limited(period=40, every=60)
@lru_cache(maxsize=1)
def rq_app_list():
    """
    Request Steam's entire app list using the Steam API.
    """
    print("[STEAM] Downloading application directory")

    rq = requests.get("https://api.steampowered.com/ISteamApps/GetAppList/v2")

    assert rq.status_code == requests.codes.ok
    return rq.json()['applist']['apps']


def rq_player_count(appid):
    """
    Request the current number of players
    """

    rq = requests.get("https://api.steampowered.com/ISteamUserStats/" +
                      "GetNumberOfCurrentPlayers/v1", {'appid': appid})

    if rq.status_code == requests.codes.not_found:
        return 0

    assert rq.status_code == requests.codes.ok
    return rq.json()['response'].get('player_count', 0)


@rate_limited(period=40, every=60)
def rq_game(appid):
    """
    Request game metadata from Steam
    """

    # Metadata request
    rq = requests.get("http://store.steampowered.com/api/appdetails",
                      {'appids': str(appid)})

    assert rq.status_code == requests.codes.ok
    game_json = rq.json()[str(appid)]

    # Filter failed queries
    if not validate_game(game_json):
        CACHE_GAME.add(CachedGame(steam_id=appid))
    else:
        CACHE_GAME.add(CachedGame(
            steam_id=appid, steam_data=game_json['data']))


@rate_limited(period=40, every=60)
def rq_articles(appid):
    """
    Request game news from Steam
    """

    rq = requests.get("https://api.steampowered.com/ISteamNews/GetNewsForApp/v2",
                      {'appid': appid, 'count': 500})

    if rq.status_code == requests.codes.forbidden:
        return []

    assert rq.status_code == requests.codes.ok
    return rq.json()['appnews']['newsitems']


def collect_games():
    """
    Download missing games from Steam
    """
    apps = rq_app_list()
    load_registry('Game', 'steam_id')

    # Load games
    for app in tqdm(apps, '[STEAM   ] Collecting Games'):
        if not TC['Game.steam_id'].exists(app['appid']):
            rq_game(app['appid'])


def collect_headers():
    """
    Download missing game headers from Steam
    """
    load_working_set()
    load_registry('Game', 'steam_id')

    for appid, game in tqdm(WS.games_steam.items(), '[STEAM   ] Collecting Headers'):
        if not CACHE_HEADER.exists(appid):
            game_json = TC['Game.steam_id'].get(appid).steam_data
            if game_json is not None and 'header_image' in game_json:
                rq = requests.get(game_json['header_image'])

                assert rq.status_code == requests.codes.ok

                # Write the header to cache
                CACHE_HEADER.write(appid, rq.content)


def collect_articles():
    """
    Download missing articles from Steam
    """
    apps = rq_app_list()
    load_article_cache()

    for appid in tqdm(apps, '[STEAM   ] Collecting Articles'):
        if not CACHE_ARTICLE.exists(appid):
            rq_articles(appid)


def generate_covers():
    """
    Generate Steam covers using the cached headers
    """
    load_working_set()

    LIN = WS.platforms[3]
    WIN = WS.platforms[6]
    MAC = WS.platforms[14]

    for appid, game in tqdm(WS.games_steam.items(), '[STEAM   ] Generating Covers'):
        if not CACHE_CD.exists(str(appid) + '.png') and CACHE_HEADER.exists(appid):
            generate("%s/%d" % (CACHE_HEADER, appid), "%s/%s" %
                     (CACHE_CD, str(appid) + '.png'),
                     LIN in game.platforms, WIN in game.platforms, MAC in game.platforms)


def upload_covers():
    """
    Upload game covers for games in the working set
    """
    load_working_set()

    for appid, game in tqdm(WS.games_steam.items(), '[STEAM   ] Uploading Covers'):
        if CACHE_CD.exists(str(appid) + '.png'):
            # Upload cover
            upload_image("%s/%d.png" % (CACHE_CD, appid),
                         "cover/steam/%d.png" % appid)


def build_game(game, game_json):
    """
    Incorperate the given Steam data into a Game object
    """
    if game is None or game_json is None:
        return

    # Steam ID
    if game.steam_id is None:
        game.steam_id = game_json['steam_appid']

    # Title
    if game.name is None:
        game.name = game_json['name']
        game.c_name = condition(game.name)

    # Summary
    if game.summary is None and 'detailed_description' in game_json:
        game.summary = game_json['detailed_description']

    # Price
    if game.price is None and 'is_free' in game_json and game_json['is_free']:
        game.price = 0
    elif game.price is None and 'price_overview' in game_json:
        game.price = game_json['price_overview']['final']

    # Background
    if game.background is None and 'background' in game_json:
        game.background = game_json['background']

    # Website
    if game.website is None and 'website' in game_json:
        game.website = game_json['website']

    # Platforms
    if game_json.get('platforms', {}).get('windows', False):
        xappend(game.platforms, WS.platforms[6])
    if game_json.get('platforms', {}).get('linux', False):
        xappend(game.platforms, WS.platforms[3])
    if game_json.get('platforms', {}).get('mac', False):
        xappend(game.platforms, WS.platforms[14])

    # Screenshots
    for screenshot in game_json.get('screenshots', []):
        url = screenshot['path_full'].split('?', 1)[0]
        if next((x for x in game.screenshots if x.url == url), None) is None:
            game.screenshots.append(Image(url=url))

    # Genres
    for genre in game_json.get('genres', []):
        xappend(game.genres, WS.genres[genre['description']])

    # Release date
    if game.release is None and 'release_date' in game_json:
        if game_json['release_date']['date']:
            game.release = parse_steam_date(
                game_json['release_date']['date'])

    # Metacritic rating
    if game.metacritic is None and 'metacritic' in game_json:
        game.metacritic = game_json['metacritic']['score']

    # Cover
    if game.cover is None and CACHE_CD.exists("%d.png" % game.steam_id):
        game.cover = "%s/cover/steam/%d.png" % (CDN_URI, game.steam_id)


def build_article(article, article_json):
    """
    Incorperate the given Steam data into an Article object
    """
    if article is None or article_json is None:
        return

    # Title
    if article.title is None and article_json.get('title'):
        article.title = article_json['title']
        article.c_title = condition(article.title)

    # Introduction
    if article.introduction is None and article_json.get('contents'):
        article.introduction = article_json['contents']

    # Cover
    match = re.search(r'src="([^"]+)"', article.introduction)
    if article.cover is None and match is not None:
        article.cover = match[1]

        if article.cover.startswith('//'):
            article.cover = 'http:' + article.cover

        # Remove the image from description because it's now the cover
        re.sub(r"<img[.+]src=\"%s\"[.*]/>" %
               article.cover, '', article.introduction)

    # Author
    if article.author is None and article_json.get('author'):
        article.author = article_json['author']

    # URL
    if article.article_link is None and article_json.get('url'):
        article.article_link = article_json['url']

    # Timestamp
    if article.timestamp is None and article_json.get('date'):
        article.timestamp = datetime.fromtimestamp(article_json['date'])

    # Outlet
    if article.outlet is None and article_json.get('feedlabel'):
        article.outlet = article_json['feedlabel']


def validate_article(article_json):
    """
    Validate the content of a raw article
    """
    if article_json is None:
        return False

    try:
        # Filter title
        if len(article_json['title']) < 5:
            return False

        # Filter contents
        if len(article_json['contents']) < 25:
            return False

        # Filter Outlet
        if len(article_json['feedlabel']) < 10:
            return False

        # Filter Article link
        if len(article_json['url']) < 10:
            return False

    except KeyError:
        return False
    return True


def validate_game(game_json):
    """
    Validate the content of a raw game
    """
    if game_json is None:
        return False

    try:
        # Filter success
        if game_json['success'] == 'false':
            return False

        # Filter type
        if not game_json['data']['type'] == 'game':
            return False

        # Filter genre
        if any(x['description'] in UNWANTED_GENRES for x in game_json['data'].get('genres', [])):
            return False

    except KeyError:
        return False
    return True


def link_developers():
    """
    Compute Game-Developer links according to developer name for Steam games
    """
    load_working_set()
    load_registry('Game', 'steam_id')

    for game in tqdm(WS.games_steam.values(), '[STEAM   ] Linking Developers'):
        game_json = TC['Game.steam_id'].get(game.steam_id).steam_data
        if game_json is None:
            continue

        for name in chain(game_json.get('developers', []), game_json.get('publishers', [])):
            dev = WS.developers.get(name)

            if dev is None:
                dev = WS.developers.get(condition_developer(name))

            if dev is not None:
                # Set the primary developer to the first one
                if game.developer is None:
                    game.developer = name

                # Link the models
                xappend(game.developers, dev)
