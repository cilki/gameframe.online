# --------------------------------
# GameFrame scraper working set  -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

from codecs import open
import json
import os

from multi_key_dict import multi_key_dict
from sqlalchemy.exc import InvalidRequestError

from common import CACHE_GAMEFRAME
from orm import db, Article, Developer, Game, Genre, Platform


class Cache ():
    """
    A cache is a folder on disk that contains raw data scraped from an API
    """

    def __init__(self, location):
        location = CACHE_GAMEFRAME + location
        assert os.path.isdir(location)
        self.location = location

    def __str__(self):
        return self.location

    def write_json(self, filename, content):
        if content is None:
            content = []
        with open("%s/%s" % (self.location, filename), 'w', 'utf8') as h:
            h.write(json.dumps(content, ensure_ascii=False))

    def read_json(self, filename):
        with open("%s/%s" % (self.location, filename), 'r', 'utf8') as h:
            return json.load(h)

    def write(self, filename, bin):
        with open("%s/%s" % (self.location, filename), 'wb') as h:
            h.write(bin)

    def exists(self, filename):
        """
        Returns True if the given entry exists in the cache, False otherwise.
        """
        return os.path.isfile("%s/%s" % (self.location, filename))

    def list_dir(self):
        """
        Return the filenames in this cache as a list
        """
        return os.listdir(self.location)


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

        print("[MAIN ] Loading working set")

        # All games
        # [name, c_name] => Developer
        self.game_name = multi_key_dict()

        # Games that have a Steam ID
        self.game_steam = {}

        # Games that have an IGDB ID
        self.game_igdb = {}

        # [name, igdb_id] => Developer
        self.developers = multi_key_dict()

        # [title] => Article
        self.articles = multi_key_dict()

        # [name] => Video
        self.videos = multi_key_dict()

        # [name, genre_id] => Genre
        self.genres = multi_key_dict()

        # [name, platform_id] => Platform
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

        count = len(self.game_name) + len(self.developers) + \
            len(self.articles) + len(self.genres) + len(self.platforms)
        print("[MAIN ] Loaded %d entities" % count)

        self.initialized = True

    def add_game(self, game):
        """
        Add a game to the working set
        """
        self.game_name[game.name, game.c_name] = game
        if game.igdb_id is not None:
            self.game_igdb[game.igdb_id] = game
        if game.steam_id is not None:
            self.game_steam[game.steam_id] = game

    def del_game(self, game):
        """
        Remove a game
        """
        del self.game_name[game.name]
        if game.steam_id is not None:
            del self.game_steam[game.steam_id]
        if game.igdb_id is not None:
            del self.game_igdb[game.igdb_id]
        try:
            self.db.session.delete(game)
        except InvalidRequestError:
            pass

        # Remove links
        for dev in game.developers:
            dev.games.remove(game)
        for article in game.articles:
            article.games.remove(game)

    def add_developer(self, dev):
        """
        Add a developer to the working set
        """
        self.developers[dev.name, dev.c_name, dev.igdb_id] = dev

    def del_developer(self, dev):
        """
        Remove a developer
        """
        del self.developers[dev.name]
        try:
            self.db.session.delete(dev)
        except InvalidRequestError:
            pass

        # Remove links
        for game in dev.games:
            game.developers.remove(dev)
        for article in dev.articles:
            article.developers.remove(dev)

    def add_article(self, article):
        """
        Add an article to the working set
        """
        self.articles[article.c_title] = article

    def del_article(self, article):
        """
        Remove an article
        """
        del self.articles[article.title]
        try:
            self.db.session.delete(article)
        except InvalidRequestError:
            pass

        # Remove links
        for game in article.games:
            game.articles.remove(article)
        for dev in article.developers:
            dev.articles.remove(article)

    def add_video(self, video):
        """
        Add a video to the working set
        """
        self.videos[video.name] = video

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
        print("[MAIN ] Flushing working set")
        for game in self.game_name.values():

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

            # Write
            self.db.session.add(dev)

        for article in self.articles.values():

            # Update link counts
            article.game_count = len(article.games)
            article.developer_count = len(article.developers)

            # Write
            self.db.session.add(article)

        self.db.session.commit()
        print("[MAIN ] Flush complete")


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
