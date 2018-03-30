# --------------------------------
# GameFrame utils                -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import os
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


def condition_article(keyword):
    """
    Condition an article keyword for searching
    """
    return keyword.replace("™", "").replace("®", "").replace("<sup>", "") \
        .replace("</sup>", "").replace(":", "").replace("-", "")


def condition_video(keyword):
    """
    Condition a video keyword for searching
    """
    return condition_article(keyword).replace(" ", "+")


def cond_game_name(name):
    """
    Condition a game name for matching
    """
    return name.replace("™", "").replace("®", "").replace(":", "") \
        .replace("-", "").replace(" +", " ")


def xappend(collection, item):
    """
    Append to the given collection unless the item is already present
    """
    if item not in collection:
        collection.append(item)
