# --------------------------------
# GameFrame Visibility Indexing  -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

from bisect import insort
from datetime import datetime
from math import isclose

import requests

from tqdm import tqdm

from cache import WS, load_working_set
from common import PROGRESS_FORMAT


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
    article_score = (len(game.articles) / REFERENCES['article']) * 100

    # Video score
    video_score = (len(game.videos) / REFERENCES['video']) * 100

    # Tweet score
    tweet_score = (len(game.tweets) / REFERENCES['tweet']) * 100

    # Steam players
    player_score = 0
    if game.steam_players is not None:
        player_score = (game.steam_players / REFERENCES['players']) * 100

    # Website score
    # TODO website stats
    website_score = 0
    if game.website is not None:
        website_score = 100

    # Steam-IGDB score
    steam_igdb = 0
    if game.steam_id is not None and game.igdb_id is not None:
        steam_igdb = 100

    # Metacritic score
    metacritic_score = 0
    if game.metacritic is not None:
        metacritic_score = game.metacritic

    # Convex combination
    game.vindex = min(int(round(WEIGHTS['esrb'] * esrb +
                                WEIGHTS['website'] * website_score +
                                WEIGHTS['metacritic'] * metacritic_score +
                                WEIGHTS['steam_igdb'] * steam_igdb +
                                WEIGHTS['players'] * player_score +
                                WEIGHTS['articles'] * article_score +
                                WEIGHTS['videos'] * video_score +
                                WEIGHTS['tweets'] * tweet_score)), 100)


def precompute(games):
    """
    Compute reference information about the dataset
    """
    if ('article' not in REFERENCES or 'video' not in REFERENCES
            or 'tweet' not in REFERENCES):

        articles = []
        videos = []
        tweets = []

        print('[VINDEX] Computing link statistics and reference values')

        # Collect sorted link information
        for game in games:
            insort(articles, game.article_count
                   if game.article_count is not None else 0)
            insort(videos, game.video_count
                   if game.video_count is not None else 0)
            insort(tweets, game.tweet_count
                   if game.tweet_count is not None else 0)

        article_len = len(articles)
        video_len = len(videos)
        tweet_len = len(tweets)

        # Compute maximums
        article_max = articles[-1]
        video_max = videos[-1]
        tweet_max = tweets[-1]

        # Compute medians
        article_med = articles[article_len // 2]
        video_med = videos[video_len // 2]
        tweet_med = tweets[tweet_len // 2]

        # Compute averages
        article_ave = sum(articles) / article_len
        video_ave = sum(videos) / video_len
        tweet_ave = sum(tweets) / tweet_len

        print("(MAX) Article: %d Video: %d Tweet: %d\n(MED) Article: %d Video: %d Tweet: %d\n(AVE) Article: %d Video: %d Tweet: %d\n" %
              (article_max, video_max, tweet_max, article_med,
               video_med, tweet_med, article_ave, video_ave, tweet_ave))

        # Set the references to 85% of the maximum
        REFERENCES['article'] = max(int(round(0.85 * article_max)), 1)
        REFERENCES['video'] = max(int(round(0.85 * video_max)), 1)
        REFERENCES['tweet'] = max(int(round(0.85 * tweet_max)), 1)


def compute_all():
    """
    Compute the VINDEX for all games in the working set
    """
    load_working_set()
    precompute(WS.games.values())

    for game in tqdm(WS.games.values(), '[VINDEX] Computing game vindicies',
                     bar_format=PROGRESS_FORMAT):
        compute(game)


def benckmark():
    """
    Compute and print the VINDEX for a few games for easy tweaking
    """
    load_working_set()
    precompute(WS.games.values())

    # Compute benchmark games
    for appid in [578080, 570, 359550, 271590, 552520, 477160, 50300]:
        game = WS.games_steam[appid]
        compute(game)
        print("Computed VINDEX: %d for game: %s" % (game.vindex, game.name))


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

        print('[VINDEX] Starting incremental update')
        while True:
            for game in games:
                t = time.time()

                # Update steam players
                steam_players = rq_player_count(game.steam_id)
                if steam_players is not None:
                    game.steam_players = steam_players

                    # Update timestamp
                    game.steam_players_updated = datetime.now()

                # Recompute VINDEX
                compute(game)

                # Random commit to reduce load
                if random.randrange(100) < 10:
                    db.session.commit()

                time.sleep(max(TIMESLOT - int(time.time() - t), 0))
