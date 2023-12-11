import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import axios from 'axios';
import '../styles/UserProfile.css';
import { useNavigate } from 'react-router-dom';
import { clearWatchHistoy } from '../utils/axiosAPIUtils';

function UserProfile() {
  const [name, setName] = useState('');
  const [profile, setProfile] = useState('');
  const [hobbies, setHobbies] = useState([]);

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      axios.get("http://127.0.0.1:5000/getUserProfile", { params: { userId: user.uid }})
        .then((result) => {
          setName(result.data.userDetails.name);
          setProfile(result.data.userDetails.profile);
          setHobbies(result.data.userDetails.hobbies);
        }).catch((error) => {
          console.error(error);
        });
    }
  }, [auth]);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate("/")
    })
  };

  const handleClearHistory = () => {
    clearWatchHistoy()
  };

  const Dashboard = () => {
    navigate("/dashboard")
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-header">
        <div className="user-profile-image-container">
          <img src={profile} alt={`${name}`} className="user-profile-picture" />
        </div>
        <h1 className="user-profile-name">{name}</h1>
      </div>
      <div className="user-profile-hobbies">
        <h2>Hobbies:</h2>
        <div className="user-hobbies-list">
          {hobbies && hobbies.length > 0 ? (
            hobbies.map((hobby, index) => (
              <span key={index} className="user-hobby">{hobby}</span>
            ))
          ) : (
            <p>No hobbies.</p>
          )}
        </div>
      </div>
      <div className="user-profile-buttons">
        <button onClick={handleClearHistory}>Clear History</button>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={Dashboard}>Dashboard</button>
      </div>
    </div>
  );
}

export default UserProfile;
