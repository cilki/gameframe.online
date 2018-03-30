# --------------------------------
# IGN API scraper                -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import json
import os
from codecs import open
from datetime import datetime

from newsapi import NewsApiClient
from ratelimit import rate_limited
from tqdm import tqdm

from cache import WS, Cache, load_working_set
from common import METRICS
from orm import Article, Developer, Game

from .util import condition_article

"""
The NEWS API keyfile
"""
API_KEYS = os.environ['KEYS_NEWSAPI']
assert os.path.isfile(API_KEYS)

"""
The API key iterator
"""
with open(API_KEYS) as h:
    KEY_ITER = iter([s.strip() for s in h.readlines()])

"""
The global NEWSAPI client
"""
API = NewsApiClient(api_key=next(KEY_ITER))

"""
The article-game cache
"""
CACHE_ARTICLE_GAME = Cache("/newsapi/articles.game")

"""
The article-developer cache
"""
CACHE_ARTICLE_DEVELOPER = Cache("/newsapi/articles.developer")

"""
The maximum number of article pages to request
"""
MAX_PAGES = 10

"""
Only allow sources from this whitelist
"""
WHITELIST = ['Nintendolife.com', 'Gonintendo.com', 'Playstation.com', 'IGN',
             'Starwars.com', 'Mmorpg.com', 'Rockpapershotgun.com', 'Kotaku.com',
             'Kotaku.com.au', 'Gameinformer.com', 'Slickdeals.net', '1up.com',
             'Techtimes.com', 'Pcworld.com', 'Techdirt.com', 'Ongamers.com',
             'Playstationlifestyle.net',  'Mynintendonews.com', 'Gamespot.com',
             'Multiplayer.it', 'Toucharcade.com', 'Shacknews.com', 'Kinja.com',
             'Wccftech.com',  'Gamesasylum.com', 'Pcgamer.com', 'Vrfocus.com',
             'Ars Technica', 'Blizzardwatch.com', 'Gamasutra.com', 'Gamespy.com',
             'Gamesradar.com', 'Gametyrant.com', 'Gamingbolt.com', 'Mactrast.com',
             'Gamingonlinux.com', 'Tweaktown.com',  'Gameplanet.co.nz',
             'Gamezebo.com', 'Gamezombie.tv', 'Giantbomb.com', 'Gamespark.jp',
             'Stratics.com', 'Escapistmagazine.com', 'Linuxtoday.com',
             'Phoronix.com', 'Omgubuntu.co.uk', 'Idownloadblog.com']


def rq_articles(query):
    """
    Request articles from NewsAPI according to a query
    """

    global API
    articles = []
    p = 1

    while True:
        rq = API.get_everything(language='en', sort_by='relevancy', page_size=100,
                                page=p, q=query)

        if rq['status'] == 'error':
            API = NewsApiClient(api_key=next(KEY_ITER))
            continue

        # Filter the articles
        for article_json in rq['articles']:

            # Filter title
            if len(article_json.get('title', '')) < 15:
                continue

            # Filter Outlet
            if article_json.get('source', {}).get('name', '') not in WHITELIST:
                continue

            # Filter Introduction
            if len(article_json.get('description', '')) < 20:
                continue

            # Filter Author
            if len(article_json.get('author', '')) < 4:
                continue

            # Filter Timestamp
            if "publishedAt" not in article_json:
                continue

            # Filter Image
            if len(article_json.get('urlToImage', '')) < 10:
                continue

            # Filter Article link
            if len(article_json.get('url', '')) < 20:
                continue

            # Finally add the article if it passed
            articles.append(article_json)

        if rq['totalResults'] > p * 100 and p < MAX_PAGES:
            # Move to the next page
            p += 1
            continue
        else:
            break

    return articles


def gather_articles_by_game():
    """
    Search for articles related to games and download them to the cache
    """
    load_working_set()

    print("[NWAPI] Gathering articles by game")
    for name, game in tqdm(WS.game_name.items()):
        if not CACHE_ARTICLE_GAME.exists(name):
            articles = rq_articles(name)
            # Write to the cache
            CACHE_ARTICLE_GAME.write_json(name.replace("/", "\\"), articles)

    print("[NWAPI] Gather Complete")


def gather_articles_by_developer():
    """
    Search for articles related to games and download them to the cache
    """
    load_working_set()

    print("[NWAPI] Gathering articles by developer")
    for name, dev in tqdm(name_developer.items()):
        if not CACHE_ARTICLE_DEVELOPER.exists(name):
            articles = rq_articles(name)
            # Write to the cache
            CACHE_ARTICLE_DEVELOPER.write_json(
                name.replace("/", "\\"), articles)

    print("[NWAPI] Gather Complete")


def merge_articles():
    """
    Merge cached articles into the working set and link
    """
    load_working_set()

    print("[NWAPI] Merging/Linking articles")
    for filename in tqdm(CACHE_ARTICLE_GAME.list_dir()):

        if not filename.replace("\\", "/") in WS.game_name:
            continue
        game = WS.game_name[filename.replace("\\", "/")]

        for article_json in CACHE_ARTICLE_GAME.read_json(filename):

            # Do not allow duplicate titles
            if article_json['title'] in WS.articles:
                article = WS.articles[article_json['title']]
                if article not in game.articles:
                    game.articles.append(article)
                continue

            # Build Article
            article = Article(
                title=article_json['title'], outlet=article_json['source']['name'],
                introduction=article_json['description'], author=article_json['author'],
                timestamp=datetime.strptime(
                    article_json['publishedAt'], "%Y-%m-%dT%H:%M:%SZ"),
                cover=article_json['urlToImage'], article_link=article_json['url'])

            # Setup a relationship between the article and game
            game.articles.append(article)

            # Setup a relationship between the article and any developers
            for developer in game.developers:
                if article not in developer.articles:
                    developer.articles.append(article)

            # Add to working set
            WS.add_article(article)
    # TODO developers

    print("[NWAPI] Merge/Link Complete")
