import { useState, useEffect } from "react";
import axios from 'axios';
import React from "react";

export default function DetailedVideoComponent(props) {
	let query = props.query
	// console.log("HobbyVidGrid", query);
	const [shortVideoList, setShortVideoList] = useState([])
	const [mediumVideoList, setMediumVideoList] = useState([])
	const [longVideoList, setLongVideoList] = useState([])
	

	function getYoutubeVideosFromQuery(keyword) {
		axios.get("https://www.googleapis.com/youtube/v3/search?key=" + "AIzaSyCmfbtelCSnTCkYyI0ZyAUSr2-mEtq65XQ" + "&q=" + keyword + "&type=video&part=snippet&maxResults=3&videoDuration=short").then((response) => {
			setShortVideoList(response.data.items)
		})
		axios.get("https://www.googleapis.com/youtube/v3/search?key=" + "AIzaSyCmfbtelCSnTCkYyI0ZyAUSr2-mEtq65XQ" + "&q=" + keyword + "&type=video&part=snippet&maxResults=3&videoDuration=medium").then((response) => {
			setMediumVideoList(response.data.items)
		})
		axios.get("https://www.googleapis.com/youtube/v3/search?key=" + "AIzaSyCmfbtelCSnTCkYyI0ZyAUSr2-mEtq65XQ" + "&q=" + keyword + "&type=video&part=snippet&maxResults=3&videoDuration=long").then((response) => {
			setLongVideoList(response.data.items)
		})
	}
	
	useEffect(()=>{
		getYoutubeVideosFromQuery(query)
	},[])

	return (
		<div>
			<h1 className="videoTitleElement">{query}</h1>
			<div className='VideoStackContainer'>
				{shortVideoList !== undefined && shortVideoList.length > 0 ? (
					<><div className='videoTitleElement'>
						videos under 4 minutes
					</div>
					<div className='VideoGrid'>
						{shortVideoList.map((video) => {
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
					</div></>
				):(
					<p></p>
				)}
				{mediumVideoList !== undefined && mediumVideoList.length > 0 ? (
					<><div className='videoTitleElement'>
						videos over 4 minutes and under 20 minutes
					</div>
					<div className='VideoGrid'>
						{mediumVideoList.map((video) => {
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
					</div></>
				):(
					<p></p>
				)}
				{longVideoList !== undefined && longVideoList.length > 0 ? (
					<><div className='videoTitleElement'>
						videos over 20 minutes
					</div>
					<div className='VideoGrid'>
						{longVideoList.map((video) => {
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
					</div></>
				):(
					<p></p>
				)}
			</div>
		</div>
	)
}

