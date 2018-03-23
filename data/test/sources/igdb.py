# --------------------------------
# Unit tests for the API scraper -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import sys
sys.path.insert(0, 'data/main')  # TODO

from unittest import main, TestCase
from sources.igdb import load_game_json, load_dev_json

# TODO Currently the IGDB source is not very testable due to dependencies


class TestIGDB (TestCase):

    def test_load_game(self):
        """
        Attempt to load a game
        """

        game_json = load_game_json(65603)

        self.assertFalse(game_json is None)
        self.assertEqual(
            "Captain America: Sentinel of Liberty", game_json['name'])

    def test_load_dev(self):
        """
        Attempt to load a developer
        """

        dev_json = load_dev_json(8570)

        self.assertFalse(dev_json is None)
        self.assertEqual("Kodots Games", dev_json['name'])


if __name__ == '__main__':
    main()
