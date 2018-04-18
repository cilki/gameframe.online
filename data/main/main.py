# --------------------------------
# GameFrame API scraper          -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import os
import sys
sys.path.append(os.path.abspath('app'))

from time import time
from signal import SIGINT, signal

from flask import Flask

import vindex
from orm import db
from cache import WS, load_working_set


# Register exit signal
signal(SIGINT, lambda x, y: sys.exit(0))

# Setup Flask
app = Flask(__name__)

# Configure SQLAlchemy
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_BINDS'] = {'gameframe': os.environ['SQLALCHEMY_URI'],
                                  'registry': os.environ['SQLALCHEMY_REG_URI']}

# Greetings
print("                             __                          \n                            / _|                         \n  __ _  __ _ _ __ ___   ___| |_ _ __ __ _ _ __ ___   ___ \n / _` |/ _` | '_ ` _ \\ / _ \\  _| '__/ _` | '_ ` _ \\ / _ \\\n| (_| | (_| | | | | | |  __/ | | | | (_| | | | | | |  __/\n \\__, |\\__,_|_| |_| |_|\\___|_| |_|  \\__,_|_| |_| |_|\\___|\n  __/ |                                                  \n |___/\n\n")

print("-------------------------------------------------------------------------------------")
print("0. RESET                          Drop all tables and create database schema")
print("1. REBUILD                        Reset the database and rebuild from the cache")
print("2. FLUSH                          Commit the working set to the database")

print("")
print("[REGISTRY]")
print("3. MERGE games                    Integrate game cache into the working set")
print("4. MERGE developers               Integrate developer cache into working set")
print("5. MERGE articles                 Integrate article cache into the working set")
print("6. MERGE videos                   Integrate video cache into working set")
print("7. MERGE tweets                   Integrate tweet cache into working set")
print("8. LINK developers                Compute Game-Developer links")
print("9. LINK articles                  Compute quadratic Game-Article links")
print("A. LINK videos                    Compute quadratic Game-Video links")
print("B. LINK tweets                    Compute quadratic Tweet links")
print("C. CLEAN all                      Remove unwanted entities from the registry")

print("")
print("[STEAM]")
print("F. COLLECT games                  Download missing games and headers from Steam")
print("G. GATHER articles                Download articles from Steam")
print("H. GENERATE covers                Generate game covers")
print("I. UPLOAD covers                  Upload game covers to S3")

print("")
print("[IGDB]")
print("L. COLLECT games                  Download missing games from IGDB")
print("M. COLLECT developers             Download missing developers from IGDB")

print("")
print("[NEWSAPI]")
print("N. GATHER articles                Download game articles into the cache")

print("")
print("[YOUTUBE]")
print("P. GATHER videos by game          Download game videos into the cache")

print("")
print("[TWITTER]")
print("R. GATHER tweets by game          Download game tweets into the cache")

print("")
print("[VINDEX]")
print("Y. BENCHMARK game vindex          Compute and print visibility index for a few games")
print("Z. COMPUTE game vindex            Compute visibility index for all games")
print("-------------------------------------------------------------------------------------")

with app.app_context():

    # Initialize Flask
    db.init_app(app)

    import registry
    from sources import igdb, newsapi, steam, google, twitter
    from util import reset, trim

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
            registry.merge_games()
            registry.merge_developers()

            # Link developers
            igdb.link_developers()
            steam.link_developers()

            # Merge articles
            registry.merge_articles()

            # Merge videos
            registry.merge_videos()

            # Merge tweets
            registry.merge_tweets()

            trim()

            WS.flush()
            print("[MAIN] Rebuild completed in %d seconds" % (time() - t))
        elif action == '2':
            WS.flush()

        elif action == '3':
            registry.merge_games()
        elif action == '4':
            registry.merge_developers()
        elif action == '5':
            registry.merge_articles()
        elif action == '6':
            registry.merge_videos()
        elif action == '7':
            registry.merge_tweets()
        elif action == '8':
            igdb.link_developers()
            steam.link_developers()
        elif action == '9':
            newsapi.link_articles()
        elif action == 'a':
            google.link_videos()
        elif action == 'b':
            twitter.link_tweets()
        elif action == 'c':
            registry.clean_tweets()
            registry.clean_articles()
            registry.clean_videos()

        elif action == 'f':
            steam.collect_games()
        elif action == 'g':
            steam.gather_articles()
        elif action == 'h':
            steam.generate_covers()
        elif action == 'i':
            steam.upload_covers()

        elif action == 'l':
            igdb.collect_games()
        elif action == 'm':
            igdb.collect_developers()

        elif action == 'n':
            newsapi.gather_articles()

        elif action == 'p':
            google.gather_videos()

        elif action == 'r':
            twitter.gather_tweets()

        elif action == 'y':
            load_working_set()
            vindex.precompute(WS.games)

            # Compute benchmark games
            for appid in [578080, 570, 359550, 271590, 552520, 477160, 50300]:
                game = WS.games_steam[appid]
                vindex.compute(game)
                print("Computed VINDEX: %d for game: %s" %
                      (game.vindex, game.name))
        elif action == 'z':
            load_working_set()
            vindex.precompute(WS.games)

            for game in tqdm(WS.games.values(), '[VINDEX] Computing game vindicies'):
                vindex.compute(game)
        else:
            print("Unknown Command")
