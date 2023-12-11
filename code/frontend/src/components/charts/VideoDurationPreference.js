import React, { useEffect, useState } from 'react'

export default function VideoDurationPreference({data}) {

    const [enPref, setEnPref] = useState('')
    const [edPref, setEdPref] = useState('')
    const [res, setRes] = useState('')

    const getDurationContent = (length) => {
        if(length == "short"){
            return "under 4 mins"
        }else if(length == "medium"){
            return "under 30 mins"
        }else if(length == "long"){
            return "over 30 mins"
        }
    }

    useEffect(() =>{
        data.then((result) => {
            console.log(result)
            const countMap = {};
            result.firstClickData.forEach(item => {
                const key = `${item.feed}_${item.name}`;
                countMap[key] = (countMap[key] || 0) + item.count;
            });

            const maxCounts = {};
            Object.keys(countMap).forEach(key => {
                const [feed, name] = key.split('_');
                if (!maxCounts[feed] || countMap[key] > maxCounts[feed].count) {
                    maxCounts[feed] = { name, count: countMap[key] };
                }
            });

            setEnPref(getDurationContent(maxCounts["EntertainmentFeed"].name))
            setEdPref(getDurationContent(maxCounts["EducationFeed"].name))
            setRes(getDurationContent(maxCounts["EducationFeed"].name))
        })
    }, [])


    const handleEducationFeedToggleClick = () => {
        setRes(edPref)
    }

    const handleEntertainmentFeedToggleClick = () => {
        setRes(enPref)
    }

  return (
    <div className='FirstClicksChartsContainer NextRowInGrid'>
        <div className='FirstClicksChartTitle'> Preferred Duration Range</div>
        <div className="FirstClicksChartToggle">
            <div className="FirstClicksChartToggleElement" onClick={() => handleEducationFeedToggleClick()}> Education Feed </div>
            <div className="FirstClicksChartToggleElement" onClick={() => handleEntertainmentFeedToggleClick()}> Entertainment Feed </div>
       </div>
       <div className='FirstClicksParaSmall'>You prefer to watch videos in the range of</div>
       <div className="FirstClicksParaLarge">{res}</div>
    </div>
  )
}
