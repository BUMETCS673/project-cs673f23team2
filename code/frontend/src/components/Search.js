import '../styles/Search.css'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import DefaultUserProfile from '../assets/default_user_profile.svg'
import SearchBarComponent from './SearchBarComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCouch } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { addSearchKeywordToRealtimeDatabase } from "../utils/axiosAPIUtils";
import axios from "axios"

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
    const location = useLocation();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [userProfilePicture, setUserProfilePicture] = useState(DefaultUserProfile)
    const [userName, setUserName] = useState('')
    const [rewards, setRewards] = useState(0);

    let navigate = useNavigate();
    

    const handleSearchInput = (event) => {
        const keyword = event.target.value;
        setSearchKeyword(keyword)
    }

    const addToRealtimeDatabase = (searchKeyword) => {
        addSearchKeywordToRealtimeDatabase("EducationFeed", searchKeyword)
    }

    const handleSearchClick = () => {
        if(isSearchValid(searchKeyword)){
            addToRealtimeDatabase(searchKeyword)
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
        navigate('/userprofile');
    }

    useEffect(()=>{
		const auth = getAuth()
		const user = auth.currentUser
		if(user==null || user!=undefined) {
			axios.get("http://127.0.0.1:5000/reward-points", {headers: {userId: user.uid}
			}).then((response) => {
				setRewards(parseInt(response.data.rewards, 10))
				// alert("from db rewards"+rewards)
			}).catch((error) => {
				console.log(error)
				// setRewards(0)
			})
		} else {
			alert("user undefined " + user)
		}
		
    }, [location.pathname])


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
            <p data-cy="userRewardPointsOnSearch" className='UserDisplayRewardPointsElement'>✨ {rewards}</p>
            <SearchBarComponent
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
                    className='EntertainmentModeButton'
                    onClick={handleEntertainmentModeClick}>
                    <FontAwesomeIcon icon={faCouch} /> Fun Mode
                </button>

            </div>
        </div>
    )
}
