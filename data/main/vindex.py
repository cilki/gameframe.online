# --------------------------------
# GameFrame Visibility Indexing  -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

from threading import Thread
from math import isclose

from tqdm import tqdm

from sources.steam import rq_player_count
from cache import WS, load_working_set
from registry import CachedGame

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
           'players': 0.15, 'articles': 0.25, 'videos': 0.25, 'tweets': 0.15}
assert isclose(sum(WEIGHTS.values()), 1)

"""
Reference values for continuous scores
"""
REFERENCES = {'players': 50000}


def load_game_cache():
    """
    Load the game cache if unloaded
    """

    if 'CACHE_GAME' not in globals():
        global CACHE_GAME
        CACHE_GAME = TableCache(CachedGame, 'game_id')


def compute_all():
    """
    Compute the VINDEX for all games in the working set
    """
    load_game_cache()
    load_working_set()
    precompute()

    for game in tqdm(WS.games.values()):
        compute(game)


def compute(game):
    """
    Compute the VINDEX of the given game.

    Precondition: load_working_set and precompute must be called before this
    function.
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
    if game.steam_id is not None:
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


def precompute():
    """
    Compute reference information about the dataset
    """
    if 'article' not in REFERENCES:
        articles = []
        videos = []
        tweets = []

        print('[MAIN ] Computing link statistics and references')

        # Collect link information
        for game in WS.games.values():
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


class VindexThread(Thread):
    """
    A background thread that continuously updates steam players and vindex.
    The first update begins as soon as the the Thread is started and future
    updates are spaced so every game is updated exactly once over a 24 hour
    period. This slow collection helps to reduce lag spikes.
    """

    def __init__(self, db, games):
        """
        Initialize the VindexThread with a list of games to query
        """
        Thread.__init__(self)
        self.games = games
        self.db = db

        # The minimum amount of time that a single request will take
        self.TIMESLOT = len(games) / (60 * 60 * 24)

    def run(self):
        """
        Run the VindexThread forever
        """
        while True:
            for game in self.games:
                t = time()

                # Update steam players
                steam_players = rq_player_count(game.steam_id)
                if not steam_players == 0:
                    game.steam_players = steam_players

                # Recompute VINDEX
                # TODO Compute uses WS which should not be available
                # compute(game)

                self.db.session.commit()

                time.sleep(max(self.TIMESLOT - (time() - t), 0))
