import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'


export default function KeywordsCharts({data}) {

    const [options, setOptions] = useState({})
    const [series, setSeries] = useState([])
    const [section, setSection] = useState("EducationFeed")


    const [educationCountList, setEducationCountList] = useState([])
    const [educationNameList, setEducationNameList] = useState([])
    const [entertainmentCountList, setEntertainmentCountList] = useState([])
    const [entertainmentNameList, setEntertainmentNameList] = useState([])

    useEffect(() => {
        data.then((result) => {
            const countList = result.keywordData.filter(record => record.feed === section).map(item => item.count);
            const keywordList = result.keywordData.filter(record => record.feed === section).map(item => item.name);
            setEducationCountList(result.keywordData.filter(record => record.feed === "EducationFeed").map(item => item.count))
            setEducationNameList(result.keywordData.filter(record => record.feed === "EducationFeed").map(item => item.name))
            setEntertainmentCountList(result.keywordData.filter(record => record.feed === "EntertainmentFeed").map(item => item.count))
            setEntertainmentNameList(result.keywordData.filter(record => record.feed === "EntertainmentFeed").map(item => item.name))
        
            setOptions({
                "chart": {
                  "type": "donut"
                },
                labels: keywordList,
                "responsive": [
                  {
                    "breakpoint": 480,
                    "options": {
                      "chart": {
                        "width": 200
                      },
                      "legend": {
                        "position": "bottom"
                      }
                    }
                  }
                ]
              })

            setSeries(countList)

        })
    }, [])


    const handleEducationFeedToggleClick = () => {
        setOptions({
            "chart": {
              "type": "donut"
            },
            labels: educationNameList,
            "responsive": [
              {
                "breakpoint": 480,
                "options": {
                  "chart": {
                    "width": 200
                  },
                  "legend": {
                    "position": "bottom"
                  }
                }
              }
            ]
          })

        setSeries(educationCountList)

    }

    const handleEntertainmentFeedToggleClick = () => {
        setOptions({
            "chart": {
              "type": "donut"
            },
            labels: entertainmentNameList,
            "responsive": [
              {
                "breakpoint": 480,
                "options": {
                  "chart": {
                    "width": 200
                  },
                  "legend": {
                    "position": "bottom"
                  }
                }
              }
            ]
          })

        setSeries(entertainmentCountList)

    }

  return (
    <div className='FirstClicksChartsContainer'>
        <div className='FirstClicksChartTitle'> Frequent Keywords Used</div>
        <div className="FirstClicksChartToggle">
            <div className="FirstClicksChartToggleElement" onClick={() => handleEducationFeedToggleClick()}> Education Feed </div>
            <div className="FirstClicksChartToggleElement" onClick={() => handleEntertainmentFeedToggleClick()}> Entertainment Feed </div>
       </div>
        <Chart options={options} series={series} type="donut" width={500} height={320} />
    </div>
  )
}
