import React, { memo, useEffect, useState } from 'react';
import { Chart } from 'primereact';
import { getStatistisCategory } from '../../../../../api/Admin/Statistic/statisticAPI';
import { color_Category_PieChart } from '../../../../../asset/data/statistic_color';

function PieChartCategory(props) {
  const [loading, setLoading] = useState(true);
  const [chart, setChart] = useState([]);
  const [search, setSearch] = useState([]);
  let params = {};

  useEffect(() => {
    const handleGetStatistisCategory = async () => {
      const result = await getStatistisCategory(params);
      if (result === 401) {
        return false;
      } else if (result === 500) {
        return false;
      } else {

        setChart(result.data);
      }
      setLoading(false);
    };
    handleGetStatistisCategory();
  }, [search]);

  //Handle Data
  const dataPieChart = chart.map(item => item.amount_categories);
  const dataLabel = chart.map(item => item.name);
  const dataBackgroundColor = color_Category_PieChart.slice(0, chart.length);
  const lightOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#495057',
        },
      },
    },
  };
  const chartData = {
    labels: dataLabel,
    datasets: [
      {
        data: dataPieChart,
        backgroundColor: dataBackgroundColor.map(item => item.backgroundColor),
        hoverBackgroundColor: dataBackgroundColor.map(item => item.hoverBackgroundColor),
      },
    ],
  };
  //console.log(chartData)


  return (
    <div className='card container_chart_md'>
      <h4 className="chart-header">
        The proportion of different product types sold
      </h4>
      <Chart type='pie' data={chartData} options={lightOptions} />
    </div>
  );
}

export default memo(PieChartCategory);