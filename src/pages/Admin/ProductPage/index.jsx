import Notiflix from 'notiflix';
import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCookie, getCookies } from '../../../api/Admin/Auth';
import { getAllNotPage } from '../../../api/Admin/Category/categoryAPI';
import { getAllProducts } from '../../../api/Admin/Product/productAPI';
import { product_table_header } from '../../../asset/data/product_table_header';
import { ErrorToast } from '../../../components/commons/Layouts/Alerts';
import NotFoundData from '../../../components/commons/Layouts/NotFoundData';
import { BlockUI } from '../../../components/commons/Layouts/Notiflix';
import PaginationUI from '../../../components/commons/Layouts/Pagination';
import Skeleton from '../../../components/commons/Layouts/Skeleton';
import { ProductTable } from '../../../components/admin/Product';
import ProductAdd from '../../../components/admin/Product/Add';
import ProductEdit from '../../../components/admin/Product/Edit';
import FilterCategory from '../../../components/admin/Product/FilterCategory';
import FilterStatus from '../../../components/admin/Product/FilterStatus';
import { setExpiredToken } from '../../../redux/reducer/auth/auth.reducer';
import { setIsAdd, setIsEdit } from '../../../redux/reducer/product/product.reducer';
import { isAddSelector, isEditSelector } from '../../../redux/selectors';

