import React, { useEffect, useState } from 'react';
import { FaMinus, FaPlus, FaStar, FaStarHalf } from 'react-icons/fa';
import { formatter } from '../../../../utils/formatCurrency';
import StarRatings from 'react-star-ratings/build/star-ratings';
import { useDispatch, useSelector } from 'react-redux';
import { addProductCart, addProductCartWithQuantity } from '../../../../redux/reducer/cart/cart.reducer';
import { cartSelector } from '../../../../redux/selectors';
import { SuccessToast } from '../../../commons/Layouts/Alerts';

function InfoProduct({ id, name, description, price, color, amount, star, image }) {
  const [loading, setLoading] = useState(true);
  const [availableProduct, setAvailableProduct] = useState(!!amount > 0);
  const [quantity, setQuantity] = useState(amount <= 0 ? 0 : 1);
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const handleAddCartItem = async (id, quantity) => {
    //  dispatch(addProductCart({id:id}))
    await dispatch(
      addProductCartWithQuantity({ id: id, name: name, price: price, image: image, amount: amount, quantity: quantity })
    );
    SuccessToast('Add Cart Successfully ! ', 2200);
  };
  return (
    <div className="p-r-50 p-t-5 p-lr-0-lg">
      <h4 className="mtext-105 cl2 js-name-detail p-b-14 fw-bolder">{name}</h4>

      <div className="d-flex justify-content-between">
        <span className="mtext-106 cl2">{formatter.format(price)}</span>

        <StarRatings
          rating={parseInt(star.point)}
          starRatedColor="rgb(252,202,25)"
          starDimension="20px"
          starSpacing="3px"
        />
      </div>
      <div className="stext-102 cl3 p-t-23 text-justify" dangerouslySetInnerHTML={{ __html: description }}></div>

      <div className="p-t-33">
        <div className="flex-w flex-r-m p-b-10">
          <div className="size-203  respon6 ">Color</div>

          <div className="size-204 respon6-next">
            <div
              className="rs1-select2 bg0 bor bor0"
              style={{
                backgroundColor: `${color}`,
                width: '3rem',
                height: '3rem',
              }}
            ></div>
          </div>
        </div>

        <div className="flex-w flex-r-m p-b-10">
          <div className="size-203  respon6">Amount:</div>
          <div className="size-204 flex-w flex-m respon6-next">
            <div className="wrap-num-product flex-w m-r-20 m-tb-10">
              <div
                className={`btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m ${(
                  (quantity === 1 || amount <= 0) &&
                  'disabled'
                ).toString()}`}
                onClick={() => {
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
                }}
              >
                <FaMinus />
              </div>

              <input
                className="mtext-104 cl3 txt-center num-product"
                type="number"
                name="num-product"
                onChange={() => setQuantity(quantity)}
                value={amount > 0 ? quantity : 0}
              />
              <div
                className={`btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m  ${(
                  (quantity === amount || amount <= 0) &&
                  'disabled'
                ).toString()}`}
                onClick={() => setQuantity((prev) => (prev === amount ? amount : prev + 1))}
              >
                <FaPlus />
              </div>
            </div>
            <span className={`available-product fst-italic ${amount <= 0 ? 'warning' : ''} `}>
              {' '}
              {amount > 0 ? `${amount} pieces available` : 'out of stock'}
            </span>
          </div>
        </div>
        <button
          disabled={amount <= 0}
          onClick={() => handleAddCartItem(id, quantity)}
          className={`flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail m-l-10   ${(
            amount <= 0 && 'disabled'
          ).toString()}`}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default InfoProduct;
