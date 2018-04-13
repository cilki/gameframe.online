# --------------------------------
# Twitter API scraper            -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import os
import sys
sys.path.append(os.path.abspath('app'))
from orm import Game, Tweet
from sources.util import keywordize
from datetime import datetime

from TwitterSearch import *

from tqdm import tqdm

from cache import WS, KeyCache, load_working_set
from common import TC, load_registry
from registry import KeyTwitter, CachedTweet

"""
The API key cache
"""
KEYS = KeyCache(KeyTwitter)

"""
The Twitter API client
"""
API = TwitterSearch(*KEYS.get().splitlines())


def rq_tweets(game):
    """
    Request tweet metadata according to a game using the Twitter API
    """
    tso = TwitterSearchOrder()
    tso.set_keywords(keywordize(game).split())
    tso.set_language('en')

    for tweet_json in API.search_tweets_iterable(tso):

        # Filter unit
        if not validate_tweet(tweet_json):
            continue

        # TODO filter relevancy

        # Finally add the tweet
        TC['Tweet.game_id'].add(CachedTweet(game_id=game.game_id,
                                            twitter_data=tweet_json))


def build_tweet(tweet, tweet_json):
    """
    Build a Tweet object from the raw data
    """
    if tweet is None or tweet_json is None:
        return

    # Twitter ID
    if tweet.twitter_id is None:
        tweet.twitter_id = tweet_json['id']

    # Content
    if tweet.content is None:
        tweet.content = tweet_json['text']

    # User
    if tweet.user is None:
        tweet.user = tweet_json['user']['name']

    # Timestamp
    if tweet.timestamp is None:
        tweet.timestamp = datetime.strptime(tweet_json['created_at'],
                                            '%a %b %d %H:%M:%S %z %Y')


def validate_tweet(tweet_json):
    """
    Validate the content of a raw tweet
    """
    if tweet_json is None:
        return False

    try:
        # Filter ID
        if tweet_json['id'] is None:
            return False

        # Filter content
        if tweet_json['text'] is None:
            return False

        # Filter timestamp
        if tweet_json['created_at'] is None:
            return False

    except KeyError:
        return False
    return True


def gather_tweets():
    """
    Download tweets from Twitter by game
    """
    load_working_set()
    load_registry('Tweet', 'game_id')

    for game in tqdm(WS.games.values(), '[TWITTER ] Gathering Tweets'):
        if not TC['Tweet.game_id'].exists(game.game_id):
            rq_tweets(game)
