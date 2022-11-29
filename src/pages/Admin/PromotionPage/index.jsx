import Notiflix from 'notiflix';
import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCookie, getCookies } from '../../../api/Admin/Auth';
import { getAllDisount } from '../../../api/Admin/Promotion/promotionAPI';
import { promotion_table_header } from '../../../asset/data/promotion_table_header';
import { ErrorToast } from '../../../components/commons/Layouts/Alerts';
import NotFoundData from '../../../components/commons/Layouts/NotFoundData';
import { BlockUI } from '../../../components/commons/Layouts/Notiflix';
import PaginationUI from '../../../components/commons/Layouts/Pagination';
import SortValue from '../../../components/admin/Promotion/SortValue';
import { setExpiredToken } from '../../../redux/reducer/auth/auth.reducer';
import { setIsAdd, setIsEdit } from '../../../redux/reducer/promotion/promotion.reducer';
import Skeleton from '../../../components/commons/Layouts/Skeleton/index';
import PromotionAdd from '../../../components/admin/Promotion/Add/index';
import PromotionEdit from '../../../components/admin/Promotion/Edit/index';
import FilterStatus from '../../../components/admin/Promotion/FilterStatus/index';
import PromotionTable from '../../../components/admin/Promotion/index';
import {
  isAddSelectorPromotion,
  isEditSelectorPromotion,
  isResetSelectorPromotion,
  isSortSelectorPromotion,
  isStatusSelectorPromotion,
} from './../../../redux/selectors/promotion/promotion.selector';

const PromotionPage = () => {
  const data_promotion_table_header = [...promotion_table_header];
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalRecord, setTotalRecords] = useState(0);
  const isAdd = useSelector(isAddSelectorPromotion);
  const isEdit = useSelector(isEditSelectorPromotion);
  const isReset = useSelector(isResetSelectorPromotion);
  const [search, setSearch] = useState('');
  const status = useSelector(isStatusSelectorPromotion);
  const sort = useSelector(isSortSelectorPromotion);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const handleGetAllPromotion = async () => {
    setIsLoading(true);

    const result = await getAllDisount({ sort, status, search, page });
    if (result === 401) {
      // ErrorToast('Something went wrong. Please try again', 3000);
      handleSetUnthorization();
      return false;
    } else {
      setData(result.data);
      setTotalRecords(result.meta.total);
      setPage(result.meta.current_page);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetAllPromotion();
  }, [status, sort, isEdit, isAdd, isReset]);

  const handleChangePage = async (page) => {
    setPage(page);
    setIsLoading(true);
    const result = await getAllDisount({ page });

    if (result === 401) {
      ErrorToast('Something went wrong. Please try again', 3000);
      return false;
    } else {
      setData(result.data);
      setTotalRecords(result.meta.total);
      setPage(result.meta.current_page);
    }
    setIsLoading(false);
  };

  const goToPageAddPromotion = () => {
    BlockUI('#root', 'fixed');
    setTimeout(function () {
      dispatch(setIsAdd(true));
      Notiflix.Block.remove('#root');
    }, 500);
  };

  const handleSearh = async (e) => {
    e.preventDefault();
    handleGetAllPromotion();
  };

  const backToPromotionList = async (value) => {
    setIsLoading(true);

    // const result = await getAllDisount({ sort: value });
    const result = await getAllDisount();

    setData(result.data);
    setTotalRecords(result.meta.total);
    setIsLoading(false);
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
          {!isAdd && !isEdit && <h5 className="text-danger font-weight-bold mb-3">Promotion List</h5>}
          {isAdd && !isEdit && (
            <h5 className="text-danger font-weight-bold mb-3">
              <span
                className="cursor-pointer"
                onClick={() => {
                  dispatch(setIsEdit(false));
                  dispatch(setIsAdd(false));
                }}
              >
                Promotion List
              </span>
              / Add promotion
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
                Promotion List
              </span>{' '}
              / Edit promotion
            </h5>
          )}

          {!isAdd && !isEdit ? (
            <div className="row">
              <div className="mb-3 d-flex justify-content-between">
                <div className="d-flex justify-content-between ">
                  <SortValue />
                  <FilterStatus />
                </div>
                <div className="d-flex justify-content-between ">
                  <Form>
                    <InputGroup>
                      <Form.Control
                        id="seach-category"
                        placeholder="Search name promotion"
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
                    onClick={goToPageAddPromotion}
                  >
                    Create new promotion
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          {!isAdd ? (
            <div className="row justify-content-center">
              {!isLoading ? (
                <>
                  {data.length > 0 ? (
                    <PromotionTable tableHeader={data_promotion_table_header} tableBody={data} />
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
                <Skeleton column={5} />
              )}
            </div>
          ) : (
            <>
              {isAdd && !isEdit && <PromotionAdd backToPromotionList={backToPromotionList} />}
              {isEdit && <PromotionEdit backToPromotionList={backToPromotionList} />}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default PromotionPage;
