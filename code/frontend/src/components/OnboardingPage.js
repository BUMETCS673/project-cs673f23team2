import React, { useEffect, useState } from 'react';
import '../styles/OnboardingPage.css';
import { getAuth } from "firebase/auth";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios"


const OnboardingPage = () => {
  const [hobbies, setHobbies] = useState([]);
  const [hobbyInput, setHobbyInput] = useState("");

  const location = useLocation();
  const userDetails = location.state.user
  
  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
      navigate('/search');
    };
  }, [navigate]);

  // Function to handle the input change
  const handleInputChange = (event) => {
    setHobbyInput(event.target.value);
  };

  // Function to add hobby from input box
  const addHobby = (event) => {
    if (event.key === 'Enter'){
      if (hobbyInput && !hobbies.includes(hobbyInput)) {
        setHobbies([...hobbies, hobbyInput]);
        setHobbyInput('');
      }
    }
  };

  // Function to add hobby from suggestions (converted to lowercase)
  const addSuggestedHobby = (suggestedHobby) => {
    const suggestedHobbyLowerCase = suggestedHobby.toLowerCase();

    if (!hobbies.includes(suggestedHobbyLowerCase)) {
      setHobbies([...hobbies, suggestedHobbyLowerCase]);
    }
  };

  // Function to remove a hobby
  const removeHobby = (hobbyToRemove) => {
    setHobbies(hobbies.filter(hobby => hobby !== hobbyToRemove));
  };

  const navigateToSearch = () => {
    //Write data to firestore
    userDetails.hobbies = hobbies
    const userDetailsJson = JSON.stringify(userDetails);
    axios.get("http://127.0.0.1:5000/writeUserToFirestore", { params: {
        userDetails: userDetailsJson
      }
    }).then((result) => {
      //Navigate to search page
      navigate('/search');
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="OnboardingContainer">
      <img alt='User Profile' className='UserDetailImageElement' referrerPolicy='no-referrer' src={userDetails.profile}></img>
      <p className="UserNameTitleElement">{userDetails.name}</p>
      <p className="HobbyTitleElement">Tell us about your hobbies</p>
      <input 
        className='HobbiesInputElement'
        type="text"
        value={hobbyInput}
        onChange={handleInputChange}
        onKeyDown={addHobby}
      />
      <div className="HobbyListElement">
         {hobbies.map((hobby, index) => (
           <div key={index} className="HobbyTagElement">
             {hobby}
             <button className="HobbyRemoveButtonElement" onClick={() => removeHobby(hobby)}>x</button>
           </div>
         ))}
       </div>
       <button className='HobbyDoneButtonElement' onClick={() => navigateToSearch()}>Done</button>
    </div>
  );
};

export default OnboardingPage;
