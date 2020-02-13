import React from 'react';
import Slider from "../../slider/Slider";
import { useSelector } from "react-redux";

const View = ({ videos, listName, genderTitle }) => {
    let videosSlider;
    let selected = useSelector(state => state.movieDb.selected);
    if (videos.length > 0) {
        videosSlider = videos.map((videoData, index) => (<Slider key={index} nameList={listName} h1={index === 0 ? genderTitle : ''} listItem={videoData.results} selected={selected} />))
    }
    return (
        <>
            {videosSlider}
        </>
    )
}
export default View