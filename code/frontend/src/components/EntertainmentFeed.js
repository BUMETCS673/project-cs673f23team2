import { useLocation, useNavigate } from 'react-router-dom';
import React, { useLayoutEffect, useState } from 'react';
import '../styles/EntertainmentFeed.css';
import VideoComponent from './VideoComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import VideoFeed, { isSearchValid } from './VideoFeed';
import SearchBarComponent from './SearchBarComponent';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

export default function EntertainmentFeed() {
    const location = useLocation();
    const [query, setQuery] = useState(location.state.query); // State for the search query
    const [hobbyList, setHobbyList] = useState([]); // State for user's hobby list
    let Flag = location.state.flag; // Flag indicating the current state or mode
    let navigate = useNavigate(); // Hook for navigation

    // Handles updating the query state on search input change
    const handleSearchInput = (event) => {
        const keyword = event.target.value;
        setQuery(keyword);
    };

    // Handles search execution on Enter key press
    const handleInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearchClick();
        }
    };

    // Executes search and navigates to the search results page
    const handleSearchClick = () => {
        if (isSearchValid(query)) {
            console.log('handleSearchClick ', query);
            navigate('/entertainment-browse', { state: { flag: true, query: query } });
        }
    };

    // Handles the hobby button click event and sets the query accordingly
    const HobbyButtonClick = (e) => {
        const keyword = e.target.textContent;
        setQuery(keyword);
        navigate('/entertainment-browse', { state: { flag: true, query: keyword } });
    };

    // Fetches the user's hobby list from a backend service
    useLayoutEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user != null || user != undefined) {
            axios.get("http://127.0.0.1:5000/getUserHobbies", { params: { userId: user.uid } })
                .then((response) => {
                    setHobbyList(response.data.hobbies);
                }).catch((error) => {
                    setHobbyList(['hiking', 'reading', 'photography']); // Default hobbies in case of error
                });
        } else {
            setHobbyList(['hiking', 'reading', 'photography']); // Default hobbies for non-logged-in users
        }
    }, []);

    return (
        <div>
            {/* Search bar and navigation button */}
            <div className='EntertainmentFeedSearchContainer'>
                {Flag && (
                    <button
                        data-cy="searchBarButton"
                        className="SearchButtonElement"
                        onClick={() => {
                            navigate('/entertainment-browse', { state: { flag: false, query: '' } });
                        }}
                    > <FontAwesomeIcon icon={faArrowLeft} /> Back </button>
                )}
                <SearchBarComponent
                    value={query}
                    onChange={handleSearchInput}
                    onKeyDown={handleInputKeyPress} />
                <button
                    data-cy="searchBarButton"
                    className='SearchButtonElement'
                    onClick={handleSearchClick}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} /> Search
                </button>
            </div>

            {/* Main content container */}
            <div className='EntertainmentFeedContainer'>
                <div className="EntertainmentFeedHeader">Entertainment Feed</div>
                {Flag ? (
                    <VideoFeed query={query} educationStatus={false} />
                ) : (
                    <>
                        {/* Hobby buttons and video components for each hobby */}
                        <div data-cy='hobbyButtons' className='EntertainmentFeedHobbieButtonContainer'>
                            {hobbyList.map((hobby, index) => (
                                <button data-cy={`hobbyButton${index}`} key={index} className="EntertainmentFeedHobbyButton" onClick={(e) => HobbyButtonClick(e)}>{hobby}</button>
                            ))}
                        </div>
                        <div className='EntertainmentFeedHobbieVideoStack'>
                            {hobbyList.map((hobby, index) => (
                                <VideoComponent key={index} query={hobby} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );  
}
