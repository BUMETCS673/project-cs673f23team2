import React from 'react';

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
        <link
          rel="stylesheet"
          href="../styles/VideoHistory.css"
          type="text/css"
          media="all"
        />
      </head>
      <body>
        <div className="home-container">
          <button id="home">🔄 Home</button>
        </div>
        <div className="header">
          <h1>VIDEO HISTORY</h1>
        </div>

        <div className="video-history">
          <h2>Flask Tutorial</h2>
          <div className="video-item">
            <div className="video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/Z1RJmh_OqeA"
                title="YouTube video player"
                allowfullscreen
              ></iframe>
            </div>
            <div className="watch-time">Watch Time: 20:23 mins</div>
          </div>
          <h2>Docker Tutorial</h2>
          <div className="video-item">
            <div className="video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/pTFZFxd4hOI"
                title="YouTube video player"
                allowfullscreen
              ></iframe>
            </div>
            <div className="watch-time">Watch Time: 51:00 mins</div>
          </div>
          <h2>Java Tutorial</h2>
          <div className="video-item">
            <div className="video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/xk4_1vDrzzo"
                title="YouTube video player"
                allowfullscreen
              ></iframe>
            </div>
            <div className="watch-time">Watch Time: 61:00 mins</div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default VideoHistory;