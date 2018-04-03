import flask
import flask_sqlalchemy
import flask_restless

from .orm import Game, Developer, Article, Tweet, Video, Platform, Genre


def generate_api(app, db):
    """
    Generate the API endpoints.
    """

    # Create the API manager
    api_manager = flask_restless.APIManager(app, flask_sqlalchemy_db=db)

    # Generate root API endpoints
    api_manager.create_api(Game, methods=['GET'], url_prefix='/v1')
    api_manager.create_api(Developer, methods=['GET'], url_prefix='/v1')
    api_manager.create_api(Article, methods=['GET'], url_prefix='/v1')
    api_manager.create_api(Tweet, methods=['GET'], url_prefix='/v1')
    api_manager.create_api(Video, methods=['GET'], url_prefix='/v1')
    api_manager.create_api(Platform, methods=['GET'], url_prefix='/v1',
                           results_per_page=-1)
    api_manager.create_api(Genre, methods=['GET'], url_prefix='/v1',
                           results_per_page=-1)

    # Generate optimized grid endpoints
    api_manager.create_api(Game, methods=['GET'], url_prefix='/v1/grid',
                           include_columns=['game_id', 'name', 'price', 'cover', 'platforms', 'release'])
    api_manager.create_api(Developer, methods=['GET'], url_prefix='/v1/grid',
                           include_columns=['developer_id', 'name', 'logo', 'website', 'twitter'])
    api_manager.create_api(Article, methods=['GET'], url_prefix='/v1/grid',
                           include_columns=['article_id', 'title', 'cover', 'article_link'])
