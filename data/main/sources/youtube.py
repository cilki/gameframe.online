# --------------------------------
# Google API scraper             -
# Copyright (C) 2018 GameFrame   -
# --------------------------------
import json
import os
from codecs import open

import requests
from ratelimit import rate_limited

from orm import Game, Video

"""
The API key
"""
API_KEY = os.environ['KEY_YOUTUBE']


def parse_keyword(s):
    s = s.replace(" ", "+")
    return s


@rate_limited(period=40, every=60)
def rq_videos(keyword):
    """
    Request video metadata using Google API according to a keyword
    """

    response = requests.get("https://www.googleapis.com/youtube/v3/search",
                            params={'q': parse_keyword(keyword), 'order': 'relevance', 'part': 'snippet',
                                    'type': 'video', 'maxResults': 10, 'key': API_KEY})

    assert response.status_code == requests.codes.ok
    return response.json()


def populate_articles_for_games(db):
    """
    Insert articles related to our list of games into the database.
    """

    counter = 0

    # Iterate through games in our database
    for game in Game.query.all():
        videos_json = rq_videos_from_keyword(game.name)
            lst = videos_json["items"]
            for i in lst:

                counter += 1
                video = Video()

                # YouTube ID
                if "id" in i:
                    video.youtube_id = i["id"]

                # Name
                if "snippet" in i and "title" in i["snippet"]:
                    video.name = i["snippet"]["title"]

                # Timestamp
                if "publishedAt" in i["snippet"]:
                    video.timestamp = i["snippet"]["publishedAt"]

                # Channel
                if "channelTitle" in i["snippet"]:
                    video.channel = i["snippet"]["channelTitle"]

                # Video Link
                video.video_link = "https://www.youtube.com/watch?v=" + video.youtube_id

                # Setting up a relationship between article and game
                game.videos.append(video)
                video.games.append(game)

                db.session.add(video)
                db.session.commit()

    print("[Google API ] Inserted %d new YouTube videos for %s" %
          counter, game.name)
