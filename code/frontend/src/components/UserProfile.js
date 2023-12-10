import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth'; // Importing Firebase authentication
import axios from 'axios'; // Importing axios for making HTTP requests
import '../styles/UserProfile.css'; // Importing CSS styles for the component

function UserProfile() {
  // State variables for storing user data
  const [name, setName] = useState('');
  const [profile, setProfile] = useState('');
  const [hobbies, setHobbies] = useState([]);

  // useEffect hook to fetch user data on component mount
  useEffect(() => {
    const auth = getAuth(); 
    const user = auth.currentUser; 

    // Making an API call to get user profile if a user is logged in
    if (user) {
      axios.get("http://127.0.0.1:5000/getUserProfile", { params: { userId: user.uid }})
        .then((result) => {
          // Setting the user details in state variables
          setName(result.data.userDetails.name);
          setProfile(result.data.userDetails.profile);
          setHobbies(result.data.userDetails.hobbies);
        }).catch((error) => {
          console.error(error); // Logging any errors
        });
    }
  }, []); // Empty dependency array to ensure this runs only once

  // Render the user profile
  return (
    <div className="user-profile-container">
      {/* User profile header section */}
      <div className="user-profile-header">
        <div className="user-profile-image-container">
          {/* Displaying the user's profile picture */}
          <img src={profile} alt={`${name}`} className="user-profile-picture" />
        </div>
        {/* Displaying the user's name */}
        <h1 className="user-profile-name">{name}</h1>
      </div>
      {/* User hobbies section */}
      <div className="user-profile-hobbies">
        <h2>Hobbies:</h2>
        <div className="user-hobbies-list">
          {/* Mapping and displaying each hobby */}
          {hobbies.map((hobby, index) => (
            <span key={index} className="user-hobby">{hobby}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
