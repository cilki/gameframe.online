# --------------------------------
# API Endpoint Definitions       -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import flask
import flask_sqlalchemy
import flask_restless

from .orm import Game, Developer, Article, Tweet, Video, Platform, Genre


def generate_api(app, db):
    """
    Generate the API endpoints.
    """

    # Create the API manager
    API = flask_restless.APIManager(app, flask_sqlalchemy_db=db)

    # Generate root API endpoints
    API.create_api(Game, methods=['GET'], url_prefix='/v1')
    API.create_api(Developer, methods=['GET'], url_prefix='/v1')
    API.create_api(Article, methods=['GET'], url_prefix='/v1')
    API.create_api(Tweet, methods=['GET'], url_prefix='/v1')
    API.create_api(Video, methods=['GET'], url_prefix='/v1')

    # Generate optimized grid endpoints
    API.create_api(Game, methods=['GET'], url_prefix='/v1/grid',
                   exclude_columns=['background', 'c_name', 'screenshots',
                                    'summary', 'tweets', 'articles',
                                    'developers', 'videos'])

    API.create_api(Developer, methods=['GET'], url_prefix='/v1/grid',
                   exclude_columns=['c_name', 'description', 'games', 'tweets',
                                    'articles'])

    API.create_api(Article, methods=['GET'], url_prefix='/v1/grid',
                   exclude_columns=['c_title', 'introduction', 'games',
                                    'developers'])

    # Generate unpaginated list endpoints
    API.create_api(Game, methods=['GET'], url_prefix='/v1/list',
                   results_per_page=-1, include_columns=['game_id', 'name'])
    API.create_api(Developer, methods=['GET'], url_prefix='/v1/list',
                   results_per_page=-1, include_columns=['developer_id', 'name'])
    API.create_api(Article, methods=['GET'], url_prefix='/v1/list',
                   results_per_page=-1, include_columns=['article_id', 'title'])
    API.create_api(Platform, methods=['GET'], url_prefix='/v1/list',
                   results_per_page=-1)
    API.create_api(Genre, methods=['GET'], url_prefix='/v1/list',
                   results_per_page=-1)

    # Generate stat endpoints
    @app.route('/v1/stat/game/count')
    def stat_game_count():
        return Game.query.count()

    @app.route('/v1/stat/developer/count')
    def stat_developer_count():
        return Developer.query.count()

    @app.route('/v1/stat/article/count')
    def stat_article_count():
        return Article.query.count()

    @app.route('/v1/stat/video/count')
    def stat_video_count():
        return Video.query.count()

    @app.route('/v1/stat/tweet/count')
    def stat_tweet_count():
        return Tweet.query.count()
