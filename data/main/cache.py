# --------------------------------
# GameFrame scraper working set  -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

from codecs import open
from queue import Queue
import time
import os

from multi_key_dict import multi_key_dict
from sqlalchemy.exc import InvalidRequestError

from tqdm import tqdm

import common
from orm import db, Article, Developer, Game, Video, Tweet, Genre, Platform
from sources.util import dict_delete


class KeyCache():
    """
    A KeyCache provides convenient access to API keys
    """

    def __init__(self, Model):
        """
        Initialize the KeyCache with the list of keys from the database
        """
        self.key_timeout = Model.timeout

        self.keys = Queue()
        for k in Model.query:
            # Store a tuple containing the API key and the timestamp of when it
            # will be ready for use
            self.keys.put((time.time(), k.api_key))

        # Manually initialize the first key
        self.key = self.keys.get()[1]

    def get(self):
        """
        Return the current API key
        """
        return self.key

    def advance(self):
        """
        Advance to the next API key, possibly waiting until it becomes valid
        """

        # Add the current key to the end of the queue with a 20 second
        # additional timeout
        self.keys.put((time.time() + self.key_timeout + 20, self.key))
        self.key = None

        # Get the head of the queue which will always be ready first
        timestamp, key = self.keys.get()

        # Wait for the key to become valid
        time.sleep(max(0, timestamp - time.time()))

        # Setup the new key
        self.key = key
        return self.key


class FolderCache ():
    """
    A FolderCache is a location on disk that contains raw entities
    """

    def __init__(self, location):
        assert os.path.isdir(location)
        self.location = location

    def __iter__(self):
        """
        Return the filenames in this cache as a list
        """
        return os.listdir(self.location)

    def __str__(self):
        return self.location

    def write(self, filename, bin):
        """
        Write a binary file to the cache
        """
        with open("%s/%s" % (self.location, filename), 'wb') as h:
            h.write(bin)

    def exists(self, filename):
        """
        Returns True if the given entry exists in the cache, False otherwise.
        """
        return os.path.isfile("%s/%s" % (self.location, filename))


class TableCache ():
    """
    A TableCache is a table in the registry that contains raw entities
    """

    def __init__(self, Model, key_col):
        self.key_col = key_col
        self.models = {}
        query = Model.query.filter(
            getattr(Model, key_col) != None).yield_per(1000)
        for m in tqdm(query, total=query.count(), desc='[CACHE] Loading Table',
                      leave=False, bar_format=common.PROGRESS_FORMAT):
            self.models[getattr(m, key_col)] = m

    def __iter__(self):
        """
        Return an iterator to the rows in the cache
        """
        return iter(self.models.values())

    def __len__(self):
        """
        Return the number of rows in this TableCache
        """
        return len(self.models)

    def add(self, model):
        """
        Add a row to the table without flushing the database
        """
        self.models[getattr(model, self.key_col)] = model
        db.session.add(model)

    def get(self, key):
        """
        Get a row from the database
        """
        return self.models.get(key)

    def exists(self, key):
        """
        Returns True if the given entry exists in the cache
        """
        return key in self.models

    def flush(self):
        """
        Flush the database connection
        """
        db.session.commit()


