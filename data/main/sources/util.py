# --------------------------------
# GameFrame utils                -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

from datetime import datetime
import re

from tqdm import tqdm

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
    "\W+" + "\W*$|\W+".join(DEVELOPER_EXTRA) + '\W*$', re.IGNORECASE)

"""
A compiled regex that performs heavy conditioning
"""
CONDITION_HEAVY = re.compile(r'<sup>|</sup>|[ ]|\W')

PROGRESS_FORMAT = "{desc} |{bar}| {n_fmt}/{total_fmt} [{elapsed} elapsed]"


def condition(keyword):
    """
    Condition a general keyword for searching
    """
    keyword = re.sub(r'™|®|<sup>|</sup>', '', keyword).strip().lower()
    return re.sub(r'[ +]', ' ', keyword)


def condition_developer(dev_name):
    """
    Condition a developer's name
    """

    # Strip parentheses
    name = re.sub(r'[(].*[)]', '', dev_name)

    # Strip DEVELOPER_EXTRA
    match = CONDITION_DEVELOPER.search(name)
    if match:
        name = name[0:match.start(0)]

    if len(name) < 3:
        # The conditioning was probably too aggressive
        return condition(dev_name)

    return condition(name)


def condition_heavy(keyword):
    """
    Heavily condition a keyword for relevancy detection
    """
    return CONDITION_HEAVY.sub('', keyword).lower()


def dict_delete(dict, key):
    """
    Delete a key from the given dictionary if it exists
    """
    try:
        del dict[key]
    except KeyError:
        pass


def gather(rq_func, cache, domain, desc):
    """
    Perform a generic gather with the given request function, gather domain,
    and TableCache.
    """
    try:
        for d in tqdm(domain, desc=desc, bar_format=PROGRESS_FORMAT):
            rq_func(d)
    finally:
        cache.flush()


def keywordize(game):
    """
    Reduce a Game to a keyword string
    """
    return condition(game.name)


def parse_steam_date(d):
    """
    Parse a textual release date from Steam.
    """
    try:
        return datetime.strptime(d, "%b %d, %Y").date()
    except ValueError:
        pass
    try:
        return datetime.strptime(d, "%b %Y").date()
    except ValueError:
        pass

    return None


def url_normalize(url):
    """
    Convert a URL into the standard format
    """
    if url.startswith('//'):
        return 'http:' + url

    if url.startswith('www'):
        return 'http://' + url

    if not url.startswith('http'):
        return 'http://' + url

    return url


def xappend(collection, item):
    """
    Append to the given collection unless the item is already present
    """
    if item not in collection:
        collection.append(item)
