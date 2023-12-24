import React, { useEffect, useState } from 'react';
import '../styles/VideoDetails.css';
import { useLocation, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faBookmark, faXmark, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from "firebase/auth";
import { get, getDatabase, ref, set } from "firebase/database";
import axios from "axios";
import { addWatchHistoy } from '../utils/axiosAPIUtils';

const VIDEO_HEIGHT = 550;
const VIDEO_WIDTH = 1080;

export default function VideoDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const realtimeDatabase = getDatabase();
  const user = getAuth().currentUser;

  const videoToPlay = location.state.video;
  const isEducation = location.state.isEducation;
  const videoList = location.state.videoList;
  const currVideoPos = location.state.videoPosInList;
  const searchKeyword = location.state.searchKeyword;
  const section = location.state.section;
  const videoDuration = location.state.videoDuration;

  const [rewards, setRewards] = useState(0);
  const [isLiked, setIsLiked] = useState(<FontAwesomeIcon icon={faBookmark} />);
  const [player, setPlayer] = useState(null);
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  let totalWatchTime = 0;
  let startTime = 0;
  var rewardUpdate;

  if (isEducation) {
    rewardUpdate = calculateRewardUpdate(videoDuration, 1, 2, 3);
  } else {
    rewardUpdate = calculateRewardUpdate(videoDuration, -1, -2, -3);
  }

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

  function getPosOfVideoInList(videoList, videoId) {
    return videoList.findIndex(video => video.id === videoId);
  }

  const resetSavedIcon = () => {
    setIsLiked(<FontAwesomeIcon icon={faBookmark} />);
  }

  const handleCloseAction = () => {
    navigate('/search');
  }

  const handlePreviousAction = () => {
    resetSavedIcon();
    let newPos = currVideoPos === 0 ? videoList.length - 1 : currVideoPos - 1;
    navigate('/watchvideo', { state: { video: videoList[newPos], videoList: videoList, videoPosInList: newPos } });
  }

  const handleNextAction = () => {
    resetSavedIcon();
    let newPos = currVideoPos === (videoList.length - 1) ? 0 : currVideoPos + 1;
    navigate('/watchvideo', { state: { video: videoList[newPos], videoList: videoList, videoPosInList: newPos } });
  }

  const handleLikedAction = () => {
    // ... existing logic for handleLikedAction ...
  }

  const checkIfVideoIsLiked = () => {
    // ... existing logic for checkIfVideoIsLiked ...
  }

  const onReady = (event) => {
    setPlayer(event.target);
    // ... existing logic for onReady ...
  };

  const handleStateChange = (event) => {
    if (event.data === 1) { // Video is playing
      if (!timerInterval) {
        const interval = setInterval(() => {
          setTimer(prevTimer => prevTimer + 1);
        }, 1000);
        setTimerInterval(interval);
      }
      startTime = player.getCurrentTime();
    } else if (event.data === 2 || event.data === 0) { // Video is paused or ended
      if (timerInterval) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
      totalWatchTime = totalWatchTime + (player.getCurrentTime() - startTime);
      addWatchHistoy(totalWatchTime, searchKeyword, section, videoToPlay);
      startTime = 0;
    }
  };

  useEffect(() => {
    checkIfVideoIsLiked();
  }, []);

  useEffect(() => {
    // ... existing logic for fetching and updating rewards ...
  }, [location.pathname, rewards]);

  return (
    <div className="VideoDetailsContainer">
      <YouTube data-cy="videoElement" className="YoutubePlayerElement" videoId={videoToPlay.id} opts={{ height: VIDEO_HEIGHT, width: VIDEO_WIDTH, playerVars: { autoplay: 1 } }} onReady={onReady} onStateChange={handleStateChange}/>
      <div data-cy="videoTitleElement" className="YoutubePlayerVideoTitle">{videoToPlay.title}</div>
      <div data-cy="videoCreatorElement" className="YoutubePlayerCreatorTitle">Video by {videoToPlay.creator}</div>
      <button data-cy="rewardsElement" className="YoutubePlayerRewardPoints">Reward Points: {rewards}</button>
      <div className='YoutubePlayerButtonStack'>
        {/* Existing buttons here */}
      </div>
      <button data-cy="closeButton" className="WatchExperienceButtons" onClick={handleCloseAction}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <button data-cy="previousButton" className="WatchExperienceButtons" onClick={handlePreviousAction}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button data-cy="likeButton" className="WatchExperienceButtons" onClick={handleLikedAction}>
          {isLiked}
        </button>
        <button data-cy="nextButton" className="WatchExperienceButtons" onClick={handleNextAction}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      <div>Timer: {timer} seconds</div>
    </div>
  );
}