# --------------------------------
# Unit tests for the API scraper -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import sys
sys.path.insert(0, 'data/main')  # TODO

from unittest import main, TestCase
from sources.steam import rq_app_list, load_game_json, rq_game

# TODO Currently the Steam source is not very testable due to dependencies


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
        self.assertTrue(rq_app_list() is rq_app_list())

    def test_rq_game(self):
        """
        Attempt to request a game
        """

        game_rq = rq_game(570)

        self.assertFalse(game_rq is None)
        self.assertTrue('570' in game_rq)

    def test_load_game(self):
        """
        Attempt to load a game
        """

        game_json = load_game_json(570)

        self.assertFalse(game_json is None)
        self.assertEqual("Dota 2", game_json['name'])


if __name__ == '__main__':
    main()
