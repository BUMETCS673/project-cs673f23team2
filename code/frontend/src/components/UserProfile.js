import React, { useState } from 'react';
import '../styles/UserProfile.css';;

function UserProfile() {
  
  const [hobbies, setHobbies] = useState(['Singing', 'Dancing', 'Tennis']);
  const [videoUrls, setVideoUrls] = useState([
    'https://www.youtube.com/embed/Z1RJmh_OqeA',
    'https://www.youtube.com/embed/pTFZFxd4hOI',
    'https://www.youtube.com/embed/xk4_1vDrzzo',
  ]);

  

  return (
    <div>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>User Profile</title>
      </head>
      <body>
        <header>
          {/* Home Button */}
          <div className="home-container">
            <button id="home">🔄 Home</button>
          </div>

          {/* User Profile Container */}
          <div className="profile-container">
            <div className="profile-pic">
              <img
                src="https://www.shareicon.net/data/256x256/2016/09/15/829472_man_512x512.png"
                alt="Profile Image"
              />{' '}
              {/* Replace with your image */}
            </div>
            <span>Supriya Uppala</span>
          </div>
          <span></span> {/* Placeholder element */}
        </header>

        <section className="hobbies">
          <h2>Hobbies:</h2>
          {hobbies.map((hobby, index) => (
            <button key={index}>{hobby}</button>
          ))}
        </section>

        <section className="video-history">
          <h2>Video History</h2>
          <div className="videos">
            {videoUrls.map((videoUrl, index) => (
              <iframe
                key={index}
                width="300"
                height="300"
                src={videoUrl}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ))}
            <button>See All</button>
          </div>
        </section>

        <footer>
          {/* Footer Buttons */}
          <button>Clear History</button>
          <button>Delete Profile</button>
          <button>Logout</button>
        </footer>
      </body>
    </div>
  );
}

export default UserProfile;
