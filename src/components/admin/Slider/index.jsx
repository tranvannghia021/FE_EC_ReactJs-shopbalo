import Notiflix from 'notiflix';
import React, { useState } from 'react';
import { FaPen, FaTimesCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setIsAdd, setIsEdit, setIsReset, setSlider } from '../../../redux/reducer/slider/slider.reducer';
import ImageCustom from '../../commons/Layouts/Image';
import Modal from '../../commons/Layouts/Modal';
import { deleteSlider, getSliderById } from '../../../api/Admin/Slider/sliderAPI';
import { BlockUI } from '../../commons/Layouts/Notiflix';
import TableLayout from '../../commons/Layouts/Table';
import { ErrorToast, SuccessToast } from '../../commons/Layouts/Alerts';

const SliderTable = (props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [isCheck, setIsCheck] = useState(null);

  const handleEditSlider = async (e, id) => {
    e.stopPropagation();
    BlockUI('#root', 'fixed');
    const result = await getSliderById(id);
    Notiflix.Block.remove('#root');
    if (result !== 401) {
      dispatch(setIsEdit(true));
      dispatch(setSlider(result));
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
      const result = await deleteSlider(isCheck);
      Notiflix.Block.remove('#root');
      if (result === 200) {
        SuccessToast('Delete slider successfully.', 3000);
      } else {
        ErrorToast('Delete slider failed.', 3000);
      }
      handleSetState();
      dispatch(setIsReset(Math.random()));
    }
  };

  const renderTableBody = (body) => {
    return body.length > 0 ? (
      body.map((item, index) => (
        <tr key={index} className="font-weight-bold row-data">
          <td>{++index}</td>
          <td>
            <div style={{ verticalAlign: 'middle', width: '20rem', height: '8rem'}}>
              <ImageCustom src={item.image} className="w-100 h-100 rounded" />
            </div>
          </td>
          <td>{item.name}</td>
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
                onClick={(e) => handleEditSlider(e, item.id)}
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
          <td colSpan={5}>Slider is not found.</td>
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
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDelete()}
          >
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

export default SliderTable;
