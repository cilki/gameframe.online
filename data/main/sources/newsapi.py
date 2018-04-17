# --------------------------------
# NewsAPI scraper                -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import re
from datetime import datetime

from newsapi import NewsApiClient
from tqdm import tqdm

from cache import WS, KeyCache, load_working_set
from common import TC, load_registry
from registry import KeyNewsapi, CachedArticle
from sources.util import condition, condition_heavy, generic_gather, url_normalize, xappend


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
BLACKLIST_KEYWORDS = ['amazon', 'trump', 'trump\'s', 'morgage', 'walmart']
BLACKLIST = re.compile(
    "\W+" + "\W.*$|\W+".join(BLACKLIST_KEYWORDS) + '\W.*$', re.IGNORECASE)

"""
The API key cache
"""
KEYS = KeyCache(KeyNewsapi)

"""
The NewsAPI client
"""
API = NewsApiClient(api_key=KEYS.get())


def reload_api():
    """
    Reinitialize the API client with a new API key. This method may block if no
    valid keys are currently available.
    """
    global API
    API = NewsApiClient(KEYS.advance())


def rq_articles(game):
    """
    Request articles from NewsAPI
    """
    page = 1

    while page < MAX_PAGES:
        rq = API.get_everything(language='en', sort_by='relevancy', page_size=100,
                                page=page, q=game.c_name)

        if rq['status'] == 'error':
            reload_api()
            return

        for article_json in rq['articles']:

            # Unit filtering
            if not validate_article(article_json):
                continue

            # Relevancy filtering
            if not relevant_article(game, article_json):
                continue

            TC['Article.game_id'].add(CachedArticle(
                game_id=game.game_id, newsapi_data=article_json))

        if rq['totalResults'] <= page * 100:
            # That was the last page
            return
        page += 1


def build_article(article, article_json):
    """
    Build a new Article object from the raw data
    """
    if article is None or article_json is None:
        return

    # Outlet name
    if article.outlet is None:
        article.outlet = article_json['source']['name']

    # Content
    if article.introduction is None:
        article.introduction = article_json['description']

    # Author
    if article.author is None:
        article.author = article_json['author']

    # Timestamp
    if article.timestamp is None:
        article.timestamp = datetime.strptime(article_json['publishedAt'],
                                              "%Y-%m-%dT%H:%M:%SZ")

    # Cover
    if article.cover is None:
        article.cover = url_normalize(article_json['urlToImage'])

    # External link
    if article.article_link is None:
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
        if article_json['title'] is None:
            return False

        # Filter Introduction
        if article_json['description'] is None:
            return False

        # Filter Timestamp
        if article_json['publishedAt'] is None:
            return False

        # Filter Image
        if article_json['urlToImage'] is None:
            return False

        # Filter Article link
        if article_json['url'] is None:
            return False

    except KeyError:
        return False
    return True


def relevant_article(game, article_json):
    """
    Determine the relevance of an article to a game
    """

    name = condition_heavy(game.c_name)
    if name in condition_heavy(article_json['title']) or \
            name in condition_heavy(article_json['description']):
        return True

    return False


def gather_articles():
    """
    Search for articles related to games and download them to the cache
    """
    load_working_set()
    load_registry('Article', 'game_id')

    generic_gather(rq_articles, TC['Article.game_id'], '[GATHER] Downloading Articles',
                   [game for game in WS.games.values() if not
                    TC['Article.game_id'].exists(game.game_id)])
