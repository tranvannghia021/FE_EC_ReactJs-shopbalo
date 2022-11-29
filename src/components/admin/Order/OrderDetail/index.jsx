import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setIsDetail, setIsEdit } from '../../../../redux/reducer/order/order.reducer';
import { orderByIdSelector, orderDetailByIdSelector } from '../../../../redux/selectors/order/order.selector';
import { formatter } from '../../../../utils/formatCurrency';
import PrintPDF from '../../../commons/Layouts/PrintPDF';
import { useReactToPrint } from 'react-to-print';
import './style.css';

const OrderDetail = () => {
  const components = useRef();
  const handlePrint = useReactToPrint({
    content: () => components.current,
    documentTitle: 'emp-data',
    // onAfterPrint: () => alert(components.current),
  });
  const dispatch = useDispatch();
  const dataDetailOrderById = useSelector(orderDetailByIdSelector);
  const dataOrder = useSelector(orderByIdSelector);
  const backToOrder = () => {
    dispatch(setIsDetail(false));
  };
  return (
    <>
      <div className="row mb-3">
        <div className=" d-flex justify-content-end">
          <Button id="product-save-cancel" onClick={backToOrder} variant="outline-danger" className="font-weight-bold">
            Cancel
          </Button>
          <Button
            id="product-save-cancel"
            onClick={handlePrint}
            variant="secondary"
            className="font-weight-bold margin-left-12px"
          >
            Print
          </Button>
        </div>
      </div>
      <div ref={components}>
        <div className="row order_detail_info_order">
          <div className="col-12 col-md-12 col-sm-12">
            <div className="mt-1 p-3  container w-100">
              <div>
                <h1 className="mt-2 mb-4 font-30px fw-bold text-center ">Information order</h1>
                <div className="d-flex flex-column">
                  <h5 className="text-end p0 fw-bold">
                    #{dataOrder && dataOrder.order_id} - {dataOrder && dataOrder.created_order_date}
                  </h5>
                  <div className=" row">
                    <div className="col-5 ml-3">
                      <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                        Customer name :
                        <span> {dataOrder && dataOrder.customer_firstname + ' ' + dataOrder.customer_lastname} </span>
                      </h4>
                      <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                        Phone : <span>0{dataOrder && dataOrder.customer_phone}</span>
                      </h4>
                      <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                        Address : <span>{dataOrder && dataOrder.address_delivery}</span>
                      </h4>
                      <h4 className="fs-6   mt-4 mb-1 font-weight-bold ">
                        Status:
                        <span>
                          {(() => {
                            if (dataOrder && dataOrder.status === 1) {
                              return <span className="text-warning">Wait for confirmation...</span>;
                            } else if (dataOrder.status === 2) {
                              return <span className="text-success"> Confirm !</span>;
                            } else if (dataOrder.status === 3) {
                              return <span className="text-info"> Delivery</span>;
                            } else if (dataOrder.status === 4) {
                              return <span className="text-success"> Successfully delivery</span>;
                            } else if (dataOrder.status === 5) {
                              return <span className="text-danger"> Delivery failed</span>;
                            } else if (dataOrder.status === 6) {
                              return <span className="text-success"> Successfully</span>;
                            } else {
                              return <span className="text-danger"> Failed</span>;
                            }
                          })()}
                        </span>
                        <button
                          className="margin-left-12px text-primary"
                          onClick={() => {
                            dispatch(setIsEdit(true), dispatch(setIsDetail(false)));
                          }}
                        >
                          Update Status
                        </button>
                      </h4>
                    </div>
                    <div className="col-7 total_order_detail">
                      <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                        ID staff : <span> {dataOrder && dataOrder.staff_id}</span>
                      </h4>
                      <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                        Staff name :
                        <span>{dataOrder && dataOrder.staff_firstname + ' ' + dataOrder.staff_lastname} </span>
                      </h4>
                      <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                        Discount : <span> {dataOrder && dataOrder.discount_value}%</span>
                      </h4>
                      <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                        Total : <span> {dataOrder && formatter.format(dataOrder.total_price)}</span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border border-1 opacity-50"></hr>
        <h1 className="mt-2 font-20px fw-bold text-center ">Product detail</h1>
        <div className="row">
          {dataDetailOrderById.data !== undefined &&
            dataDetailOrderById.data.map((item, index) => {
              return (
                <div className="col-12 col-md-6 col-sm-12" key={index}>
                  <div className="mt-4 p-3 detail-order container w-100">
                    <div>
                      <h2 className="mt-2 fs-5 fw-bold  "># {index + 1}</h2>
                      <h2 className="mt-2 fs-5 fw-bold text-center  ">{item.product_name}</h2>
                      <div className="d-flex flex-column">
                        <div className=" row">
                          <div className=" col-3 image_detail_order">
                            <img src={item.image} width={100} height={100} alt="image_detail_order" />
                          </div>
                          <div className="col-5 ml-3">
                            <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                              Price : <span>{formatter.format(item.price)} </span>
                            </h4>
                            <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                              Amount : <span>{item.amount}</span>
                            </h4>
                          </div>
                          <div className="col-4 total_order_detail">
                            <h4 className="fs-6 mb-1 font-weight-bold ">
                              Total : <span>{formatter.format(item.price * item.amount)}</span>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
