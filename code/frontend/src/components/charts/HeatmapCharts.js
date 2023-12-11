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
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false
            },
            width: "100%"
          }
        },
        plotOptions: {
          heatmap: {
            shadeIntensity: 0.1,
            colorScale: {
              ranges: [
                // { from: -5, to: 0, name: "very low", color: "#c0e0c3" },
                // { from: 1, to: -1, name: "low", color: "#90c695" },
                // { from: 0, to: 0.5, name: "medium", color: "#50bccd" },
                // { from: 1.5, to: 8, name: "high", color: "#fba969" },
                // { from: 9, to: 18, name: "very high", color: "#e08283" }
                { from: 100000, to: 1000000, name: "very low", color: "#c0e0c3" },
                { from: 1000000, to: 5000000, name: "medium", color: "#50bccd" },
                { from: 5000000, to: Infinity, name: "high", color: "#e08283" }
              ]
            }
          }
        },
        dataLabels: { enabled: true, style: { colors: ["#104c6d"] } },
        xaxis: {
          labels: {
            show: true,
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
    
      const [series, setSeries] = useState([
        {
          name: "S1",
          data: [
            { x: "08:00", y: 5 },
            { x: "09:00", y: 5 },
            { x: "10:00", y: 1 }
          ]
        },
        {
          name: "S2",
          data: [
            { x: "08:00", y: 1 },
            { x: "09:00", y: 1 },
            { x: "10:00", y: 3 }
          ]
        },
        {
          name: "S3",
          data: [
            { x: "08:00", y: 0 },
            { x: "09:00", y: 0 },
            { x: "10:00", y: 0 }
          ]
        },
        {
          name: "S4",
          data: [
            { x: "08:00", y: 6 },
            { x: "09:00", y: 3 },
            { x: "10:00", y: 18 }
          ]
        },
        {
          name: "S5",
          data: [
            { x: "08:00", y: 0 },
            { x: "09:00", y: 0 },
            { x: "10:00", y: 0 }
          ]
        },
        {
          name: "S6",
          data: [
            { x: "08:00", y: 3 },
            { x: "09:00", y: 2 },
            { x: "10:00", y: 2 }
          ]
        },
        {
          name: "S7",
          data: [
            { x: "08:00", y: 4 },
            { x: "09:00", y: 1 },
            { x: "10:00", y: 2 }
          ]
        },
        {
          name: "S8",
          data: [
            { x: "08:00", y: 3 },
            { x: "09:00", y: 2 },
            { x: "10:00", y: 2 }
          ]
        }
      ]);

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



        })
    })

  return (
    <div className='FirstClicksChartsContainer'>
        <div className='FirstClicksChartTitle'> Video duration preference</div>
        <div className="FirstClicksChartToggle">
            {/* <div className="FirstClicksChartToggleElement" onClick={() => handleEducationFeedToggleClick()}> Education Feed </div>
            <div className="FirstClicksChartToggleElement" onClick={() => handleEntertainmentFeedToggleClick()}> Entertainment Feed </div> */}
       </div>
       <Chart options={options} series={series} type="heatmap" width={500} height={320} />
    </div>
  )
}
