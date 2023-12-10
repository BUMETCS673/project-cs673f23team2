import React, { useEffect, useState  } from 'react';
import '../styles/VideoDetails.css';
import { useLocation, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faBookmark, faXmark, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from "firebase/auth";
import { get, getDatabase, ref, set } from "firebase/database";
import axios from "axios"
import { addWatchHistoy } from '../utils/axiosAPIUtils';

const VIDEO_HEIGHT = 880;
const VIDEO_WIDTH = 1720;

export default function VideoDetails() {

	const location = useLocation();
	const [rewards, setRewards] = useState(0);

	var updatedRewards = false;

	const [isLiked, setIsLiked] = useState(<FontAwesomeIcon icon={faBookmark} />)
	const [player, setPlayer] = useState(null)

	let totalWatchTime = 0
	let startTime = 0

	const navigate = useNavigate();
	const realtimeDatabase = getDatabase()


	let videoElement;

	const videoToPlay = location.state.video
	const isEducation = location.state.isEducation
	const videoList = location.state.videoList
	const currVideoPos = location.state.videoPosInList
	const searchKeyword = location.state.searchKeyword
	const section = location.state.section
	const videoDuration = location.state.videoDuration

	const user = getAuth().currentUser;

	var rewardUpdate;

	if (isEducation) {
		rewardUpdate = calculateRewardUpdate(videoDuration, 1, 2, 3);
	} 
	else {
		rewardUpdate = calculateRewardUpdate(videoDuration, -1, -2, -3);
	}
	
	console.log(rewardUpdate);
	
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

	function getPosOfVideoInList(videoList, videoId){
		const position = videoList.findIndex(video => video.id === videoId);
		return position
	}


	const resetSavedIcon = () => {
		setIsLiked(<FontAwesomeIcon icon={faBookmark} />)
	}

	const youtubePlayerOptions = {
		height: VIDEO_HEIGHT, 
		width: VIDEO_WIDTH,
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
		if(!isEducation && rewards >= 6) {
			setRewards(rewards=>rewards+rewardUpdate);
			console.log("onReady", rewards)
			updatedRewards = true;
		}
		else if (isEducation) {
			setRewards(rewards=>rewards+rewardUpdate);
			console.log("onReady", rewards)
			updatedRewards = true;
		}
		else if (rewards < 6) {
			alert("You don't have enough reward points to view Entertainment videos!")
			event.target.stopVideo();
			console.log(event.target)
		}
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

	useEffect(()=>{
		const auth = getAuth()
		const user = auth.currentUser
		if(user==null || user!=undefined) {
			axios.get("http://127.0.0.1:5000/reward-points", {headers: {userId: user.uid}
			}).then((response) => {
				setRewards(parseInt(response.data.rewards, 10))
			}).catch((error) => {
				console.log(error)
			})
		} else {
			alert("user undefined " + user)
		}
		
    }, [location.pathname])


	useEffect(()=> {
		if(rewards > 0) {
			const auth = getAuth()
			const user = auth.currentUser
			axios.get("http://127.0.0.1:5000/write-reward-points", {headers: {
				userId: user.uid, 
				rewards: rewards
			}
			}).then((response) => {
				console.log('update successful')
			}).catch((error) => {
				alert("updation of reward points error" + error)
			})
		}
	}, [rewards])



  	return (
		<div className="VideoDetailsContainer">
		<YouTube data-cy="videoElement" className="YoutubePlayerElement" videoId={videoToPlay.id} opts={youtubePlayerOptions} onReady={onReady} onStateChange={handleStateChange}/>
		<div data-cy="videoTitleElement" className="YoutubePlayerVideoTitle">{videoToPlay.title}</div>
		<div data-cy="videoCreatorElement" className="YoutubePlayerCreatorTitle">Video by {videoToPlay.creator}</div>
		<div data-cy="rewardsElement" className="YoutubePlayerCreatorTitle">{rewards}</div>
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