export function ProductPage(props) {
  const data_product_table_header = [...product_table_header];
  const [data, setData] = useState([]);
  const [listCategory, setDataCategory] = useState();
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [totalRecord, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  // const [totalPage, setTotalPage] = useState(0);
  const [perPage] = useState(10);
  const isAdd = useSelector(isAddSelector);
  const isEdit = useSelector(isEditSelector);
  const [sort, setCurrentSort] = useState([
    {
      key: 'id',
      value: 'desc',
    },
  ]);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  React.useEffect(() => {
    const handleGetAllProducts = async () => {
      const result = await getAllProducts({ sort });
      if (result === 401) {
        handleSetUnthorization();
        return false;
      } else if (result === 500) {
        return false;
      } else {
        setProduct(result, 'reset-page');
      }
      setLoading(false);
    };
    const handleGetListCategory = async () => {
      const result = await getAllNotPage();
      if (result === 401) {
        return false;
      } else {
        setDataCategory(result.data);
      }
    };
    handleGetAllProducts();
    handleGetListCategory();
  }, [dispatch]);

  const handlePageChange = async (page) => {
    setPage(page);
    setLoading(true);
    const result = await getAllProducts({
      page,
    });
    if (result === 401) {
    } else if (result === 500) {
      return false;
    } else {
      setProduct(result, 'page');
    }
    setLoading(false);
    setFilterStatus('All');
  };

  const goToPageAddProduct = () => {
    BlockUI('#root', 'fixed');
    setTimeout(function () {
      dispatch(setIsAdd(true));
      Notiflix.Block.remove('#root');
    }, 500);
  };
  const backToProductList = async (value, action) => {
    setLoading(true);
    if (action === 'edit') {
      console.log('Back to Edit');
    }

    const result = await getAllProducts({
      sort: value,
    });
    setProduct(result, 'page');
    setLoading(false);
  };

  const handleCurrentFilterStatus = async (value) => {
    let tempStatus;
    setLoading(true);

    if ((value === filterStatus && value === 'Active') || (value === filterStatus && value === 'Out_of_stock')) {
      setFilterStatus('All');
    } else if (value === filterStatus && value === 'All') {
      setFilterStatus('All');
      return;
    } else {
      setFilterStatus(value);
      if (value === 'Active') tempStatus = '0';
      if (value === 'Out_of_stock') tempStatus = '1';
    }
    // setCurrentSort({
    //   key: 'id',
    //   value: 'asc',
    // });
    const result = await getAllProducts({
      sort: {
        key: 'id',
        value: 'asc',
      },
      search: search,
      filterStatus: tempStatus,
      filterCategory: filterCategory === 'All' ? undefined : filterCategory,
      page: page,
    });
    if (result === 401) {
    } else if (result === 500) {
      ErrorToast('Something went wrong. Please try again', 3000);
    } else {
      setProduct(result, 'page');
    }
    Notiflix.Block.remove('#root');
    setLoading(false);
  };
  const handleCurrentFilterCategory = async (value) => {
    setLoading(true);

    let tempFilterCategory;
    if (value === 'All') {
      setFilterCategory('All');
      tempFilterCategory = undefined;
    } else {
      setFilterCategory(value);
      tempFilterCategory = value;
    }
    const result = await getAllProducts({
      sort: {
        key: 'id',
        value: 'asc',
      },
      search: search,
      filterCategory: tempFilterCategory,
      filterStatus: filterStatus === 'All' ? undefined : filterStatus === 'Active' ? '0' : '1',
      page: page,
    });

    if (result === 401) {
    } else if (result === 500) {
      ErrorToast('Something went wrong. Please try again', 3000);
    } else {
      setProduct(result, 'page');
    }
    Notiflix.Block.remove('#root');
    setLoading(false);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    let tempSort;
    if (sort.length > 0) tempSort = sort;
    if (search !== '') {
      const result = await getAllProducts({
        sort: tempSort,
        page: page,
        search,
      });
      if (result === 500 || result === 401) {
        ErrorToast('Something went wrong. Please try again', 3000);
      } else {
        setProduct(result, 'page');
      }
      return;
    }
    const result = await getAllProducts({
      sort: tempSort,
      page: page,
    });
    if (result === 500 || result === 401) {
      ErrorToast('Something went wrong. Please try again', 3000);
    } else {
      setProduct(result, 'page');
    }
  };
  const setProduct = (result, value) => {
    setData(result.data);
    if (value !== 'page') {
      setPage(1);
    }
    setTotalRecords(result.meta.total);
    // setTotalPage(result.meta.last_page);
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
      <section>
        <div className="container-fluid mt-5">
          {!isAdd && !isEdit && <h5 className="text-danger font-weight-bold mb-3">Product List</h5>}
          {isAdd && (
            <h5 className="text-danger font-weight-bold mb-3">
              <span
                className="cursor-pointer"
                onClick={() => {
                  dispatch(setIsEdit(false));
                  dispatch(setIsAdd(false));
                }}
              >
                Product List
              </span>
              / Add product
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
                Product List
              </span>{' '}
              / Edit product
            </h5>
          )}
          {!isAdd && !isEdit ? (
            <div className="row">
              <div className="mb-3 d-flex justify-content-between">
                <div className="d-flex justify-content-between ">
                  <FilterCategory
                    currentFilter={filterCategory}
                    setCurrentFilter={handleCurrentFilterCategory}
                    data={listCategory}
                  />
                  <FilterStatus currentFilter={filterStatus} setCurrentFilter={handleCurrentFilterStatus} />
                </div>
                <div className="d-flex justify-content-between ">
                  {/* onSubmit={e => handleSearch(e)} */}
                  <Form onSubmit={(e) => handleSearch(e)}>
                    <InputGroup>
                      <Form.Control
                        id="search-product"
                        placeholder="Name"
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
                    onClick={goToPageAddProduct}
                  >
                    Create new product
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          {!isAdd && !isEdit ? (
            <div className="row justify-content-center">
              {!loading ? (
                <>
                  {data.length > 0 ? (
                    <ProductTable tableHeader={data_product_table_header} tableBody={data} />
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
            </div>
          ) : (
            <>
              {isAdd && <ProductAdd backToProductList={backToProductList} dataCategory={listCategory} />}
              {isEdit && <ProductEdit backToProductList={backToProductList} dataCategory={listCategory} />}
            </>
          )}
        </div>
      </section>
    </>
  );
}
