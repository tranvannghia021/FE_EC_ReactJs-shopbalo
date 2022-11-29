import Notiflix from 'notiflix';
import React, { useState } from 'react';
import { Button, Dropdown, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { HiFilter } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCookie, getCookies } from '../../../../api/Admin/Auth';
import { getAllNotPage } from '../../../../api/Admin/Category/categoryAPI';
import { getAllProducts } from '../../../../api/Admin/Product/productAPI';
import { getAllImportHistory, getAllProvider, getAllStorage } from '../../../../api/Admin/WareHouse';
import { import_storage_table_header } from '../../../../asset/data/importStorage_table_header';
import { storage_table_header } from '../../../../asset/data/storage_table_header';
import FilterCategory from '../../../../components/admin/Product/FilterCategory';
import { ImportTable } from '../../../../components/admin/WareHouse/ImportStorage';
import ImportStorageAdd from '../../../../components/admin/WareHouse/ImportStorage/Add';
import { StorageTable } from '../../../../components/admin/WareHouse/Storage';
import { ErrorToast } from '../../../../components/commons/Layouts/Alerts';
import NotFoundData from '../../../../components/commons/Layouts/NotFoundData';
import { BlockUI } from '../../../../components/commons/Layouts/Notiflix';
import PaginationUI from '../../../../components/commons/Layouts/Pagination';
import Skeleton from '../../../../components/commons/Layouts/Skeleton';
import { setExpiredToken } from '../../../../redux/reducer/auth/auth.reducer';
import { setIsAdd } from '../../../../redux/reducer/product/product.reducer';
import { setIsImportStorage } from '../../../../redux/reducer/warehouse/warehouse.reducer';
import { isAddSelector, isEditSelector, isImportStorageSelector } from '../../../../redux/selectors';

export function ImportStoragePage(props) {
  const data_storage_table_header = [...import_storage_table_header];
  const [data, setData] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [listProvider, setListProvider] = useState([]);
  const [page, setPage] = useState(1);
  const [checkSort, setCheckSort] = useState('desc');
  const [totalRecord, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [perPage] = useState(10);
  const isImportAdd = useSelector(isImportStorageSelector);
  const [sort, setCurrentSort] = useState([
    {
      key: 'id',
      value: 'desc',
    },
  ]);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  React.useEffect(() => {
    const handleGetAllStorages = async () => {
      const result = await getAllImportHistory({ sort });
      if (result === 401) {
        handleSetUnthorization();
        return false;
      } else if (result === 500) {
        return false;
      } else {
        setStorage(result, 'reset-page');
      }
      setLoading(false);
    };

    const handleGetAllProducts = async () => {
      const result = await getAllProducts({ sort, getAll: 'get-all' });
      if (result === 401) {
        handleSetUnthorization();
        return false;
      } else if (result === 500) {
        return false;
      } else {
        setListProduct(result);
      }
      setLoading(false);
    };
    const handleGetAllProvider = async () => {
      const result = await getAllProvider({ sort });
      if (result === 401) {
        handleSetUnthorization();
        return false;
      } else if (result === 500) {
        return false;
      } else {
        setListProvider(result);
      }
      setLoading(false);
    };
    handleGetAllStorages();
    handleGetAllProducts();
    handleGetAllProvider();
  }, [dispatch]);
  const handlePageChange = async (page) => {
    setPage(page);
    setLoading(true);
    const result = await getAllImportHistory({
      page,
    });
    if (result === 401) {
    } else if (result === 500) {
      return false;
    } else {
      setStorage(result, 'page');
    }
    setLoading(false);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    let tempSort;
    if (sort.length > 0) tempSort = sort;
    if (search !== '') {
      const result = await getAllImportHistory({
        sort: tempSort,
        page: page,
        search,
      });
      if (result === 500 || result === 401) {
        ErrorToast('Something went wrong. Please try again', 3000);
      } else {
        setStorage(result, 'page');
      }
      return;
    }
    const result = await getAllImportHistory({
      sort: tempSort,
      page: page,
    });
    if (result === 500 || result === 401) {
      ErrorToast('Something went wrong. Please try again', 3000);
    } else {
      setStorage(result, 'page');
    }
  };
  const handleSort = async (value) => {
    // if (value) {
    setCheckSort(value);

    const result = await getAllImportHistory({
      sort: [
        {
          key: 'id',
          value: value,
        },
      ],
    });
    if (result === 500 || result === 401) {
      ErrorToast('Something went wrong. Please try again', 3000);
    } else {
      setStorage(result, 'page');
    }
    return;
    // }
  };
  console.log('ehj', checkSort);
  const setStorage = (result, value) => {
    setData(result.data);
    if (value !== 'page') {
      setPage(1);
    }
    setTotalRecords(result.total);
    // setTotalPage(result.last_page);
  };
  const handleSetUnthorization = () => {
    dispatch(setExpiredToken(true));
    const token = getCookies('token');
    if (token) {
      deleteCookie('token');
    }
  };
  const goToPageImportStorage = () => {
    BlockUI('#root', 'fixed');
    setTimeout(function () {
      dispatch(setIsImportStorage(true));
      Notiflix.Block.remove('#root');
    }, 500);
  };
  return (
    <>
      <section>
        <div className="container-fluid mt-5">
          {<h5 className="text-danger font-weight-bold mb-3">Import history</h5>}

          <div className="row">
            <div className="mb-3 d-flex justify-content-between">
              {!isImportAdd ? (
                <>
                  <div className="d-flex justify-content-between ">
                    <Dropdown>
                      <Dropdown.Toggle
                        id="user-type-filter-btn"
                        className="btn-danger filter-button d-flex align-items-center justity-content-center mr-2"
                      >
                        <p className="flex-grow-1 font-weight-bold">Sort</p>
                        <div className="fb-icon">
                          <HiFilter />
                        </div>
                      </Dropdown.Toggle>
                      <Dropdown.Menu id="category-type-filter-menu">
                        <Form>
                          <Dropdown.Item onClick={() => handleSort('asc')} className="category-type-filter-menu-item">
                            <Form.Check
                              type="checkbox"
                              id={`checkbox-desc`}
                              className="mx-4 my-2 font-weight-bold"
                              label="ASC"
                              checked={checkSort === 'asc'}
                              // onChange={() => handleSort('desc')}
                            />
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleSort('desc')} className="category-type-filter-menu-item">
                            <Form.Check
                              type="checkbox"
                              id={`checkbox-asc`}
                              className="mx-4 my-2 font-weight-bold"
                              label="DESC"
                              checked={checkSort === 'desc'}
                              // onChange={() => handleSort('asc')}
                            />
                          </Dropdown.Item>
                        </Form>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="d-flex justify-content-between ">
                    <Form onSubmit={(e) => handleSearch(e)}>
                      <InputGroup>
                        <Form.Control
                          id="search-product"
                          placeholder="Code product or provider"
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
                      onClick={goToPageImportStorage}
                    >
                      Import goods
                    </Button>
                  </div>
                </>
              ) : (
                ''
              )}
            </div>
          </div>

          <div className="row justify-content-center">
            {!isImportAdd ? (
              !loading ? (
                <>
                  {data.length > 0 ? (
                    <ImportTable tableHeader={data_storage_table_header} tableBody={data} />
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
              )
            ) : (
              <ImportStorageAdd listProduct={listProduct} listProvider={listProvider} handleSort={handleSort} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
