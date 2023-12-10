import React from "react";
import { useLocation } from 'react-router-dom';
import VideoFeed from "./VideoFeed";

export default function EducationalFeed() {
    const location = useLocation();
    const query = location.state.query;
    const isEducation = location.state.educationStatus;

    return (
        <>
        <VideoFeed query={query} educationStatus={isEducation} section={"EducationFeed"}/>
        </>
    )
}