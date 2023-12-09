import React, { useEffect, useState, useLayoutEffect  } from 'react';
import '../styles/VideoDetails.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import YouTube, { YouTubeProps } from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faBookmark, faXmark, faSquareCheck, faStar } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from "firebase/auth";
import { get, getDatabase, ref, set } from "firebase/database";
import axios from "axios"
import { addWatchHistoy } from '../utils/axiosAPIUtils';

export default function VideoDetails() {
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	const location = useLocation();
	const [rewards, setRewards] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);

	const [isLiked, setIsLiked] = useState(<FontAwesomeIcon icon={faBookmark} />)
	const [player, setPlayer] = useState(null)

	let totalWatchTime = 0
	let startTime = 0

	const navigate = useNavigate();
	const realtimeDatabase = getDatabase()

	const videoToPlay = location.state.video
	const isEducation = location.state.isEducation
	const videoList = location.state.videoList
	const currVideoPos = location.state.videoPosInList
	const searchKeyword = location.state.searchKeyword
	const section = location.state.section

	const user = getAuth().currentUser;

	var rewardUpdate;
	if (isEducation) { // add points if video is an educational video
		rewardUpdate = 10;
	} else { // deduct reward points if video is not educational video
		rewardUpdate = -10;
	}

	function getPosOfVideoInList(videoList, videoId){
		const position = videoList.findIndex(video => video.id === videoId);
		return position
	}


	const resetSavedIcon = () => {
		setIsLiked(<FontAwesomeIcon icon={faBookmark} />)
	}

	const youtubePlayerOptions = {
		height: '880',
		width: '1720',
		playerVars: {
			autoplay: 1,
		},
	}

	const handleCloseAction = () => {
		navigate('/search');
	}

	const handlePreviousAction = () => {
		resetSavedIcon()
		if(currVideoPos == 0){
			navigate('/watchvideo', {state: {video: videoList[videoList.length - 1], videoList: videoList, videoPosInList: getPosOfVideoInList(videoList, videoList[videoList.length - 1].id)}})
		}else{
			navigate('/watchvideo', {state: {video: videoList[currVideoPos - 1], videoList: videoList, videoPosInList: getPosOfVideoInList(videoList, videoList[currVideoPos - 1].id)}})
		}
	}

	const handleNextAction = () => {
		resetSavedIcon()
		if(currVideoPos == (videoList.length - 1)){
			navigate('/watchvideo', {state: {video: videoList[0], videoList: videoList, videoPosInList: getPosOfVideoInList(videoList, videoList[0].id)}})
		}else{
			navigate('/watchvideo', {state: {video: videoList[currVideoPos + 1], videoList: videoList, videoPosInList: getPosOfVideoInList(videoList, videoList[currVideoPos + 1].id)}})
		}
	}

	const handleLikedAction = () => {
		const likedVideoRef = ref(realtimeDatabase, 'users/' + user.uid + '/likedVideos/' + videoToPlay.id);

		get(likedVideoRef).then((snapshot) => {
			if(snapshot.exists()){
			set(ref(realtimeDatabase, 'users/' + user.uid + '/likedVideos/' + videoToPlay.id), null);
			setIsLiked(<FontAwesomeIcon icon={faBookmark} />)
			}else{
			set(ref(realtimeDatabase, 'users/' + user.uid + '/likedVideos/' + videoToPlay.id), videoToPlay);
			setIsLiked(<FontAwesomeIcon icon={faSquareCheck} />)
			}
		})
	}

	const checkIfVideoIsLiked = () => {
		const likedVideoRef = ref(realtimeDatabase, 'users/' + user.uid + '/likedVideos/' + videoToPlay.id);
		get(likedVideoRef).then((snapshot) => {
			if(snapshot.exists()){
			setIsLiked(<FontAwesomeIcon icon={faSquareCheck} />)
			}else{
			setIsLiked(<FontAwesomeIcon icon={faBookmark} />)
			}
		})
	}

	const onReady = (event) => {
		setPlayer(event.target);
		setIsPlaying(true);
	};


	const handleStateChange = (event) => {
		if (event.data === 1) {
			startTime = startTime + player.getCurrentTime()
		} else if (event.data === 2  || event.data === 0) {
			totalWatchTime = totalWatchTime + (player.getCurrentTime() - startTime)
			addWatchHistoy(totalWatchTime, searchKeyword, section, videoToPlay)
			console.log("Time : current time => " + player.getCurrentTime() + " - startTime => " + startTime + " = " + (player.getCurrentTime() - startTime))
			console.log("Time : Total watch time => " + totalWatchTime)
			startTime = 0
		}
	};

	useEffect(() => {
		checkIfVideoIsLiked()
	}, []);
	

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
		checkIfVideoIsLiked()
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

	function onPause(event){
		setIsPlaying(false);
	}


  	return (
		<div className="VideoDetailsContainer">
			<YouTube data-cy="videoElement" className="YoutubePlayerElement" videoId={videoToPlay.id} opts={youtubePlayerOptions} onReady={onReady} onStateChange={handleStateChange} onPause={onPause}/>
			<div data-cy="videoTitleElement" className="YoutubePlayerVideoTitle">{videoToPlay.title}</div>
			<div data-cy="videoCreatorElement" className="YoutubePlayerCreatorTitle">Video by {videoToPlay.creator}</div>
			<div className='YoutubePlayerButtonStack'>
			<button 
				data-cy="EntertainmentMode" 
				className='WatchExperienceButtons'
				onClick={() => handleCloseAction()} >
					<FontAwesomeIcon icon={faXmark} />
			</button>
			<button 
				data-cy="EntertainmentMode" 
				className='WatchExperienceButtons'
				onClick={() => handlePreviousAction()}>
					<FontAwesomeIcon icon={faArrowLeft} />
			</button>
			<button 
				data-cy="EntertainmentMode" 
				className='WatchExperienceButtons'
				onClick={() => handleLikedAction()}
				>
					{isLiked}
			</button>
			<button 
				data-cy="EntertainmentMode" 
				className='WatchExperienceButtons'
				onClick={() => handleNextAction()}>
					<FontAwesomeIcon icon={faArrowRight} />
			</button>
			</div>
		</div>
	);
}