import React from 'react'
import '../styles/VideoCard.css'
import { useNavigate } from 'react-router-dom'

export default function VideoCard({video}) {

  const navigate = useNavigate()
  const handleVideoClickButton = () => {
    navigate('/watchvideo', {state: {video: video}})
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
