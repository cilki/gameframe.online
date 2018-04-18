# --------------------------------
# Object-Relational Mappings     -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

from flask_sqlalchemy import SQLAlchemy

"""
This module defines the model mapping for primary and supporting models.
"""

db = SQLAlchemy()


class Game(db.Model):
    """
    One of the three primary models, Game represents a video game.
    """
    __bind_key__ = 'gameframe'

    # The game's GameFrame ID
    game_id = db.Column(db.Integer, primary_key=True)

    # The game's Steam AppID
    steam_id = db.Column(db.Integer)

    # The game's IGDB ID
    igdb_id = db.Column(db.Integer)

    # The game's external IGDB link
    igdb_link = db.Column(db.Text)

    # The game's user-friendly title
    name = db.Column(db.Text)

    # The game's conditioned title
    c_name = db.Column(db.Text)

    # The game's website
    website = db.Column(db.Text)

    # The game's first release date
    release = db.Column(db.Date)

    # The game's cover image
    cover = db.Column(db.Text)

    # The game's steam image
    steam_header = db.Column(db.Text)

    # Screenshots
    screenshots = db.Column(db.JSON)

    # A summary written by Steam or IGDB
    summary = db.Column(db.Text)

    # The game's price in cents
    price = db.Column(db.Integer)

    # Relevant genres
    genres = db.relationship('Genre', secondary='join_game_genre')

    # Compatible platforms
    platforms = db.relationship('Platform',  secondary='join_game_platform')

    # A link to the Metacritic review page
    metacritic_link = db.Column(db.Text)

    # Metacritic rating
    metacritic = db.Column(db.Integer)

    # ESRB rating
    esrb = db.Column(db.Integer)

    # Visibility Index
    vindex = db.Column(db.Integer)

    # Primary developer's name
    developer = db.Column(db.Text)

    # The number of current Steam players
    steam_players = db.Column(db.Integer)

    # Number of tweets
    tweet_count = db.Column(db.Integer)

    # Tweets
    tweets = db.relationship('Tweet', secondary='join_game_tweet')

    # Number of articles
    article_count = db.Column(db.Integer)

    # Articles
    articles = db.relationship(
        'Article',  secondary='join_game_article', back_populates="games")

    # Number of developers
    developer_count = db.Column(db.Integer)

    # Developers
    developers = db.relationship(
        'Developer',  secondary='join_game_developer', back_populates="games")

    # Number of videos
    video_count = db.Column(db.Integer)

    # Videos
    videos = db.relationship('Video',  secondary='join_game_video')


class Article(db.Model):
    """
    One of the three primary models, Article represents an article related to a
    Game or Developer.
    """
    __bind_key__ = 'gameframe'

    article_id = db.Column(db.Integer, primary_key=True)

    # The article's title
    title = db.Column(db.Text)

    # The article's conditioned title
    c_title = db.Column(db.Text)

    # The name of the article's outlet
    outlet = db.Column(db.Text)

    # The name of the article's author
    author = db.Column(db.Text)

    # The article's publishing timestamp
    timestamp = db.Column(db.DateTime)

    # The first few sentences of the article
    introduction = db.Column(db.Text)

    # The article's cover image
    cover = db.Column(db.Text)

    # The link to the original article
    article_link = db.Column(db.Text)

    # Number of games
    game_count = db.Column(db.Integer)

    # Games
    games = db.relationship(
        'Game', secondary='join_game_article', back_populates="articles")

    # Number of developers
    developer_count = db.Column(db.Integer)

    # Developers
    developers = db.relationship(
        'Developer', secondary='join_article_developer', back_populates="articles")


class Developer(db.Model):
    """
    One of the three primary models, Developer represents a developer/publisher
    of a Game.
    """
    __bind_key__ = 'gameframe'

    # The developer's GameFrame ID
    developer_id = db.Column(db.Integer, primary_key=True)

    # The developer's IGDB ID
    igdb_id = db.Column(db.Integer)

    # The developer's title
    name = db.Column(db.Text)

    # The developers's conditioned title
    c_name = db.Column(db.Text)

    # The developer's country of origin
    country = db.Column(db.Text)

    # The developer's logo
    logo = db.Column(db.Text)

    # The developer's foundation date
    foundation = db.Column(db.Date)

    # The developer's website
    website = db.Column(db.Text)

    # The developer's description
    description = db.Column(db.Text)

    # The developer's Twitter
    twitter = db.Column(db.Text)

    # Number of articles
    article_count = db.Column(db.Integer)

    # Articles
    articles = db.relationship(
        'Article', secondary='join_article_developer', back_populates="developers")

    # Number of tweets
    tweet_count = db.Column(db.Integer)

    # Tweets
    tweets = db.relationship('Tweet', secondary='join_developer_tweet')

    # Number of games
    game_count = db.Column(db.Integer)

    # Games
    games = db.relationship(
        'Game', secondary='join_game_developer', back_populates="developers")


