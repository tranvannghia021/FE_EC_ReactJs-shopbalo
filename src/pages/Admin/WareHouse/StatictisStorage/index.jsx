import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact';
import { getAmountExport, getAmountImport } from '../../../../api/Admin/WareHouse';
import './style.css';
import { Col, Form, Row } from 'react-bootstrap';

function StatisticStorage(props) {
  const arrayMonth = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' },
  ];
  const [data, setData] = useState({});
  const [dataImort, setDataImport] = useState([]);
  const [beginMonth, setBeginMonth] = useState(1);
  const [endMonth, setEndMonth] = useState(12);

  useEffect(() => {
    const getInfoImports = async () => {
      const result = await getAmountImport();
      if (result !== 401 && result !== 500) {
        setData(prev => ({ ...prev, import: result.data }));
      }
    };
    const getInfoExports = async () => {
      const result = await getAmountExport();
      if (result !== 401 && result !== 500) {
        setData(prev => ({ ...prev, export: result.data }));
      }
    };
    getInfoImports();
    getInfoExports();


  }, []);
  const buildMonthChart = (start, end) => {
    const month = [];
    //for (let i = +start; i <= end; i++) month.push( arrayMonth[i-1]i)
  };
  const buildDataChart = (start, end, input = []) => {
    const month = [];
    for (let i = +start; i <= end; i++) month.push(i);
    return month.map((value) => {
      var ele = input.find((item) => +item.month === value);
      return !!ele ? ele.amount : 0;
    });
  };


  //buildDataChart(0, 0, data.import);
  //console.log(dataImort);
  const labels = arrayMonth.slice(beginMonth - 1, endMonth);

  const basicData = {
    labels: labels.map((item) => item.name), //['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Amount Import',
        backgroundColor: '#1aa2dc',
        data: buildDataChart(beginMonth, endMonth, data.import),// [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: 'Amount Export',
        backgroundColor: '#f1089f',
        data: buildDataChart(beginMonth, endMonth, data.export),
      },
    ],
  };
  console.log(basicData);
  let basicOptions = {
    maintainAspectRatio: false,
    aspectRatio: .8,
    plugins: {
      legend: {
        labels: {
          color: '#495057',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#495057',
        },
        grid: {
          color: '#ebedef',
        },
      },
      y: {
        ticks: {
          color: '#3f4449',
        },
        grid: {
          color: '#ebedef',
        },
      },
    },
  };

  return (
    <div>
      <h4 className='m-t-50 text-xl-center text-bg-dark border-1 border-radius-2px mb-3'> Statictis Import and Export
        Product in Warehouse</h4>


      <div className='card p-3 how-shadow1 m-t-50 row'>

        <Row>
          <Col md={9}>
            <h5 className='text-black col-md-4'>2022</h5>
          </Col>
          <Col md={3}>
            <Form className='mb-3 float-box '>
              <span className='d-inline'>Start : </span>
              <Form.Control as='select'
                            aria-label='Default select example'
                            onChange={e => setBeginMonth(e.target.value)}>
                <option>Open this select month</option>
                {arrayMonth.map((item) => (
                  <option key={item.value} value={item.value}>{item.value} - {item.name}</option>))}
              </Form.Control>
              <span className='d-inline'>End : </span>
              <Form.Control
                as='select'
                aria-label='Default select example'
                onChange={e => setEndMonth(e.target.value)}>
                aria-label='Default select example'>
                <option>Open this select month</option>
                {arrayMonth.map((item) => (
                  <option key={item.value} value={item.value}>{item.value} - {item.name}</option>))}
              </Form.Control>
            </Form>
          </Col>
        </Row>
        <Chart type='bar' data={basicData} options={basicOptions} className='' />
      </div>

    </div>
  );
}

export default StatisticStorage;