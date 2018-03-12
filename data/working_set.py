# --------------------------------
# GameFrame scraper working set  -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

from functools import lru_cache
from orm import Game, Developer
from tqdm import tqdm

"""
Maps names to Game objects
"""
name_game = {}

"""
Maps steam_id to Game objects
"""
steamid_game = {}

"""
Maps igdb_id to Game objects
"""
igdbid_game = {}

"""
Maps igdb_id to Developer objects
"""
igdbid_developer = {}

"""
Maps names to Developer objects
"""
name_developer = {}


def add_game(game):
    """
    Add a game to the working set
    """

    name_game[game.name] = game
    if game.steam_id is not None:
        steamid_game[game.steam_id] = game
    if game.igdb_id is not None:
        igdbid_game[game.igdb_id] = game


def add_developer(dev):
    """
    Add a developer to the working set
    """

    name_developer[dev.name] = dev
    if dev.igdb_id is not None:
        igdbid_developer[dev.igdb_id] = dev


@lru_cache(maxsize=1)
def load_working_set():
    """
    Load every merged entity into memory. This idiom greatly increases overall
    performance. This function should only be called once.
    """
    global name_game
    global id_game
    global igdbid_game

    global id_developer
    global name_developer

    print("[MAIN ] Loading working set")
    for game in tqdm(Game.query.all()):
        add_game(game)

    for dev in tqdm(Developer.query.all()):
        add_developer(dev)

    print("[MAIN ] Loaded %d entities from database" %
          (len(name_game) + len(igdbid_developer)))
