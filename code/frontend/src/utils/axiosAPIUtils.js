import axios from 'axios';

export const fetchVideosFromYouTube = (query, count, duration, videoList) => {
    axios.get("http://127.0.0.1:5000/fetchvideos", {
      params: {
        q: query,
        maxResults: count,
        videoDuration: duration,
      },
    }).then((response) => {
      videoList(response.data);
    });
  };