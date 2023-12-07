import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import '../styles/SessionTimer.css';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let interval;
    let timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        setSessionTime(prevTime => prevTime + 1);
        if (sessionTime >= 10) { // 40 minutes = 2400 seconds
          setShowPopup(true);
          clearInterval(interval);
        }
      }, 1000);

      timeout = setTimeout(() => {
        if (isPlaying) {
          setShowPopup(true);
          clearInterval(interval);
        }
      }, 2400000); // 40 minutes in milliseconds
    } else {
      clearInterval(interval);
      clearTimeout(timeout);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isPlaying, sessionTime]);

  const handleUserResponse = (continueWatching) => {
    if (continueWatching) {
      setIsPlaying(true);
      setSessionTime(0); // Reset session time
    } else {
      setIsPlaying(false);
    }
    setShowPopup(false);
  };

  return (
    <div className="App">
      <header>
        <h1>Focused Study</h1>
        <div className="session-time">
          Session Time: {sessionTime} seconds
        </div>
      </header>

      <div className="video-player">
        <ReactPlayer
          url="your-video-url"
          playing={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        <button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>

      {showPopup && (
        <div className="popup">
          <p>Are you still here, Do you want to still continue?</p>
          <button onClick={() => handleUserResponse(true)}>Yes</button>
          <button onClick={() => handleUserResponse(false)}>No</button>
        </div>
      )}

      <footer>
        <p>© Focused Study</p>
      </footer>
    </div>
  );
}

export default App;