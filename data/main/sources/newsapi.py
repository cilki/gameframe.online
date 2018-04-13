# --------------------------------
# IGN API scraper                -
# Copyright (C) 2018 GameFrame   -
# --------------------------------


import re
from datetime import datetime
from functools import lru_cache

from newsapi import NewsApiClient
from tqdm import tqdm

from cache import WS, KeyCache, load_working_set
from common import TC, load_registry
from registry import KeyNewsapi, CachedArticle

from .util import condition, condition_heavy, keywordize, url_normalize, xappend

"""
The API key cache
"""
KEYS = KeyCache(KeyNewsapi)

"""
The NewsAPI client
"""
API = NewsApiClient(api_key=KEYS.get())


"""
The maximum number of article pages to request
"""
MAX_PAGES = 10

"""
Only allow sources from this whitelist
"""
WHITELIST = ['Nintendolife.com', 'Gonintendo.com', 'Playstation.com', 'IGN',
             'Starwars.com', 'Mmorpg.com', 'Rockpapershotgun.com', 'Kotaku.com',
             'Kotaku.com.au', 'Gameinformer.com', '1up.com', 'Mactrast.com',
             'Techtimes.com', 'Pcworld.com', 'Techdirt.com', 'Ongamers.com',
             'Playstationlifestyle.net',  'Mynintendonews.com', 'Gamespot.com',
             'Multiplayer.it', 'Toucharcade.com', 'Shacknews.com', 'Kinja.com',
             'Wccftech.com',  'Gamesasylum.com', 'Pcgamer.com', 'Vrfocus.com',
             'Ars Technica', 'Blizzardwatch.com', 'Gamasutra.com', 'Gamespy.com',
             'Gamesradar.com', 'Gametyrant.com', 'Gamingbolt.com', 'Phoronix.com',
             'Gamingonlinux.com', 'Tweaktown.com',  'Gameplanet.co.nz',
             'Gamezebo.com', 'Gamezombie.tv', 'Giantbomb.com', 'Gamespark.jp',
             'Stratics.com', 'Escapistmagazine.com', 'Linuxtoday.com',
             'Omgubuntu.co.uk', 'Idownloadblog.com']

"""
Keywords that should have very few relevant games
"""
BLACKLIST_KEYWORDS = ['amazon', 'trump', 'morgage', 'chuckit!', 'walmart']
BLACKLIST = re.compile(
    "\W+" + "\W.*$|\W+".join(BLACKLIST_KEYWORDS) + '\W.*$', re.IGNORECASE)


def rq_articles(game):
    """
    Request articles from NewsAPI
    """
    global API
    p = 1

    while p < MAX_PAGES:
        rq = API.get_everything(language='en', sort_by='relevancy', page_size=100,
                                page=p, q=game.c_name)

        if rq['status'] == 'error':
            API = NewsApiClient(KEYS.advance())
            continue

        for article_json in rq['articles']:

            if not validate_article(article_json):
                continue

            # Filter relevancy
            name = condition_heavy(game.c_name)
            if name not in condition_heavy(article_json['title']) and \
                    name not in condition_heavy(article_json['description']):
                continue

            TC['Article.game_id'].add(CachedArticle(
                game_id=game.game_id, newsapi_data=article_json))

        if rq['totalResults'] <= p * 100:
            # That was the last page
            break
        p += 1


def gather_articles():
    """
    Search for articles related to games and download them to the cache
    """
    load_working_set()
    load_registry('Article', 'game_id')

    for game in tqdm(WS.games.values(), '[NEWSAPI ] Gathering Articles'):
        if not TC['Article.game_id'].exists(game.game_id):
            rq_articles(game)


def build_article(article, article_json):
    """
    Build a new Article object from the raw data
    """
    if article is None or article_json is None:
        return

    article.outlet = article_json['source']['name']
    article.introduction = article_json['description']
    article.author = article_json['author']
    article.timestamp = datetime.strptime(
        article_json['publishedAt'], "%Y-%m-%dT%H:%M:%SZ")
    article.cover = url_normalize(article_json['urlToImage'])
    article.article_link = url_normalize(article_json['url'])


def validate_article(article_json):
    """
    Validate the content of a raw article
    """
    if article_json is None:
        return False

    try:
        # Filter Outlet
        if article_json['source']['name'] not in WHITELIST:
            return False

        # Filter blacklist
        if BLACKLIST.search(condition(article_json['title'])) is not None:
            return False

        # Filter title
        if len(article_json['title']) < 5:
            return False

        # Filter Introduction
        if article_json['description'] is None or len(article_json['description']) < 10:
            return False

        # Filter Timestamp
        if len(article_json['publishedAt']) < 5:
            return False

        # Filter Image
        if article_json['urlToImage'] is None or len(article_json['urlToImage']) < 10:
            return False

        # Filter Article link
        if len(article_json['url']) < 10:
            return False

    except KeyError:
        return False
    return True
