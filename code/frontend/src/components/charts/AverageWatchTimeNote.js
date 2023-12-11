import React, { useEffect, useState } from 'react'

export default function AverageWatchTimeNote({data}) {
  const [avgEducation, setAvgEducation] = useState('')
  const [avgEntertainment, setAvgEntertainment] = useState('')
  const [res, setRes] = useState('')
  const [label, setLabel] = useState('While studying')

  useEffect(() => {
    data.then((result) => {
      setAvgEducation(result.avgEducation)
      setAvgEntertainment(result.avgEntertainment)
      setRes(result.avgEducation)
    })
  }, [])

  const handleEducationFeedToggleClick = () => {
    setRes(avgEducation)
    setLabel('While studying')
  }
  const handleEntertainmentFeedToggleClick = () => {
    setRes(avgEntertainment)
    setLabel('While not studying')
  }

  return (
    <div className='FirstClicksChartsContainer NextRowInGrid'>
        <div className='FirstClicksChartTitle'> Average Attention Span</div>
        <div className="FirstClicksChartToggle">
            <div className="FirstClicksChartToggleElement" onClick={() => handleEducationFeedToggleClick()}> Education Feed </div>
            <div className="FirstClicksChartToggleElement" onClick={() => handleEntertainmentFeedToggleClick()}> Entertainment Feed </div>
       </div>
       <div className='FirstClicksParaSmall'>Your attention span {label} is</div>
       <div className="FirstClicksParaLarge">{res}</div>
    </div>
  )
}
