import { useLocation } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useLayoutEffect } from 'react'
import '../styles/EducationalVideoFeed.css'
import VideoGridContainer from './VideoGridContainer';
import { fetchVideosFromYouTube, addSearchKeywordToRealtimeDatabase } from '../utils/axiosAPIUtils';
import SearchBarComponent from './SearchBarComponent';

export function isSearchValid(inputText) {
  const trimmedInput = inputText.trim();
  return trimmedInput.length > 1;
}

export default function EducationalVideoFeed() {
  const location = useLocation();
  const query = location.state.query
  const isEducation = location.state.educationStatus

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
        getYoutubeVideosFromQuery(searchKeyword, 50)
        addSearchKeywordToRealtimeDatabase("EducationFeed", searchKeyword)
  }
}


function getYoutubeVideosFromQuery(query, count){
  fetchVideosFromYouTube(query, count, "short", setShortVideoList);
  fetchVideosFromYouTube(query, count, "medium", setMediumVideoList);
  fetchVideosFromYouTube(query, count, "long", setLongVideoList);
}

useLayoutEffect(()=>{
  getYoutubeVideosFromQuery(query, 50)
},[])

  return (
      <div className='NavigationStackContainer'>
      {isEducation && (
        <SearchBarComponent
          value={searchKeyword}
          onChange={handleSearchInput}
          onKeyDown={handleInputKeyPress}/>
      )}
      <VideoGridContainer data-cy='shortDurationVideos' query={searchKeyword} videoDuration="short" videoList={shortVideoList} section={"EducationFeed"}/>
      <VideoGridContainer data-cy='mediumDurationVideos' query={searchKeyword} videoDuration="medium" videoList={mediumVideoList} section={"EducationFeed"}/>
      <VideoGridContainer data-cy='longDurationVideos' query={searchKeyword} videoDuration="long" videoList={longVideoList} section={"EducationFeed"}/>
      </div>
  )
}
