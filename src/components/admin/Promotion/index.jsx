import Notiflix from 'notiflix';
import React, { useState } from 'react';
import { FaPen, FaTimesCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deletePromotion, getDiscountById } from '../../../api/Admin/Promotion/promotionAPI';
import { setIsAdd, setIsEdit, setIsReset, setPromotion } from '../../../redux/reducer/promotion/promotion.reducer';
import { BlockUI } from '../../commons/Layouts/Notiflix';
import TableLayout from '../../commons/Layouts/Table';
import Modal from '../../commons/Layouts/Modal';
import { ErrorToast, SuccessToast } from '../../commons/Layouts/Alerts';

const PromotionTable = (props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [isCheck, setIsCheck] = useState(null);

  const handleEditPromotion = async (e, id) => {
    e.stopPropagation();
    BlockUI('#root', 'fixed');
    const result = await getDiscountById(id);
    Notiflix.Block.remove('#root');
    if (result !== 401) {
      dispatch(setIsEdit(true));
      dispatch(setPromotion(result));
      dispatch(setIsAdd(true));
    }
    return;
  };

  const handleShowModal = (id) => {
    setShow(true);
    setIsCheck(id);
  };

  const handleSetState = () => {
    setShow(false);
    setIsCheck(null);
  };

  const handleDelete = async () => {
    BlockUI('#root', 'fixed');
    if (isCheck !== null) {
      const result = await deletePromotion(isCheck);
      Notiflix.Block.remove('#root');
      if (result === 200) {
        SuccessToast('Delete promotion successfully.', 3000);
      } else {
        ErrorToast('Delete promotion failed.', 3000);
      }
      handleSetState();
      dispatch(setIsReset(''));
    }
  };

  const renderTableBody = (body) => {
    return body.length > 0 ? (
      body.map((item, index) => (
        <tr key={index} className="font-weight-bold row-data">
          <td>{++index}</td>
          <td>{item.name}</td>
          <td>{item.value} %</td>
          <td>{item.point}</td>
          <td>
            <p
              className={`text-center border-radius-2px ${
                item.status === 'Active' ? 'bg-success-100 text-success' : 'bg-red-100 text-red'
              }`}
            >
              {item.status === 'Active' ? 'Active' : 'InActive'}
            </p>
          </td>
          <td>
            <div className="d-flex">
              <button
                id="edit-product"
                onClick={(e) => handleEditPromotion(e, item.id)}
                className="cursor-pointer br-6px p-2 bg-gray-100 text-black w-48px h-48px d-flex align-items-center justify-content-center border-none"
              >
                <FaPen className="font-20px" />
              </button>
              <button
                id="disabled-user"
                onClick={() => handleShowModal(item.id)}
                className=" cursor-pointer br-6px p-2 ms-3 text-danger bg-gray-100 w-48px h-48px d-flex align-items-center justify-content-center border-none"
              >
                <FaTimesCircle className="text-danger font-20px" />
              </button>
            </div>
          </td>
        </tr>
      ))
    ) : (
      <>
        <tr className="text-center">
          <td colSpan={5}>Promotion is not found.</td>
        </tr>
      </>
    );
  };

  const deletePopup = (item) => {
    return (
      <div className="modal-content">
        <div className="modal-body">
          <h5>Are you sure delete this item {isCheck} ?</h5>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" onClick={() => handleDelete()}>
            Delete
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container-fluid ">
        <div className="row justify-content-center">
          <TableLayout tableHeader={props.tableHeader} tableBody={renderTableBody(props.tableBody)} />
        </div>
      </div>
      <Modal
        show={show}
        setStateModal={handleSetState}
        elementModalTitle="Warning"
        elementModalBody={deletePopup()}
        className="modal-popup"
      />
    </>
  );
};

export default PromotionTable;
