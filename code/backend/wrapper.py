from helpers.youtube_api_helper import (
    create_youtube_data_response,
    fetch_youtube_search_data,
    fetch_youtube_video_data,
    get_video_ids_from_youtube_search_list,
)


# Wrapper function responsible for fetching data from YouTube Search and Data api and combine into a list of JSON object
def fetch_video_data_from_youtube(search_query, max_results, video_duration):
    videoList = fetch_youtube_search_data(search_query, max_results, video_duration)
    videoIds = get_video_ids_from_youtube_search_list(videoList)
    videoDataList = fetch_youtube_video_data(videoIds, max_results)
    video_results = create_youtube_data_response(videoDataList)
    return video_results
