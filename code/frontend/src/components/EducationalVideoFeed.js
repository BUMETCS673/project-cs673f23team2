import { useLocation } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useLayoutEffect } from 'react'
import '../styles/EducationalVideoFeed.css'
import VideoGridContainer from './VideoGridContainer';

export function isSearchValid(inputText) {
  const trimmedInput = inputText.trim();
  return trimmedInput.length > 1;
}

export default function EducationalVideoFeed() {
  const location = useLocation();
  const query = location.state.query
  const [searchKeyword, setSearchKeyword] = useState(query);
  
  const [shortVideoList, setShortVideoList] = useState([])

  const [mediumVideoList, setMediumVideoList] = useState([])
  const [longVideoList, setLongVideoList] = useState([])
  

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
        getYoutubeVideosFromQuery(searchKeyword, 5)
  }
}


function getYoutubeVideosFromQuery(query, count){
  axios.get("http://127.0.0.1:5000/fetchvideos", {params: {
        q: query,
        maxResults: count,
        videoDuration: "short"
      }
    }).then((response) => {
        setShortVideoList(response.data)    
      })

      axios.get("http://127.0.0.1:5000/fetchvideos", {params: {
        q: query,
        maxResults: count,
        videoDuration: "medium"
      }
    }).then((response) => {
        setMediumVideoList(response.data)    
      })

      axios.get("http://127.0.0.1:5000/fetchvideos", {params: {
        q: query,
        maxResults: count,
        videoDuration: "long"
      }
    }).then((response) => {
        setLongVideoList(response.data)    
      })
}

useLayoutEffect(()=>{
  getYoutubeVideosFromQuery(query, 5)
},[])

  return (
      <div className='NavigationStackContainer'>
      <input 
                data-cy="searchBarElement" 
                className='SearchBarElement' 
                type="text"
                value={searchKeyword}
                onChange={handleSearchInput}
                onKeyDown={handleInputKeyPress}/>
      <VideoGridContainer query={searchKeyword} videoDuration="short" videoList={shortVideoList}/>
      <VideoGridContainer query={searchKeyword} videoDuration="medium" videoList={mediumVideoList}/>
      <VideoGridContainer query={searchKeyword} videoDuration="long" videoList={longVideoList}/>
      </div>
  )
}
