import { useLocation } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../styles/EducationalVideoFeed.css'
import { useNavigate } from 'react-router-dom';

export function isSearchValid(inputText) {
  const trimmedInput = inputText.trim();
  return trimmedInput.length > 1;
}

export default function EducationalVideoFeed() {
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
  let navigate = useNavigate();
  const seeMoreVideosClick = () => {
    navigate('/all',{ state: {query:searchKeyword} });
  }


  function getYoutubeVideosFromQuery(query, count){
    var API_KEY = "AIzaSyDIWl549UW4KBX1j01bFl56kRc8lWeUdLU"
    axios.get("https://www.googleapis.com/youtube/v3/search?key=" + API_KEY + "&q=" + query + "&type=video&part=snippet").then((response) => {
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
                data-cy="searchBarElement" 
                className='SearchBarElement' 
                type="text"
                value={searchKeyword}
                onChange={handleSearchInput}
                onKeyDown={handleInputKeyPress}/>
      <div className='videoTitleElement'>Videos for {searchKeyword}</div>
      </div>
      <div className='VideoStackContainer'>
        {videoList != undefined && videoList.length > 0 ? (
          <div className='VideoGrid'>
            {videoList.map((video) => (
              <Link to={`/video/${video.id.videoId}`} key={video.id.videoId}>
              <iframe
                width="420"
                height="315"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </Link>
            ))}
          </div>
        ) : (
          <p>No videos found.</p>
        )}
    </div>
    <button 
                data-cy="seeAllButton" 
                className='SearchButtonElement'
                onClick={seeMoreVideosClick}>
                    See more </button>
    </div>
  )
}
