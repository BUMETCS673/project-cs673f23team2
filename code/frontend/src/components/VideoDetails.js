import React from 'react';
import '../styles/VideoDetails.css';
import { Link } from 'react-router-dom';
const videos = [
  {
    url: 'https://www.youtube.com/embed/SqcY0GlETPk',
    title: 'React Tutorial for Beginners',
    channel: 'Programming with Mosh',
  }
];

function VideoDetails() {
  const video = videos[0];
  return (
    <div>
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </head>
      <body>
      <div className="home-container">
      <Link to="/search">
          <button id="home">Home</button>
        </Link>
        </div>
      <div className="profile-card">
        {/* <img src="profile-pic.jpg" alt="Profile picture" /> */}
        <h4>Reward Points: <span id="reward-points">100</span></h4>
      </div>
      <div className="video-player">
        <h1>Video Player</h1>
        <iframe
                width="420"
                height="315"
                src={video.url}
                frameBorder="0"
                allowFullScreen
              ></iframe>
        <div className="controls">
        <div class="video-details">
            <h2 id="video-title">{video.title}</h2>
            <h4 id="video-owner">{video.channel}</h4>
        </div>
        </div>
      </div>
      </body>
      </div>
  );
}

export default VideoDetails;