import React, { useState, useEffect } from 'react'
import '../styles/EducationalVideoFeed.css'
import EducationalVideoFeed, { isSearchValid } from './EducationalVideoFeed';
// import HobbyVideoGrid from './HobbyVideoGrid';
import { useLocation, useNavigate } from 'react-router-dom';
import HobbyVideoGrid from './HobbyVideoGrid';
import Button from '@mui/material/Button';

export default function EntertainmentFeed() {
	const location = useLocation();
	const [query, setQuery] = useState(location.state.query);
	const userHobbies = ['hiking', 'surfing'] // from database
	const [hobbyList, setHobbyList] = useState(userHobbies);

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
		// Add functionality for search
	}

	const HobbyButtonClick = () => {
		// Add functionality for button click
	}
	console.log('list', hobbyList);

	return (
		<div>
			<div className='NavigationStackContainer'>
				<input 
					data-cy="searchBarElement" 
					className='SearchBarElement' 
					type="text"
					value={query}
					onChange={handleSearchInput}
					onKeyDown={handleInputKeyPress}/>
			</div>
			<div>
				<h1>Entertainment Feed</h1>
				{hobbyList != undefined && hobbyList.length > 0 ? (
					<>
						{hobbyList.map((hobby) => {
							return (
								<>
									<Button key={hobby}Button variant="outlined" onClick={HobbyButtonClick}>{hobby}</Button>&emsp;
								</>
						   	)
						})}

						{hobbyList.map((hobby) => {
							return (
								<>
									<HobbyVideoGrid query={hobby}/>
								</>
						   	)
						})}
					</>
				):(<p> No videos </p>)}
			</div>
		</div>
	)	
}
