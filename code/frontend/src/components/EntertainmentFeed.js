import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import '../styles/EducationalVideoFeed.css'
import VideoComponent from './VideoComponent';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { isSearchValid } from './EducationalVideoFeed';
import DetailedVideoComponent from './DetailedVideoComponent';

export default function EntertainmentFeed() {
	const location = useLocation();
	const [query, setQuery] = useState(location.state.query);
	const hobbyList = ['hiking', 'reading'] // ideally from database
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
		console.log('HobbyButtonClick ', keyword)
		navigate('/entertainment-browse', {state: {flag: true, query: query}});
	}

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
				<hr/>
				<h1>Entertainment Feed</h1>
				<hr/>
				{Flag ? (
					<>
					<button
						data-cy="searchBarButton" 
						className='SearchButtonElement'
						onClick={()=>{navigate('/entertainment-browse', {state: {flag: false, query: ''}});}}>
							<FontAwesomeIcon icon={faArrowLeft} />
					</button>
					<DetailedVideoComponent query={query} />
					</>
				) : (
					<>
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
					</>
				)}
			</div>
		</div>
	)	
}
