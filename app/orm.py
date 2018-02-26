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
    name = db.Column(db.Text, nullable=False)

    # The game's first release date
    release = db.Column(db.Integer)

    # The game's cover image
    cover = db.Column(db.Text)

    # Screenshots as CSV
    screenshots = db.Column(db.Text)

    # A summary written by Steam or IGDB
    summary = db.Column(db.Text)

    # Relevant genres as CSV
    genres = db.Column(db.Text)

    # External links as CSV
    external_links = db.Column(db.Text)

    tweets = db.relationship(
        'Tweet', secondary='game_tweet', back_populates="games")
    videos = db.relationship(
        'Video', secondary='game_video', back_populates="games")
    streams = db.relationship(
        'Stream', secondary='game_stream', back_populates="games")
    articles = db.relationship(
        'Article',  secondary='game_article', back_populates="games")

    developer_id = db.Column(
        db.Integer, db.ForeignKey('developer.developer_id'))


class Article(db.Model):
    """
    One of the three primary models, Article represents an article related to a
    Game or Developer.
    """

    article_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    outlet = db.Column(db.Text, nullable=False)
    author = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)
    introduction = db.Column(db.Text, nullable=False)
    image = db.Column(db.Text, nullable=False)
    article_link = db.Column(db.Text, nullable=False)

    games = db.relationship(
        'Game', secondary='game_article', back_populates="articles")
    developers = db.relationship(
        'Developer', secondary='article_developer', back_populates="articles")


class Developer(db.Model):
    """
    One of the three primary models, Developer represents a developer/publisher
    of a Game.
    """

    developer_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, unique=True, nullable=False)
    country = db.Column(db.Text, nullable=False)
    logo = db.Column(db.Text, nullable=False)
    foundation = db.Column(db.Integer, nullable=False)
    developer_link = db.Column(db.Text, nullable=False)

    articles = db.relationship(
        'Article', secondary='article_developer', back_populates="developers")

    games = db.relationship('Game')
    tweets = db.relationship('Tweet')


class Tweet(db.Model):
    """
    One of the supporting models, Tweet represents a tweet related to a Game or
    Developer.
    """

    tweet_id = db.Column(db.Integer, primary_key=True)
    twitter_id = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text, nullable=False)
    user = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)
    tweet_link = db.Column(db.Text, nullable=False)

    games = db.relationship(
        'Game', secondary='game_tweet', back_populates="tweets")

    developer_id = db.Column(
        db.Integer, db.ForeignKey('developer.developer_id'))


class Video(db.Model):
    """
    One of the supporting models, Video represents a Youtube video related to a
    Game or Developer.
    """

    video_id = db.Column(db.Integer, primary_key=True)
    youtube_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.Text, nullable=False)
    channel = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)
    video_link = db.Column(db.Text, nullable=False)

    games = db.relationship(
        'Game', secondary='game_video', back_populates="videos")


class Stream(db.Model):
    """
    One of the supporting models, Stream represents a Twitch stream related to a
    Game or Developer.
    """

    stream_id = db.Column(db.Integer, primary_key=True)
    channel = db.Column(db.Text, nullable=False)
    stream_link = db.Column(db.Text, nullable=False)

    games = db.relationship(
        'Game', secondary='game_stream', back_populates="streams")


# Join tables
game_article = db.Table('game_article',
                        db.Column('game_id', db.Integer,
                                  db.ForeignKey('game.game_id')),
                        db.Column('article_id', db.Integer,
                                  db.ForeignKey('article.article_id')))

game_tweet = db.Table('game_tweet',
                      db.Column('game_id', db.Integer,
                                db.ForeignKey('game.game_id')),
                      db.Column('tweet_id', db.Integer,
                                db.ForeignKey('tweet.tweet_id')))

game_video = db.Table('game_video',
                      db.Column('game_id', db.Integer,
                                db.ForeignKey('game.game_id')),
                      db.Column('video_id', db.Integer,
                                db.ForeignKey('video.video_id')))

game_stream = db.Table('game_stream',
                       db.Column('game_id', db.Integer,
                                 db.ForeignKey('game.game_id')),
                       db.Column('stream_id', db.Integer,
                                 db.ForeignKey('stream.stream_id')))

article_developer = db.Table('article_developer',
                             db.Column('article_id', db.Integer,
                                       db.ForeignKey('article.article_id')),
                             db.Column('developer_id', db.Integer,
                                       db.ForeignKey('developer.developer_id')))
