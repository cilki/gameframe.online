# --------------------------------
# Twitter API scraper            -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

from datetime import datetime

from TwitterSearch import TwitterSearch, TwitterSearchOrder, TwitterSearchException
from tqdm import tqdm

from cache import WS, KeyCache, load_working_set
from common import TC, load_registry
from orm import Game, Tweet
from registry import KeyTwitter, CachedTweet
from sources.util import condition_heavy, dict_delete, generic_gather, vstrlen

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
    search.set_keywords(game.c_name.split())
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
            tweet_json = {'id': tweet_json['id'], 'text': tweet_json['text'],
                          'user': {'name': tweet_json['user']['name']},
                          'created_at': tweet_json['created_at']}

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
        if type(tweet_json['id']) is not int:
            return False

        # Filter content
        if not vstrlen(tweet_json['text'], 8):
            return False

        # Filter timestamp
        if not vstrlen(tweet_json['created_at']):
            return False

        # Filter name
        if not vstrlen(tweet_json['user']['name']):
            return False

    except KeyError:
        return False
    return True


def relevant_tweet(game, tweet_json):
    """
    Determine the relevance of a tweet to a game
    """

    # Check for name in content
    if condition_heavy(game.name) in condition_heavy(tweet_json['text']):
        return True

    return False


def gather_tweets():
    """
    Search for tweets related to games and download them to the cache
    """
    load_working_set()
    load_registry('Tweet', 'game_id')

    generic_gather(rq_tweets, TC['Tweet.game_id'], '[GATHER] Downloading Tweets',
                   [game for game in WS.games.values() if not
                    TC['Tweet.game_id'].exists(game.game_id)])


def link_tweets():
    """
    Compute Game-Tweet links.
    Complexity: O(N^2)
    """
    load_working_set()

    tweets = {condition_heavy(tweet.content): tweet
              for tweet in WS.tweets.values()}

    for game in tqdm(WS.games.values(), '[LINK] Linking Tweets'):
        name = condition_heavy(game.c_name)

        for text in tweets.keys():
            if name in text:
                # Link the models
                xappend(game.tweets, tweets[text])
