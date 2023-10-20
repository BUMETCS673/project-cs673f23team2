import '../styles/Search.css'
import React, { useState } from 'react'
import DefaultUserProfile from '../assets/default_user_profile.svg'
import Points from '../assets/points.svg'
import EducationalFeed from '../components/EducationalVideoFeed.js'
import { useNavigate } from 'react-router-dom';

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
    let navigate = useNavigate();
    

    const handleSearchInput = (event) => {
        const keyword = event.target.value;
        setSearchKeyword(keyword)
    }

    const handleSearchClick = () => {
        if(isSearchValid(searchKeyword)){
            navigate('/browse', { state: {query: searchKeyword} });
        }
    }

    const handleInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearchClick();
        }
    };
    
    return (
        <div className='SearchContainer'>
            <img data-cy="userProfileOnSearch" alt='User Profile' className='UserProfileImageElement' src={DefaultUserProfile}></img>
            <p data-cy="userNameOnSearch" className='UserDisplayNameElement'>Siddhesh Dighe</p>
            <p data-cy="userRewardPointsOnSearch" className='UserDisplayRewardPointsElement'>✨ 3000 points</p>
            <input 
                data-cy="searchBarElement" 
                className='SearchBarElement' 
                type="text"
                value={searchKeyword}
                onChange={handleSearchInput}
                onKeyDown={handleInputKeyPress}/>
            <button 
                data-cy="searchBarButton" 
                className='SearchButtonElement'
                onClick={handleSearchClick}>
                    Search</button>
        </div>
    )
}
