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
