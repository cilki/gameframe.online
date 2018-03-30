# --------------------------------
# GameFrame API scraper          -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import os
import sys
from signal import SIGINT, signal
from time import time

from flask import Flask

from aws import upload_image
from common import METRICS
from sources import igdb, newsapi, steam, google
from orm import db
from util import reset, trim
from cache import WS


def sigint_handler(sig, frame):
    """
    SIGINT handler which prints run metrics and exits
    """
    print("\nRun Metrics:\n%s" % METRICS)
    sys.exit(0)


# Register signal
signal(SIGINT, sigint_handler)

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
print("-------------------------------------------------------------------------------------")
print("0. RESET                          Drop all tables and recreate database schema")
print("1. REBUILD                        Reset the database and rebuild from the cache")
print("2. FLUSH                          Commit the working set to the database")

print("")
print("[STEAM]")
print("3. COLLECT games                  Download missing games and headers from Steam")
print("4. MERGE games                    Integrate game cache into the working set")
print("5. LINK developers                Compute Game-Developer links")
print("6. GENERATE covers                Generate game covers")
print("7. UPLOAD covers                  Upload game covers to S3")

print("")
print("[IGDB]")
print("8. COLLECT games                  Download missing games from IGDB")
print("9. COLLECT developers             Download missing developers from IGDB")
print("A. MERGE games                    Integrate game cache into working set")
print("B. MERGE developers               Integrate developer cache into working set")
print("C. LINK developers                Compute Game-Developer links")

print("")
print("[NEWSAPI]")
print("D. GATHER articles by game        Download game articles into the cache")
print("E. GATHER articles by developer   Download developer articles into the cache")
print("F. MERGE articles                 Integrate article cache into working set and LINK")

print("")
print("[YOUTUBE]")
print("G. GATHER videos by game          Download game videos into the cache")
print("H. MERGE videos                   Integrate video cache into working set and LINK")
print("-------------------------------------------------------------------------------------")

with app.app_context():

    # Initialize Flask
    db.init_app(app)

    cmd = ""
    while True:

        print("")
        if len(cmd) == 0:
            cmd = input("Choose an action: ")

        action = cmd[0]
        cmd = cmd[1:]

        if action == '0':
            reset(db)
        elif action == '1':
            t = time()
            print("[MAIN ] Rebuilding database")
            reset(db)

            # Merge games/developers
            steam.merge_games()
            igdb.merge_games()
            igdb.merge_developers()

            # Link developers
            igdb.link_developers()
            steam.link_developers()

            # Merge/Link articles
            newsapi.merge_articles()
            trim()

            WS.flush()
            print("[MAIN ] Rebuild completed in %d seconds" % (time() - t))
        elif action == '2':
            WS.flush()
        elif action == '3':
            steam.collect_games()
            steam.collect_headers()
        elif action == '4':
            steam.merge_games()
        elif action == '5':
            steam.link_developers()
        elif action == '6':
            steam.generate_covers()
        elif action == '7':
            steam.upload_covers()
        elif action == '8':
            igdb.collect_games()
        elif action == '9':
            igdb.collect_developers()
        elif action == 'a':
            igdb.merge_games()
        elif action == 'b':
            igdb.merge_developers()
        elif action == 'c':
            igdb.link_developers()
        elif action == 'd':
            newsapi.gather_articles_by_game()
        elif action == 'e':
            newsapi.gather_articles_by_developer()
        elif action == 'f':
            newsapi.merge_articles()
        elif action == 'g':
            google.gather_videos_by_game()
        elif action == 'h':
            google.merge_videos()
        else:
            print("Unknown Command")
