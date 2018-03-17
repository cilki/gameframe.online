# --------------------------------
# GameFrame API scraper          -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import os

"""
The GameFrame CDN URL for images
"""
CDN_URI = 'cdn.gameframe.online'

"""
The root cache directory
"""
CACHE_GAMEFRAME = os.environ['CACHE_GAMEFRAME']
assert os.path.isdir(CACHE_GAMEFRAME)

"""
Run statistics
"""
METRICS = {'steam.filtered.genre': 0, 'steam.filtered.no_data': 0,
           'steam.filtered.non_game': 0, 'steam.filtered.no_name': 0,
           'steam.filtered.failed': 0, 'steam.new_downloads': 0}
