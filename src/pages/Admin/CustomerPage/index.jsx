import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaginationUI from '../../../components/commons/Layouts/Pagination';
import Skeleton from '../../../components/commons/Layouts/Skeleton';
import FilterStatus from '../../../components/admin/Staff/FilterStatus';
import { Button } from 'react-bootstrap';
import { BlockUI } from '../../../components/commons/Layouts/Notiflix';
import { setIsAdd, setIsEdit } from '../../../redux/reducer/customer/customer.reducer';
import Notiflix from 'notiflix';
import { isAddCustomerSelector, isEditCustomerSelector, isResetCustomerSelector } from '../../../redux/selectors';
import SearchWithDropdownOptions from '../../../components/commons/Layouts/SearchWithDropdownOptions/SearchWithDropdownOptions';
import { CustomerTable } from '../../../components/admin/Customer';
import { customer_table_header } from '../../../asset/data/customer_table_header';
import { getAllCustomers } from '../../../api/Admin/Customer/customerAPI';
import CustomerAdd from '../../../components/admin/Customer/Add';
import CustomerEdit from '../../../components/admin/Customer/Edit';
import NotFoundData from '../../../components/commons/Layouts/NotFoundData';
import { setExpiredToken, setIsLogin } from '../../../redux/reducer/auth/auth.reducer';
import { deleteCookie, getCookies } from '../../../api/Admin/Auth';

export function CustomerPage(props) {
  const data_customer_table_header = [...customer_table_header];
  const [data, setData] = React.useState([]);
  // Pagination
  const [perPage, setPerPage] = React.useState(8);
  const [totalPage, setTotalPage] = React.useState(0);
  const [totalRecord, setTotalRecord] = React.useState(0);
  const [page, setPage] = React.useState(1);

  //Filter & Search
  const [filter, setFilter] = React.useState('email');
  const [search, setSearch] = React.useState([]);
  const [filterStatus, setFilterStatus] = React.useState('All');
  const data_options_filter = [
    { id: 1, name: 'All', value: 'All' },
    { id: 2, name: 'Active', value: 1 },
    { id: 3, name: 'Disable', value: 0 },
  ];
  //Redux
  const isAddCustomer = useSelector(isAddCustomerSelector);
  const isEditCustomer = useSelector(isEditCustomerSelector);
  const isReset = useSelector(isResetCustomerSelector);
  const dispatch = useDispatch();
  //Loading
  const [loading, setLoading] = React.useState(true);
  //Logic

  React.useEffect(() => {
    let params = {};
    if (filterStatus !== 'All') params = { ...params, filterStatus };
    if (search !== '') params = { ...params, filter, search };
    const handleGetAllCustomers = async () => {
      const result = await getAllCustomers(params);
      if (result === 401) {
        handleSetUnthorization();
        return false;
      } else if (result === 500) {
        return false;
      } else {
        setCustomer(result, 'reset-page');
      }
      setLoading(false);
    };
    handleGetAllCustomers();
  }, [dispatch, search, isReset, filterStatus]);

  const setCustomer = (result, value) => {
    setData(result.data);
    if (value !== 'page') setPage(1);
    setTotalRecord(result.meta.total);
  };

  const handlePageChange = async (page) => {
    setPage(page);
    setLoading(true);
    const result = await getAllCustomers({
      page,
    });
    if (result === 401) {
    } else if (result === 500) {
      return false;
    } else {
      setCustomer(result, 'page');
    }
    setLoading(false);
  };

  const backToCustomerList = async (value, action) => {
    setLoading(true);
    if (action === 'edit') {
    }

    const result = await getAllCustomers({
      sort: value,
    });
    setCustomer(result, 'page');
    setLoading(false);
  };
  const goToPageAddCustomer = () => {
    BlockUI('#root', 'fixed');
    setTimeout(function () {
      dispatch(setIsAdd(true));
      Notiflix.Block.remove('#root');
    }, 300);
  };
  const handleSetUnthorization = () => {
    dispatch(setExpiredToken(true));
    const token = getCookies('token');

    if (token) {
      deleteCookie('token');
    }
  };
  return (
    <section>
      <div className="container-fluid mt-5">
        <>
          {!isAddCustomer && !isEditCustomer && <h5 className="text-danger font-weight-bold mb-3">Customer List</h5>}
          {isAddCustomer && (
            <h5 className="text-danger font-weight-bold mb-3">
              <span
                className="cursor-pointer"
                onClick={() => {
                  dispatch(setIsEdit(false));
                  dispatch(setIsAdd(false));
                }}
              >
                Customer List
              </span>
              / Customer Add
            </h5>
          )}
          {isEditCustomer && (
            <h5 className="text-danger font-weight-bold mb-3">
              <span
                className="cursor-pointer"
                onClick={() => {
                  dispatch(setIsEdit(false));
                  dispatch(setIsAdd(false));
                }}
              >
                Customer List
              </span>
              / Customer Edit
            </h5>
          )}
        </>
        {!isAddCustomer && !isEditCustomer ? (
          <>
            <div className="row">
              <div className="mb-3 d-flex justify-content-between">
                <div className="d-flex justify-content-between ">
                  <FilterStatus data_options={data_options_filter} setFilterStatus={setFilterStatus} />
                </div>
                <div className="d-flex justify-content-between ">
                  <SearchWithDropdownOptions currentFilter={filter} setSearch={setSearch} setFilter={setFilter} />
                  <Button
                    id="create-new-product"
                    variant="danger"
                    className="font-weight-bold ms-3"
                    onClick={goToPageAddCustomer}
                  >
                    Create new customer
                  </Button>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              {!loading ? (
                <>
                  {data.length > 0 ? (
                    <CustomerTable tableHeader={data_customer_table_header} tableBody={data} />
                  ) : (
                    <NotFoundData />
                  )}

                  {totalRecord > 8 && (
                    <PaginationUI
                      handlePageChange={handlePageChange}
                      perPage={perPage}
                      totalRecord={totalRecord}
                      currentPage={page}
                    />
                  )}
                </>
              ) : (
                <Skeleton column={7} />
              )}
            </div>
          </>
        ) : (
          <>
            {isAddCustomer && <CustomerAdd backToCustomerList={backToCustomerList} />}
            {isEditCustomer && <CustomerEdit backToCustomerList={backToCustomerList} />}
          </>
        )}
      </div>
    </section>
  );
}
