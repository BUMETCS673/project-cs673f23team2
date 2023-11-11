import React from 'react'
import '../styles/VideoGridContainer.css'
import VideoCard from './VideoCard'
import { useNavigate } from 'react-router-dom'

export default function VideoGridContainer({query, videoDuration, videoList}) {

let navigate = useNavigate();
const handleSeeModeButtonClick = () => {
    navigate('/seemorevideos', {state: {query: query, videoDuration: videoDuration, videoList: videoList}})
}

  return (
    <div className="VideoFeedContainer">
        <div className="VideoTitleElement"> {query} Videos {
        videoDuration === "short" ? "under 4 mins" : 
        videoDuration === "medium" ? "under 30 mins": 
        videoDuration === "long" ? "in depth":
        ""}
        </div>
        
        <div className="VideoGridContainer">
            {videoList != undefined && videoList.length > 0 ? (
                <div className='VideoGrid'>
                    {videoList.slice(0, 5).map((video) => (
                        <VideoCard key={video.id} className="VideoCardElement" video={video}/>
                    ))}
                </div>
            ) : (
                <p>No videos found.</p>
            )}
        </div>
        <button 
                className='VideoGridContainerSeeMoreButtonElement'
                onClick={() => handleSeeModeButtonClick()}>See More</button>
    </div>
  )
}
