import Notiflix from 'notiflix';
import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCookie, getCookies } from '../../../api/Admin/Auth';
import { getAll } from '../../../api/Admin/Category/categoryAPI';
import { category_table_header } from '../../../asset/data/category_table_header';
import CategoryTable from '../../../components/admin/Category';
import CreateCategoryForm from '../../../components/admin/Category/Add';
import EditCategory from '../../../components/admin/Category/Edit';
import Sort from '../../../components/admin/Category/Sort';
import { ErrorToast } from '../../../components/commons/Layouts/Alerts';
import NotFoundData from '../../../components/commons/Layouts/NotFoundData';
import { BlockUI } from '../../../components/commons/Layouts/Notiflix';
import PaginationUI from '../../../components/commons/Layouts/Pagination';
import Skeleton from '../../../components/commons/Layouts/Skeleton';
import { setExpiredToken, setIsLogin } from '../../../redux/reducer/auth/auth.reducer';
import { setIsAdd, setIsEdit } from '../../../redux/reducer/category/category.reducer';
import {
  isAddCategorySelector,
  isEditCategorySelector,
  isResetCategorySelector,
  isSortCategorySelector,
  isStatusCategorySelector,
} from '../../../redux/selectors/category/category.selector';

export function CategoryPage(props) {
  const data_category_table_header = [...category_table_header];
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRecord, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const isAdd = useSelector(isAddCategorySelector);
  const isEdit = useSelector(isEditCategorySelector);
  const isReset = useSelector(isResetCategorySelector);
  const status = useSelector(isStatusCategorySelector);
  const sort_id = useSelector(isSortCategorySelector);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const handleCallApiCategory = async () => {
    setLoading(true);

    const result = await getAll({ search, status, sort_id });

    if (result === 401) {
      handleSetUnthorization();
      return false;
    } else {
      setData(result.data);

      setTotalRecords(result.meta.total);

      setPage(result.meta.current_page);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleCallApiCategory();
  }, [dispatch, isAdd, isReset, status, sort_id]);

  const goToPageAddCategory = () => {
    BlockUI('#root', 'fixed');
    setTimeout(function () {
      dispatch(setIsAdd(true));
      Notiflix.Block.remove('#root');
    }, 500);
  };

  const handleCurrentFilter = () => {};

  const handleSearh = async (e) => {
    e.preventDefault();

    handleCallApiCategory();
  };
  const handleChangePage = async (page) => {
    setPage(page);
    setLoading(true);
    const result = await getAll({ page });

    if (result === 401) {
      ErrorToast('Something went wrong. Please try again', 3000);
      return false;
    } else {
      setData(result.data);
      setTotalRecords(result.meta.total);

      setPage(result.meta.current_page);
    }
    setLoading(false);
  };
  const handleSetUnthorization = () => {
    dispatch(setExpiredToken(true));
    const token = getCookies('token');
    // dispatch(setIsLogin(false));
    dispatch(setExpiredToken(true));
    if (token) {
      deleteCookie('token');
    }
  };
  return (
    <>
      <section>
        <div className="container-fluid mt-5">
          {!isAdd && <h5 className="text-danger font-weight-bold mb-3">Category List</h5>}
          {isAdd && !isEdit && (
            <h5 className="text-danger font-weight-bold mb-3">
              <span
                className="cursor-pointer"
                onClick={() => {
                  dispatch(setIsEdit(false));
                  dispatch(setIsAdd(false));
                }}
              >
                Category List
              </span>
              / Add Category
            </h5>
          )}
          {isEdit && (
            <h5 className="text-danger font-weight-bold mb-3">
              <span
                className="cursor-pointer"
                onClick={() => {
                  dispatch(setIsEdit(false));
                  dispatch(setIsAdd(false));
                }}
              >
                Category List
              </span>
              / Update Category
            </h5>
          )}
          {!isAdd ? (
            <div className="row">
              <div className="mb-3 d-flex justify-content-between">
                <div className="d-flex justify-content-between ">
                  <Sort currentFilter={'logger'} setCurrentFilter={handleCurrentFilter} />
                  {/* <FilterStatusCategory currentFilter={"logger"} setCurrentFilter={handleCurrentFilter} /> */}
                </div>
                <div className="d-flex justify-content-between ">
                  <Form>
                    <InputGroup>
                      <Form.Control
                        id="seach-category"
                        placeholder="Search name category"
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                      />
                      <Button id="seach-category" variant="danger" type="submit" onClick={handleSearh}>
                        <FaSearch />
                      </Button>
                    </InputGroup>
                  </Form>
                  <Button
                    id="create-new-category"
                    variant="danger"
                    className="font-weight-bold ms-3"
                    onClick={goToPageAddCategory}
                  >
                    Create new category
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          {!isAdd ? (
            <div className="row justify-content-center">
              {!loading ? (
                <>
                  {data.length > 0 ? (
                    <CategoryTable tableHeader={data_category_table_header} tableBody={data} />
                  ) : (
                    <NotFoundData />
                  )}

                  {totalRecord > 10 && (
                    <PaginationUI
                      handlePageChange={handleChangePage}
                      perPage={10}
                      totalRecord={totalRecord}
                      currentPage={page}
                    />
                  )}
                </>
              ) : (
                <Skeleton column={3} />
              )}
            </div>
          ) : (
            <>
              {isAdd && !isEdit && <CreateCategoryForm data={data} />}
              {isEdit && <EditCategory data={data} />}
            </>
          )}
        </div>
      </section>
    </>
  );
}
