# --------------------------------
# Steam API scraper              -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

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
from common import CACHE_GAMEFRAME, CDN_URI, PROGRESS_FORMAT, TC, load_registry
from orm import Game, Article, Genre, Platform
from registry import CachedGame, CachedArticle
from sources.util import (condition, condition_developer, condition_heavy,
                          parse_steam_date, generic_collect, vstrlen, xappend)


"""
The header image cache
"""
CACHE_HEADER = FolderCache(CACHE_GAMEFRAME + "/steam/headers")

"""
The CD image cache
"""
CACHE_CD = FolderCache(CACHE_GAMEFRAME + "/steam/cds")


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
    print("[COLLECT] Downloading application directory")

    rq = requests.get("https://api.steampowered.com/ISteamApps/GetAppList/v2")

    assert rq.status_code == requests.codes.ok
    return rq.json()['applist']['apps']


def rq_player_count(appid: int):
    """
    Request the current number of Steam players for the given game
    """

    rq = requests.get("https://api.steampowered.com/ISteamUserStats/" +
                      "GetNumberOfCurrentPlayers/v1", {'appid': appid})

    if not rq.status_code == requests.codes.ok:
        return None

    rq = rq.json()['response']

    if rq['result'] == 1:
        return rq['player_count']

    return None


@rate_limited(period=40, every=60)
def rq_game(appid: int):
    """
    Request game metadata from Steam
    """

    # Metadata request
    rq = requests.get("http://store.steampowered.com/api/appdetails",
                      {'appids': str(appid)})

    assert rq.status_code == requests.codes.ok
    game_json = rq.json()[str(appid)]

    # Filter failed queries
    TC['Game.steam_id'].add(CachedGame(steam_id=appid,
                                       steam_data=game_json['data']
                                       if validate_game(game_json) else None))


@rate_limited(period=40, every=60)
def rq_articles(game):
    """
    Request game news from Steam
    """
    assert game.steam_id is not None

    rq = requests.get("https://api.steampowered.com/ISteamNews/GetNewsForApp/v2",
                      {'appid': game.steam_id, 'count': 500})

    if rq.status_code == requests.codes.forbidden:
        return

    assert rq.status_code == requests.codes.ok
    for article_json in rq.json()['appnews']['newsitems']:
        TC['Article.game_id'].add(
            CachedGame(game_id=game.game_id,
                       steam_data=article_json
                       if validate_article(article_json) else None))


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
        if game.screenshots is None:
            game.screenshots = []
        xappend(game.screenshots, {
                'url': screenshot['path_full'].split('?', 1)[0]})

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

    # Metacritic link
    if game.metacritic_link is None and 'metacritic' in game_json:
        game.metacritic_link = game_json['metacritic']['url']

    # Cover
    if game.cover is None and CACHE_CD.exists("%d.png" % game.steam_id):
        game.cover = "%s/cover/steam/%d.png" % (CDN_URI, game.steam_id)

    # Steam Header
    if game.steam_header is None and 'header_image' in game_json:
        game.steam_header = game_json['header_image']


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
        if not vstrlen(article_json['title'], 16):
            return False

        # Filter contents
        if not vstrlen(article_json['contents'], 30):
            return False

        # Filter Outlet
        if not vstrlen(article_json['feedlabel']):
            return False

        # Filter Article link
        if not vstrlen(article_json['url'], 10):
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


def collect_games():
    """
    Download missing games from Steam
    """
    apps = rq_app_list()
    load_registry('Game', 'steam_id')

    generic_collect(rq_game, TC['Game.steam_id'], '[COLLECT] Downloading Games',
                    [app['appid'] for app in apps if not
                     TC['Game.steam_id'].exists(app['appid'])])


def collect_articles():
    """
    Download missing articles from Steam
    """
    load_working_set()
    load_registry('Article', 'game_id')

    generic_collect(rq_articles, TC['Article.game_id'], '[COLLECT] Downloading Articles',
                    [game for game in WS.games_steam.values() if not
                     TC['Article.game_id'].exists(game.game_id)])


def collect_headers():
    """
    Download missing game headers from Steam
    """
    load_working_set()

    for game in tqdm(WS.games_steam.values(), '[COLLECT] Downloading headers',
                     bar_format=PROGRESS_FORMAT):
        appid = game.steam_id
        if game.steam_header is not None and not CACHE_HEADER.exists(appid):
            rq = requests.get(game.steam_header)

            if rq.status_code == requests.codes.ok:
                # Write the header to cache
                CACHE_HEADER.write(appid, rq.content)


def generate_covers():
    """
    Generate Steam covers using the cached headers
    """
    load_working_set()

    LIN = WS.platforms[3]
    WIN = WS.platforms[6]
    MAC = WS.platforms[14]

    for game in tqdm(WS.games_steam.values(), '[GENERATE] Generating covers',
                     bar_format=PROGRESS_FORMAT):
        appid = game.steam_id
        if not CACHE_CD.exists(str(appid) + '.png') and CACHE_HEADER.exists(appid):
            generate("%s/%d" % (CACHE_HEADER, appid), "%s/%s" %
                     (CACHE_CD, str(appid) + '.png'),
                     LIN in game.platforms, WIN in game.platforms, MAC in game.platforms)


def upload_covers():
    """
    Upload game covers for games in the working set
    """
    load_working_set()

    for appid, game in tqdm(WS.games_steam.items(), '[UPLOAD] Uploading covers'):
        if CACHE_CD.exists(str(appid) + '.png'):
            # Upload cover
            upload_image("%s/%d.png" % (CACHE_CD, appid),
                         "cover/steam/%d.png" % appid)


def link_developers():
    """
    Compute Game-Developer links according to developer name for Steam games
    """
    load_working_set()
    load_registry('Game', 'steam_id')

    for game in tqdm(WS.games_steam.values(), '[LINK] Linking Steam developers',
                     bar_format=PROGRESS_FORMAT):
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
