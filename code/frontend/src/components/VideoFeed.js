import { useLocation } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useLayoutEffect , useEffect } from 'react'
import '../styles/EducationalVideoFeed.css'
import VideoGridContainer from './VideoGridContainer';
import { fetchVideosFromYouTube } from '../utils/axiosAPIUtils';
import SearchBarComponent from './SearchBarComponent';

export function isSearchValid(inputText) {
    const trimmedInput = inputText.trim();
    return trimmedInput.length > 1;
}

export default function VideoFeed({section}) {
	const location = useLocation();
	const query = location.state.query
	const isEducation = location.state.educationStatus

    // Use a local variable for the input value
    const [inputValue, setInputValue] = useState(query);
    const [searchKeyword, setSearchKeyword] = useState(query);

    const [shortVideoList, setShortVideoList] = useState([]);
    const [mediumVideoList, setMediumVideoList] = useState([]);
    const [longVideoList, setLongVideoList] = useState([]);

    const handleSearchInput = (event) => {
        // Update the local variable, not the state
        setInputValue(event.target.value);
    };

    const handleInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearchClick();
        }
    };

    function getYoutubeVideosFromQuery(query, count) {
        fetchVideosFromYouTube(query, count, "short", setShortVideoList);
        fetchVideosFromYouTube(query, count, "medium", setMediumVideoList);
        fetchVideosFromYouTube(query, count, "long", setLongVideoList);
    }
  
	const handleSearchClick = () => {
		if(isSearchValid(searchKeyword)){
			getYoutubeVideosFromQuery(searchKeyword, 1)
		}
	}

	useEffect(() => {
		// Ensure that the query is valid before fetching videos
		if (isSearchValid(query)) {
			getYoutubeVideosFromQuery(query);
		}
	  }, [query]);

	useEffect(() => {
		getYoutubeVideosFromQuery(query); // Fetch videos on initial load
		}, [location.key]); // Update when the key changes
	

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
			<VideoGridContainer data-cy='shortDurationVideos' query={searchKeyword} videoDuration="short" videoList={shortVideoList} isEducation={isEducation} section={section}/>
			<VideoGridContainer data-cy='mediumDurationVideos' query={searchKeyword} videoDuration="medium" videoList={mediumVideoList} isEducation={isEducation} section={section}/>
			<VideoGridContainer data-cy='longDurationVideos' query={searchKeyword} videoDuration="long" videoList={longVideoList} isEducation={isEducation} section={section}/>

			
		</div>
	)
}
