import React, { useState, useRef } from 'react';
import { FaChessKing, FaPen, FaTimes, FaTimesCircle } from 'react-icons/fa';
import Modal from '../../commons/Layouts/Modal';
import TableLayout from '../../commons/Layouts/Table';
import { setIsEdit, setIsReset } from '../../../redux/reducer/role/role.reducer';
import Notiflix from 'notiflix';
import { ErrorToast, SuccessToast } from '../../commons/Layouts/Alerts';
import { useDispatch } from 'react-redux';
import { setRole } from '../../../redux/reducer/role/role.reducer';
import "./style.css"
import { deleteRole, getRoleById } from '../../../api/Admin/role/roleAPI';

export function RoleTable(props) {
  const [show, setShowDetail] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState({
    staff_id: null,
    show: false,
  });
  const [detailRole, setDetailRole] = useState('');
  const inputRef = useRef();
  console.log('showDelete', showPopupDelete);
  const dispatch = useDispatch();
  const showDetail = (item) => {
    setShowDetail(true);
    setDetailRole(item.item);
  };
  const handleEditRole = async (e, id) => {
    e.stopPropagation();
    const data=await getRoleById(id);
    if (Object.keys(data).length > 0) {
      dispatch(setRole(data));
      dispatch(setIsEdit(true));
    } else if (data === 401) {
      Notiflix.Block.remove('#root');
    } else {
      Notiflix.Block.remove('#root');
      ErrorToast('Something went wrong. Please try again', 3000);
    }
  };
  const showConfirmDeleteRole = (e, id) => {
    e.stopPropagation();
    setShowPopupDelete({ staff_id: id, show: true });
  };
  const handleRemoveRole = async (id) => {
    //e.stopPropagation();
    const result =await deleteRole(id);
    // console.log('result', result);
    if (result === 200) {
      SuccessToast('Remove role successfully', 3000);
    } else if (result === 404) {
      ErrorToast('Remove role unsuccessfully', 3000);
      Notiflix.Block.remove('#root');
    } else if (result === 401) {
      Notiflix.Block.remove('#root');
    } else {
      Notiflix.Block.remove('#root');
      ErrorToast('Something went wrong. Please try again', 3000);
    }
    setShowPopupDelete({ ...showPopupDelete, show: false });
    dispatch(setIsReset(Math.random()));
  };

  const renderTableBody = () => {
    return props.tableBody.map((item) => {
      return (
        <tr key={item.id} className="row-data cursor-pointer" onClick={() => showDetail({ item })}>
          <td>{item.id}</td>
          <td>{item.name}</td>

          <td>
            <p
              className={`text-center border-radius-2px ${
                item.status === 'Active' ? 'bg-success-100 text-success' : 'bg-red-100 text-red '
              }`}
            >
              {item.status ==='Active' ? 'Active' : 'Disabled'}
            </p>
          </td>
          <td>
            <div className="d-flex">
              <button
                id="edit-staff"
                onClick={(e) => handleEditRole(e, item.id)}
                className="br-6px p-2 bg-gray-100 text-black w-48px h-48px d-flex align-items-center justify-content-center border-none"
              >
                <FaPen className="font-20px" />
              </button>
              <button
                id="disabled-user"
                onClick={(e) => {
                  showConfirmDeleteRole(e, item.id);
                }}
                className="br-6px p-2 ms-3 text-danger bg-gray-100 w-48px h-48px d-flex align-items-center justify-content-center border-none"
              >
                <FaTimesCircle className="text-danger font-20px" />
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };
  const renderDetailRole = (item) => {
    return (
      <div className="card-overlay box-overlay-role">
        <div className="card-image-overlay bg-img-role ">
          <div className='w-100 d-flex justify-content-center align-items-center mt-4 mb-2'>
            <FaChessKing className='cursor-pointer  icon-role '/>
          </div>
          <p className="card-txt txt-white  ">
            <h3 className='mb-2 '>{item.name}</h3>
            <p
              className={`  border-radius-2px h50x d-flex justify-content-center align-items-center ${
                item.status === 'Active' ? 'bg-success-500 text-white' : 'bg-red-500 text-white '
              }`}
            >
              {item.status ==='Active' ? 'Active' : 'Disabled'}
            </p>

          </p>
        </div>
        <div className="card-content-overlay bg-content-role">
          <ul className="card-txt-content  ">
                       {!!item && item.list_permissions.map((item, i) =>
                         (<li key={item.id} className="mb-1 text-center txt-white">{item.name}</li>))}
          </ul>

        </div>
      </div>
    );
  };
  const popupConfirmationDelete = () => {
    return (
      <div className="modal-dialog modal-confirm">
        <div className="modal-content">
          <div className="modal-headerd flex-column">
            <div className="icon-box">
              <FaTimes className="material-icons p-t-15" size="4rem" color="red" />
            </div>
            <h4 className="modal-title w-100">Are you sure ?</h4>
          </div>
          <div className="modal-body">
            <p>Do you really want to delete these records? This process cannot be undone.</p>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={(e) => setShowPopupDelete({ ...showPopupDelete, show: false })}
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleRemoveRole(showPopupDelete.staff_id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="container-fluid ">
        <div className="row justify-content-center">
          <TableLayout tableHeader={props.tableHeader} tableBody={renderTableBody()} />
        </div>
      </div>

      <Modal
        show={show}
        isHeader={false}
        className="modal-md"
        setStateModal={() => setShowDetail(false)}
        elementModalTitle="Detail Role"
        elementModalBody={renderDetailRole(detailRole)}
      />
      <Modal
        show={showPopupDelete.show}
        isHeader={false}
        className="modal-md"
        setStateModal={() => setShowPopupDelete({ ...showPopupDelete, show: true })}
        elementModalTitle="Confirm Delete"
        elementModalBody={popupConfirmationDelete()}
      />
    </>
  );
}
