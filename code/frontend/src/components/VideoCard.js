import React from 'react'
import '../styles/VideoCard.css'
import { useNavigate } from 'react-router-dom'
import { addFirstClickVideoSectionData } from '../utils/axiosAPIUtils';

export default function VideoCard({video, videoList, keyword, section, videoDuration, isEducation}) {

  function getPosOfVideoInList(videoList, videoId){
    const position = videoList.findIndex(video => video.id === videoId);
    return position
  }
  
  const videoPos = getPosOfVideoInList(videoList, video.id)
  const navigate = useNavigate()
  const handleVideoClickButton = () => {
    addFirstClickVideoSectionData(videoDuration, section)
    navigate('/watchvideo', {state: {video: video, videoList: videoList, videoPosInList:videoPos, searchKeyword: keyword, section: section, isEducation: isEducation}})
  }

  return (
    <div className="VideoCardContainer" onClick={() => handleVideoClickButton()}>
        <img width="320" height="180" className='VideoCardThumnailElement' referrerPolicy='no-referrer' src={video.thumbnail} />
        <p className='VideoCardTitleElement'>{video.title}</p>
        <p className='VideoCardCreatorElement'>Video by {video.creator}</p>
        <p className='VideoCardDurationElement'>{video.duration} mins</p>
    </div>
  )
}
