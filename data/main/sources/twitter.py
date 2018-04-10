# --------------------------------
# Google API scraper             -
# Copyright (C) 2018 GameFrame   -
# --------------------------------
from ratelimit import rate_limited
from codecs import open

import requests
import os
import json

import random
import time

import sys
sys.path.append(os.path.abspath('app'))
from orm import Game, Tweet

"""
The API keys
"""

# TODO: Retrieve correct keys for following variables
CONSUMER_KEY = os.environ['KEY_TWITTER']
CONSUMER_SECRET = os.environ['KEY_TWITTER']
ACCESS_TOKEN = os.environ['KEY_TWITTER']
ACCESS_TOKEN_SECRET = os.environ['KEY_TWITTER']

"""
Functions to help with Twitter API Authentication
"""

def oauth_nonce_generator():
    s = ""
    for i in range(10):
        s += str(random.randint(0,20))
    return s

def oauth_timestamp_generator():
    return int(time.time())

# TODO: this function needs to return a signature using 4 key variables
def oauth_signature_generator():
    return oauth_nonce_generator()

@rate_limited(period=40, every=60)
def rq_tweets_from_keyword(game):
    """
    Request tweet metadata using Twitter API
    """
    print("[Twitter API ] Downloading tweet metadata for game: %s" % game.name)

    response = requests.get("https://api.twitter.com/1.1/search/tweets.json",
            params={'q': keywordize(game).replace(" ", "+"),
            'oauth_consumer_key': CONSUMER_KEY,
            'oauth_token': ACCESS_TOKEN,
            'oauth_signature_method': "HMAC-SHA1",
            'oauth_timestamp': oauth_timestamp_generator(),
            'oauth_nonce': oauth_nonce_generator(),
            'oauth_version': "1.0",
            'oauth_signature': oauth_signature_generator()})

    assert response.status_code == requests.codes.ok
    return response.json()

def populate_tweets_for_games(db):
    """
    Insert tweets related to our list of games into the database.
    """

    counter = 0

    # Iterate through games in our database
    for game in Game.query.all():
        tweets_json = rq_tweets_from_keyword(game.name)
        lst = tweets_json["statuses"]
        for i in lst:
            counter += 1
            tweet = Tweet()

            # Twitter ID
            if "id" in i:
                tweet.twitter_id = i["id"]
            else:
                print("Failed to load tweet.")
                break

            # Content
            if "text" in i:
                tweet.content = i["text"]
            else:
                print("Failed to load tweet.")
                break

            # User
            if "user" in i and "name" in i["user"]:
                tweet.user = i["user"]["name"]
            else:
                print("Failed to load tweet.")
                break

            # Timestamp
            if "created_at" in i:
                tweet.timestamp = i["created_at"]
            else:
                print("Failed to load tweet.")
                break

            # Tweet Link
            if "user" in i and "screen_name" in i["user"]:
                tweet.tweet_link = "https://twitter.com/" + i["user"]["screen_name"] + "/status/" + tweet.twitter_id
            else:
                print("Failed to load tweet.")
                break

            # Setting up a relationship between tweet and game
            game.tweets.append(tweet)
            tweet.games.append(game)

            print("Uploading tweets for game %s" % game.name.encode('utf-8', 'ignore'))

            db.session.add(tweet)
            db.session.commit()

    print("[Twitter API ] Inserted %d new tweets for %s" % counter, game.name)