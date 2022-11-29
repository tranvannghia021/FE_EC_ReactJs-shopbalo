import React from 'react';
import { Button } from 'react-bootstrap';
import { FaPen, FaRegEye } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { getOrderDetailById } from '../../../../api/Client/Order';
import { setIsDetailHistory, setOrderDetailHistory } from '../../../../redux/reducer/history/history.reducer';
import { formatter } from '../../../../utils/formatCurrency';
import TableLayout from '../../../commons/Layouts/Table';

// import './style.css';
export function OrderTableClient(props) {
  const dispatch = useDispatch();

  const handleOrderDetail = async (id, item) => {
    dispatch(setIsDetailHistory(true));

    const resultDetail = await getOrderDetailById(id);

    if (resultDetail == 401) {
      return false;
    } else {
      dispatch(
        setOrderDetailHistory({
          dataDetail: resultDetail,
          dataOrder: item,
        })
      );
    }
  };

  const renderTableBody = () => {
    return props.tableBody.map((item, index) => {
      return (
        <tr
          key={item.id}
          className="cursor-pointer font-weight-bold "
          //   onClick={() => handleShowDetail(item.id, item.image_slide)}
        >
          <td>{index + 1} </td>
          <td>#{item.id} </td>
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

          <td>{item.discount_value}</td>
          {/* <td>{item.description}</td> */}
          <td>{formatter.format(item.total_price)}</td>
          {/* <td>{item.image}</td> */}
          <td>{item.created_order_date}</td>
          <td>
            <div className="d-flex justify-content-center">
              <button className="br-6px p-2 bg-gray-100 w-48px h-48px d-flex align-items-center justify-content-center border-none">
                <FaRegEye
                  className=" font-20px"
                  onClick={(e) => {
                    handleOrderDetail(item.id, item);
                  }}
                />
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <div className="container-fluid mb-5">
        {/* <div className="row justify-content-center"> */}
        {/* <TableLayout tableHeader={props.tableHeader} tableBody={renderTableBody()} />
         */}
        <div className="wrap-table-checkout-cart">
          <table className="table-checkout-cart text-center">
            <thead>
              <tr className="table_head">
                {props.tableHeader.map((item, index) => {
                  return (
                    <>
                      <th className={`column-${index + 1}`}>{item.name}</th>
                    </>
                  );
                })}
              </tr>
            </thead>
            <tbody>{renderTableBody()}</tbody>
          </table>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
