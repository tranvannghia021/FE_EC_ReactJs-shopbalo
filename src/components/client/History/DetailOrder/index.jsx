import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setIsDetailHistory } from '../../../../redux/reducer/history/history.reducer';
import { orderDetailByIdHistorySelector } from '../../../../redux/selectors/history/history.selector';
import { formatter } from '../../../../utils/formatCurrency';
import ImageCustom from '../../../commons/Layouts/Image';
import ReviewProductItem from './ReviewProduct';
import './style.css';

const OrderHistoryDetail = (props) => {
  const [review, setShowReview] = useState(false);
  const dispatch = useDispatch();
  const dataDetailOrderById = useSelector(orderDetailByIdHistorySelector);
  const backToOrder = () => {
    dispatch(setIsDetailHistory(false));
  };
  return (
    <>
      <div className="row mb-3">
        <div className=" d-flex justify-content-end">
          <Button id="product-save-cancel" onClick={backToOrder} variant="secondary" className="font-weight-bold">
            Cancel
          </Button>
        </div>
      </div>
      <div className="row order_detail_info_order">
        <div className="col-12 col-md-12 col-sm-12">
          <div className="mt-1 p-3  container w-100">
            <div>
              <h1 className="mt-2 mb-4 font-30px fw-bold text-center ">Information order</h1>
              <div className="d-flex flex-column">
                <h5 className="text-end p0 fw-bold">
                  #{dataDetailOrderById.dataOrder !== undefined && dataDetailOrderById.dataOrder.id} -
                  {dataDetailOrderById.dataOrder !== undefined && dataDetailOrderById.dataOrder.created_order_date}
                </h5>
                <div className=" row">
                  <div className="col-5 ml-3">
                    <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                      Customer name :<span>{props.infoCustomer.first_name + ' ' + props.infoCustomer.last_name}</span>
                    </h4>
                    <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                      Phone :<span>{props.infoCustomer.phone}</span>
                    </h4>

                    <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                      Address :
                      <span>
                        {dataDetailOrderById.dataOrder !== undefined && dataDetailOrderById.dataOrder.address_delivery}
                      </span>
                    </h4>
                  </div>
                  <div className="col-7 total_order_detail">
                    <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                      Discount :
                      <span>
                        {dataDetailOrderById.dataOrder !== undefined && dataDetailOrderById.dataOrder.discount_value} %
                      </span>
                    </h4>
                    <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                      Price after discount :
                      <span>
                        {dataDetailOrderById.dataOrder !== undefined &&
                          formatter.format(dataDetailOrderById.dataOrder.total_price)}
                      </span>
                    </h4>
                    <h4 className="fs-6   mt-4 mb-1 font-weight-bold ">
                      Status:
                      <span>
                        {(() => {
                          if (
                            dataDetailOrderById.dataOrder !== undefined &&
                            dataDetailOrderById.dataOrder.status === 1
                          ) {
                            return <span className="text-warning">Wait for confirmation...</span>;
                          } else if (
                            dataDetailOrderById.dataOrder !== undefined &&
                            dataDetailOrderById.dataOrder.status === 2
                          ) {
                            return <span className="text-success"> Confirm !</span>;
                          } else if (
                            dataDetailOrderById.dataOrder !== undefined &&
                            dataDetailOrderById.dataOrder.status === 3
                          ) {
                            return <span className="text-info"> Delivery</span>;
                          } else if (
                            dataDetailOrderById.dataOrder !== undefined &&
                            dataDetailOrderById.dataOrder.status === 4
                          ) {
                            return <span className="text-success"> Successfully delivery</span>;
                          } else if (
                            dataDetailOrderById.dataOrder !== undefined &&
                            dataDetailOrderById.dataOrder.status === 5
                          ) {
                            return <span className="text-danger"> Delivery failed</span>;
                          } else if (
                            dataDetailOrderById.dataOrder !== undefined &&
                            dataDetailOrderById.dataOrder.status === 6
                          ) {
                            return <span className="text-success"> Successfully</span>;
                          } else {
                            return <span className="text-danger"> Failed</span>;
                          }
                        })()}
                      </span>
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
      <div className="row order_detail_root">
        {dataDetailOrderById.dataDetail !== undefined &&
          dataDetailOrderById.dataDetail.map((item, index) => {
            return (
              <div className="col-12 col-md-6 col-sm-12" key={index}>
                <div className="mt-4 p-3 detail-order container w-100">
                  <div>
                    <h2 className="mt-2 fs-5 fw-bold  "># {index + 1}</h2>
                    <h2 className="mt-2 fs-5 fw-bold text-center text-header-history   ">{item.products.name}</h2>
                    <div className="d-flex flex-column">
                      <div className=" row">
                        <div className=" col-3 image_detail_order">
                          <ImageCustom
                            src={item.products.image}
                            width={100}
                            height={100}
                            alt="image_detail_order"
                            className="w-100"
                          />
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

                  {dataDetailOrderById.dataOrder !== undefined && dataDetailOrderById.dataOrder.status === 6 && (
                    <div className="row">
                      <p onClick={() => setShowReview(!review)} className="text-center cursor-pointer text-primary">
                        Review
                      </p>
                      {review ? (
                        <ReviewProductItem
                          dataDetailRV={item.products.id}
                          dataCustomer={dataDetailOrderById.dataOrder.customer_id}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default OrderHistoryDetail;
