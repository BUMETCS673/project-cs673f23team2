import { useLocation, useNavigate } from 'react-router-dom';
import React, { useLayoutEffect, useState } from 'react'
import '../styles/EntertainmentFeed.css'
import VideoComponent from './VideoComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import EducationalVideoFeed, { isSearchValid } from './EducationalVideoFeed';
import SearchBarComponent from './SearchBarComponent';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

export default function EntertainmentFeed() {
	const location = useLocation();
	const [query, setQuery] = useState(location.state.query);
	const [hobbyList, setHobbyList] = useState([])
	let Flag = location.state.flag;
	let navigate = useNavigate();

	const handleSearchInput = (event) => {
		const keyword = event.target.value;
		setQuery(keyword);
	}

	const handleInputKeyPress = (event) => {
		if (event.key === 'Enter') {
			handleSearchClick();
		}
	};

	const handleSearchClick = () => {
		if(isSearchValid(query)) {
			console.log('handleSearchClick ', query)
			navigate('/entertainment-browse', {state: {flag: true, query: query}});
		}
	}

	const HobbyButtonClick = (e) => {
		const keyword = e.target.textContent;
		setQuery(keyword);
		navigate('/entertainment-browse', {state: {flag: true, query: keyword}});
	}

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
					<>
					<EducationalVideoFeed query={query} educationStatus={false}/>
					</>
				) : (
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
