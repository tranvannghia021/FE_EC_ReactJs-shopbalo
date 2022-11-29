import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteCookieClient, getCookiesClient } from '../../../../api/Client/Auth/authAPI';
import { getAllDiscountQueryPoint } from '../../../../api/Client/Discount';
import { setPromotionCheckOut } from '../../../../redux/reducer/promotion/promotion.reducer';
import iconDELIVERY from '../../../../utils/logo-deliver.png';
import iconMOMO from '../../../../utils/logo-momo.png';
import iconVISA from '../../../../utils/logo-visa.png';
import iconVNPAY from '../../../../utils/logo-vnpay.png';
import './style.css';
export default function InfoPromotion(props) {
  const [listDiscount, setListDiscount] = useState([]);
  const [discount, setDiscount] = useState();
  const handleGetDiscount = async () => {
    const point = props.dataProfile.point;
    const result = await getAllDiscountQueryPoint({
      filterPoint: point,
    });
    if (result === 401) {
      handleSetUnthorization();
      window.location.href = '/login';
      return false;
    } else if (result === 500) {
      return false;
    } else {
      setListDiscount(result);
    }
    // setLoading(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    handleGetDiscount();
  }, [dispatch]);
  const handleSetUnthorization = () => {
    const token = getCookiesClient('tokenClient');
    if (token) {
      deleteCookieClient('tokenClient');
    }
  };

  return (
    <div className="edit_form d-flex justify-content-center">
      <Form className=" text-black form-checkout-promotion" encType="multipart/form-data">
        <div className="mb-3">
          <h4 className="font-weight-bold text-black title-promotion">Promotion</h4>
          <div>
            <div className="font-18px">
              <div className="row">
                <div className="col-md-6">
                  <p className="font-12px title-name-promotion-checkout">None</p>
                  <Form.Check
                    // className="info-invoice-left"
                    defaultChecked
                    type="radio"
                    label="None"
                    name="payment"
                    id="0"
                    value={0}
                    onChange={() =>
                      dispatch(
                        setPromotionCheckOut({
                          value: 0,
                          name: 'None',
                          id: 0,
                        })
                      )
                    }
                  />
                </div>
                {listDiscount.map((item, index) => {
                  return (
                    <div className="col-md-6" key={index}>
                      <p className="font-12px title-name-promotion-checkout">{item.name}</p>
                      <Form.Check
                        // className="info-invoice-left"

                        type="radio"
                        label={`${item.value} %`}
                        name="payment"
                        id={index}
                        value={item.value}
                        onChange={() =>
                          dispatch(
                            setPromotionCheckOut({
                              value: item.value,
                              name: item.name,
                              id: item.id,
                            })
                          )
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
