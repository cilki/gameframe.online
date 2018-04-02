# --------------------------------
# GameFrame utils                -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import os
import re
from datetime import datetime

from orm import Game, Developer

"""
Extra keywords that make relevancy matching difficult and should be carefully
filtered in some circumstances.
"""
DEVELOPER_EXTRA = ['llc', 'ltd', 'co', 'inc', 'company', 'interactive',
                   'entertainment', 'studios', 'studio', 'games', 'publishing']

"""
A compiled regex that matches strings in DEVELOPER_EXTRA
"""
CONDITION_DEVELOPER = re.compile(
    "[\W+]" + "[\W*]|[\W+]".join(DEVELOPER_EXTRA) + "[\W*]")

"""
A compiled regex that performs heavy conditioning
"""
CONDITION_HEAVY = re.compile(r'<sup>|</sup>|[ ]|\W')


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


def condition(keyword):
    """
    Condition a general keyword for searching
    """
    keyword = re.sub(r'™|®|<sup>|</sup>', '', keyword).strip().lower()
    return re.sub(r'[ +]', ' ', keyword)


def condition_heavy(keyword):
    """
    Heavily condition a keyword for relevancy detection
    """
    return CONDITION_HEAVY.sub('', keyword).lower()


def condition_developer(name):
    """
    Condition a developer's name
    """
    return CONDITION_DEVELOPER.sub('', name).lower()


def keywordize(model):
    """
    Reduce a model to a keyword string
    """
    return condition(model.name)


def xappend(collection, item):
    """
    Append to the given collection unless the item is already present
    """
    if item not in collection:
        collection.append(item)