class Tweet(db.Model):
    """
    One of the supporting models, Tweet represents a tweet related to a Game or
    Developer.
    """
    __bind_key__ = 'gameframe'

    tweet_id = db.Column(db.Integer, primary_key=True)

    # The tweet's Twitter ID
    twitter_id = db.Column(db.BigInteger)

    # The tweet content
    content = db.Column(db.Text)

    # The tweeter's username
    user = db.Column(db.Text)

    # The tweet's post timestamp
    timestamp = db.Column(db.DateTime)


class Video(db.Model):
    """
    One of the supporting models, Video represents a Youtube video related to a
    Game or Developer.
    """
    __bind_key__ = 'gameframe'

    video_id = db.Column(db.Integer, primary_key=True)
    youtube_id = db.Column(db.Text)

    # The video's title
    name = db.Column(db.Text)

    # The video's description
    description = db.Column(db.Text)

    # The uploader's YouTube channel name
    channel = db.Column(db.Text)

    # The video's publishing timestamp
    timestamp = db.Column(db.DateTime)

    # The video's YouTube URL
    video_link = db.Column(db.Text)

    # The video's thumbnail URL
    thumbnail = db.Column(db.Text)


class Genre(db.Model):
    __bind_key__ = 'gameframe'
    genre_id = db.Column(db.Integer, primary_key=True)

    # The user-friendly genre name
    name = db.Column(db.Text)


class Platform(db.Model):
    __bind_key__ = 'gameframe'
    platform_id = db.Column(db.Integer, primary_key=True)

    # The user-friendly platform name
    name = db.Column(db.Text)


"""
Join table definitions
"""
join_game_genre = db.Table('join_game_genre',
                           db.Column('game_id', db.Integer,
                                     db.ForeignKey('game.game_id')),
                           db.Column('genre_id', db.Integer,
                                     db.ForeignKey('genre.genre_id')),
                           info={'bind_key': 'gameframe'})

join_game_platform = db.Table('join_game_platform',
                              db.Column('game_id', db.Integer,
                                        db.ForeignKey('game.game_id')),
                              db.Column('platform_id', db.Integer,
                                        db.ForeignKey('platform.platform_id')), info={'bind_key': 'gameframe'})

join_game_article = db.Table('join_game_article',
                             db.Column('game_id', db.Integer,
                                       db.ForeignKey('game.game_id')),
                             db.Column('article_id', db.Integer,
                                       db.ForeignKey('article.article_id')), info={'bind_key': 'gameframe'})

join_game_tweet = db.Table('join_game_tweet',
                           db.Column('game_id', db.Integer,
                                     db.ForeignKey('game.game_id')),
                           db.Column('tweet_id', db.Integer,
                                     db.ForeignKey('tweet.tweet_id')), info={'bind_key': 'gameframe'})

join_developer_tweet = db.Table('join_developer_tweet',
                                db.Column('developer_id', db.Integer,
                                          db.ForeignKey('developer.developer_id')),
                                db.Column('tweet_id', db.Integer,
                                          db.ForeignKey('tweet.tweet_id')), info={'bind_key': 'gameframe'})

join_game_video = db.Table('join_game_video',
                           db.Column('game_id', db.Integer,
                                     db.ForeignKey('game.game_id')),
                           db.Column('video_id', db.Integer,
                                     db.ForeignKey('video.video_id')), info={'bind_key': 'gameframe'})

join_game_developer = db.Table('join_game_developer',
                               db.Column('game_id', db.Integer,
                                         db.ForeignKey('game.game_id')),
                               db.Column('developer_id', db.Integer,
                                         db.ForeignKey('developer.developer_id')), info={'bind_key': 'gameframe'})

join_article_developer = db.Table('join_article_developer',
                                  db.Column('article_id', db.Integer,
                                            db.ForeignKey('article.article_id')),
                                  db.Column('developer_id', db.Integer,
                                            db.ForeignKey('developer.developer_id')), info={'bind_key': 'gameframe'})
