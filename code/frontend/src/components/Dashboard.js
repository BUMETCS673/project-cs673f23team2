import React, { useEffect, useState } from 'react'
import { getDataForFirstClicks, getHeatmapData, getKeywordsData } from '../utils/chartsUtils';
import FirstClicksCharts from './charts/FirstClicksCharts';
import '../styles/Dashboard.css';
import KeywordsCharts from './charts/KeywordsCharts';
import HeatmapCharts from './charts/HeatmapCharts';

export default function Dashboard() {

  return (
    <div className='ChartsContainer'>
      <FirstClicksCharts data={getDataForFirstClicks()} />
      <KeywordsCharts data={getKeywordsData()} />
      <HeatmapCharts data={getHeatmapData()} />
    </div>
  )
}