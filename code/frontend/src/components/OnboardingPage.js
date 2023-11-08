import React, { useState } from 'react';
import './onboarding.css'; // Make sure to create this CSS file for styling

const OnboardingPage = () => {
  const [hobbies, setHobbies] = useState([]);
  const [hobbyInput, setHobbyInput] = useState("");

  // Function to handle the input change
  const handleInputChange = (event) => {
    setHobbyInput(event.target.value);
  };

  // Function to add hobby from input box
  const addHobby = () => {
    if (hobbyInput && !hobbies.includes(hobbyInput)) {
      setHobbies([...hobbies, hobbyInput]);
      setHobbyInput('');
    }
  };

  // Function to add hobby from suggestions
  const addSuggestedHobby = (suggestedHobby) => {
    if (!hobbies.includes(suggestedHobby)) {
      setHobbies([...hobbies, suggestedHobby]);
    }
  };

  // Function to remove a hobby
  const removeHobby = (hobbyToRemove) => {
    setHobbies(hobbies.filter(hobby => hobby !== hobbyToRemove));
  };

  return (
    <div className="onboarding-container">
      <h2>User Onboarding</h2>
      <div className="profile-section">
        {/* Placeholder for the user profile picture */}
        <div className="profile-pic-placeholder"></div>
        <p>Tell us about your Hobbies</p>
        <div className="hobbies-input">
          <input
            type="text"
            value={hobbyInput}
            onChange={handleInputChange}
            placeholder="Enter your hobby"
          />
          <button onClick={addHobby}>Add</button>
        </div>
        <div className="hobbies-suggestions">
          {['Singing', 'Guitar', 'Dancing', 'Cooking'].map((suggestion) => (
            <button key={suggestion} onClick={() => addSuggestedHobby(suggestion)}>
              {suggestion}
            </button>
          ))}
        </div>
      </div>
      <div className="hobbies-list">
        {hobbies.map((hobby, index) => (
          <div key={index} className="hobby-tag">
            {hobby}
            <button onClick={() => removeHobby(hobby)}>x</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnboardingPage;