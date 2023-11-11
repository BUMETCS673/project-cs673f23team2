import requests
from isodate import parse_duration

video_fetch_url = "https://www.googleapis.com/youtube/v3/search"
video_data_fetch_url = "https://www.googleapis.com/youtube/v3/videos"
key = "AIzaSyDoVGGsXkMZMA_YjPnKUuP0i_ILJUe38S8"  # Kept here for testing, will be moved to an environment variable


# Create parameters for the Youtube Search API Request
def create_youtube_search_params(search_query, max_results, video_duration):
    return {
        "key": key,
        "q": search_query,
        "part": "snippet",
        "type": "video",
        "maxResults": max_results,
        "videoDuration": video_duration,
    }


# Create parameters for the Youtube Data API Request
def create_youtube_data_params(videoIds, max_results):
    return {
        "key": key,
        "id": ",".join(videoIds),
        "part": "snippet,contentDetails",
        "maxResults": max_results,
    }


# Fetch Data from Youtube Search API for the given paramets
def fetch_youtube_search_data(search_query, max_results, video_duration):
    params = create_youtube_search_params(search_query, max_results, video_duration)
    res = requests.get(video_fetch_url, params=params)
    return res.json()["items"]


# Create a list of video id's from YouTube Search API response
def get_video_ids_from_youtube_search_list(videoList):
    videoIds = []
    for video in videoList:
        videoIds.append(video["id"]["videoId"])
    return videoIds


# Fetch Data from YouTube Data API for the given parameters
def fetch_youtube_video_data(videoIds, max_results):
    video_data_params = create_youtube_data_params(videoIds, max_results)
    video_data_res = requests.get(video_data_fetch_url, params=video_data_params)
    return video_data_res.json()["items"]


# Create a combined object for both YouTube Search and YouTube Data API
def create_youtube_data_response(videoDataList):
    video_results = []
    for videoData in videoDataList:
        videoElement = {
            "id": videoData["id"],
            "url": f'https://www.youtube.com/watch?v={videoData["id"]}',
            "thumbnail": videoData["snippet"]["thumbnails"]["medium"]["url"],
            "duration": int(
                parse_duration(videoData["contentDetails"]["duration"]).total_seconds()
                // 60
            ),
            "title": videoData["snippet"]["title"],
            "creator": videoData["snippet"]["channelTitle"],
        }
        video_results.append(videoElement)
    return video_results
