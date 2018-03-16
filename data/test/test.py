# --------------------------------
# Unit tests for the API scraper -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

from unittest import main, TestCase
from igdb import get_game, rq_game, CACHE_GAME_IGDB
from steam import get_game, rq_game, CACHE_GAME_STEAM
import pymysql


class TestScrape (TestCase):

    def test_get_game_steam(self):
        # Test value
        self.assertEqual("NightSky", get_game(
            {'appid': '99700', 'name': ''})['99700']['data']['name'])

        # Test cache
        self.assertTrue(os.path.isfile("%s/%d" % (CACHE_GAME_STEAM, 99700)))

    def test_get_game_igdb(self):
        # Test value
        self.assertEqual("MX Superfly", get_game(4024)[0]['name'])

        # Test cache
        self.assertTrue(os.path.isfile("%s/%d" % (CACHE_GAME_IGDB, 4024)))

    def test_db_add_entity_steam(self):
        pass
