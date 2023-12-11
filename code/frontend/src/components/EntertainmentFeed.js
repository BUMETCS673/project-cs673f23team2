import { useLocation, useNavigate } from 'react-router-dom';
import React, { useLayoutEffect, useState , useEffect } from 'react'
import '../styles/EntertainmentFeed.css'
import VideoComponent from './VideoComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import VideoFeed, { isSearchValid } from './VideoFeed';
import SearchBarComponent from './SearchBarComponent';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

export default function EntertainmentFeed() {
	// Get current URL location and navigation function from react-router-dom
	const location = useLocation();
	//const [query, setQuery] = useState(location.state.query);
	const [query, setQuery] = useState(location.state?.query || '');
	const isInitialLoad = useState(true);
	// State to manage the list of hobbies
	const [hobbyList, setHobbyList] = useState([])
	// Extracting the flag from the location state
	let Flag = location.state.flag;
	let navigate = useNavigate();
// Function to handle changes in the search input
	const handleSearchInput = (event) => {
		const keyword = event.target.value;
		setQuery(keyword);
	}
// Function to handle key press events in the search input
	const handleInputKeyPress = (event) => {
		if (event.key === 'Enter') {
			handleSearchClick();
		}
	};
	
	// Function to handle search button click
	const handleSearchClick = () => {
		if (isSearchValid(query)) {
		  navigate('/entertainment-browse', { state: { flag: true, query: query } });
		} else {
		  console.log('Invalid search query:', query);
		}
	  };
// Effect to automatically navigate on valid search query and URL change
	  useEffect(() => {
		if (!isInitialLoad && location.pathname !== '/entertainment-browse' && isSearchValid(query)) {
		  navigate('/entertainment-browse', { state: { flag: true, query: query } });
		}
	  }, [query, location.pathname]);

	const HobbyButtonClick = (e) => {
		const keyword = e.target.textContent;
		setQuery(keyword);
		navigate('/entertainment-browse', {state: {flag: true, query: keyword}});
	}

//Effect to fetch user hobbies using axios
	useLayoutEffect(()=>{
        const auth = getAuth()
        const user = auth.currentUser
		if(user!=null || user!=undefined) {
            axios.get("http://127.0.0.1:5000/getUserHobbies", {params: {userId: user.uid}
			}).then((response) => {
				setHobbyList(response.data.hobbies)
			}).catch((error) => {
				setHobbyList(['hiking', 'reading', 'photography'])
			})
        } else {
            setHobbyList(['hiking', 'reading', 'photography'])
		}
		
      }, [])

	return (
		<div>
			<div className='EntertainmentFeedSearchContainer'>
				{/* {Flag && (
        			<button
						data-cy="searchBarButton"
						className="SearchButtonElement"
						onClick={() => {
							navigate('/entertainment-browse', { state: { flag: false, query: '' } });
						}}
        			> <FontAwesomeIcon icon={faArrowLeft} /> Back </button>
      			)} */}
				{location.state?.flag && (
					<button
						data-cy="searchBarButton"
						className="SearchButtonElement"
						onClick={() => {
						navigate('/entertainment-browse', { state: { flag: false, query: '' } });
						}}
					>
						{' '}
						<FontAwesomeIcon icon={faArrowLeft} /> Back{' '}
					</button>
        		)}
				<SearchBarComponent
					value={query}
					onChange={handleSearchInput}
					onKeyDown={handleInputKeyPress}/>
				<button
					data-cy="searchBarButton" 
                	className='SearchButtonElement'
                	onClick={handleSearchClick}>
						<FontAwesomeIcon icon={faMagnifyingGlass}/> Search
				</button>
			</div>

			<div className='EntertainmentFeedContainer'>
				<div className="EntertainmentFeedHeader">Entertainment Feed</div>
				{Flag ? (
					// Display video feed based on search query
					<>
					<VideoFeed key={query} query={query} educationStatus={false}/>
					</>
				) : (
					// Display hobby buttons and corresponding video components
					<>
					<div data-cy='hobbyButtons' className='EntertainmentFeedHobbieButtonContainer'>
						{hobbyList.map((hobby, index) => (
           					<button data-cy={`hobbyButton${index}`} key={index} className="EntertainmentFeedHobbyButton" onClick={(e) => HobbyButtonClick(e)}>{hobby}</button>
         				))}
					</div>
					<div className='EntertainmentFeedHobbieVideoStack'>
						{hobbyList.map((hobby, index) => {
							return <VideoComponent key={index} query={hobby}/>
						})}
					</div>
					</>
				)}
			</div>
		</div>
	)	
}



