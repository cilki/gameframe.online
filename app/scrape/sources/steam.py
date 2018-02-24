import requests
import time


def rq_app_list():
    """
    Request Steam's entire app list using the Steam API.
    """
    print("[STEAM] Downloading app list... ")

    return requests.get(
        "https://api.steampowered.com/ISteamApps/GetAppList/v2").json()
