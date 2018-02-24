# --------------------------------
# GiantBomb.com API scraper      -
# Copyright (C) 2018 GameFrame   -
# --------------------------------
import requests
import os

# The Giant Bomb API key
API_KEY = os.environ['KEY_GBOMB']


@rate_limited(period=200, every=3600)
def rq_article():
    pass
