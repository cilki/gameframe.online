# --------------------------------
# Registry                       -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

from tqdm import tqdm

from orm import db
from common import TC, load_registry
from sources.util import condition, condition_developer, xappend


class CachedGame(db.Model):
    """
    A primordial Game that exists only in the Registry
    """
    __bind_key__ = 'registry'

    # The game's GameFrame ID
    game_id = db.Column(db.Integer, primary_key=True)

    # The game's Steam AppID
    steam_id = db.Column(db.Integer)

    # The game's Steam data
    steam_data = db.Column(db.JSON)

    # The game's IGDB ID
    igdb_id = db.Column(db.Integer)

    # The game's IGDB data
    igdb_data = db.Column(db.JSON)

    # The game's most recent VINDEX
    vindex = db.Column(db.Integer)


class CachedDeveloper(db.Model):
    """
    A primordial Developer that exists only in the Registry
    """
    __bind_key__ = 'registry'

    # The developer's GameFrame ID
    developer_id = db.Column(db.Integer, primary_key=True)

    # The developer's IGDB ID
    igdb_id = db.Column(db.Integer)

    # The developer's IGDB data
    igdb_data = db.Column(db.JSON)


class CachedArticle(db.Model):
    """
    A primordial Article that exists only in the Registry
    """
    __bind_key__ = 'registry'

    # The article's GameFrame ID
    article_id = db.Column(db.Integer, primary_key=True)

    # The game that article was collected on
    game_id = db.Column(db.Integer)

    # The article's Steam data
    steam_data = db.Column(db.JSON)

    # The developer's IGDB data
    newsapi_data = db.Column(db.JSON)


class CachedTweet(db.Model):
    """
    A primordial Tweet that exists only in the Registry
    """
    __bind_key__ = 'registry'

    # The tweet's GameFrame ID
    tweet_id = db.Column(db.Integer, primary_key=True)

    # The game that tweet was collected on
    game_id = db.Column(db.Integer)

    # The developer that tweet was collected on
    developer_id = db.Column(db.Integer)

    # The tweet's Twitter data
    twitter_data = db.Column(db.JSON)


class CachedVideo(db.Model):
    """
    A primordial Video that exists only in the Registry
    """
    __bind_key__ = 'registry'

    # The video's GameFrame ID
    video_id = db.Column(db.Integer, primary_key=True)

    # The game that video was collected on
    game_id = db.Column(db.Integer)

    # The video's YouTube data
    youtube_data = db.Column(db.JSON)


class KeyNewsapi(db.Model):
    """
    An API key for NewsAPI
    """
    __bind_key__ = 'registry'

    # The key's ID
    key_id = db.Column(db.Integer, primary_key=True)

    # The API key
    api_key = db.Column(db.Text)


class KeyIgdb(db.Model):
    """
    An API key for IGDB
    """
    __bind_key__ = 'registry'

    # The key's ID
    key_id = db.Column(db.Integer, primary_key=True)

    # The API key
    api_key = db.Column(db.Text)


class KeyTwitter(db.Model):
    """
    An API key for Twitter
    """
    __bind_key__ = 'registry'

    # The key's ID
    key_id = db.Column(db.Integer, primary_key=True)

    # The API key
    api_key = db.Column(db.Text)


class KeyGoogle(db.Model):
    """
    An API key for YouTube
    """
    __bind_key__ = 'registry'

    # The key's ID
    key_id = db.Column(db.Integer, primary_key=True)

    # The API key
    api_key = db.Column(db.Text)


import sources
from cache import WS, load_working_set


def merge_games():
    """
    Merge cached games into the working set
    """
    load_working_set()
    load_registry('Game', 'game_id')

    for game_cached in tqdm(TC['Game.game_id'], '[REGISTRY] Merging Games'):
        if game_cached.steam_data is None and game_cached.igdb_data is None:
            continue
        steam_data = game_cached.steam_data
        igdb_data = game_cached.igdb_data

        name = steam_data['name'] if steam_data is not None else igdb_data['name']

        game = WS.build_game(game_cached.game_id, game_cached.steam_id,
                             game_cached.igdb_id, name, condition(name))
        sources.steam.build_game(game, steam_data)
        sources.igdb.build_game(game, igdb_data)


