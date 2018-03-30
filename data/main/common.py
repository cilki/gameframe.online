# --------------------------------
# GameFrame API scraper          -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import os

"""
The GameFrame CDN URL for images
"""
CDN_URI = 'http://cdn.gameframe.online'

"""
The root cache directory
"""
CACHE_GAMEFRAME = os.environ['CACHE_GAMEFRAME']
assert os.path.isdir(CACHE_GAMEFRAME)

"""
Run statistics
"""
METRICS = {'steam.filtered.genre': 0, 'steam.filtered.deficient': 0,
           'steam.filtered.failed': 0, 'steam.new_downloads': 0,

           'igdb.filtered.genre': 0, 'igdb.filtered.deficient': 0,
           'igdb.filtered.failed': 0, 'igdb.new_downloads': 0,

           'newsapi.new_downloads': 0,

           'youtube.new_downloads': 0}
