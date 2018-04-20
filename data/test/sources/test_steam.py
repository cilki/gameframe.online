# --------------------------------
# Unit tests for the API scraper -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import os

from unittest import main, TestCase
from main.sources.steam import rq_app_list


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


if __name__ == '__main__':
    main()
