import React, { memo, useEffect, useState } from 'react';
import { Chart } from 'primereact';
import "./index.css"
import {  getStatisticStaff } from '../../../../../api/Admin/Statistic/statisticAPI';
function BarChartStaff({data,label}) {

  const basicData ={
    labels:label,
    datasets: [
      {
        label: 'Amount of orders',
        backgroundColor: '#1fc087',
        data: data
      },

    ]
  };
  let basicOptions = {
    maintainAspectRatio: false,
    aspectRatio: .8,
    plugins: {
      legend: {
        labels: {
          color: '#495057'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      },
      y: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      }
    }
  };
  return (
    <div className=" card container_chart_md">
      <h5>Top Staff Productivity </h5>
      <Chart type="bar" data={basicData} options={basicOptions} />
    </div>
  );
}

export default memo(BarChartStaff);