# --------------------------------
# Google API scraper             -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import os
from datetime import datetime

import requests
from ratelimit import rate_limited
from tqdm import tqdm

from cache import WS, KeyCache, TableCache, load_working_set
from orm import Game, Video
import registry

from .util import condition_heavy, keywordize, xappend

"""
The API key cache
"""
KEYS = KeyCache(registry.KeyGoogle)


def load_video_cache():
    """
    Load the video cache if unloaded
    """

    if 'CACHE_VIDEO' not in globals():
        global CACHE_VIDEO
        CACHE_VIDEO = TableCache(registry.CachedVideo, 'video_id')


def rq_videos(game):
    """
    Request video metadata according to a game using the YouTube API
    """

    rq = requests.get("https://www.googleapis.com/youtube/v3/search",
                      params={'q': keywordize(game).replace(" ", "+"),
                              'order': 'relevance', 'part': 'snippet',
                              'type': 'video', 'maxResults': 50, 'key': API_KEY,
                              'videoCategoryId': 20})

    assert rq.status_code == requests.codes.ok
    assert 'error' not in rq

    for video_json in rq.json()['items']:

        # Filter
        if not validate_video(video_json):
            continue

        # Filter video relevancy
        name = condition_heavy(game.name)
        if name not in condition_heavy(video_json['snippet']['title']) and \
                name not in condition_heavy(video_json['snippet']['description']):
            continue

        # Finally add the video
        CACHE_VIDEO.add(CachedVideo(game_id=game.game_id,
                                    youtube_data=video_json))


def build_video(video, video_json):
    """
    Build a Video object from the raw data
    """
    if video is None or video_json is None:
        return

    # YouTube ID
    if video.youtube_id is None:
        video.youtube_id = video_json['id']['videoId']

    # Name
    if video.name is None:
        video.name = video_json['snippet']['title']

    # Thumbnail
    if video.thumbnail is None:
        video.thumbnail = video_json['snippet']['thumbnails']['medium']['url']

    # Description
    if video.description is None:
        video.description = video_json['snippet']['description']

    # Timestamp
    if video.timestamp is None:
        video.timestamp = datetime.strptime(video_json['snippet']['publishedAt'],
                                            '%Y-%m-%dT%H:%M:%S.000Z')

    # Channel
    if video.channel is None:
        video.channel = video_json['snippet']['channelTitle']

    # Video Link
    if video.video_link is None:
        video.video_link = "https://www.youtube.com/watch?v=" + video.youtube_id


def validate_video(video_json):
    """
    Validate the content of a raw video
    """
    if video_json is None:
        return False

    try:
        # Filter title
        if len(video_json['snippet']['title']) < 5:
            return False

        # Filter description
        if len(video_json['snippet']['description']) < 5:
            return False

        # Filter ID
        if not video_json['id']['videoId']:
            return False

        # Filter thumbnail
        if len(video_json['snippet']['thumbnails']['medium']['url']) < 10:
            return False

    except KeyError:
        return False
    return True


def gather_videos():
    """
    Download videos from YouTube by game
    """
    load_video_cache()
    load_working_set()

    for game in tqdm(WS.games.values(), '[YOUTUBE ] Gathering Videos'):
        if not CACHE_VIDEO.exists(game.game_id):
            rq_videos(game)
