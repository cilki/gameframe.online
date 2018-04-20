# --------------------------------
# Unit tests for the API scraper -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

from unittest import main, TestCase
import main.sources.igdb


class TestIGDB (TestCase):
    def test_rq_game(self):
        """
        Attempt to request a game
        """

        game_rq = sources.igdb.rq_game_block(9349)
        self.assertFalse(game_rq is None)


if __name__ == '__main__':
    main()
