import { useLocation } from 'react-router-dom';
import axios from 'axios';
<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
=======
import React, { useState, useLayoutEffect } from 'react'
>>>>>>> 6d08d38 (SE-40: Code integration)
import '../styles/EducationalVideoFeed.css'
import VideoGridContainer from './VideoGridContainer';

export function isSearchValid(inputText) {
  const trimmedInput = inputText.trim();
  return trimmedInput.length > 1;
}

export default function EducationalVideoFeed() {
  const location = useLocation();
  const query = location.state.query
  const [searchKeyword, setSearchKeyword] = useState(query);
  
  const [shortVideoList, setShortVideoList] = useState([])

  const [mediumVideoList, setMediumVideoList] = useState([])
  const [longVideoList, setLongVideoList] = useState([])
  

  const handleSearchInput = (event) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword)
  }

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
        handleSearchClick();
    }
};

const handleSearchClick = () => {
  if(isSearchValid(searchKeyword)){
        getYoutubeVideosFromQuery(searchKeyword, 5)
  }
}


function getYoutubeVideosFromQuery(query, count){
  axios.get("http://127.0.0.1:5000/fetchvideos", {params: {
        q: query,
        maxResults: count,
        videoDuration: "short"
      }
    }).then((response) => {
        setShortVideoList(response.data)    
      })

      axios.get("http://127.0.0.1:5000/fetchvideos", {params: {
        q: query,
        maxResults: count,
        videoDuration: "medium"
      }
    }).then((response) => {
        setMediumVideoList(response.data)    
      })

      axios.get("http://127.0.0.1:5000/fetchvideos", {params: {
        q: query,
        maxResults: count,
        videoDuration: "long"
      }
    }).then((response) => {
        setLongVideoList(response.data)    
      })
}

useLayoutEffect(()=>{
  getYoutubeVideosFromQuery(query, 5)
},[])

  return (
      <div className='NavigationStackContainer'>
      <input 
                data-cy="searchBarElement" 
                className='SearchBarElement' 
                type="text"
                value={searchKeyword}
                onChange={handleSearchInput}
                onKeyDown={handleInputKeyPress}/>
      <VideoGridContainer query={searchKeyword} videoDuration="short" videoList={shortVideoList}/>
      <VideoGridContainer query={searchKeyword} videoDuration="medium" videoList={mediumVideoList}/>
      <VideoGridContainer query={searchKeyword} videoDuration="long" videoList={longVideoList}/>
      </div>
<<<<<<< HEAD
      <div className='VideoStackContainer'>
        {videoList != undefined && videoList.length > 0 ? (
          <div className='VideoGrid'>
            {videoList.map((video) => (
              <Link to={`/video/${video.id.videoId}`} key={video.id.videoId}>
              <iframe
                width="420"
                height="315"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </Link>
            ))}
          </div>
        ) : (
          <p>No videos found.</p>
        )}
    </div>
    <button 
                data-cy="seeAllButton" 
                className='SearchButtonElement'
                onClick={seeMoreVideosClick}>
                    See more </button>
    </div>
=======
>>>>>>> 6d08d38 (SE-40: Code integration)
  )
}
