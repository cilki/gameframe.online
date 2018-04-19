# --------------------------------
# Google API scraper             -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import os
from datetime import datetime

import requests

from cache import WS, KeyCache, load_working_set
from common import TC, load_registry
from registry import KeyGoogle, CachedVideo
from sources.util import condition_heavy, generic_gather, vstrlen, xappend

"""
The API key cache
"""
KEYS = KeyCache(KeyGoogle)


def rq_videos(game):
    """
    Request video metadata according to a game using the YouTube API
    """
    rq = requests.get("https://www.googleapis.com/youtube/v3/search",
                      params={'q': game.c_name.replace(" ", "+"),
                              'order': 'relevance', 'part': 'snippet',
                              'type': 'video', 'maxResults': 50, 'key': KEYS.get(),
                              'videoCategoryId': 20})

    assert rq.status_code == requests.codes.ok
    assert 'error' not in rq

    for video_json in rq.json()['items']:

        # Unit filtering
        if not validate_video(video_json):
            continue

        # Relevancy filtering
        if not relevant_video(game, video_json):
            continue

        # Finally add the video
        TC['Video.game_id'].add(CachedVideo(game_id=game.game_id,
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
        if not vstrlen(video_json['snippet']['title'], 8):
            return False

        # Filter description
        if not vstrlen(video_json['snippet']['description'], 15):
            return False

        # Filter ID
        if not vstrlen(video_json['id']['videoId']):
            return False

        # Filter thumbnail
        if not vstrlen(video_json['snippet']['thumbnails']['medium']['url']):
            return False

    except KeyError:
        return False
    return True


def relevant_video(game, video_json):
    """
    Determine the relevance of a video to a game
    """

    # Check for name in content
    name = condition_heavy(game.c_name)
    if name in condition_heavy(video_json['snippet']['title']) or \
            name in condition_heavy(video_json['snippet']['description']):
        return True

    return False


def gather_videos():
    """
    Download videos from YouTube by game
    """
    load_working_set()
    load_registry('Video', 'game_id')

    generic_gather(rq_videos, TC['Video.game_id'], '[GATHER] Downloading Videos',
                   [game for game in WS.games.values() if not
                    TC['Video.game_id'].exists(game.game_id)])


def link_videos():
    """
    Compute Game-Video links.
    Complexity: O(N^2)
    """
    load_working_set()

    videos = {condition_heavy(video.name + video.description): video
              for video in WS.videos.values()}

    for game in tqdm(WS.games.values(), '[LINK] Linking Videos'):
        name = condition_heavy(game.c_name)

        for text in videos.keys():
            if name in text:
                # Link the models
                xappend(game.videos, videos[text])
