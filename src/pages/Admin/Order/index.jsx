import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCookie, getCookies } from '../../../api/Admin/Auth';
import { getAllOrder } from '../../../api/Admin/Order/indexAPI';

import { order_table_header } from '../../../asset/data/order_table_header';
import { ErrorToast } from '../../../components/commons/Layouts/Alerts';
import NotFoundData from '../../../components/commons/Layouts/NotFoundData';
import PaginationUI from '../../../components/commons/Layouts/Pagination';
import Skeleton from '../../../components/commons/Layouts/Skeleton';
import { OrderTable } from '../../../components/admin/Order';
import OrderDetail from '../../../components/admin/Order/OrderDetail';
import UpdateStatusOrder from '../../../components/admin/Order/UpdateStatusOrder';
import { setExpiredToken } from '../../../redux/reducer/auth/auth.reducer';
import {
  isAddOrderSelector,
  isEditStatusOrderSelector,
  isOrderDetailSelector,
} from '../../../redux/selectors/order/order.selector';
import FilterOrder from '../../../components/admin/Order/FilterOrder';
import Notiflix from 'notiflix';
import { setIsAdd, setIsDetail, setIsEdit } from '../../../redux/reducer/order/order.reducer';
import OrderAdd from '../../../components/admin/Order/Add';
import { getAllProducts } from '../../../api/Admin/Product/productAPI';

function OrderPage(props) {
  const data_order_table_header = [...order_table_header];

  const [data, setData] = useState([]);
  const [listProduct, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [loading, setLoading] = useState(true);
  const [perPage] = useState(10);
  const isAddOrder = useSelector(isAddOrderSelector);
  const isUpdateStatus = useSelector(isEditStatusOrderSelector);
  const isOrderDetail = useSelector(isOrderDetailSelector);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    const handleGetAllOrder = async () => {
      const result = await getAllOrder({});
      if (result === 401) {
        handleSetUnthorization();
        return false;
      } else if (result === 500) {
        return false;
      } else {
        setOrder(result, 'reset_page');
      }
      setLoading(false);
    };

    handleGetAllOrder();
  }, [dispatch]);

  const backToOrderList = async (value, action) => {
    setLoading(true);
    if (action === 'edit') {
      console.log('Back to Edit');
    }

    const result = await getAllOrder({
      sort: value,
    });
    setOrder(result, 'page');
    setLoading(false);
  };

  const setOrder = (result, value) => {
    setData(result.data);
    if (value !== 'page') {
      setPage(1);
    }
    setTotalRecord(result.meta.total);
  };
  const handlePageChange = async (page) => {
    setPage(page);
    setLoading(true);
    const result = await getAllOrder({
      page,
    });
    if (result === 401) {
    } else if (result === 500) {
      return false;
    } else {
      setOrder(result, 'page');
    }
    setLoading(false);
  };
  const handleSearchOrder = async (e) => {
    e.preventDefault();
    if (search !== '') {
      const result = await getAllOrder({
        page: page,
        search,
      });
      if (result === 500 || result === 401) {
        ErrorToast('Something went wrong. Please try again', 3000);
      } else {
        setOrder(result, 'page');
      }
      return;
    }
    const result = await getAllOrder({
      page: page,
    });
    if (result === 500 || result === 401) {
      ErrorToast('Something went wrong. Please try again', 3000);
    } else {
      setOrder(result, 'page');
    }
  };
  const handleSetUnthorization = () => {
    dispatch(setExpiredToken(true));
    const token = getCookies('token');
    if (token) {
      deleteCookie('token');
    }
  };
  const dataStatus = [
    { id: 1, value: 'Wait for confirmation...' },
    { id: 2, value: 'Confirm !' },
    { id: 3, value: 'Delivery' },
    { id: 4, value: 'Successfully delivery' },
    { id: 5, value: 'Delivery failed' },
    { id: 6, value: 'Successfully' },
    { id: 7, value: 'Failed' },
  ];
  const handleCurrentFilter = async (value) => {
    setLoading(true);
    const result = await getAllOrder({
      filterStatus: value === 'All' ? undefined : value,
    });
    if (result === 500 || result === 401) {
      ErrorToast('Something went wrong. Please try again', 3000);
    } else {
      setOrder(result, 'page');
    }
    Notiflix.Block.remove('#root');
    setLoading(false);
    return;
  };
  return (
    <>
      <section>
        <div className="container-fluid mt-5">
          {!isUpdateStatus && !isOrderDetail && !isAddOrder && (
            <h5 className="text-danger font-weight-bold mb-3">Order List</h5>
          )}

          {isAddOrder && !isOrderDetail && !isUpdateStatus && (
            <>
              <h5 className="text-danger font-weight-bold mb-3">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(setIsAdd(false));
                  }}
                >
                  Order List
                </span>
                / Order Add
              </h5>
            </>
          )}
          {!isAddOrder && isOrderDetail && !isUpdateStatus && (
            <>
              <h5 className="text-danger font-weight-bold mb-3">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(setIsEdit(false));
                    dispatch(setIsDetail(false));
                  }}
                >
                  Order List
                </span>
                / Order Detail
              </h5>
            </>
          )}
          {!isAddOrder && !isOrderDetail && isUpdateStatus && (
            <>
              <h5 className="text-danger font-weight-bold mb-3">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(setIsEdit(false));
                    dispatch(setIsDetail(false));
                  }}
                >
                  Order List
                </span>
                / Update Status
              </h5>
            </>
          )}
          {!isUpdateStatus && !isOrderDetail && !isAddOrder ? (
            <div className="row ">
              <div className="d-flex justify-content-between">
                <div className="d-flex  ">
                  <FilterOrder currentFilter="" setCurrentFilter={handleCurrentFilter} data={dataStatus} />
                </div>
                <div className="d-flex justify-content-between ">
                  <Form onSubmit={(e) => handleSearchOrder(e)}>
                    <InputGroup>
                      <Form.Control
                        id="search-order"
                        placeholder="Code order or customer"
                        onChange={(e) => setSearch(e.target.value)}
                      />

                      <Button id="search-user" variant="danger" type="submit">
                        <FaSearch />
                      </Button>
                    </InputGroup>
                  </Form>
                  <Button
                    id="create-new-product"
                    variant="danger"
                    className="font-weight-bold ms-3"
                    onClick={() => dispatch(setIsAdd(true))}
                  >
                    Create order
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}

          {!isUpdateStatus && !isOrderDetail && !isAddOrder ? (
            <div className="row justify-content-center">
              <>
                {!loading ? (
                  <>
                    {data.length > 0 ? (
                      <OrderTable tableHeader={data_order_table_header} tableBody={data} />
                    ) : (
                      <NotFoundData />
                    )}

                    {totalRecord > 10 && (
                      <PaginationUI
                        handlePageChange={handlePageChange}
                        perPage={perPage}
                        totalRecord={totalRecord}
                        currentPage={page}
                      />
                    )}
                  </>
                ) : (
                  <Skeleton column={6} />
                )}
              </>
            </div>
          ) : (
            <>
              {isUpdateStatus && <UpdateStatusOrder backToOrderList={backToOrderList} />}
              {isOrderDetail && <OrderDetail dataOrder={data} />}
              {isAddOrder && <OrderAdd backToOrderList={backToOrderList} />}
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default OrderPage;
