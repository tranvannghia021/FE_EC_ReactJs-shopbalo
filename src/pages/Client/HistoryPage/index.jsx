import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetInformationClient } from '../../../api/Client/Auth/authAPI';
import { getAllOrderByCustomer } from '../../../api/Client/Order';
import { order_table_header } from '../../../asset/data/order_table_header';
import { order_table_header_client } from '../../../asset/data/order_table_header_client';
import OrderHistoryDetail from '../../../components/client/History/DetailOrder';
import { OrderTableClient } from '../../../components/client/History/ListOrder';
import NotFoundData from '../../../components/commons/Layouts/NotFoundData';
import PaginationUI from '../../../components/commons/Layouts/Pagination';
import Skeleton from '../../../components/commons/Layouts/Skeleton';
import { isHistoryDetailSelector } from '../../../redux/selectors/history/history.selector';
import { profileSelector } from '../../../redux/selectors/profile/profile.selector';

export function HistoryOrderPage() {
  const data_order_table_header = [...order_table_header_client];
  const [activeHeader, setActiveHeader] = useState(1);
  const [loading, setLoading] = useState(true);
  const [dataListWait, setdataListWait] = useState([]);
  const [dataListToShip, setdataListToShip] = useState([]);
  const [dataListToReceive, setdataListToReceive] = useState([]);
  const [dataListCompleted, setdataListCompleted] = useState([]);
  const [dataListCancelled, setdataListCannelled] = useState([]);
  const [dataListOrder, setdataListOrder] = useState([]);
  const idCustomer = useSelector(profileSelector);
  const detailHistory = useSelector(isHistoryDetailSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    handleGetAllOrder(1);
    handleGetAllOrder(2);
    handleGetAllOrder(3);
    handleGetAllOrder(6);
    handleGetAllOrder(7);
  }, [dispatch, idCustomer]);

  const handleGetAllOrder = async (status = 1) => {
    if (status === 1) {
      const result = await getAllOrderByCustomer({
        filterStatus: status,
      });

      if (result === 401) {
        return false;
      } else if (result === 500) {
        return false;
      } else {
        setdataListOrder(result);
        setdataListWait(result);
      }
    }
    if (status === 2) {
      const result = await getAllOrderByCustomer({
        filterStatus: status,
      });

      if (result === 401) {
        return false;
      } else if (result === 500) {
        return false;
      } else {
        setdataListToShip(result);
      }
    }
    if (status === 3) {
      const result = await getAllOrderByCustomer({
        filterStatus: '3,4,5',
      });

      if (result === 401) {
        return false;
      } else if (result === 500) {
        return false;
      } else {
        setdataListToReceive(result);
      }
    }
    if (status === 6) {
      const result = await getAllOrderByCustomer({
        filterStatus: status,
      });

      if (result === 401) {
        return false;
      } else if (result === 500) {
        return false;
      } else {
        setdataListCompleted(result);
      }
    }
    if (status === 7) {
      const result = await getAllOrderByCustomer({
        filterStatus: status,
      });
      setLoading(false);
      if (result === 401) {
        return false;
      } else if (result === 500) {
        return false;
      } else {
        setdataListCannelled(result);
      }
    }
  };
  const handleToWait = () => {
    setActiveHeader(1);
    setdataListOrder(dataListWait);
  };
  const handleToShip = () => {
    setActiveHeader(2);
    setdataListOrder(dataListToShip);
  };
  const handleReceive = () => {
    setActiveHeader(3);
    setdataListOrder(dataListToReceive);
  };
  const handleComplete = () => {
    setActiveHeader(4);
    setdataListOrder(dataListCompleted);
  };
  const handleCancelled = () => {
    setActiveHeader(5);
    setdataListOrder(dataListCancelled);
  };
  return (
    <>
      <section>
        <div className="container mt-5 mb-5">
          <div className="row"></div>
          {detailHistory ? (
            <h3 className="mb-5 magin-0px">History Detail</h3>
          ) : (
            <>
              <h3 className="mb-5">History Order</h3>
              <div className="row">
                <div className="container d-flex justify-content-around">
                  <h4
                    className={`mb-5 cursor-pointer margin-0px ${activeHeader === 1 ? 'text-blue-100' : ''} `}
                    onClick={handleToWait}
                  >
                    Waitting ({dataListWait.length})
                  </h4>
                  <h4
                    className={`mb-5 cursor-pointer margin-0px ${activeHeader === 2 ? 'text-blue-100' : ''} `}
                    onClick={handleToShip}
                  >
                    To Ship ({dataListToShip.length})
                  </h4>
                  <h4
                    className={`mb-5 cursor-pointer margin-0px ${activeHeader === 3 ? 'text-blue-100' : ''} `}
                    onClick={handleReceive}
                  >
                    To Receive ({dataListToReceive.length})
                  </h4>
                  <h4
                    className={`mb-5 cursor-pointer margin-0px ${activeHeader === 4 ? 'text-blue-100' : ''} `}
                    onClick={handleComplete}
                  >
                    Completed ({dataListCompleted.length})
                  </h4>
                  <h4
                    className={`mb-5 cursor-pointer margin-0px ${activeHeader === 5 ? 'text-blue-100' : ''} `}
                    onClick={handleCancelled}
                  >
                    Cancelled ({dataListCancelled.length})
                  </h4>
                </div>
              </div>
            </>
          )}

          <div className="row justify-content-center">
            <>
              {detailHistory ? (
                <OrderHistoryDetail infoCustomer={idCustomer} />
              ) : loading === false && idCustomer !== undefined ? (
                dataListOrder.length > 0 ? (
                  <OrderTableClient tableHeader={data_order_table_header} tableBody={dataListOrder} />
                ) : (
                  <NotFoundData btnLink="Purchase" />
                )
              ) : (
                <Skeleton column={6} />
              )}

              {/* {totalRecord > 10 && (
                    <PaginationUI
                      handlePageChange={handlePageChange}
                      perPage={perPage}
                      totalRecord={totalRecord}
                      currentPage={page}
                    />
                  )} */}
            </>
          </div>
        </div>
      </section>
    </>
  );
}
