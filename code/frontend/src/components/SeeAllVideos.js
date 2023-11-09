import '../styles/Search.css'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import '../styles/EducationalVideoFeed.css'
import { isSearchValid } from './EducationalVideoFeed';


export default function SeeAllVideos() {
    
  const location = useLocation();
  const query = location.state.query
  const [searchKeyword, setSearchKeyword] = useState(query);
  const [videoList, setVideoList] = useState([])

  const handleSearchInput = (event) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword)
  }

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
        handleSearchClick();
    }
  };

  const handleSearchClick = () => {
    if(isSearchValid(searchKeyword)){
        getYoutubeVideosFromQuery(searchKeyword, 10)
    }
  }
  

  function getYoutubeVideosFromQuery(query, count){
    var API_KEY = "AIzaSyDIWl549UW4KBX1j01bFl56kRc8lWeUdLU"
    axios.get("https://www.googleapis.com/youtube/v3/search?key=" + API_KEY + "&q=" + query + "&type=video&part=snippet&maxResults=20").then((response) => {
      setVideoList(response.data.items)
    })
  }

    useEffect(()=>{
    getYoutubeVideosFromQuery(query)
    },[])


    return (
        <div>
          <div className='NavigationStackContainer'>
            <input
              data-cy='searchBarElement'
              className='SearchBarElement'
              type='text'
              value={searchKeyword}
              onChange={handleSearchInput}
              onKeyDown={handleInputKeyPress}
            />
            <div className='videoTitleElement'>More Videos for {searchKeyword}</div>
          </div>
          <div className='VideoStackContainer'>
            {videoList !== undefined && videoList.length > 0 ? (
              <div className='VideoGrid'>
                {videoList.map((video) => (
                  <div className='VideoItem' key={video.id.videoId}>
                    <iframe
                      title='myframe'
                      width='420'
                      height='315'
                      src={`https://www.youtube.com/embed/${video.id.videoId}`}
                      frameBorder='0'
                      allowFullScreen
                    ></iframe>
                    <div className='VideoItem' key={video.id.videoId}>
                      <div className='VideoInfo'>
                        <h3 className='VideoTitle'>{video.snippet.title}</h3>
                        <p className='ChannelName'>{video.snippet.channelTitle}</p>
                        <p className='Views'>{video.snippet.viewCount} views</p>
                        <p className='PostedDate'>Posted on {video.snippet.publishedAt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No videos found.</p>
            )}
          </div>
        </div>
      ); 
      
            }