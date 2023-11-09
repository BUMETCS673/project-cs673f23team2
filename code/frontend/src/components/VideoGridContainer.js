import React from 'react'
import '../styles/VideoGridContainer.css'
import VideoCard from './VideoCard'

export default function VideoGridContainer({query, videoDuration, videoList}) {

const handleSeeModeButtonClick = () => {
    console.log("Hello")
}

  return (
    <div className="VideoFeedContainer">
        <div className="VideoTitleElement"> {query} Videos {
        videoDuration === "short" ? "under 4 mins" : 
        videoDuration === "medium" ? "under 30 mins": 
        "in depth"}
        </div>
        
        <div className="VideoGridContainer">
            {videoList != undefined && videoList.length > 0 ? (
                <div className='VideoGrid'>
                    {videoList.map((video) => (
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
