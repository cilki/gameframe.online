# --------------------------------
# Unit tests for the API scraper -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

from unittest import main, TestCase
from orm import Game

import main.sources.google


class TestGoogle (TestCase):

    def test_rq_video(self):
        """
        Attempt to request a video using a game
        """

        game = Game()
        game.name = "APB Reloaded"
        video_rq = sources.google.rq_videos(game)

        self.assertFalse(video_rq is None)


if __name__ == '__main__':
    main()
