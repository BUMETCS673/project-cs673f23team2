import React, { useState } from 'react'
import '../styles/EducationalVideoFeed.css'
import VideoComponent from './VideoComponent';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function EntertainmentFeed() {
	const [query, setQuery] = useState();
	const hobbyList = ['hiking', 'surfing'] // ideally from database

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
				<button
					data-cy="searchBarButton" 
                	className='SearchButtonElement'
                	onClick={handleSearchClick}>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
				</button>
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
								<VideoComponent query={hobby}/>
								</>
						   	)
						})}
					</>
				):(<p> No videos </p>)}
			</div>
		</div>
	)	
}
