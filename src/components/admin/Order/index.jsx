import Notiflix from 'notiflix';
import React from 'react';
import { FaPen, FaRegEye } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { getOrderById, getOrderDetailById } from '../../../api/Admin/Order/indexAPI';
import { setIsDetail, setIsEdit, setOrder, setOrderDetail } from '../../../redux/reducer/order/order.reducer';
import { ErrorToast } from '../../commons/Layouts/Alerts';
import { BlockUI } from '../../commons/Layouts/Notiflix';
import TableLayout from '../../commons/Layouts/Table';
// import './style.css';
export function OrderTable(props) {
  const dispatch = useDispatch();
  const handleEditOrder = async (e, id) => {
    BlockUI('#root', 'fixed');
    e.stopPropagation();
    const dataOrderId = await getOrderById(id);
    Notiflix.Block.remove('#root');
    if (Object.keys(dataOrderId).length > 0) {
      dispatch(setIsEdit(true));
      dispatch(setOrder(dataOrderId));
    } else if (dataOrderId === 401) {
      Notiflix.Block.remove('#root');
    } else {
      Notiflix.Block.remove('#root');
      ErrorToast('Something went wrong. Please try again', 3000);
    }
  };
  const handleOrderDetail = async (e, id, dataOrderByID) => {
    BlockUI('#root', 'fixed');
    e.stopPropagation();
    const dataDetailOrderId = await getOrderDetailById(id);

    Notiflix.Block.remove('#root');
    if (Object.keys(dataDetailOrderId).length > 0) {
      dispatch(setIsDetail(true));
      dispatch(setOrderDetail(dataDetailOrderId));
      dispatch(setOrder(dataOrderByID));
    } else if (dataDetailOrderId === 401) {
      Notiflix.Block.remove('#root');
    } else {
      Notiflix.Block.remove('#root');
      ErrorToast('Something went wrong. Please try again', 3000);
    }
  };
  const renderTableBody = () => {
    return props.tableBody.map((item, index) => {
      return (
        <tr
          key={item.order_id}
          className="cursor-pointer font-weight-bold row-data"
          //   onClick={() => handleShowDetail(item.order_id, item.image_slorder_ide)}
        >
          <td>{item.order_id} </td>
          <td>#{item.order_id} </td>
          <td>{item.customer_lastname + ' ' + item.customer_firstname}</td>
          {/* Status: 1. Cho xac nhan 2.Xac nhan 3.Dang giao hang 4.Giao hang thanh cong 5. Giao hang that bai  6. Da hoan thanh 7 that bai */}
          <td>
            {(() => {
              if (item.status === 1) {
                return <span className="text-warning">Wait for confirmation...</span>;
              } else if (item.status === 2) {
                return <span className="text-success"> Confirm !</span>;
              } else if (item.status === 3) {
                return <span className="text-info"> Delivery</span>;
              } else if (item.status === 4) {
                return <span className="text-success"> Successfully delivery</span>;
              } else if (item.status === 5) {
                return <span className="text-danger"> Delivery failed</span>;
              } else if (item.status === 6) {
                return <span className="text-success"> Successfully</span>;
              } else {
                return <span className="text-danger"> Failed</span>;
              }
            })()}
          </td>
          <td>{item.discount_value}%</td>
          {/* <td>{item.description}</td> */}
          <td>{item.total_price}</td>

          {/* <td>{item.image}</td> */}
          <td>{item.created_order_date}</td>
          <td>
            <div className="d-flex">
              <button
                id="delete-product"
                // onClick={(e) => {
                //   handleCheckDisabledUser(e, item.id);
                // }}
                className="br-6px p-2   bg-gray-100 w-48px h-48px d-flex align-items-center justify-content-center border-none"
              >
                <FaRegEye
                  className=" font-20px"
                  onClick={(e) => {
                    handleOrderDetail(e, item.order_id, item);
                  }}
                />
              </button>
              <button
                id="edit-product"
                onClick={(e) => {
                  handleEditOrder(e, item.order_id);
                }}
                className="br-6px p-2 ms-3 bg-gray-100 text-black w-48px h-48px d-flex align-items-center justify-content-center border-none"
              >
                <FaPen className="font-20px" />
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <div className="container-fluid ">
        <div className="row justify-content-center">
          <TableLayout tableHeader={props.tableHeader} tableBody={renderTableBody()} />
        </div>
      </div>
    </>
  );
}
