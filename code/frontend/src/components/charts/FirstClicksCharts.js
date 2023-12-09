import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

export default function FirstClicksCharts({data}) {


    const [options, setOptions] = useState({})
    const [series, setSeries] = useState([])
    const [section, setSection] = useState("EducationFeed")

    const [entertainmentCountList, setEntertainmentCountList] = useState([])
    const [educationCountList, setEducationCountList] = useState([])
    const [entertainmentVideoDurationList, setEntertainmentVideoDurationList] = useState([])
    const [educationVideoDurationList, setEducationVideoDurationList] = useState([])


    useEffect(()=>{
        data.then((result)=>{
            console.log(result)
            const countList = result.firstClickData.filter(record => record.feed === section).map(item => item.count);
            const videoDurationList = result.firstClickData.filter(record => record.feed === section).map(item => item.name);
            setEducationCountList(result.firstClickData.filter(record => record.feed === "EducationFeed").map(item => item.count))
            setEducationVideoDurationList(result.firstClickData.filter(record => record.feed === "EducationFeed").map(item => item.name))
            setEntertainmentCountList(result.firstClickData.filter(record => record.feed === "EntertainmentFeed").map(item => item.count))
            setEntertainmentVideoDurationList(result.firstClickData.filter(record => record.feed === "EntertainmentFeed").map(item => item.name))
            
            setOptions({
                chart: {
                  id: 'firstClickChart'
                },
                xaxis: {
                  categories: videoDurationList
                }
            })

            setSeries([{
                name: 'counts',
                data: countList
              }])
        })
    }, [])

  
    const handleEducationFeedToggleClick = () => {

        setOptions({
            chart: {
              id: 'firstClickChart'
            },
            xaxis: {
              categories: educationVideoDurationList
            }
        })

        setSeries([{
            name: 'counts',
            data: educationCountList
          }])

    }

    const handleEntertainmentFeedToggleClick = () => {

        setOptions({
            chart: {
              id: 'firstClickChart'
            },
            xaxis: {
              categories: entertainmentVideoDurationList
            }
        })

        setSeries([{
            name: 'counts',
            data: entertainmentCountList
          }])

    }

  return (
    <div className='FirstClicksChartsContainer'>
        <div className='FirstClicksChartTitle'> Video duration preference</div>
        <div className="FirstClicksChartToggle">
            <div className="FirstClicksChartToggleElement" onClick={() => handleEducationFeedToggleClick()}> Education Feed </div>
            <div className="FirstClicksChartToggleElement" onClick={() => handleEntertainmentFeedToggleClick()}> Entertainment Feed </div>
       </div>
        <Chart options={options} series={series} type="bar" width={500} height={320} />
    </div>
  )
}
