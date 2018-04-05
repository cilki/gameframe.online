# --------------------------------
# Unit tests for the API scraper -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import sys
sys.path.insert(0, 'data/main/sources')  # TODO

import datetime
from orm import Game, Developer

from pathlib import Path
from unittest import main, TestCase
from util import parse_steam_date, condition, condition_heavy, condition_developer

class TestUtil (TestCase):

    def test_parse_steam_date(self):
        # Test value
		
        self.assertEqual(str(datetime.datetime(2017, 3, 8)),
                         str(parse_steam_date("Mar 8, 2017")))
        self.assertEqual(str(datetime.datetime(2017, 3, 1)),
                         str(parse_steam_date("Mar 2017")))
        self.assertEqual(str(datetime.datetime(1968, 2, 28)),
                         str(parse_steam_date("Feb 28, 1968")))
        self.assertEqual(str(datetime.datetime(3019, 10, 1)),
                         str(parse_steam_date("Oct 3019")))

    def test_condition(self):
        """
        Test keyword conditioning
        """

        self.assertEqual("great title: edition", condition(
            "Great® ®Title™: <sup>edition"))
        self.assertEqual("no special chars 89", condition(
             "No special chars 89"))

    def test_condition_heavy(self):

        self.assertEqual("visualizethemovie", condition_heavy(
             "vi|sua@li!z<e; +the€ mO\v/vie"))
        self.assertEqual("ringring", condition_heavy(
             "®Ri NG®;./  <sup><r!@ing?>"))
        self.assertEqual("_underscores_", condition_heavy(
             ";-; (: ¯\_(underscores)_/¯"))
        self.assertEqual("hello", condition_heavy(
             "<h,e#l!l[o]>'<{?}>"))
        self.assertEqual("123456789", condition_heavy(
             "1*2-3+4/5%6^7=8.9"))

    def test_condition_developer(self):

        self.assertEqual("ea games" , condition_developer(
            "EA Games"))
        self.assertEqual("double:dot arts inc." , condition_developer(
            "Double:Dot Arts Inc."))
        self.assertEqual("warlord coorp®" , condition_developer(
            "Warlord Coorp®"))
        self.assertEqual("technology™ studios" , condition_developer(
            "Technology™ Studios"))

    def test_keywordize(self):

        game1 = Game()
        game1.name = "Far Cry 5"
        self.assertEqual ("far cry 5" , keywordize(game1))

        dev1 = Developer()
        dev1.name = "Sudo Games"
        self.assertEqual ("sudo games", keywordize(dev1))

        game2 = Game()
        game2.name = "THE ADVENTURE: GREATEST GAME OF ALL TIME!!"
        self.assertEqual ("the adventure: greatest game of all time!!", keywordize(game2))

        dev2 = Developer()
        dev2.name = "Trademark™ Arts®"
        self.assertEqual ("trademark arts", keywordize(dev2))

    def test_xappend(self):

        video = Video()
        game = Game()
        self.assertFalse (video in game.videos)
        self.assertFalse (game in video.games)
        xappend(game.videos, video)
        self.assertTrue (video in game.videos)
        self.assertTrue (game in video.games)
		
        dev = Developer()
        article = Article()
        xappend(dev.articles, article)
        self.assertTrue (article in dev.articles)
        self.assertTrue (dev in article.developers)
        len1 = len(dev.articles)
        len2 = len(article.developers)
        xappend(dev.articles, article)
        self.assertTrue (article in dev.articles)
        self.assertTrue (dev in article.developers)
        self.assertEqual (len1, len(dev.articles))
        self.assertEqual (len2, len(article.developers))

if __name__ == '__main__':
    main()
