import { useState, useEffect } from "react";
import axios from 'axios';
import React from "react";
import VideoGridContainer from "./VideoGridContainer";
import { fetchVideosFromYouTube } from "../utils/axiosAPIUtils";

export default function VideoComponent(props) {
	let query = props.query
	const section = props.section

	const [videoList, setVideoList] = useState([])

	function getYoutubeVideosFromQuery(keyword) {
		fetchVideosFromYouTube(query, 50, "any", setVideoList);
	}
	
	useEffect(()=>{
		getYoutubeVideosFromQuery(query)
	},[])

	return (
		<> 
			<VideoGridContainer query={query} videoDuration="any" videoList={videoList} section={section}/>
		</>
	)
}

