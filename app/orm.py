from flask_sqlalchemy import SQLAlchemy

"""
This module defines the model mapping for primary and supporting models.
"""

db = SQLAlchemy()


class Game(db.Model):
    """
    One of the three primary models, Game represents a video game.
    """

    # The game's GameFrame ID
    game_id = db.Column(db.Integer, primary_key=True)

    # The game's Steam AppID
    steam_id = db.Column(db.Integer)

    # The game's IGDB ID
    igdb_id = db.Column(db.Integer)

    # The game's user-friendly title
    name = db.Column(db.Text)

    # The game's website
    website = db.Column(db.Text)

    # The game's first release date
    release = db.Column(db.Date)

    # The game's cover image
    cover = db.Column(db.Text)

    # Screenshots
    screenshots = db.relationship('Image')

    # A summary written by Steam or IGDB
    summary = db.Column(db.Text)

    # The game's price in cents
    price = db.Column(db.Integer)

    # Relevant genres
    genres = db.relationship('Genre', secondary='join_game_genre')

    # Compatible platforms
    platforms = db.relationship('Platform',  secondary='join_game_platform')

    # A background image
    background = db.Column(db.Text)

    tweets = db.relationship(
        'Tweet', secondary='join_game_tweet', back_populates="games")
    videos = db.relationship(
        'Video', secondary='join_game_video', back_populates="games")
    streams = db.relationship(
        'Stream', secondary='join_game_stream', back_populates="games")
    articles = db.relationship(
        'Article',  secondary='join_game_article', back_populates="games")
    developers = db.relationship(
        'Developer',  secondary='join_game_developer', back_populates="games")


class Article(db.Model):
    """
    One of the three primary models, Article represents an article related to a
    Game or Developer.
    """

    article_id = db.Column(db.Integer, primary_key=True)

    # The article's title
    title = db.Column(db.Text)

    # The name of the article's outlet
    outlet = db.Column(db.Text)

    # The name of the article's author
    author = db.Column(db.Text)

    # The article's publishing timestamp
    timestamp = db.Column(db.DateTime)

    # The first few sentences of the article
    introduction = db.Column(db.Text)

    # The article's thumbnail
    image = db.Column(db.Text)

    # The link to the original article
    article_link = db.Column(db.Text)

    games = db.relationship(
        'Game', secondary='join_game_article', back_populates="articles")
    developers = db.relationship(
        'Developer', secondary='join_article_developer', back_populates="articles")


class Developer(db.Model):
    """
    One of the three primary models, Developer represents a developer/publisher
    of a Game.
    """

    # The developer's GameFrame ID
    developer_id = db.Column(db.Integer, primary_key=True)

    # The developer's IGDB ID
    igdb_id = db.Column(db.Integer)

    # The developer's title
    name = db.Column(db.Text)

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

    articles = db.relationship(
        'Article', secondary='join_article_developer', back_populates="developers")

    games = db.relationship(
        'Game', secondary='join_game_developer', back_populates="developers")


class Tweet(db.Model):
    """
    One of the supporting models, Tweet represents a tweet related to a Game or
    Developer.
    """

    tweet_id = db.Column(db.Integer, primary_key=True)
    twitter_id = db.Column(db.Integer)
    content = db.Column(db.Text)
    user = db.Column(db.Text)
    timestamp = db.Column(db.DateTime)
    tweet_link = db.Column(db.Text)

    games = db.relationship(
        'Game', secondary='join_game_tweet', back_populates="tweets")

    developer_id = db.Column(
        db.Integer, db.ForeignKey('developer.developer_id'))


class Video(db.Model):
    """
    One of the supporting models, Video represents a Youtube video related to a
    Game or Developer.
    """

    video_id = db.Column(db.Integer, primary_key=True)
    youtube_id = db.Column(db.Integer)
    name = db.Column(db.Text)
    channel = db.Column(db.Text)
    timestamp = db.Column(db.DateTime)
    video_link = db.Column(db.Text)

    games = db.relationship(
        'Game', secondary='join_game_video', back_populates="videos")


class Stream(db.Model):
    """
    One of the supporting models, Stream represents a Twitch stream related to a
    Game or Developer.
    """

    stream_id = db.Column(db.Integer, primary_key=True)
    channel = db.Column(db.Text)
    stream_link = db.Column(db.Text)

    games = db.relationship(
        'Game', secondary='join_game_stream', back_populates="streams")


class Genre(db.Model):
    genre_id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.Text)


class Image(db.Model):
    image_id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('game.game_id'))

    url = db.Column(db.Text)


class Platform(db.Model):
    platform_id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.Text)


"""
Join table definitions
"""
join_game_genre = db.Table('join_game_genre',
                           db.Column('game_id', db.Integer,
                                     db.ForeignKey('game.game_id')),
                           db.Column('genre_id', db.Integer,
                                     db.ForeignKey('genre.genre_id')))

join_game_platform = db.Table('join_game_platform',
                              db.Column('game_id', db.Integer,
                                        db.ForeignKey('game.game_id')),
                              db.Column('platform_id', db.Integer,
                                        db.ForeignKey('platform.platform_id')))

join_game_article = db.Table('join_game_article',
                             db.Column('game_id', db.Integer,
                                       db.ForeignKey('game.game_id')),
                             db.Column('article_id', db.Integer,
                                       db.ForeignKey('article.article_id')))

join_game_tweet = db.Table('join_game_tweet',
                           db.Column('game_id', db.Integer,
                                     db.ForeignKey('game.game_id')),
                           db.Column('tweet_id', db.Integer,
                                     db.ForeignKey('tweet.tweet_id')))

join_game_video = db.Table('join_game_video',
                           db.Column('game_id', db.Integer,
                                     db.ForeignKey('game.game_id')),
                           db.Column('video_id', db.Integer,
                                     db.ForeignKey('video.video_id')))

join_game_stream = db.Table('join_game_stream',
                            db.Column('game_id', db.Integer,
                                      db.ForeignKey('game.game_id')),
                            db.Column('stream_id', db.Integer,
                                      db.ForeignKey('stream.stream_id')))

join_game_developer = db.Table('join_game_developer',
                               db.Column('game_id', db.Integer,
                                         db.ForeignKey('game.game_id')),
                               db.Column('developer_id', db.Integer,
                                         db.ForeignKey('developer.developer_id')))

join_article_developer = db.Table('join_article_developer',
                                  db.Column('article_id', db.Integer,
                                            db.ForeignKey('article.article_id')),
                                  db.Column('developer_id', db.Integer,
                                            db.ForeignKey('developer.developer_id')))
