import React from 'react';
import { setIsAdd, setIsEdit } from '../../../redux/reducer/role/role.reducer';
import { Button } from 'react-bootstrap';

import NotFoundData from '../../../components/commons/Layouts/NotFoundData';
import PaginationUI from '../../../components/commons/Layouts/Pagination';
import Skeleton from '../../../components/commons/Layouts/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { BlockUI } from '../../../components/commons/Layouts/Notiflix';
import Notiflix from 'notiflix';
import { setExpiredToken } from '../../../redux/reducer/auth/auth.reducer';
import { deleteCookie, getCookies } from '../../../api/Admin/Auth';
import { role_table_header } from '../../../asset/data/role_table_header';
import FilterStatus from '../../../components/admin/Staff/FilterStatus';
import { getAllRoles } from '../../../api/Admin/role/roleAPI';
import { RoleTable } from '../../../components/admin/Role';
import { isAddRoleSelector, isEditRoleSelector, isResetRoleSelector } from '../../../redux/selectors';
import RoleAdd from '../../../components/admin/Role/Add';
import RoleEdit from '../../../components/admin/Role/Edit';

function PermissionManagerPage(props) {
  const data_staff_table_header = [...role_table_header];
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
    { id: 2, name: 'Active', value: 'Active' },
    { id: 3, name: 'Disable', value: 'InActive'},
  ];
  //Redux
  const isAddRole = useSelector(isAddRoleSelector);
  const isEditRole = useSelector(isEditRoleSelector);
  const dispatch = useDispatch();

  //Loading
  const [loading, setLoading] = React.useState(true);
  //Logic
  const isReset = useSelector(isResetRoleSelector);
  React.useEffect(() => {
    let params = {};
    if (filterStatus !== 'All') params = { ...params, filterStatus };
    if (search !== '') params = { ...params, filter, search };
    const handleGetAllRoles = async () => {
      const result = await getAllRoles(params);
      if (result === 401) {
        handleSetUnthorization();
        return false;
      } else if (result === 500) {
        return false;
      } else {
        setRole(result, 'reset-page');
      }
      setLoading(false);
    };
    handleGetAllRoles();
  }, [dispatch, search, isReset, filterStatus]);

  const setRole = (result, value) => {
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
    const result = await getAllRoles({
      page,
    });
    if (result === 401) {
    } else if (result === 500) {
      return false;
    } else {
      setRole(result, 'page');
    }
    setLoading(false);
  };

  const backToRoleList = async (value, action) => {
    setLoading(true);
    if (action === 'edit') {
    }

    const result = await getAllRoles({
      sort: value,
    });
    setRole(result, 'page');
    setLoading(false);
  };
  const goToPageAddRole = () => {
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
          {!isAddRole && !isEditRole && <h5 className="text-danger font-weight-bold mb-3">Role List</h5>}
          {isAddRole && (
            <h5 className="text-danger font-weight-bold mb-3">
              <span
                className="cursor-pointer"
                onClick={() => {
                  dispatch(setIsEdit(false));
                  dispatch(setIsAdd(false));
                }}
              >
                Role List
              </span>
              / Role Add
            </h5>
          )}
          {isEditRole && (
            <h5 className="text-danger font-weight-bold mb-3">
              <span
                className="cursor-pointer"
                onClick={() => {
                  dispatch(setIsEdit(false));
                  dispatch(setIsAdd(false));
                }}
              >
                Role List
              </span>{' '}
              / Role Edit
            </h5>
          )}
        </>
        {!isAddRole && !isEditRole ? (
          <>
            <div className="row">
              <div className="mb-3 d-flex justify-content-between">
                <div className="d-flex justify-content-between ">
                  <FilterStatus data_options={data_options_filter} setFilterStatus={setFilterStatus} />
                </div>
                <div className="d-flex justify-content-between ">

                  <Button
                    id="create-new-product"
                    variant="danger"
                    className="font-weight-bold ms-3"
                    onClick={goToPageAddRole}
                  >
                    Create new role
                  </Button>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              {!loading ? (
                <>
                  {data.length > 0 ? (
                    <RoleTable tableHeader={data_staff_table_header} tableBody={data} />
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
                <Skeleton column={4} />
              )}
            </div>
          </>
        ) : (
          <>
            {isAddRole && <RoleAdd backToRoleList={backToRoleList} />}
            {isEditRole && <RoleEdit backToRoleList={backToRoleList} />}
          </>
        )}
      </div>
    </section>
  );
}

export default PermissionManagerPage;