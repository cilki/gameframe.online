# --------------------------------
# Unit tests for the API scraper -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

from unittest import main, TestCase
from wand.image import Image
from wand.color import Color

from main.cdgen.steam import color_average


class TestSteam (TestCase):

    def test_color_average(self):
        # Test with empty image
        with Image(width=100, height=100) as test:
            self.assertEqual((0, 0, 0), color_average(test))

        # Test with solid image
        with Image(width=100, height=100, background=Color('rgb(12, 56, 23)')) as test:
            self.assertEqual((12, 56, 23), color_average(test))

        # TODO Test the 25% shortcut and top 50% averaging


if __name__ == '__main__':
    main()
