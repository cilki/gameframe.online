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

from cache import add_article, load_working_set, name_game, title_article
from common import CACHE_GAMEFRAME, METRICS
from orm import Article, Developer, Game

from .util import condition_keyword, is_cached

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
The NEWSAPI client
"""
API = NewsApiClient(api_key=next(KEY_ITER))

"""
The article-game cache
"""
CACHE_ARTICLE_GAME = "%s/newsapi/games" % CACHE_GAMEFRAME
assert os.path.isdir(CACHE_ARTICLE_GAME)

"""
The article-developer cache
"""
CACHE_ARTICLE_DEVELOPER = "%s/newsapi/developers" % CACHE_GAMEFRAME
assert os.path.isdir(CACHE_ARTICLE_DEVELOPER)

"""
Only allow sources from this whitelist
"""
WHITELIST = ['Nintendolife.com', 'Gonintendo.com', 'Mirror', 'Playstation.com',
             'Starwars.com', 'Mmorpg.com', 'Rockpapershotgun.com', 'Kotaku.com',
             'Kotaku.com.au', 'Gameinformer.com', 'Slickdeals.net', '1up.com',
             'Techtimes.com', 'Pcworld.com', 'Escapistmagazine.com', 'IGN',
             'Playstationlifestyle.net', 'Gamespot.com', 'Mynintendonews.com',
             'Multiplayer.it', 'Toucharcade.com', 'Shacknews.com', 'Kinja.com',
             'Wccftech.com',  'Gamesasylum.com', 'Pcgamer.com', 'Vrfocus.com',
             'Ars Technica', 'Blizzardwatch.com', 'Gamasutra.com', 'Gamespy.com',
             'Gamesradar.com', 'Gametyrant.com', 'Gamingbolt.com', 'Techdirt.com',
             'Gamingonlinux.com', 'Tweaktown.com',  'Gameplanet.co.nz',
             'Gamezebo.com', 'Gamezombie.tv', 'Giantbomb.com', 'Gamespark.jp',
             'Ongamers.com', 'Stratics.com']


def rq_articles(keyword):

    global API
    articles = []
    p = 1

    while True:
        rq = API.get_everything(language='en', sort_by='relevancy', page_size=100,
                                page=p, q=condition_keyword(keyword))

        if rq['status'] == 'error':
            API = NewsApiClient(api_key=next(KEY_ITER))
            continue

        # Filter the articles
        for article_json in rq['articles']:

            # Filter title
            title = article_json.get('title', '')
            if title is None or len(title) < 15:
                continue

            # Filter Outlet
            outlet = article_json.get('source', {}).get('name', '')
            if outlet is None or outlet not in WHITELIST:
                continue

            # Filter Introduction
            introduction = article_json.get('description', '')
            if introduction is None or len(introduction) < 20:
                continue

            # Filter Author
            author = article_json.get('author', '')
            if author is None or len(author) < 4:
                continue

            # Filter Timestamp
            if "publishedAt" not in article_json:
                continue

            # Filter Image
            image = article_json.get('urlToImage', '')
            if image is None or len(image) < 20:
                continue

            # Filter Article link
            article_link = article_json.get('url', '')
            if article_link is None or len(article_link) < 20:
                continue

            # Finally add the article
            articles.append(article_json)

        if rq['totalResults'] > p * 100 and p < 10:
            # Move to the next page
            p += 1
            continue
        else:
            break

    return articles


def gather_articles(db):
    """
    Search for articles related to games/devlopers and download them to the cache
    """
    load_working_set()

    print("[NWAPI] Gathering articles by game")
    for name, game in tqdm(name_game.items()):
        if not is_cached(CACHE_ARTICLE_GAME, name):
            articles = rq_articles(name)
            # Write to the cache
            with open(u"%s/%s" % (CACHE_ARTICLE_GAME, name.replace("/", "\\")), 'w', 'utf8') as h:
                h.write(json.dumps(articles, ensure_ascii=False))

    print("[NWAPI] Gathering articles by developer")
    for name, dev in tqdm(name_developer.items()):
        if not is_cached(CACHE_ARTICLE_GAME, name):
            articles = rq_articles(name)
            # Write to the cache
            with open(u"%s/%s" % (CACHE_ARTICLE_DEVELOPER, name.replace("/", "\\")), 'w', 'utf8') as h:
                h.write(json.dumps(articles, ensure_ascii=False))

    print("[NWAPI] Gather Complete")


def merge_articles(db):
    load_working_set()

    print("[NWAPI] Merging articles")
    for filename in tqdm(os.listdir(CACHE_ARTICLE_GAME)):

        try:
            game = name_game[filename.replace("\\", "/")]
        except KeyError:
            continue

        with open("%s/%s" % (CACHE_ARTICLE_GAME, filename), 'r', 'utf8') as h:
            articles = json.load(h)
        for article_json in articles:

            # Do not allow duplicate titles
            if article_json['title'] in title_article:
                continue

            # Build Article
            article = Article(
                title=article_json['title'], outlet=article_json['source']['name'],
                introduction=article_json['description'], author=article_json['author'],
                timestamp=datetime.strptime(
                    article_json['publishedAt'], "%Y-%m-%dT%H:%M:%SZ"),
                cover=article_json['urlToImage'], article_link=article_json['url'])

            # Setting up a relationship between article and game
            game.articles.append(article)
            article.games.append(game)

            add_article(article)
            db.session.add(article)
        db.session.commit()
    print("[NWAPI] Merge Complete")
