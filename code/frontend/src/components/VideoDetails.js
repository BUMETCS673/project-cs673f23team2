import React from 'react';
import ReactDOM from 'react-dom';

const videos = [
  {
    url: 'https://www.youtube.com/embed/SqcY0GlETPk',
    title: 'React Tutorial for Beginners',
    channel: 'Programming with Mosh',
  }
];
const VideoDetails = () => {
  const video = videos[0];
  return (
    <div className="container">
      <button type="button">
        <img src="logo.png" alt="Logo" />
      </button>
      <div className="profile-card">
        <img src="profile-pic.jpg" alt="Profile picture" />
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
            <h2 id="video-owner">{video.channel}</h2>
        </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<VideoDetails />, document.getElementById('root'));

export default VideoDetails;