class WorkingSet ():
    """
    The working set (WS) is the collection of all entities in the database and
    entities in memory that will be in the database upon flushing.
    """

    def initialize(self, db):
        """
        Initialize a new working set with the given database connection
        """
        self.db = db

        print("[MAIN] Loading working set")

        # [game_id, name, c_name] => Game
        self.games = multi_key_dict()

        # [steam_id] => Game
        self.games_steam = multi_key_dict()

        # [igdb_id] => Game
        self.games_igdb = multi_key_dict()

        # [igdb_id, name] => Developer
        self.developers = multi_key_dict()

        # [article_id, title] => Article
        self.articles = multi_key_dict()

        # [video_id, name] => Video
        self.videos = multi_key_dict()

        # [tweet_id] => Tweet
        self.tweets = multi_key_dict()

        # [genre_id, name] => Genre
        self.genres = multi_key_dict()

        # [platform_id, name] => Platform
        self.platforms = multi_key_dict()

        for game in Game.query.all():
            self.add_game(game)

        for dev in Developer.query.all():
            self.add_developer(dev)

        for article in Article.query.all():
            self.add_article(article)

        for genre in Genre.query.all():
            self.add_genre(genre)

        for platform in Platform.query.all():
            self.add_platform(platform)

        count = len(self.games) + len(self.developers) + \
            len(self.articles) + len(self.genres) + len(self.platforms)
        print("[MAIN] Loaded %d entities" % count)

        self.initialized = True

    def add_game(self, game):
        """
        Add a game to the working set
        """
        self.games[game.game_id, game.name, game.c_name] = game
        if game.steam_id is not None:
            self.games_steam[game.steam_id] = game
        if game.igdb_id is not None:
            self.games_igdb[game.igdb_id] = game

    def del_game(self, game):
        """
        Remove a game
        """
        dict_delete(self.games, game.name)
        dict_delete(self.games_steam, game.steam_id)
        dict_delete(self.games_igdb, game.igdb_id)

        # Remove links
        del game.developers[:]
        del game.articles[:]
        del game.tweets[:]

        try:
            self.db.session.delete(game)
        except InvalidRequestError:
            pass

    def add_developer(self, dev):
        """
        Add a developer to the working set
        """
        self.developers[dev.igdb_id, dev.name, dev.c_name] = dev

    def del_developer(self, dev):
        """
        Remove a developer
        """
        dict_delete(self.developers, dev.igdb_id)

        # Remove links
        del dev.games[:]
        del dev.articles[:]

        try:
            self.db.session.delete(dev)
        except InvalidRequestError:
            pass

    def add_article(self, article):
        """
        Add an article to the working set
        """
        self.articles[article.article_id, article.c_title] = article

    def del_article(self, article):
        """
        Remove an article
        """
        dict_delete(self.articles, article.article_id)

        # Remove links
        del article.games[:]
        del article.developers[:]

        try:
            self.db.session.delete(article)
        except InvalidRequestError:
            pass

    def add_video(self, video):
        """
        Add a video to the working set
        """
        self.videos[video.video_id, video.name] = video

    def add_tweet(self, tweet):
        """
        Add a tweet to the working set
        """
        self.tweets[tweet.tweet_id] = tweet

    def add_genre(self, genre):
        """
        Add a genre to the working set
        """
        self.genres[genre.name, genre.genre_id] = genre

    def add_platform(self, platform):
        """
        Add a platform to the working set
        """
        self.platforms[platform.name, platform.platform_id] = platform

    def flush(self):
        print("")
        print("[FLUSH] Flushing working set")
        for game in self.games.values():

            # Update link counts
            game.tweet_count = len(game.tweets)
            game.video_count = len(game.videos)
            game.article_count = len(game.articles)
            game.developer_count = len(game.developers)

            # Write
            self.db.session.add(game)

        for dev in self.developers.values():

            # Update link counts
            dev.game_count = len(dev.games)
            dev.article_count = len(dev.articles)

        for article in self.articles.values():

            # Update link counts
            article.game_count = len(article.games)
            article.developer_count = len(article.developers)

        self.db.session.commit()
        print("[FLUSH] Complete")

    def build_game(self, game_id, steam_id, igdb_id, name, c_name):
        """
        Produce a Game object from the working set
        """
        game = self.games.get(game_id)

        if game is None and steam_id is not None:
            game = self.games_steam.get(steam_id)

        if game is None and igdb_id is not None:
            game = self.games_igdb.get(igdb_id)

        if game is None and name is not None:
            game = self.games.get(name)

        if game is None and c_name is not None:
            game = self.games.get(c_name)

        if game is None:
            game = Game(game_id=game_id, steam_id=steam_id,
                        igdb_id=igdb_id, name=name, c_name=c_name)
            self.add_game(game)

        return game

    def build_developer(self, developer_id, igdb_id, name, c_name):
        """
        Produce a Developer object from the working set
        """
        developer = self.developers.get(igdb_id)

        if developer is None and name is not None:
            developer = self.developers.get(name)

        if developer is None and c_name is not None:
            developer = self.developers.get(c_name)

        if developer is None:
            developer = Developer(developer_id=developer_id, igdb_id=igdb_id,
                                  name=name, c_name=c_name)
            self.add_developer(developer)

        return developer

    def build_article(self, article_id, title, c_title):
        """
        Produce a Article object from the working set
        """
        article = self.articles.get(article_id)

        if article is None and title is not None:
            article = self.articles.get(title)

        if article is None and c_title is not None:
            article = self.articles.get(c_title)

        if article is None:
            article = Article(article_id=article_id,
                              title=title, c_title=c_title)
            self.add_article(article)

        return article

    def build_video(self, video_id, name):
        """
        Produce a Video object from the working set
        """
        video = self.videos.get(video_id)

        if video is None and name is not None:
            video = self.videos.get(name)

        if video is None:
            video = Video(video_id=video_id, name=name)
            self.add_video(video)

        return video

    def build_tweet(self, tweet_id, user, content):
        """
        Produce a Tweet object from the working set
        """
        tweet = self.tweets.get(tweet_id)

        if tweet is None and user is not None and content is not None:
            tweet = self.tweets.get(user + content)

        if tweet is None:
            tweet = Tweet(tweet_id=tweet_id)
            self.add_tweet(tweet)

        return tweet


"""
The global working set
"""
WS = WorkingSet()


def load_working_set():
    """
    Initialize the working set if uninitialized
    """
    if not hasattr(WS, 'initialized'):
        WS.initialize(db)


def reload_working_set():
    """
    Reinitialize the working set
    """
    WS.initialize(db)
