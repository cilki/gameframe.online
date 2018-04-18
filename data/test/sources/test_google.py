# --------------------------------
# Unit tests for the API scraper -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import sys
sys.path.insert(0, 'data/main')
sys.path.insert(0, 'app')
from pathlib import Path

from unittest import main, TestCase
import sources.google
from orm import Game

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
