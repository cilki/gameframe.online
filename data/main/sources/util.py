# --------------------------------
# GameFrame utils                -
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


def parse_igdb_date(d):
    """
    Parse a textual release date from IGDB.
    """
    pass
