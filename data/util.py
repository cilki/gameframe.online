# --------------------------------
# GameFrame API scraper utils    -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import os
from datetime import datetime
from tqdm import tqdm

from working_set import load_working_set, name_game


def parse_steam_date(d):
    """
    Parse a textual release date from Steam.
    """
    try:
        return datetime.strptime(d, "%b %d, %Y")
    except ValueError:
        pass
    try:
        return datetime.strptime(d, "%b %Y")
    except ValueError:
        pass

    return None


def append_csv(csv, item):
    """
    Append an item to a CSV string. Duplicates are ignored.
    """
    item = str(item)
    if csv is None:
        return item

    if item not in csv:
        if len(csv) > 0:
            csv += ","

        csv += item

    return csv


def is_cached(cache_path, filename):
    """
    Returns True if the given entry exists in the cache, False otherwise.
    """
    return os.path.isfile("%s/%s" % (cache_path, filename))


def reset(db):
    """
    Reset the database.
    """
    print("[MAIN ] Dropping database")

    # Delete everything
    db.reflect()
    db.drop_all()

    # Create database schema
    db.create_all()
    print("[MAIN ] Reset complete")


def trim(db):
    """
    Remove low quality models.
    """
    load_working_set()

    print("[MAIN ] Trimming database")

    # Remove games without covers and screenshots, with short descriptions,
    # or a low number of primary connections
    for name, game in tqdm(name_game.items()):
        if game.cover is None or game.screenshots is None or game.summary is None \
                or len(game.summary) < 10 or len(game.developers) == 0 \
                or len(game.articles) == 0:
            # TODO remove from working set
            # Remove from database
            db.session.delete(game)

    # Remove developers without logos, with short descriptions, or a low number
    # of primary connections
    for name, dev in tqdm(name_developer.items()):
        if dev.logo is None or len(dev.games) == 0 or len(dev.articles) == 0:
            # TODO remove from working set
            # Remove from database
            db.session.delete(dev)

    db.session.commit()
    print("[MAIN ] Trim complete")
