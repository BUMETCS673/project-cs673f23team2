import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import '../styles/UserProfile.css'

function UserProfile() {
  const [name, setName] = useState('');
  const [profile, setProfile] = useState('');
  const [hobbies, setHobbies] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      axios.get("http://127.0.0.1:5000/getUserProfile", { params: { userId: user.uid }})
      .then((result) => {
        console.log(result.data.userDetails);
        setName(result.data.userDetails.name);
        setProfile(result.data.userDetails.profile);
        setHobbies(result.data.userDetails.hobbies);
     }).catch((error) => {
        console.log(error);
      });
    }
  }, []);

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <img src={profile} alt={`${name}`} className="profile-avatar" />
        <h1 className="profile-name">{name}</h1>
      </div>
      <div className="profile-hobbies">
        <h2>Hobbies:</h2>
        <div className="hobbies-list">
          {hobbies.map((hobby, index) => (
            <button key={index} className="hobby-button">{hobby}</button>
          ))}
        </div>
      </div>
      {/* Assuming Video History and buttons below are implemented elsewhere */}
    </div>
  );
}

export default UserProfile;
