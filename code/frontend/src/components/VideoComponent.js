import { useState, useEffect } from "react";
import axios from 'axios';
import React from "react";
import VideoGridContainer from "./VideoGridContainer";

export default function VideoComponent(props) {
	let query = props.query
	const [videoList, setVideoList] = useState([])

	function getYoutubeVideosFromQuery(keyword) {
		
		axios.get("http://127.0.0.1:5000/fetchvideos", {
			params: {
        		q: query,
        		maxResults: 50,
        		videoDuration: "any"
      		}
    	}).then((response) => {
        	setVideoList(response.data)    
      	})
	}
	
	useEffect(()=>{
		getYoutubeVideosFromQuery(query)
	},[])

	return (
		<> 
			<VideoGridContainer query={query} videoDuration="any" videoList={videoList}/>
		</>
	)
}

