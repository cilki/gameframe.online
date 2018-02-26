import flask
import flask_sqlalchemy
import flask_restless

from .orm import Game, Developer, Article, Tweet, Stream, Video


def generate_api(app, db):
    """
    Generate the API endpoints.
    """

    # Create the API manager
    api_manager = flask_restless.APIManager(app, flask_sqlalchemy_db=db)

    # Generate the API endpoints
    api_manager.create_api(Game, methods=['GET'], url_prefix='/get')
    api_manager.create_api(Developer, methods=['GET'], url_prefix='/get')
    api_manager.create_api(Article, methods=['GET'], url_prefix='/get')
    api_manager.create_api(Tweet, methods=['GET'], url_prefix='/get')
    api_manager.create_api(Stream, methods=['GET'], url_prefix='/get')
    api_manager.create_api(Video, methods=['GET'], url_prefix='/get')