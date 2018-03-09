# --------------------------------
# GameFrame API scraper          -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import os

from flask import Flask
from sources import steam, igdb, ign
from orm import db

# Setup Flask
app = Flask(__name__)

# Configure SQLAlchemy
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['SQLALCHEMY_URI']

print("                             __                          \n                            / _|                         \n  __ _  __ _ _ __ ___   ___| |_ _ __ __ _ _ __ ___   ___ \n / _` |/ _` | '_ ` _ \\ / _ \\  _| '__/ _` | '_ ` _ \\ / _ \\\n| (_| | (_| | | | | | |  __/ | | | | (_| | | | | | |  __/\n \\__, |\\__,_|_| |_| |_|\\___|_| |_|  \\__,_|_| |_| |_|\\___|\n  __/ |                                                  \n |___/\n\n")

with app.app_context():

    # Initialize Flask
    db.init_app(app)

    while True:
        print("")
        print("0. Reset Database")
        print("       Drop all tables and rebuild schema")
        print("1. Gather Steam")
        print("       Download games from Steam into the local cache")
        print("2. Gather IGDB games")
        print("       Download games from IGDB into the local cache")
        print("3. Gather IGDB developers")
        print("       Download developers from IGDB into the local cache")
        print("4. Gather IGN articles according to games")
        print("       Download articles from IGN into the local cache")
        print("5. Gather IGN articles according to developers")
        print("       Download articles from IGN into the local cache")
        print("6. Merge Steam games")
        print("       Upload into the database, possibly overwriting")
        print("7. Merge IGDB games")
        print("       Upload into the database, possibly overwriting")
        print("8. Merge IGDB developers")
        print("       Upload into the database, possibly overwriting")

        action = raw_input("Choose an action: ")

        if action == '0':
            # Delete everything
            db.reflect()
            db.drop_all()

            # Create database schema
            db.create_all()
        elif action == '1':
            steam.gather_games()
        elif action == '2':
            igdb.gather_games()
        elif action == '3':
            igdb.gather_developers()
        elif action == '4':
            ign.populate_articles_for_games(db)
        elif action == '5':
            ign.populate_articles_for_developers(db)
        elif action == '6':
            steam.merge_games(db)
        elif action == '7':
            igdb.merge_games(db)
        elif action == '8':
            igdb.merge_developers(db)
        else:
            print("Unknown Command")
