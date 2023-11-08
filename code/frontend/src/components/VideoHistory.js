import React from 'react';
import '../styles/VideoHistory.css';

// Define an array of video objects with titles and URLs
const videos = [
  {
    title: 'Flask Tutorial',
    url: 'https://www.youtube.com/embed/Z1RJmh_OqeA',
    watchTime: '20:23 mins',
  },
  {
    title: 'Docker Tutorial',
    url: 'https://www.youtube.com/embed/pTFZFxd4hOI',
    watchTime: '51:00 mins',
  },
  {
    title: 'Java Tutorial',
    url: 'https://www.youtube.com/embed/xk4_1vDrzzo',
    watchTime: '61:00 mins',
  },
];

function VideoHistory() {
  return (
    <div>
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>Video History</title>
      </head>
      <body>
        <div className="home-container">
          <button id="home">🔄 Home</button>
        </div>
        <div className="header">
          <h1>VIDEO HISTORY</h1>
        </div>

        <div className="video-history">
          {videos.map((video, index) => (
            <div key={index}>
              <h2>{video.title}</h2>
              <div className="video-item">
                <div className="video-wrapper">
                  <iframe
                    src={video.url}
                    title="YouTube video player"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="watch-time">Watch Time: {video.watchTime}</div>
              </div>
            </div>
          ))}
        </div>
      </body>
    </div>
  );
}

export default VideoHistory;
