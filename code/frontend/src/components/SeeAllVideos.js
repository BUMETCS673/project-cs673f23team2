// Import necessary CSS styles and libraries
import '../styles/Search.css';
import { useLocation } from 'react-router-dom';
// import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../styles/EducationalVideoFeed.css';
import VideoCard from './VideoCard';
import '../styles/VideoCard.css';

// The main functional component for displaying all videos
export default function SeeAllVideos() {
    
  // Use React Router's useLocation hook to access the state passed in the route
  const location = useLocation();
  const query = location.state.query; // The search query
  const videoList = location.state.videoList; // The list of videos
  const videoDuration = location.state.videoDuration; // The duration filter for videos

  // Return the JSX for the component
  return (
    <div className="SeeAllVideosContainer">
      {/* Display the title of the video section based on the query and duration */}
      <div className="VideoTitleElement">
        50 {query} Videos {
          videoDuration === "short" ? "under 4 mins" : 
          videoDuration === "medium" ? "under 30 mins": 
          videoDuration === "long" ? "in depth":
          ""}
      </div>
      
      {/* Video grid container */}
      <div className="VideoGridContainer">
          {/* Check if videoList is defined and has videos */}
          {videoList != undefined && videoList.length > 0 ? (
              <div data-cy='videoItem' className='VideoGrid'>
                  {/* Map each video in the list to a VideoCard component */}
                  {videoList.map((video) => (
                      <VideoCard data-cy='videoInfo' key={video.id} className="VideoCardElement" video={video}/>
                  ))}
              </div>
          ) : (
              // Display a message if no videos are found
              <p>No videos found.</p>
          )}
      </div>
    </div>
  ); 
}
