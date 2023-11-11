import React from 'react';
import '../styles/VideoDetails.css';
import { Link, useLocation } from 'react-router-dom';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faStar, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function VideoDetails() {

  const location = useLocation();
  const videoToPlay = location.state.video
  const youtubePlayerOptions = {
    height: '880',
    width: '1720',
    playerVars: {
      autoplay: 1,
    },
  }
  
  return (
    <div className="VideoDetailsContainer">
        <YouTube data-cy="videoElement" className="YoutubePlayerElement" videoId={videoToPlay.id} opts={youtubePlayerOptions} />
        <div data-cy="videoTitleElement" className="YoutubePlayerVideoTitle">{videoToPlay.title}</div>
        <div data-cy="videoCreatorElement" className="YoutubePlayerCreatorTitle">Video by {videoToPlay.creator}</div>
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