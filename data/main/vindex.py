# --------------------------------
# GameFrame Visibility Indexing  -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

from math import isclose

import requests


"""
This module contains the visibility approximation (vindex) logic.

Visibility is calculated by averaging the following scores:
ESRB        Whether a game has an esrb rating (low correlation)
WEBSITE     Whether a game has a website (low correlation)
METACRITIC  The game's metacritic score, with a higher rating generally
            indicating higher visibility (low correlation)
STEAM_IGDB  Whether the game is present on both platforms (low correlation)
PLAYERS     The current number of players (high correlation)
ARTICLES    The number of articles (high correlation)
VIDEOS      The number of videos (high correlation)
TWEETS      The number of tweets (high correlation)

Weights are placed on each score according to how closely they are correlated
with game visibility.
"""

"""
Experimentally chosen weights for each score. They must sum to 1 for the convex
combination (weighted average) calculation to be correct.
"""
WEIGHTS = {'esrb': 0.05, 'website': 0.05, 'metacritic': 0.05, 'steam_igdb': 0.05,
           'players': 0.15, 'articles': 0.25, 'videos': 0.20, 'tweets': 0.20}
assert isclose(sum(WEIGHTS.values()), 1)

"""
Reference values for continuous scores
"""
REFERENCES = {'players': 50000}


def compute(game):
    """
    Compute the VINDEX of the given game.

    Precondition: precompute must be called before this function.
    """

    # ESRB score
    esrb = 0
    if game.esrb is not None:
        esrb = 100

    # Article score
    articles = (len(game.articles) / REFERENCES['article']) * 100

    # Video score
    videos = (len(game.videos) / REFERENCES['video']) * 100

    # Tweet score
    tweets = (len(game.tweets) / REFERENCES['tweet']) * 100

    # Steam players
    steam_players = 0
    if game.steam_players is not None:
        steam_players = (game.steam_players / REFERENCES['players']) * 100

    # Website score
    # TODO website stats
    website = 0
    if game.website is not None:
        website = 100

    # Steam-IGDB score
    steam_igdb = 0
    if game.steam_id is not None and game.igdb_id is not None:
        steam_igdb = 100

    # Metacritic score
    metacritic = 0
    if game.metacritic is not None:
        metacritic = game.metacritic

    # Convex combination
    game.vindex = int(round(WEIGHTS['esrb'] * esrb + WEIGHTS['website'] * website +
                            WEIGHTS['metacritic'] * metacritic + WEIGHTS['steam_igdb'] * steam_igdb +
                            WEIGHTS['players'] * steam_players + WEIGHTS['articles'] * articles +
                            WEIGHTS['videos'] * videos + WEIGHTS['tweets'] * tweets))

    # Enforce ceiling
    if game.vindex > 100:
        game.vindex = 100


def precompute(games):
    """
    Compute reference information about the dataset
    """
    if 'article' not in REFERENCES:
        articles = []
        videos = []
        tweets = []

        print('[MAIN ] Computing link statistics and references')

        # Collect link information
        for game in games:
            articles.append(len(game.articles))
            videos.append(len(game.videos))
            tweets.append(len(game.tweets))

        # Compute maximums
        article_max = max(articles)
        video_max = max(videos)
        tweet_max = max(tweets)

        print("[MAIN ]     ARTICLE_MAX: %d VIDEO_MAX: %d TWEET_MAX: %d" %
              (article_max, video_max, tweet_max))

        # Compute averages
        article_average = sum(articles) / len(articles)
        video_average = sum(videos) / len(videos)
        tweet_average = sum(tweets) / len(tweets)

        print("[MAIN ]     ARTICLE_AVE: %d VIDEO_AVE: %d TWEET_AVE: %d" %
              (article_average, video_average, tweet_average))

        # Set the references to 85% of the maximum
        REFERENCES['article'] = int(round(0.85 * article_max))
        REFERENCES['video'] = int(round(0.85 * video_max))
        REFERENCES['tweet'] = int(round(0.85 * tweet_max))


def rq_player_count(appid):
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


if __name__ == "__main__":
    """
    A background thread that continuously updates steam players and vindex.
    """

    import os
    import sys
    import time
    import random
    sys.path.append(os.path.abspath('/app'))

    from flask import Flask

    from app.orm import db, Game

    # Initialize Flask
    app = Flask(__name__)

    # Configure SQLAlchemy
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_BINDS'] = {
        'gameframe': os.environ['SQLALCHEMY_URI']}

    # Initialize database
    db.init_app(app)

    with app.app_context():
        games = Game.query.filter(Game.steam_id != None).all()
        precompute(games)

        # The minimum amount of time that a single computation can take
        TIMESLOT = int(round((60 * 60 * 24) / len(games)))

        while True:
            for game in games:
                t = time.time()

                # Update steam players
                steam_players = rq_player_count(game.steam_id)
                if steam_players is not None:
                    game.steam_players = steam_players

                # Recompute VINDEX
                compute(game)

                # Random commit to reduce traffic
                if random.randrange(100) < 10:
                    db.session.commit()

                time.sleep(max(TIMESLOT - int(time.time() - t), 0))