def merge_developers():
    """
    Merge cached developers into the working set
    """
    load_working_set()
    load_registry('Developer', 'igdb_id')

    for developer_cached in tqdm(TC['Developer.igdb_id'], '[REGISTRY] Merging Developers'):
        if developer_cached.igdb_data is None:
            continue
        igdb_data = developer_cached.igdb_data

        developer = WS.build_developer(developer_cached.developer_id,
                                       developer_cached.igdb_id, igdb_data['name'],
                                       condition_developer(igdb_data['name']))
        sources.igdb.build_developer(developer, igdb_data)


def merge_articles():
    """
    Merge cached articles into the working set
    """
    load_working_set()
    load_registry('Article', 'article_id')

    for article_cached in tqdm(TC['Article.article_id'], '[REGISTRY] Merging Articles'):
        if article_cached.steam_data is None and article_cached.newsapi_data is None:
            continue
        steam_data = article_cached.steam_data
        newsapi_data = article_cached.newsapi_data

        title = steam_data['title'] if steam_data is not None else newsapi_data['title']

        article = WS.build_article(article_cached.article_id, title,
                                   condition(title))
        sources.steam.build_article(article, steam_data)
        sources.newsapi.build_article(article, newsapi_data)

        related_game = WS.games.get(article_cached.game_id)
        if related_game is not None:
            xappend(related_game.articles, article)
            for developer in related_game.developers:
                xappend(developer.articles, article)


def merge_videos():
    """
    Merge cached videos into the working set
    """
    load_working_set()
    load_registry('Video', 'video_id')

    for video_cached in tqdm(TC['Video.video_id'], '[REGISTRY] Merging Videos'):
        if video_cached.youtube_data is None:
            continue
        youtube_data = video_cached.youtube_data

        video = WS.build_video(video_cached.video_id,
                               youtube_data['snippet']['title'])
        sources.google.build_video(video, video_cached.youtube_data)

        related_game = WS.games.get(video_cached.game_id)
        if related_game is not None:
            xappend(related_game.videos, video)


def merge_tweets():
    """
    Merge cached tweets into the working set
    """
    load_working_set()
    load_registry('Tweet', 'tweet_id')

    for tweet_cached in tqdm(TC['Tweet.tweet_id'], '[REGISTRY] Merging Tweets'):
        if tweet_cached.twitter_data is None:
            continue
        tweet_data = tweet_cached.twitter_data

        tweet = WS.build_tweet(tweet_cached.tweet_id,
                               tweet_data['user']['name'], tweet_data['text'])
        sources.twitter.build_tweet(tweet, tweet_data)

        WS.games[tweet_cached.game_id].tweets.append(tweet)


def clean_articles():
    """
    Remove unwanted articles from the registry
    """
    load_registry('Article', 'article_id')

    removals = []
    for article_cached in tqdm(TC['Article.article_id'], '[REGISTRY] Cleaning Article Cache'):
        if not newsapi.validate_article(article_cached.newsapi_data) and not \
                steam.validate_article(article_cached.steam_data):
            removals.append(article_cached)
    if input("Delete %d low quality articles? " % len(removals)) == 'y':
        for article_cached in removals:
            db.session.delete(article_cached)
        db.session.commit()


def clean_videos():
    """
    Remove unwanted videos from the registry
    """
    load_registry('Video', 'video_id')

    removals = []
    for video_cached in tqdm(TC['Video.video_id'], '[REGISTRY] Cleaning Video Cache'):
        if not google.validate_video(video_cached.youtube_data):
            removals.append(video_cached)
    if input("Delete %d low quality videos? " % len(removals)) == 'y':
        for video_cached in removals:
            db.session.delete(video_cached)
        db.session.commit()
