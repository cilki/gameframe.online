# --------------------------------
# GameFrame API scraper utils    -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

from datetime import datetime


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
    Trim unconnected models
    """
    pass
