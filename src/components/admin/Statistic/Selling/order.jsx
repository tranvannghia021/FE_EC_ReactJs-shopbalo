import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Chart } from 'primereact';
import { getStatistisOrder } from '../../../../api/Admin/Statistic/statisticAPI';
import "./index.css"
import { Button } from 'react-bootstrap';
import NotFoundData from '../../../commons/Layouts/NotFoundData';


function ChartLineOrders({ type,label,data,onFilter }) {


  const [dataRemake, setDataRemake] = useState([]);
  const [labelRemake, setLabelRemake] = useState([]);

  const optionFilter=[
    {id:1,name:'Monthly'},
    {id:2,name:'Weekly'},
    //{id:3,name:'Today'},
  ]
  const [filter,setFilter]= useState('Weekly')

  const dataOrder = {
    labels: label,
    datasets: [
      {
        label: 'Amount of orders',
        data: data,
        fill: false,
        borderColor: '#4bc0c0'
      }
    ]
  };
  const optionsOrder = {
    plugins: {
      title: {
        display: true,
        text: 'The chart shows the Order for sale',
        font: {
          size: 16
        }
      },
      legend: {
        position: 'bottom'
      }
    }
  }
  // switch (filter){
  //   case 'Monthly':
  //     var today = new Date();
  //     var thatday = new Date();
  //     thatday.setMonth(today.getMonth() - 1);
  //     console.log(today.toDateString(),thatday.toDateString());
  //
  //     var getDaysArray = (start, end)=> {
  //
  //       for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
  //         arr.push(new Date(dt));
  //       }
  //       return arr;
  //     };
  //     const d=getDaysArray(thatday,today);
  //     console.log(d);
  //
  //     break
  //   case 'Weekly':
  //
  //     break
  //   case 'Today':
  //
  //     break
  // }
  return (
    <div className=" container_chart_order">
      <div className="chart-header">
        Orders
        <div className="chart-button">
          {
            optionFilter.map(option=>(
              <Button
                key={option.id}
                variant="outline-dark"
                checked={filter===option.name}
                className="font-weight-bold margin-left-8px"
                onClick={()=>{
                  onFilter(option.name)
                  setFilter(option.name)
                }}
              >
                {option.name}
              </Button>
            ))
          }
        </div>
      </div>
        <Chart type={type} data={dataOrder} options={optionsOrder}  className="m-lg-3" id='chart'/>
      <div className="chart-footer">
      </div>
    </div>
  );
}

export default memo(ChartLineOrders);