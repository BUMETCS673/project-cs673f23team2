import unittest
from unittest.mock import patch, MagicMock

# Import the functions you want to test from wrapper.py
from wrapper import fetch_video_data_from_youtube

class WrapperTest(unittest.TestCase):
    @patch('wrapper.fetch_youtube_search_data')
    @patch('wrapper.get_video_ids_from_youtube_search_list')
    @patch('wrapper.fetch_youtube_video_data')
    @patch('wrapper.create_youtube_data_response')
    def test_fetch_video_data_from_youtube(self, mock_create_response, mock_fetch_video_data, mock_get_video_ids, mock_fetch_search_data):
        # Set up mock data
        search_query = 'flask'
        max_results = 5
        video_duration = 'short'
        mock_search_data = [{'videoId': 'abc123'}, {'videoId': 'def456'}]
        mock_video_ids = ['abc123', 'def456']
        mock_video_data = [{'id': 'abc123', 'title': 'Video 1'}, {'id': 'def456', 'title': 'Video 2'}]
        mock_response = [{'id': 'abc123', 'title': 'Video 1'}, {'id': 'def456', 'title': 'Video 2'}]

        # Configure mock behavior
        mock_fetch_search_data.return_value = mock_search_data
        mock_get_video_ids.return_value = mock_video_ids
        mock_fetch_video_data.return_value = mock_video_data
        mock_create_response.return_value = mock_response

        # Call the function to test
        result = fetch_video_data_from_youtube(search_query, max_results, video_duration)

        # Assertions
        mock_fetch_search_data.assert_called_once_with(search_query, max_results, video_duration)
        mock_get_video_ids.assert_called_once_with(mock_search_data)
        mock_fetch_video_data.assert_called_once_with(mock_video_ids, max_results)
        mock_create_response.assert_called_once_with(mock_video_data)
        self.assertEqual(result, mock_response)

if __name__ == "__main__":
    unittest.main()
