import React, { useState , useContext} from 'react';
import '../styles/VideoDetails.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faStar, faXmark } from '@fortawesome/free-solid-svg-icons';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

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

// Access the history object
const navigate = useNavigate();

// Function to go back to the browse page
  const goBackToBrowse = () => {
    navigate('/search');
  };

// State to track favorite status
const [isFavorite, setIsFavorite] = useState(false);


  // Function to toggle favorite status
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log(isFavorite);
  }
  
  return (
    <div className="VideoDetailsContainer">
        <YouTube data-cy="videoElement" className="YoutubePlayerElement" videoId={videoToPlay.id} opts={youtubePlayerOptions} />
        <div data-cy="videoTitleElement" className="YoutubePlayerVideoTitle">{videoToPlay.title}</div>
        <div data-cy="videoCreatorElement" className="YoutubePlayerCreatorTitle">Video by {videoToPlay.creator}</div>
        <div className='YoutubePlayerButtonStack'>
          <button data-cy="EntertainmentMode" className="WatchExperienceButtons" onClick={goBackToBrowse}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <button 
            data-cy="EntertainmentMode" 
            className='WatchExperienceButtons'>
                <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button data-cy="EntertainmentMode" className="WatchExperienceButtons" onClick={toggleFavorite}>
            {isFavorite === true ? <HeartFilled style={{ color: '#FF0000' }} /> : <HeartOutlined style={{ color: '#FF0000' }} />}
          </button>
          
          {/* <button 
            data-cy="EntertainmentMode" 
            className='WatchExperienceButtons'>
                <FontAwesomeIcon icon={faStar} />
          </button> */}
          <button 
            data-cy="EntertainmentMode" 
            className='WatchExperienceButtons'>
                <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
  );
}