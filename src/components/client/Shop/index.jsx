import React, { useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, getAllProducts } from '../../../api/Client/Home/homeAPI';
import { title_fillter_header } from '../../../asset/data/staff/title_fillter_header';
import {
  setCategoryId,
  setFillterPriceEnd,
  setFillterPriceStart,
  setSearch,
} from '../../../redux/reducer/shop/shop.reducer';
import {
  categoryIdSelector,
  fillterPriceEnd,
  fillterPriceStart,
  search,
  sortPrice,
} from '../../../redux/selectors/shop/shop.selector';
import { ErrorToast } from '../../commons/Layouts/Alerts';
import NotFoundData from '../../commons/Layouts/NotFoundData';
import PaginationUI from '../../commons/Layouts/Pagination';
import Skeleton from '../../commons/Layouts/Skeleton';
import ProductItem from '../Home/Product/ProductItem';
import Fillter from './Fillter';
import SortPrice from './SortPrice';
import './style.css';

const Shop = () => {
  const title_fillter = [...title_fillter_header];
  // Pagination
  const [totalRecord, setTotalRecord] = useState(0);
  const [page, setPage] = useState(1);

  const [dataCategory, setDataCategory] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const sortById = 'desc';
  const per_page = 9;

  const categoryId = useSelector(categoryIdSelector);
  const start_price = useSelector(fillterPriceStart);
  const end_price = useSelector(fillterPriceEnd);
  const sortByPrice = useSelector(sortPrice);
  const [isClear, setIsClear] = useState(false);

  const dataSearch = useSelector(search);

  const filter = categoryId;
  const dispatch = useDispatch();
  const handleClearFilter = () => {
    dispatch(setCategoryId(undefined));
    dispatch(setFillterPriceStart(undefined));
    dispatch(setFillterPriceEnd(undefined));
    dispatch(setSearch(undefined));
  };

  const handleGetAllCategory = async () => {
    const result = await getAllCategory();
    setDataCategory(result.data);
  };

  const handleGetAllProduct = async () => {
    const result = await getAllProducts({
      // sortById,
      page,
      filter,
      per_page,
      start_price,
      end_price,
      dataSearch,
      sortByPrice,
    });
    if (result === 401) {
      ErrorToast('Something went wrong. Please try again', 3000);
      return false;
    }
    setDataProduct(result.data);
    setTotalRecord(result.meta.total);
    setPage(result.meta.current_page);
    setIsLoading(false);
  };

  const handleChangePage = async (page) => {
    setPage(page);
    setIsLoading(true);
    const result = await getAllProducts({ page });

    if (result === 401) {
      ErrorToast('Something went wrong. Please try again', 3000);
      return false;
    } else {
      setDataProduct(result.data);
      setTotalRecord(result.meta.total);
      setPage(result.meta.current_page);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetAllCategory();
    handleGetAllProduct();

    if (!!start_price === true && !!end_price === true) {
      setIsClear(true);
    } else {
      setIsClear(false);
    }
  }, [page, filter, start_price, end_price, dataSearch, sortByPrice]);

  return (
    <>
      <section className="container ">
        <div className="d-flex justify-content-between py-3">
          <section id="shop__title-main">
            <span className="fw-bold fs-2 my-4">ALL PRODUCT</span>
          </section>
          <SortPrice />
        </div>
        <div className="d-flex gap-3">
          <div className="filter-homepage me-4 overflow-auto bg-light" style={{ width: '25%' }}>
            <div>
              <div className="overflow-auto d-flex flex-column" style={{ height: '50rem' }}>
                <div className="d-flex justify-content-between align-items-center p-3 bg-light header-fillter">
                  <div className="">
                    <FiFilter />
                    <span className="fw-bold ms-3 ">Bộ lọc</span>
                  </div>
                  <span className="fw-bold ms-3 pointer text-danger" onClick={() => handleClearFilter()}>
                    Clear All
                  </span>
                </div>
                <div className="p-3">
                  <Fillter item={dataCategory} title={title_fillter[0].title} isContent={true} />
                  <Fillter title={title_fillter[1].title} isClear={isClear} />
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column" style={{ width: '75%' }}>
            <div className="d-flex flex-wrap justify-content-center gap-4">
              {!isLoading ? (
                <>{dataProduct.length > 0 ? <ProductList item={dataProduct} /> : <NotFoundData />}</>
              ) : (
                <Skeleton column={7} />
              )}
            </div>
            <div className="my-5 w-100 d-flex justify-content-center">
              {totalRecord > 9 && (
                <PaginationUI
                  handlePageChange={handleChangePage}
                  perPage={per_page}
                  totalRecord={totalRecord}
                  currentPage={page}
                  className="pagination-client"
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const ProductList = (props) => {
  const { item } = props;
  return <>{item.length > 0 && item.map((item, index) => <ProductItem item={item} key={index} />)}</>;
};

export default Shop;
