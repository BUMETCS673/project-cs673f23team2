import React, { useEffect, useState } from 'react'
import { getDataForFirstClicks, getKeywordsData } from '../utils/chartsUtils';
import FirstClicksCharts from './charts/FirstClicksCharts';
import '../styles/Dashboard.css';

export default function Dashboard() {

  return (
    <div className='ChartsContainer'>
      <FirstClicksCharts data={getDataForFirstClicks()}/>
    </div>
  )
}
