import React, { useState, useEffect, useLayoutEffect } from 'react';
import '../styles/VideoDetails.css';
import { Link, useLocation } from 'react-router-dom';
import YouTube, { YouTubeProps } from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faStar, faXmark } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from "firebase/auth";
import axios from "axios";

export default function VideoDetails() {
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	const location = useLocation();
	const [rewards, setRewards] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);

	const videoToPlay = location.state.video
	const isEducation = location.state.isEducation

	var rewardUpdate;
	if (isEducation) { // add points if video is an educational video
		rewardUpdate = 10;
	} else { // deduct reward points if video is not educational video
		rewardUpdate = -10;
	}

	const youtubePlayerOptions = {
		height: '880',
		width: '1720',
		playerVars: {
			autoplay: 1,
		},
	}

	useLayoutEffect(()=>{
		const auth = getAuth()
		const user = auth.currentUser
		if(user!=null || user!=undefined) {
			axios.get("http://127.0.0.1:5000/reward-points", {params: {userId: user.uid}
			}).then((response) => {
				setRewards(response.data.rewards)
			}).catch((error) => {
				setRewards(0);
			})
		} else {
			setRewards(0);
		}
		
    }, [])

	useEffect(() => {
		let interval;
		let timeout;

		if (isPlaying) {
			interval = setInterval(() => { 
				setRewards(rewards => rewards+rewardUpdate);
				clearInterval(interval);
			}, 600000); // 10 minutes
		} else {
			clearInterval(interval);
			clearTimeout(timeout);
		}

		return () => {
			clearInterval(interval);
			clearTimeout(timeout);
		};
	}, [isPlaying]);

	function onReady(event){
		setIsPlaying(true);
	}

	function onPause(event){
		setIsPlaying(false);
	}

	return (
		<div className="VideoDetailsContainer">
		<YouTube data-cy="videoElement" className="YoutubePlayerElement" videoId={videoToPlay.id} opts={youtubePlayerOptions} onReady={onReady} onPause={onPause}/>
		<div data-cy="videoTitleElement" className="YoutubePlayerVideoTitle">{videoToPlay.title}</div>
		<div data-cy="videoCreatorElement" className="YoutubePlayerCreatorTitle">Video by {videoToPlay.creator}</div>
		<div data-cy="rewardsElement" className="YoutubePlayerCreatorTitle">{rewards}</div>
		<div className='YoutubePlayerButtonStack'>
			<button 
				data-cy="EntertainmentMode" 
				className='WatchExperienceButtons'>
				<FontAwesomeIcon icon={faXmark} />
			</button>
			<button 
				data-cy="EntertainmentMode" 
				className='WatchExperienceButtons'>
				<FontAwesomeIcon icon={faArrowLeft} />
			</button>
			<button 
				data-cy="EntertainmentMode" 
				className='WatchExperienceButtons'>
				<FontAwesomeIcon icon={faStar} />
			</button>
			<button 
				data-cy="EntertainmentMode" 
				className='WatchExperienceButtons'>
				<FontAwesomeIcon icon={faArrowRight} />
			</button>
		</div>
		</div>
	);
}