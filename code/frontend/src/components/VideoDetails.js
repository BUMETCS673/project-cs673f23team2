import React, { useEffect, useState } from 'react';
import '../styles/VideoDetails.css';
import { useLocation, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faBookmark, faXmark, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from "firebase/auth";
import { get, getDatabase, ref, set } from "firebase/database";
import axios from "axios"
import { addWatchHistoy } from '../utils/axiosAPIUtils';

// Constants for video dimensions
const VIDEO_HEIGHT = 880;
const VIDEO_WIDTH = 1720;

export default function VideoDetails() {
    // Hook for accessing the URL location and navigation
	const location = useLocation();
	const navigate = useNavigate();
	
    // State hooks for managing component state
	const [rewards, setRewards] = useState(0);
	const [isLiked, setIsLiked] = useState(<FontAwesomeIcon icon={faBookmark} />)
	const [player, setPlayer] = useState(null)

    // Variables for tracking video watch time
	let totalWatchTime = 0;
	let startTime = 0;

    // Access to Firebase Realtime Database
	const realtimeDatabase = getDatabase();

    // Extracting state passed through navigation
	const videoToPlay = location.state.video;
    // ... additional state variables extracted here

    // User authentication
	const user = getAuth().currentUser;

    // Function to calculate reward points based on video duration
	function calculateRewardUpdate(duration, shortPoints, mediumPoints, longPoints) {
		switch (duration) {
			case "short":
				return shortPoints;
			case "medium":
				return mediumPoints;
			default:
				return longPoints;
		}
	}

    // Function to get the position of the video in the list
	function getPosOfVideoInList(videoList, videoId) {
		return videoList.findIndex(video => video.id === videoId);
	}

    // Resets the saved (liked) icon
	const resetSavedIcon = () => {
		setIsLiked(<FontAwesomeIcon icon={faBookmark} />)
	}

    // YouTube player options
	const youtubePlayerOptions = {
		height: VIDEO_HEIGHT,
		width: VIDEO_WIDTH,
		playerVars: {
			autoplay: 1,
		},
	}

    // Navigation handlers
	const handleCloseAction = () => navigate('/search');
	const handlePreviousAction = () => { /* logic for handling previous action */ };
	const handleNextAction = () => { /* logic for handling next action */ };

    // Handler for like/dislike action
	const handleLikedAction = () => {
		// Firebase Realtime Database logic for liking a video
	}

    // Check if the current video is liked
	const checkIfVideoIsLiked = () => {
		// Firebase Realtime Database logic to check if video is liked
	}

    // Event handler when YouTube player is ready
	const onReady = (event) => {
		// Logic to handle when YouTube player is ready
	};

    // Event handler for state change in YouTube player
	const handleStateChange = (event) => {
		// Logic to handle state change in YouTube player
	};

    // Effect hook for checking if video is liked when component mounts
	useEffect(() => {
		checkIfVideoIsLiked()
	}, []);

    // Effect hook for fetching and updating reward points
	useEffect(() => { /* Logic for fetching and updating reward points */ }, [location.pathname, rewards]);

	return (
		<div className="VideoDetailsContainer">
			{/* YouTube player and other UI elements */}
			<YouTube /* ...props */ />
			<div /* ...props */>{videoToPlay.title}</div>
			<div /* ...props */>Video by {videoToPlay.creator}</div>
			<div /* ...props */>{rewards}</div>
			<div className='YoutubePlayerButtonStack'>
				{/* Navigation and action buttons */}
			</div>
		</div>
	);
}
