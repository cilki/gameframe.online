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
