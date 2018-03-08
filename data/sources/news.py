# --------------------------------
# News API scraper           -
# Copyright (C) 2018 GameFrame   -
# --------------------------------
from ratelimit import rate_limited
from codecs import open

import requests
import os
import json

import sys
sys.path.append(os.path.abspath('app'))
from orm import Game, Developer, Article

"""
The API key
"""
API_KEY = os.environ['KEY_IGN']

def parse_timestamp(s):
	return s[:-1]

@rate_limited(period=40, every=60)
def rq_articles_from_keyword(keyword):
    """
    Request article metadata using News API
    """
    print("[News API ] Downloading article metadata for keyword: %s" % keyword)
	
	url = "https://newsapi.org/v2/everything?language=en&q=%s&apiKey=%s" % (keyword, API_KEY)
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
        articles_json = rq_articles_from_keyword(game.name)
		lst = articles_json["articles"]
		for i in lst:
		
		    counter += 1
			article = Article()
			
			# Title
			if "title" in i:
				article.title = i["title"]
			else:
				print("Failed to load article.")
				break
			
			# TODO Iterate through all the articles in the database so that
		    # no two articles with same name exist? Make title secondary key?
			
			# Outlet
			if  "sources" in i and "name" in i["sources"]:
				article.outlet = i["sources"]["name"]
			else:
				print("Failed to load outlet for article %s." % article.title)
				break
			
			# Introduction
			if "description" in i:
			article.introduction = i["description"]
			else:
				print("Failed to load introduction for article %s." % article.title)
				break
			
			# Author
			if "author" in i:
				article.author = i["author"]
			else:
				print("Failed to load author for article %s." % article.title)
				break
			
			# Timestamp
			if "publishedAt" in i:
				article.timestamp = parse_timestamp(i["publishedAt"])
			else:
				print("Failed to load timestamp for article %s." % article.title)
				break
			
			# Image
			if "urlToImage" in i:
				article.image = i["urlToImage"]
			else:
				print("Failed to load image url for article %s." % article.title)
				break
			
			# Article link
			if "url" in i:
				article.article_link = i["url"]
			else:
				print("Failed to load link for article %s." % article.title)
				break
			
			# Setting up a relationship between article and game
			game.articles.append(article)
			article.games.append(game)
				
			print("Uploading articles for game (%s): %s" %
				(game.name, game.name.encode('utf-8', 'ignore')))

			db.session.add(article)
			db.session.commit()

    print("[News API ] Inserted %d new articles for %s" % counter, game.name)
	
def populate_articles_for_developers(db):
    """
    Insert articles related to our list of developers into the database.
    """

    counter = 0

	# Iterate through developers in our database
    for dev in Developer.query.all():
        articles_json = rq_articles_from_keyword(dev.name)
		lst = articles_json["articles"]
		for i in lst:
		
		    counter += 1
			article = Article()
			
			# Title
			if "title" in i:
				article.title = i["title"]
			else:
				print("Failed to load article.")
				break
			
			# TODO Iterate through all the articles in the database so that
		    # no two articles with same name exist? Make title secondary key?
			
			# Outlet
			if  "sources" in i and "name" in i["sources"]:
				article.outlet = i["sources"]["name"]
			else:
				print("Failed to load outlet for article %s." % article.title)
				break
			
			# Introduction
			if "description" in i:
			article.introduction = i["description"]
			else:
				print("Failed to load introduction for article %s." % article.title)
				break
			
			# Author
			if "author" in i:
				article.author = i["author"]
			else:
				print("Failed to load author for article %s." % article.title)
				break
			
			# Timestamp
			if "publishedAt" in i:
				article.timestamp = i["publishedAt"] # TODO Parse the date
			else:
				print("Failed to load timestamp for article %s." % article.title)
				break
			
			# Image
			if "urlToImage" in i:
				article.image = i["urlToImage"]
			else:
				print("Failed to load image url for article %s." % article.title)
				break
			
			# Article link
			if "url" in i:
				article.article_link = i["url"]
			else:
				print("Failed to load link for article %s." % article.title)
				break
			
			# Setting up a relationship between article and developer
			dev.articles.append(article)
			article.developers.append(dev)
				
			print("Uploading articles for developer (%s): %s" %
				(dev.name, dev.name.encode('utf-8', 'ignore')))

			db.session.add(article)
			db.session.commit()

    print("[News API] Inserted %d new articles for %s" % counter, dev.name)
