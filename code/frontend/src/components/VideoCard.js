import React from 'react'
import '../styles/VideoCard.css'

export default function VideoCard({video}) {
  return (
    <div className="VideoCardContainer">
        <img width="320" height="180" className='VideoCardThumnailElement' referrerPolicy='no-referrer' src={video.thumbnail} />
        <p className='VideoCardTitleElement'>{video.title}</p>
        <p className='VideoCardCreatorElement'>Video by {video.creator}</p>
        <p className='VideoCardDurationElement'>{video.duration} mins</p>
    </div>
  )
}
