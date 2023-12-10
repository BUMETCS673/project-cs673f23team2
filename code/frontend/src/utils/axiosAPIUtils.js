import axios from 'axios';
import { getAuth } from 'firebase/auth';

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


export const addSearchKeywordToRealtimeDatabase = (section, keyword) => {
  const auth = getAuth()
  const user = auth.currentUser
  axios.get("http://127.0.0.1:5000/addtosearchhistory", {
      params: {
        section: section,
        keyword: keyword,
        userId: user.uid
      },
    }).then((response) => {
      console.log(response.data)
    });
}

export const addWatchHistoy = (watchtime, keyword, section, videoDetails) => {
  console.log(videoDetails)
  const auth = getAuth()
  const user = auth.currentUser
  axios.get("http://127.0.0.1:5000/addwatchhistory", {
      params: {
        watchtime: watchtime,
        section: section,
        keyword: keyword,
        userId: user.uid,
        videoDetails: JSON.stringify(videoDetails)
      },
    }).then((response) => {
      console.log(response.data)
    });
}

export const addFirstClickVideoSectionData = (videoDuration, section) => {
  const auth = getAuth()
  const user = auth.currentUser
  axios.get("http://127.0.0.1:5000/addFirstClickInfo", {
      params: {
        section: section,
        userId: user.uid,
        videoDuration: videoDuration
      },
    }).then((response) => {
      console.log(response.data)
    });
}

export const getWatchVideoHistory = () => {
  const auth = getAuth()
  const user = auth.currentUser
  axios.get("http://127.0.0.1:5000/getWatchVideoHistory", {
      params: {
        userId: user.uid,
      },
    }).then((response) => {
      console.log(response.data)
    });
}