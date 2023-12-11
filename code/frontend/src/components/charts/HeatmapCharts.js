import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'


export default function HeatmapCharts({data}) {

    const [dateList, setDateList] = useState([])
    const [educationCountList, setEducationCountList] = useState([])
    const [entertainmentCountList, setEntertainmentCountList] = useState([])
    const [section, setSection] = useState("EducationFeed")

    const [options, setOptions] = useState({
      chart: {
        type: "heatmap",
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.1,
          colorScale: {
            ranges: [
              { from: 0, to: 0, name: "none", color: "#CCCCCC" },
              { from: 1, to: 5, name: "low", color: "#add8f9" }, 
              { from: 6, to: 10, name: "medium", color: "#5cb3f8" }, 
              { from: 11, to: Infinity, name: "high", color: "#1c79a3" }
            ]
          }
        }
      },
      dataLabels: { enabled: false, style: { colors: ["#000000"] } },
      xaxis: {
        labels: {
          show: false,
          rotate: -45,
          rotateAlways: true,
          trim: true,
          maxHeight: 120,
          style: {
            colors: [],
            fontSize: "12px",
            cssClass: "apexcharts-xaxis-label"
          },
          offsetX: 0,
          offsetY: 0
        }
      }
    });
    
    const [series, setSeries] = useState([]);

    const createDataForHeatMap = (list, date) => {
      const chunkSize = 8;
      const resultArray = [];
      
      for (let i = 0; i < list.length; i += chunkSize) {
        const chunk = list.slice(i, i + chunkSize);
        
        const dataObject = {
          name: "",
          data: chunk.map((value, index) => ({ x: date[index], y: value }))
        };
      
        resultArray.push(dataObject);
      }
      return resultArray
    }

    useEffect(() => {
        data.then((result) => {
            console.log(result)
            const edCountList = result.heatMapData.map(item => item.educationFeedCount);
            const enCountList = result.heatMapData.map(item => item.entertainmentFeedCount);
            const date = result.heatMapData.map(item => item.date);
            setDateList(result.heatMapData.map(item => item.date))
            setEducationCountList(result.heatMapData.map(item => item.educationFeedCount))
            setEntertainmentCountList(result.heatMapData.map(item => item.entertainmentFeedCount))

            let currentList = []
            if(section == "EducationFeed"){
                currentList = edCountList
            }else{
                currentList = enCountList
            }
          
          setSeries(createDataForHeatMap(edCountList, date))

        })
    }, [])


    const handleEducationFeedToggleClick = () => {
      setSeries(createDataForHeatMap(educationCountList, dateList))
    }

    const handleEntertainmentFeedToggleClick = () => {
      setSeries(createDataForHeatMap(entertainmentCountList, dateList))
    }

  return (
    <div className='FirstClicksChartsContainer'>
        <div className='FirstClicksChartTitle'> Daily Streaks!</div>
        <div className="FirstClicksChartToggle">
            <div className="FirstClicksChartToggleElement" onClick={() => handleEducationFeedToggleClick()}> Education Feed </div>
            <div className="FirstClicksChartToggleElement" onClick={() => handleEntertainmentFeedToggleClick()}> Entertainment Feed </div>
       </div>
       <Chart options={options} series={series} type="heatmap" width={500} height={320} />
    </div>
  )
}
