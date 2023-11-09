import { useState, useEffect } from "react";
import axios from 'axios';
import React from "react";
import { API_KEY } from "./ApiKey";

export default function VideoComponent(props) {
	let query = props.query
	// console.log("HobbyVidGrid", query);
	const [videoList, setVideoList] = useState([])

	function getYoutubeVideosFromQuery(keyword) {
		axios.get("https://www.googleapis.com/youtube/v3/search?key=" + API_KEY + "&q=" + keyword + "&type=video&part=snippet&maxResults=3").then((response) => {
			setVideoList(response.data.items)
			// console.log(response.data.items)
		})
	}
	
	useEffect(()=>{
		console.log("hobbyvid", query)
		getYoutubeVideosFromQuery(query)
	},[])

	return (
		<div> 
			<div className='videoTitleElement'>
				Videos for {query}
			</div>
			<div className='VideoStackContainer'>
				{videoList !== undefined && videoList.length > 0 ? (
					<div className='VideoGrid'>
						{videoList.map((video) => {
							// console.log(video);
							return (
							<>
								<iframe
									key={video.id.videoId}
									width="420"
									height="315"
									frameBorder="0"
									src={`https://www.youtube.com/embed/${video.id.videoId}`}
									allowFullScreen>
								</iframe>
							</>
							)
						})}
					</div>
				):(
					<p>No videos found</p>
				)}
			</div>
		</div>
	)
}

