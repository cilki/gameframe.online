from flask import Flask
from flask_sqlalchemy import SQLAlchemy

"""
This module defines the model mapping for primary and supporting models.
"""

class Game(db.Model):
    """
    One of the three primary models, Game represents a video game.
    """

    game_id = db.Column(db.Integer, primary_key = True)
    steam_id = db.Column(db.Integer)
    name = db.Column(db.String(120), nullable = False)
    release = db.Column(db.Integer, nullable = False)
    image = db.Column(db.Text, nullable = False)
    genre = db.Column(db.String(80), nullable = False)
    game_link = db.Column(db.Text, nullable = False)

    tweets = db.relationship('Tweet', secondary = game_tweet, back_populates = "games")
    videos = db.relationship('YouTube Video', secondary = game_video, back_populates = "games")
    streams = db.relationship('Twitch Channel', secondary = game_stream, back_populates = "games")
    articles = db.relationship('Article',  secondary = game_article, back_populates = "games")
    developers = db.relationship('Developer', secondary = game_developer, back_populates = "games")

    def __repr__(self):
        return '<Game %r>' % self.name

class Article(db.Model):
    """
    One of the three primary models, Article represents an article related to a
    Game or Developer.
    """

    article_id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(120), nullable = False)
    outlet = db.Column(db.String(120), nullable = False)
    author = db.Column(db.String(120), nullable = False)
    timestamp = db.Column(db.DateTime, nullable = False)
    introduction = db.Column(db.Text, nullable = False)
    image = db.Column(db.Text, nullable = False)
    article_link = db.Column(db.Text, nullable = False)

    games = db.relationship('Game', secondary = game_article, back_populates = "articles")
    developers = db.relationship('Developer', secondary = article_developer, back_populates = "articles")

    def __repr__(self):
        return '<Article %r>' % self.title

class Developer(db.Model):
    """
    One of the three primary models, Developer represents a developer/publisher
    of a Game.
    """

    developer_id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120), unique = True, nullable = False)
    country = db.Column(db.String(120), nullable = False)
    logo = db.Column(db.Text, nullable = False)
    foundation = db.Column(db.Integer, nullable = False)
    developer_link = db.Column(db.Text, nullable = False)

    games = db.relationship('Game', secondary = game_developer, back_populates = "developers")
    articles = db.relationship('Article', secondary = article_developer, back_populates = "developers")
    tweets = db.relationship('Tweet', secondary = developer_tweet, back_populates = "developers")

    def __repr__(self):
        return '<Developer %r>' % self.name

class Tweet(db.Model):
    """
    One of the supporting models, Tweet represents a tweet related to a Game or
    Developer.
    """

    tweet_id_id = db.Column(db.Integer, primary_key = True)
    twitter_id = db.Column(db.Integer, nullable = False)
    content = db.Column(db.Text, nullable = False)
    user = db.Column(db.String(80), nullable = False)
    timestamp = db.Column(db.DateTime, nullable = False)
    tweet_link = db.Column(db.Text, nullable = False)

    games = db.relationship('Game', secondary = game_tweet, back_populates = "tweets")
    developers = db.relationship('Developer', secondary = article_tweet, back_populates = "tweets")

    def __repr__(self):
        return '<Tweet %r>' % self.content

class Video(db.Model):
    """
    One of the supporting models, Video represents a Youtube video related to a
    Game or Developer.
    """

    video_id = db.Column(db.Integer, primary_key = True)
    youtube_id = db.Column(db.Integer, nullable = False)
    name = db.Column(db.String(120), nullable = False)
    channel = db.Column(db.String(120), nullable = False)
    timestamp = db.Column(db.DateTime, nullable = False)
    video_link = db.Column(db.Text, nullable = False)

    games = db.relationship('Game', secondary = game_video, back_populates = "videos")

    def __repr__(self):
        return '<Video %r>' % self.name

class Stream(db.Model):
    """
    One of the supporting models, Stream represents a Twitch stream related to a
    Game or Developer.
    """

    stream_id = db.Column(db.Integer, primary_key = True)
    channel = db.Column(db.String(120), nullable = False)
    stream_link = db.Column(db.Text, nullable = False)

    games = db.relationship('Game', secondary = game_stream, back_populates = "streams")

    def __repr__(self):
        return '<Stream %r>' % self.channel

# Join tables
# TODO: investigate: this may be automatic in SQLAlchemy
game_article = db.Table('game_article',
    db.Column('game_id', db.Integer, db.ForeignKey('game_id'), primary_key = True),
    db.Column('article_id', db.Integer, db.ForeignKey('article_id'), primary_key = True)
)

game_developer = db.Table('game_developer',
    db.Column('game_id', db.Integer, db.ForeignKey('game_id'), primary_key = True),
    db.Column('developer_id', db.Integer, db.ForeignKey('developer_id'), primary_key = True)
)

game_tweet = db.Table('game_tweet',
    db.Column('game_id', db.Integer, db.ForeignKey('game_id'), primary_key = True),
    db.Column('tweet_id', db.Integer, db.ForeignKey('tweet_id'), primary_key = True)
)

game_video = db.Table('game_video',
    db.Column('game_id', db.Integer, db.ForeignKey('game_id'), primary_key = True),
    db.Column('video_id', db.Integer, db.ForeignKey('video_id'), primary_key = True)
)

game_stream = db.Table('game_stream',
    db.Column('game_id', db.Integer, db.ForeignKey('game_id'), primary_key = True),
    db.Column('stream_id', db.Integer, db.ForeignKey('stream_id'), primary_key = True)
)

article_developer = db.Table('article_developer',
    db.Column('article_id', db.Integer, db.ForeignKey('article_id'), primary_key = True),
    db.Column('developer_id', db.Integer, db.ForeignKey('developer_id'), primary_key = True)
)

developer_tweet = db.Table('developer_tweet',
    db.Column('developer_id', db.Integer, db.ForeignKey('developer_id'), primary_key = True)
    db.Column('tweet_id', db.Integer, db.ForeignKey('tweet_id'), primary_key = True)
)
