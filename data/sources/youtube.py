# --------------------------------
# Google API scraper             -
# Copyright (C) 2018 GameFrame   -
# --------------------------------
from ratelimit import rate_limited
from codecs import open

import requests
import os
import json

import sys
sys.path.append(os.path.abspath('app'))
from orm import Game, Video

"""
The API key
"""
API_KEY = os.environ['KEY_IGN']

@rate_limited(period=40, every=60)
def rq_videos_from_keyword(keyword):
    """
    Request video metadata using Google API
    """
    print("[Google API ] Downloading video metadata for keyword: %s" % keyword)
	
	url = "https://www.googleapis.com/youtube/v3/search?q=%s&order=date&part=snippet&type=video&maxResults=10&key=%s" % (keyword, API_KEY)
	response = requests.get(url)
	
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
			else:
				print("Failed to load video.")
				break
			
			# Name
			if "snippet" in i and "title" in i["snippet"]:
				video.name = i["snippet"]["title"]
			else:
				print("Failed to load video.")
				break
			
			# Timestamp
			if "publishedAt" in i["snippet"]:
				video.timestamp = i["snippet"]["publishedAt"]
			else:
				print("Failed to load timestamp for video %s." % video.name)
				break
				
			# Channel
			if "channelTitle" in i["snippet"]:
				video.channel = i["snippet"]["channelTitle"]
			else:
				print("Failed to load channel name for video %s." % video.name)
				break	
			
			# Setting up a relationship between article and game
			game.videos.append(video)
			video.games.append(game)
				
			print("Uploading YouTube videos for game %s" % game.name.encode('utf-8', 'ignore'))

			db.session.add(video)
			db.session.commit()

    print("[Google API ] Inserted %d new YouTube videos for %s" % counter, game.name)
