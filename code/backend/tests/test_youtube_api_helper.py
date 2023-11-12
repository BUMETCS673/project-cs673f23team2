import unittest

from youtube_api_helper import create_youtube_data_params, fetch_youtube_video_data, \
    create_youtube_data_response, create_youtube_search_params, fetch_youtube_search_data, \
    get_video_ids_from_youtube_search_list, key


class YoutubeAPIHelperTest(unittest.TestCase):
    def test_create_youtube_data_params(self):
        expected = {
            "key": "AIzaSyBhSRIyJpF_kqSSAFnnNk16eDn1Cmiu_B0",
            "id": "UL0opWf3DeM,ULxMQ57engo,L6N3BgZh2AA,PIKiHq1O9HQ,F6wVOlsEAM",
            "part": "snippet,contentDetails",
            "maxResults": 5,
        }
        actual = create_youtube_data_params(["UL0opWf3DeM", "ULxMQ57engo", "L6N3BgZh2AA", "PIKiHq1O9HQ", "F6wVOlsEAM"],
                                            5)
        self.assertEquals(expected, actual)

    def test_fetch_youtube_video_data(self):
        expected = 1
        actual = fetch_youtube_video_data(["UL0opWf3DeM"], 1)
        self.assertEquals(expected, len(actual))

    def test_create_youtube_data_response(self):
        expected = "UL0opWf3DeM"
        input_param = fetch_youtube_video_data(["UL0opWf3DeM"], 1)
        res = create_youtube_data_response(input_param)[0]
        actual = res['id']
        self.assertEquals(expected, actual)

    def test_create_youtube_search_params(self):
        search_query = 'flask'
        max_results = 5
        video_duration = 'short'

        result = create_youtube_search_params(search_query, max_results, video_duration)
        expected_result =  {
            "key": key,
            "q": search_query,
            "part": "snippet",
            "type": "video",
            "maxResults": max_results,
            "videoDuration": video_duration,
        }

        self.assertEquals(result, expected_result)

    def test_fetch_youtube_search_data(self):
        search_query = 'flask'
        max_results = 5
        video_duration = 'short'

        result = fetch_youtube_search_data(search_query, max_results, video_duration)

        self.assertLessEqual(len(result), max_results)

    def test_get_video_ids_from_youtube_search_list(self):
        videoList = [{"id": {"videoId": i}} for i in range(5, 10)]

        result = get_video_ids_from_youtube_search_list(videoList)
        expected_result = [i for i in range(5, 10)]
        self.assertEquals(result, expected_result)

if __name__ == "__main__":
    unittest.main()
