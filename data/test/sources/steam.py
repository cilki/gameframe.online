# --------------------------------
# Unit tests for the API scraper -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import sys
sys.path.insert(0, 'data/main')
sys.path.insert(0, 'app')
from pathlib import Path

from unittest import main, TestCase
import sources.steam

class TestSteam (TestCase):

    def test_app_list(self):
        """
        Test the app list request
        """

        # There should be more than 50,000 apps in the request
        apps = rq_app_list()
        self.assertTrue(len(apps) > 50000)

        # Every call to rq_app_list should return the same object
        self.assertTrue(apps is rq_app_list())
        self.assertTrue(sources.steam.rq_app_list())
                        is sources.steam.rq_app_list())

    def test_rq_game(self):
        """
        Attempt to request a game
        """

        game_rq = rq_game(570)

        self.assertFalse(game_rq is None)
        self.assertTrue('570' in game_rq)

if __name__ == '__main__':
    main()
