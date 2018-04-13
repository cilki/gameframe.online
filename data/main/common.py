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
Storage for the global TableCaches
"""
TC = {}

import cache


def load_registry(model, key):
    """
    Load a TableCache if not already loaded
    """
    global TC

    model_key = model + '.' + key
    if model_key not in TC:
        import registry
        TC[model_key] = cache.TableCache(eval('registry.Cached' + model), key)
