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
                   include_columns=['game_id', 'name', 'price', 'cover',
                                    'platforms', 'release', 'developer',
                                    'genres', 'developer_count', 'article_count'])

    API.create_api(Developer, methods=['GET'], url_prefix='/v1/grid',
                   include_columns=['developer_id', 'name', 'logo', 'website',
                                    'twitter', 'foundation', 'game_count',
                                    'article_count', 'country'])

    API.create_api(Article, methods=['GET'], url_prefix='/v1/grid',
                   include_columns=['article_id', 'title', 'cover', 'game_count',
                                    'article_link', 'developer_count', 'author'])

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
