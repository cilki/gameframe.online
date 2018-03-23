# --------------------------------
# Unit tests for the API scraper -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import sys
sys.path.insert(0, 'data/main/sources')  # TODO

import datetime

from pathlib import Path
from unittest import main, TestCase
from util import parse_steam_date, condition_video, condition_article, is_cached


class TestUtil (TestCase):

    def test_parse_steam_date(self):
        # Test value
        self.assertEqual(str(datetime.datetime(2017, 3, 8)),
                         str(parse_steam_date("Mar 8, 2017")))

        self.assertEqual(str(datetime.datetime(2017, 3, 1)),
                         str(parse_steam_date("Mar 2017")))

    def test_condition(self):
        """
        Test keyword conditioning
        """

        self.assertEqual("Great Title edition", condition_article(
            "Great® ®Title™: <sup>edition"))
        self.assertEqual("No special chars 89", condition_article(
            "No special chars 89"))

        self.assertEqual("No+special+chars+89", condition_video(
            "No special chars 89"))

    def test_is_cached(self):
        """
        Test cache checking with known values
        """

        Path('/tmp/574570').touch()
        self.assertTrue(is_cached("/tmp/", "574570"))
        self.assertFalse(is_cached("/tmp/", "nonexistent"))


if __name__ == '__main__':
    main()
