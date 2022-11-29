import React, { useCallback, useEffect, useState } from 'react';
import ChartLineOrders from '../../../components/admin/Statistic/Selling/order';
import PieChartCategory from '../../../components/admin/Statistic/Selling/Category/category';
import SummaryStatisTic from '../../../components/admin/Statistic/Summary';
import LineChartRevenue from '../../../components/admin/Statistic/Selling/revenue';
import { Col, Row } from 'react-bootstrap';
import BarChartStaff from '../../../components/admin/Statistic/Selling/Staff/staff';
import {
  getFigureNewCustomer,
  getFigureNewOrderToday,
  getFigureRevenueToday,
  getStatisticCustomer,
  getStatisticStaff,
  getStatistisCategory,
  getStatistisOrder,
  getStatistisRevenue,
} from '../../../api/Admin/Statistic/statisticAPI';
import BarChartCustomer from '../../../components/admin/Statistic/Selling/Customer';
import { setExpiredToken } from '../../../redux/reducer/auth/auth.reducer';
import { deleteCookie, getCookies } from '../../../api/Admin/Auth';
import { useDispatch } from 'react-redux';
import SkeletonDashboard from '../../../components/commons/Layouts/Skeleton/SkeletonDashboard';

export function DashBoardPage(props) {
  const month=new Date().getMonth();
  console.log(month);
  const [loading, setLoading] = useState(true);
  const [summaryData, setSummaryData] = useState({});
  const [chartOrder, setChartOrder] = useState([]);
  const [chartRevenue, setChartRevenue] = useState([]);
  const [chartCategory, setChartCategory] = useState([]);
  const [chartStaff, setChartStaff] = useState([]);
  const [chartCustomer, setChartCustomer] = useState([]);


  const dispatch = useDispatch();
  const [filter, setFilter] = useState('Weekly');
  const checkResultAPI = (result) => {
    if (result === 401) {
      handleSetUnthorization();
      return false;
    } else if (result === 500) {
      return false;
    } else return result.data;
  };
  /* call API */
  const handleGetStatistisOrders = async (filter) => {


    const result = await getStatistisOrder({ filter });
    if (result === 401) {
      handleSetUnthorization();
      return false;
    } else if (result === 500) {
      return false;
    } else {
      setChartOrder({
        label: result.data.map((item) => `${item.date}-${month+1}-2022`),
        data: result.data.map((item) => item.amount_order),
      });
    }
  };
  const handleGetStatistisRevenue = async (filter) => {
    const result = await getStatistisRevenue({ filter });
    if (result === 401) {
      handleSetUnthorization();
      return false;
    } else if (result === 500) {
      return false;
    } else {
      setChartRevenue({
        label: result.data.map((item) =>`${item.date}-${month+1}-2022`),
        data: result.data.map((item) => item.revenue),
      });
    }

  };
  const handleGetStatistisCategory = async () => {
    const result = await getStatistisCategory();
    if (result === 401) {
      handleSetUnthorization();
      return false;
    } else if (result === 500) {
      return false;
    } else {
      setChartCategory(result.data);
    }
  };
  const handleGetStatistisStaff = async () => {
    const result = await getStatisticStaff();
    if (result === 401) {
      handleSetUnthorization();
      return false;
    } else if (result === 500) {
      return false;
    } else {
      setChartStaff({
        data: result.data.map((item) => item.amount_order),
        label: result.data.map((item) => `${item.first_name} ${item.last_name}`),
      });
    }
  };
  const handleGetStatistisCustomer = async () => {
    const result = await getStatisticCustomer();
    if (result === 401) {
      handleSetUnthorization();
      return false;
    } else if (result === 500) {
      return false;
    } else {
      setChartCustomer({
        data: result.data.map((item) => item.amount_order),
        label: result.data.map((item) => `${item.first_name} ${item.last_name}`),
      });
    }
  };

  useEffect(() => {
    const handleGetSummaryData = async () => {
      const resultOrder = checkResultAPI(await getFigureNewOrderToday());
      const resultRevenue = checkResultAPI(await getFigureRevenueToday());
      const resultCustomer = checkResultAPI(await getFigureNewCustomer());
      setSummaryData({
        order: !!resultOrder && resultOrder.reduce((acc, order) => order).amount_order,
        revenue: !!resultRevenue && resultRevenue.reduce((acc, revenue) => revenue).revenue,
        customer: !!resultCustomer && resultCustomer.reduce((acc, customer) => customer).amount_customer,
      });
    };
    handleGetSummaryData();
    handleGetStatistisOrders('Weekly');
    handleGetStatistisRevenue('Weekly');

    handleGetStatistisStaff();
    handleGetStatistisCustomer();
    setLoading(false);

  }, []);
  /* handle Func */
  const handleFilterOrder = useCallback((filterOrder) => {
    handleGetStatistisOrders(filterOrder);
    //  console.log(filterOrder);
    //setFilter(filterOrder);
  }, []);
  const handleFilterRevenue = useCallback((filterRevenue) => {
    handleGetStatistisRevenue(filterRevenue);
  }, []);

  /* config chart */

  const dataRevenue = {
    labels: chartRevenue.label,
    datasets: [
      {
        label: 'Amount of revenues',
        data: chartRevenue.data,
        fill: false,
        borderColor: '#b70544',
      },
    ],
  };
  const optionsRevenue = {
    plugins: {
      title: {
        display: true,
        text: 'The chart shows revenue of store',
        font: {
          size: 16,
        },
      },
      legend: {
        position: 'bottom',
      },
    },
  };

  const handleSetUnthorization = () => {
    dispatch(setExpiredToken(true));
    const token = getCookies('token');
    if (token) {
      deleteCookie('token');
    }
  };
  return (
    <>
      {
        !loading ? (<div className='container-fluid mt-5'>
            <SummaryStatisTic order={summaryData.order} revenue={summaryData.revenue} customer={summaryData.customer} />
            <div className=' justify-content-center'>
              <ChartLineOrders type='line' data={chartOrder.data} label={chartOrder.label} onFilter={handleFilterOrder} />
              <LineChartRevenue type='line' data={dataRevenue} options={optionsRevenue} onFilter={handleFilterRevenue} />
              <Row>
                <Col>
                  <BarChartStaff data={chartStaff.data} label={chartStaff.label} />
                </Col>
                <Col>
                  <BarChartCustomer data={chartCustomer.data} label={chartCustomer.label} />
                </Col>
              </Row>
              <Row>
                <Col>
                  {' '}
                  <PieChartCategory />
                </Col>
                <Col>
                  {' '}
                  {/*<PieChartCategory />*/}
                </Col>
              </Row>

              {/**/}
            </div>
          </div>)
          : (
            <SkeletonDashboard />
          )
      }
    </>
  );
}
