import Notiflix from 'notiflix';
import { useState } from 'react';
import { FaPen, FaTimesCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { destroyCategory, showCategory } from '../../../api/Admin/Category/categoryAPI';
import { setCategory, setIsAdd, setIsEdit, setIsReset } from '../../../redux/reducer/category/category.reducer';
import { ErrorToast, SuccessToast } from '../../commons/Layouts/Alerts';
import ImageCustom from '../../commons/Layouts/Image';
import Modal from '../../commons/Layouts/Modal';
import { BlockUI } from '../../commons/Layouts/Notiflix';
import TableLayout from '../../commons/Layouts/Table';
import './style.css';

function CategoryTable(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [isCheck, setIsCheck] = useState(null);
  const handleEditCategory = async (id) => {
    BlockUI('#root', 'fixed');
    const result = await showCategory(id);
    Notiflix.Block.remove('#root');
    if (result !== 401) {
      dispatch(setIsEdit(true));
      dispatch(setCategory(result));
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
      const result = await destroyCategory(isCheck);
      Notiflix.Block.remove('#root');
      console.log(result.status);
      if (result.status === 200) {
        SuccessToast('Delete category successfully.', 3000);
      } else {
        ErrorToast(result.message || 'Delete category failed.', 3000);
      }
      handleSetState();
      dispatch(setIsReset(Math.random()));
    }
  };
  const bodyPopUp = () => {
    return (
      <div className="modal-content">
        <div className="modal-body">
          <h5>Are you sure this action won't undo?.</h5>
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
  const renderBody = (body) => {
    return (
      body.length > 0 &&
      body.map((item, index) => (
        <tr key={index} className="  font-weight-bold row-data ">
          <td>{++index}</td>
          <td>
            <div className="category_parrent">
              {/* <img className="category_image" src={item.image || IMG_NOT_FOUND} alt="" /> */}
              <ImageCustom src={item.image} className="w-100 " />
            </div>
          </td>
          <td>{item.name}</td>

          {/* <td>
                        <p
                            className={`text-center border-radius-2px ${item.deleted_at === null ? 'bg-success-100 text-success' : 'bg-red-100 text-red '
                                }`}
                        >
                            {item.deleted_at === null ? 'Active' : 'UnActive'}
                        </p>
                    </td> */}
          <td>
            <div className="d-flex">
              <button
                id="edit-product"
                onClick={() => handleEditCategory(item.id)}
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
    );
  };

  return (
    <>
      <div className="container-fluid ">
        <div className="row justify-content-center">
          <TableLayout tableHeader={props.tableHeader} tableBody={renderBody(props.tableBody)} />
        </div>
      </div>
      <Modal
        show={show}
        setStateModal={handleSetState}
        elementModalTitle="Warning"
        elementModalBody={bodyPopUp()}
        className="modal-popup"
      />
    </>
  );
}

export default CategoryTable;
