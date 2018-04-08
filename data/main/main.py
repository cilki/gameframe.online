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
from cache import WS, load_working_set
import vindex


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
print("4. GATHER articles                Download articles from Steam")
print("5. MERGE games                    Integrate game cache into the working set")
print("6. MERGE articles                 Integrate article cache into the working set")
print("7. LINK developers                Compute Game-Developer links")
print("8. GENERATE covers                Generate game covers")
print("9. UPLOAD covers                  Upload game covers to S3")

print("")
print("[IGDB]")
print("A. COLLECT games                  Download missing games from IGDB")
print("B. COLLECT developers             Download missing developers from IGDB")
print("C. MERGE games                    Integrate game cache into working set")
print("D. MERGE developers               Integrate developer cache into working set")
print("E. LINK developers                Compute Game-Developer links")

print("")
print("[NEWSAPI]")
print("I. GATHER articles by game        Download game articles into the cache")
print("J. MERGE articles                 Integrate article cache into working set and LINK")

print("")
print("[YOUTUBE]")
print("M. GATHER videos by game          Download game videos into the cache")
print("N. MERGE videos                   Integrate video cache into working set and LINK")

print("")
print("[TWITTER]")
print("Q. GATHER tweets by game          Download game tweets into the cache")
print("R. MERGE tweets                   Integrate tweet cache into working set and LINK")

print("")
print("[VINDEX]")
print("Y. BENCHMARK                      Compute and print visibility index for a few games")
print("Z. COMPUTE game vindex            Compute visibility index for all games")
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
            reset(db)

            # Merge games/developers
            steam.merge_games()
            igdb.merge_games()
            igdb.merge_developers()

            # Link developers
            igdb.link_developers()
            steam.link_developers()

            # Merge/Link articles
            steam.merge_articles()
            newsapi.merge_articles()

            # Merge/Link videos
            google.merge_videos()

            trim()

            WS.flush()
            print("[MAIN ] Rebuild completed in %d seconds" % (time() - t))
        elif action == '2':
            WS.flush()
        elif action == '3':
            steam.collect_games()
            steam.collect_headers()
        elif action == '4':
            steam.gather_articles()
        elif action == '5':
            steam.merge_games()
        elif action == '6':
            steam.merge_articles()
        elif action == '7':
            steam.link_developers()
        elif action == '8':
            steam.generate_covers()
        elif action == '9':
            steam.upload_covers()
        elif action == 'a':
            igdb.collect_games()
        elif action == 'b':
            igdb.collect_developers()
        elif action == 'c':
            igdb.merge_games()
        elif action == 'd':
            igdb.merge_developers()
        elif action == 'e':
            igdb.link_developers()
        elif action == 'i':
            newsapi.gather_articles()
        elif action == 'j':
            newsapi.merge_articles()
        elif action == 'm':
            google.gather_videos_by_game()
        elif action == 'n':
            google.merge_videos()
        elif action == 'q':
            pass
        elif action == 'r':
            pass
        elif action == 'y':
            load_working_set()
            vindex.precompute()

            # Compute benchmark games
            for appid in [578080, 570, 359550, 271590, 552520, 477160, 50300]:
                game = WS.game_steam[appid]
                vindex.compute(game)
                print("Computed VINDEX: %d for game: %s" %
                      (game.vindex, game.name))
        elif action == 'z':
            vindex.compute_all()
        else:
            print("Unknown Command")
