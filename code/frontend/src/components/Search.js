import '../styles/Search.css'
import React, { useLayoutEffect, useState } from 'react'
import DefaultUserProfile from '../assets/default_user_profile.svg'
import Points from '../assets/points.svg'
import EducationalFeed from '../components/EducationalVideoFeed.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCouch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

///////////////////////////////////////
/********* HELPER FUNCTIONS *********/
///////////////////////////////////////

export function isSearchValid(inputText) {
    const trimmedInput = inputText.trim();
    return trimmedInput.length > 1;
}

///////////////////////////////////////
/********* COMPONENTS *********/
///////////////////////////////////////
export default function Search() {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [userProfilePicture, setUserProfilePicture] = useState(DefaultUserProfile)
    const [userName, setUserName] = useState('')
    let navigate = useNavigate();
    

    const handleSearchInput = (event) => {
        const keyword = event.target.value;
        setSearchKeyword(keyword)
    }

    const handleSearchClick = () => {
        if(isSearchValid(searchKeyword)){
            navigate('/browse', { state: {query: searchKeyword, educationStatus: true} });
        }
    }

    const handleInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearchClick();
        }
    };
    
    const handleEntertainmentModeClick = () => {
        navigate('/entertainment-browse', {state: {flag: false, query: ''}});
    }

    const handleUserProfileClick = () => {
        navigate('/userProfile');
    }

    useLayoutEffect(()=>{
        const auth = getAuth()
        const user = auth.currentUser
        if(user!=null || user!=undefined) {
            setUserProfilePicture(user.photoURL)
            setUserName(user.displayName)
        } else {
            setUserProfilePicture(DefaultUserProfile)
            setUserName("Default User")
        }
      }, [])

    return (
        <div className='SearchContainer'>
            <img data-cy="userProfileOnSearch" alt='User Profile' className='UserProfileImageElement' src={userProfilePicture} onClick={() => handleUserProfileClick()}></img>
            <p data-cy="userNameOnSearch" className='UserDisplayNameElement'>{userName}</p>
            <p data-cy="userRewardPointsOnSearch" className='UserDisplayRewardPointsElement'>✨ 3000 points</p>
            <input 
                data-cy="searchBarElement" 
                className='SearchBarElement' 
                type="text"
                value={searchKeyword}
                onChange={handleSearchInput}
                onKeyDown={handleInputKeyPress}/>
            <div className='SearchButtonsContainer'>
                <button 
                    data-cy="searchBarButton" 
                    className='SearchButtonElement'
                    onClick={handleSearchClick}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} /> Search
                </button>
                <button 
                    data-cy="EntertainmentMode" 
                    className='SearchButtonElement'
                    onClick={handleEntertainmentModeClick}>
                        <FontAwesomeIcon icon={faCouch} /> Entertainment Mode
                </button>
            </div>
        </div>
    )
}
