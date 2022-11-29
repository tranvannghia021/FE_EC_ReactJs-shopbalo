import Notiflix from 'notiflix';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCookie, getCookies } from '../../../api/Admin/Auth';
import { getAllStaffs } from '../../../api/Admin/Staff/staffAPI';
import { staff_table_header } from '../../../asset/data/staff/staff_table_header';
import NotFoundData from '../../../components/commons/Layouts/NotFoundData';
import { BlockUI } from '../../../components/commons/Layouts/Notiflix';
import PaginationUI from '../../../components/commons/Layouts/Pagination';
import SearchWithDropdownOptions from '../../../components/commons/Layouts/SearchWithDropdownOptions/SearchWithDropdownOptions';
import Skeleton from '../../../components/commons/Layouts/Skeleton';
import { StaffTable } from '../../../components/admin/Staff';
import StaffAdd from '../../../components/admin/Staff/Add';
import StaffEdit from '../../../components/admin/Staff/Edit';
import FilterStatus from '../../../components/admin/Staff/FilterStatus';
import { setExpiredToken } from '../../../redux/reducer/auth/auth.reducer';
import { setIsAdd, setIsEdit } from '../../../redux/reducer/staff/staff.reducer';
import { isAddStaffSelector, isEditStaffSelector, isResetStaffSelector } from '../../../redux/selectors';
import './style.css';

export function StaffPage(props) {
  const data_staff_table_header = [...staff_table_header];
  // const data_staff_table = [...data_staff];
  const [data, setData] = React.useState([]);
  // Pagination
  const [perPage, setPerPage] = React.useState(8);
  // const [totalPage, setTotalPage] = React.useState(0);
  const [totalRecord, setTotalRecord] = React.useState(0);
  const [page, setPage] = React.useState(1);

  //Filter & Search
  const [filter, setFilter] = React.useState('email');
  const [sort, setSort] = React.useState([]);
  const [search, setSearch] = React.useState([]);
  // const [searchValue, setSearchValue] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('All');
  const data_options_filter = [
    { id: 1, name: 'All', value: 'All' },
    { id: 2, name: 'Active', value: 1 },
    { id: 3, name: 'Disable', value: 0 },
  ];
  //Redux
  const isAddStaff = useSelector(isAddStaffSelector);
  const isEditStaff = useSelector(isEditStaffSelector);
  const dispatch = useDispatch();
  //Loading
  const [loading, setLoading] = React.useState(true);
  //Logic
  const isReset = useSelector(isResetStaffSelector);
  React.useEffect(() => {
    let params = {};
    if (filterStatus !== 'All') params = { ...params, filterStatus };
    if (search !== '') params = { ...params, filter, search };
    const handleGetAllStaffs = async () => {
      const result = await getAllStaffs(params);
      if (result === 401) {
        handleSetUnthorization();
        return false;
      } else if (result === 500) {
        return false;
      } else {
        setStaff(result, 'reset-page');
      }
      setLoading(false);
    };
    handleGetAllStaffs();
  }, [dispatch, search, isReset, filterStatus]);

  const setStaff = (result, value) => {
    setData(result.data);
    if (value !== 'page') {
      setPage(1);
    }
    setTotalRecord(result.meta.total);
    // setTotalPage(result.meta.);
  };
  console.log(data);
  const handlePageChange = async (page) => {
    setPage(page);
    setLoading(true);
    const result = await getAllStaffs({
      page,
    });
    if (result === 401) {
    } else if (result === 500) {
      return false;
    } else {
      setStaff(result, 'page');
    }
    setLoading(false);
  };

  const backToStaffList = async (value, action) => {
    setLoading(true);
    if (action === 'edit') {
    }

    const result = await getAllStaffs({
      sort: value,
    });
    setStaff(result, 'page');
    setLoading(false);
  };
  const goToPageAddStaff = () => {
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
          {!isAddStaff && !isEditStaff && <h5 className="text-danger font-weight-bold mb-3">Staff List</h5>}
          {isAddStaff && (
            <h5 className="text-danger font-weight-bold mb-3">
              <span
                className="cursor-pointer"
                onClick={() => {
                  dispatch(setIsEdit(false));
                  dispatch(setIsAdd(false));
                }}
              >
                Staff List
              </span>
              / Staff Add
            </h5>
          )}
          {isEditStaff && (
            <h5 className="text-danger font-weight-bold mb-3">
              <span
                className="cursor-pointer"
                onClick={() => {
                  dispatch(setIsEdit(false));
                  dispatch(setIsAdd(false));
                }}
              >
                Staff List
              </span>{' '}
              / Staff Edit
            </h5>
          )}
        </>
        {!isAddStaff && !isEditStaff ? (
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
                    onClick={goToPageAddStaff}
                  >
                    Create new staff
                  </Button>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              {!loading ? (
                <>
                  {data.length > 0 ? (
                    <StaffTable tableHeader={data_staff_table_header} tableBody={data} />
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
            {isAddStaff && <StaffAdd backToStaffList={backToStaffList} />}
            {isEditStaff && <StaffEdit backToStaffList={backToStaffList} />}
          </>
        )}
      </div>
    </section>
  );
}
