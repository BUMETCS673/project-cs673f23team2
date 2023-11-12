import unittest

from helpers.youtube_api_helper import create_youtube_data_params, fetch_youtube_video_data, \
    create_youtube_data_response


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


if __name__ == "__main__":
    unittest.main()
