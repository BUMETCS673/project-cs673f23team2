import React, { useState, useLayoutEffect } from 'react';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import '../styles/UserProfile.css'



function UserProfile() {
  const [hobbies, setHobbies] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  

  useLayoutEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user !== null && user !== undefined) {
      // Fetch user hobbies
      axios.get("http://127.0.0.1:5000/getUserHobbies", {
        params: { userId: user.uid }
      })
        .then((response) => {
          setHobbies(response.data.hobbies);  
        })
        .catch((error) => {
          setHobbies(['hiking', 'reading', 'photography']);  
        });

      // Fetch user profile
      axios.get("http://127.0.0.1:5000/getUserProfile", {
        params: { userId: user.uid }
      })
        .then((response) => {
          setUserProfile(response.data.profile);  
        })
        .catch((error) => {
          // Handle error or set a default profile
          setUserProfile({});  
        });
    } else {
      // Set default values if user is not logged in
      setHobbies(['hiking', 'reading', 'photography']);  
      setUserProfile({});
    }
  }, []);

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
                data-cy='ProfilePictureElement'
                src="https://www.shareicon.net/data/256x256/2016/09/15/829472_man_512x512.png"
                alt="Profile Image"
              />
            </div>
            <span data-cy='ProfileNameElement'>Supriya Uppala</span>
          </div>
          <span></span> {/* Placeholder element */}
        </header>

        <section data-cy='HobbiesElement' className="hobbies">
          <h2>Hobbies:</h2>
          {hobbies.map((hobby, index) => (
            <button key={index}>{hobby}</button>
          ))}
        </section>

        <section data-cy='VideoHistoryElement' className="video-history">
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
            <button data-cy='ViewHistoryButton'>See All</button>
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
