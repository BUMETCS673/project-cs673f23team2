import '../styles/Search.css'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import '../styles/EducationalVideoFeed.css'
import VideoCard from './VideoCard';
import '../styles/VideoCard.css'


export default function SeeAllVideos({}) {
    
  const location = useLocation();
  const query = location.state.query
  const videoList = location.state.videoList
  const videoDuration = location.state.videoDuration
  const section = location.state.section
  const isEducation = location.state.isEducation

    return (

      <div className="SeeAllVideosContainer">
      <div className="VideoTitleElement"> 50 {query} Videos {
      videoDuration === "short" ? "under 4 mins" : 
      videoDuration === "medium" ? "under 30 mins": 
      videoDuration === "long" ? "in depth":
      ""}
      </div>
      
      <div className="VideoGridContainer">
          {videoList != undefined && videoList.length > 0 ? (
              <div data-cy='videoItem' className='VideoGrid'>
                  {videoList.map((video) => (
                      <VideoCard data-cy='videoInfo' key={video.id} className="VideoCardElement" video={video} videoList={videoList} keyword={query} section={section} videoDuration={videoDuration} isEducation={isEducation}/>
                  ))}
              </div>
          ) : (
              <p>No videos found.</p>
          )}
      </div>
      </div>
      ); 
      
    }