# --------------------------------
# Twitter API scraper            -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

from orm import Game, Tweet
from sources.util import condition_heavy, dict_delete, generic_gather, keywordize
from datetime import datetime

from TwitterSearch import TwitterSearch, TwitterSearchOrder

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


def reload_api():
    """
    Reinitialize the API client with a new API key. This method may block if no
    valid keys are currently available.
    """
    global API
    API = TwitterSearch(*KEYS.advance().splitlines())


def rq_tweets(game):
    """
    Request tweet metadata according to a game using the Twitter API
    """
    search = TwitterSearchOrder()
    search.set_keywords(keywordize(game).split())
    search.set_language('en')

    try:
        for tweet_json in API.search_tweets_iterable(search):

            # Unit filtering
            if not validate_tweet(tweet_json):
                continue

            # Relevancy filtering
            if not relevant_tweet(game, tweet_json):
                continue

            # Remove unwanted information
            dict_delete(tweet_json, 'source')
            dict_delete(tweet_json, 'place')
            dict_delete(tweet_json, 'retweeted_status')

            user_json = tweet_json['user']
            dict_delete(user_json, 'entities')
            dict_delete(user_json, 'profile_image_url')
            dict_delete(user_json, 'profile_image_url_https')
            dict_delete(user_json, 'profile_banner_url')
            dict_delete(user_json, 'profile_background_image_url')
            dict_delete(user_json, 'profile_background_image_url_https')

            # Finally add the tweet
            TC['Tweet.game_id'].add(CachedTweet(game_id=game.game_id,
                                                twitter_data=tweet_json))
    except TwitterSearchException:
        TC['Tweet.game_id'].flush()
        reload_api()


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

        # Filter name
        if tweet_json['user']['name'] is None:
            return False

    except KeyError:
        return False
    return True


def relevant_tweet(game, tweet_json):
    """
    Determine the relevence of a tweet to a game
    """

    # Check for name in content
    if condition_heavy(game.name) in condition_heavy(tweet_json['text']):
        return True

    return False


def gather_tweets():
    """
    Download tweets from Twitter by game
    """
    load_working_set()
    load_registry('Tweet', 'game_id')

    generic_gather(rq_tweets, TC['Tweet.game_id'], '[GATHER] Downloading Tweets',
                   [game for game in WS.games.values() if not
                    TC['Tweet.game_id'].exists(game.game_id)])
