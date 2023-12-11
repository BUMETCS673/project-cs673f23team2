import { useLocation } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useLayoutEffect , useEffect } from 'react'
import '../styles/EducationalVideoFeed.css'
import VideoGridContainer from './VideoGridContainer';
import { fetchVideosFromYouTube } from '../utils/axiosAPIUtils';
import SearchBarComponent from './SearchBarComponent';

// Function to check if the search query is valid
export function isSearchValid(inputText) {
	const trimmedInput = inputText.trim();
	return trimmedInput.length > 1;
}

export default function VideoFeed({section}) {
	const location = useLocation();
	const query = location.state.query
	const isEducation = location.state.educationStatus

	const [searchKeyword, setSearchKeyword] = useState(query);

	const [shortVideoList, setShortVideoList] = useState([])

	const [mediumVideoList, setMediumVideoList] = useState([])
	const [longVideoList, setLongVideoList] = useState([])

// Function to handle changes in the search input
	const handleSearchInput = (event) => {
		const keyword = event.target.value;
		setSearchKeyword(keyword)
	}
// Function to handle Enter key press in the search input

	const handleInputKeyPress = (event) => {
		if (event.key === 'Enter') {
			handleSearchClick();
		}
	};

	// Function to handle the search button click
	const handleSearchClick = () => {
		if(isSearchValid(searchKeyword)){
			getYoutubeVideosFromQuery(searchKeyword, 50)
		}
	}
// Fetch videos from YouTube when the query changes

	useEffect(() => {
		// Ensure that the query is valid before fetching videos
		if (isSearchValid(query)) {
			getYoutubeVideosFromQuery(query);
		}
	  }, [query]);
// Fetch videos from YouTube when the component mounts or location key changes
	useEffect(() => {
		getYoutubeVideosFromQuery(query); // Fetch videos on initial load
		}, [location.key]); // Update when the key changes
	
// Function to fetch YouTube videos based on query and duration
	function getYoutubeVideosFromQuery(query, count){
		fetchVideosFromYouTube(query, count, "short", setShortVideoList);
		fetchVideosFromYouTube(query, count, "medium", setMediumVideoList);
		fetchVideosFromYouTube(query, count, "long", setLongVideoList);
	}
// Fetch videos from YouTube on component mount
	useLayoutEffect(()=>{
		getYoutubeVideosFromQuery(query, 50)
	},[])
// Render the component
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