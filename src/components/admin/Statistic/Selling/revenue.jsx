import React, { memo, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Chart } from 'primereact';
import NotFoundData from '../../../commons/Layouts/NotFoundData';

function LineChartRevenue({ type,options,data,onFilter }) {
  return (
    <div className=" container_chart_order">
      <div className="chart-header">
        Revenue
        <div className="chart-button">
          <Button
            variant="outline-dark"
            className="font-weight-bold"
            onClick={()=>onFilter('Monthly')}
          >
            Monthly
          </Button>
          <Button
            variant="outline-dark"
            className="font-weight-bold ms-2"
            onClick={()=>onFilter('Weekly')}
          >
            Weekly
          </Button>
          {/*<Button*/}
          {/*  variant="outline-dark"*/}
          {/*  className="font-weight-bold ms-2"*/}
          {/*  onClick={()=>onFilter('Today')}*/}
          {/*>*/}
          {/*  Today*/}
          {/*</Button>*/}
        </div>
      </div>
      {
          <Chart type={type} data={data} options={options}  className="m-lg-3" id='chart'/>
      }
      <div className="chart-footer">

      </div>
    </div>
  );
}

export default memo(LineChartRevenue);