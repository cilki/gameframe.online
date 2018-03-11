# --------------------------------
# GameFrame API scraper          -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import os
from time import time

from flask import Flask
from sources import steam, igdb, ign
from orm import db
from util import reset

# Setup Flask
app = Flask(__name__)

# Configure SQLAlchemy
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['SQLALCHEMY_URI']

print("                             __                          \n                            / _|                         \n  __ _  __ _ _ __ ___   ___| |_ _ __ __ _ _ __ ___   ___ \n / _` |/ _` | '_ ` _ \\ / _ \\  _| '__/ _` | '_ ` _ \\ / _ \\\n| (_| | (_| | | | | | |  __/ | | | | (_| | | | | | |  __/\n \\__, |\\__,_|_| |_| |_|\\___|_| |_|  \\__,_|_| |_| |_|\\___|\n  __/ |                                                  \n |___/\n\n")
print("")
print("Connected to: %s" % os.environ['SQLALCHEMY_URI'])

with app.app_context():

    # Initialize Flask
    db.init_app(app)

    while True:
        print("")
        print("0. RESET Database                    Drop all tables and rebuild schema")
        print("1. REBUILD Database                  Reset database and load content")
        print("")
        print("2. GATHER Steam games                Collect games from Steam")
        print("3. GATHER IGDB games                 Collect games from IGDB")
        print("4. GATHER IGDB developers            Collect developers from IGDB")
        print("5. GATHER articles from games        Download articles from IGN into the local cache")
        print("6. GATHER articles from developers   Download articles from IGN into the local cache")
        print("")
        print("7. MERGE Steam games                 Upload into the database")
        print("8. MERGE IGDB games                  Upload into the database")
        print("9. MERGE IGDB developers             Upload into the database")
        print("")
        print("A. LINK IGDB developers              Compute Game-Developer links from IGDB developers")
        print("B. LINK Steam developers             Compute Game-Developer links from Steam games")

        action = input("Choose an action: ")

        if action == '0':
            reset(db)
        elif action == '1':
            t = time()
            reset(db)
            steam.merge_games(db)
            igdb.merge_games(db)
            igdb.merge_developers(db)

            igdb.link_developers(db)
            steam.link_developers(db)
            print("[MAIN ] Rebuild completed in %d seconds" % (time() - t))
        elif action == '2':
            steam.gather_games()
        elif action == '3':
            igdb.gather_games()
        elif action == '4':
            igdb.gather_developers()
        elif action == '5':
            ign.populate_articles_for_games(db)
        elif action == '6':
            ign.populate_articles_for_developers(db)
        elif action == '7':
            steam.merge_games(db)
        elif action == '8':
            igdb.merge_games(db)
        elif action == '9':
            igdb.merge_developers(db)
        elif action == 'a':
            igdb.link_developers(db)
        elif action == 'b':
            steam.link_developers(db)
        else:
            print("Unknown Command")
