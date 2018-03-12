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

# Greetings
print("                             __                          \n                            / _|                         \n  __ _  __ _ _ __ ___   ___| |_ _ __ __ _ _ __ ___   ___ \n / _` |/ _` | '_ ` _ \\ / _ \\  _| '__/ _` | '_ ` _ \\ / _ \\\n| (_| | (_| | | | | | |  __/ | | | | (_| | | | | | |  __/\n \\__, |\\__,_|_| |_| |_|\\___|_| |_|  \\__,_|_| |_| |_|\\___|\n  __/ |                                                  \n |___/\n\n")
print("")
print("Connected to: %s" % os.environ['SQLALCHEMY_URI'])

print("")
print("0. RESET                          Drop all tables and rebuild database schema")
print("1. REBUILD                        Reset database, merge, and link")
print("2  FILTER                         Delete low quality entities")

print("")
print("[STEAM]")
print("3. COLLECT games                  Download missing games from Steam")
print("4. MERGE games                    Upload game cache into database")
print("5. LINK developers                Compute Game-Developer links from Steam games")

print("")
print("[IGDB]")
print("6. COLLECT games                  Download missing games from IGDB")
print("7. COLLECT developers             Download missing developers from IGDB")
print("8. MERGE games                    Upload game cache into database")
print("9. MERGE developers               Upload developer cache into database")
print("A. LINK developers                Compute Game-Developer links from IGDB developers")

print("")
print("[IGN]")
print("B. GATHER articles                Download articles from IGN into the local cache")
print("C. MERGE articles                 Upload article cache into database")
print("D. LINK articles                  Compute Article links")

print("")
print("YOUTUBE")

print("")
print("TWITCH")

with app.app_context():

    # Initialize Flask
    db.init_app(app)

    while True:

        print("")
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
            pass
        elif action == '3':
            steam.collect_games()
        elif action == '4':
            steam.merge_games(db)
        elif action == '5':
            steam.link_developers(db)
        elif action == '6':
            igdb.collect_games()
        elif action == '7':
            igdb.collect_developers()
        elif action == '8':
            igdb.merge_games(db)
        elif action == '9':
            igdb.merge_developers(db)
        elif action == 'a':
            igdb.link_developers(db)
        elif action == 'b':
            ig.gather_articles(db)
        elif action == 'c':
            ig.merge_articles(db)
        elif action == 'd':
            ig.link_articles(db)
        else:
            print("Unknown Command")
