import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartSelector, isOpenCartCompact } from '../../../../redux/selectors';
import { FaTimes } from 'react-icons/fa';
import { setIsOpenCartCompact } from '../../../../redux/reducer/home/home.reducer';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { getDetailProductById } from '../../../../api/Client/Home/productDetailAPI';
import { getStorageImage } from '../../../../api/StorageImage';
import ImageCustom from '../../../commons/Layouts/Image';
import { formatter } from '../../../../utils/formatCurrency';

function CartCompact(props) {
  let navigate = useNavigate();
  const [listCart, setListCart] = useState([]);
  const [total, setTotal] = useState(0);
  const dataCart = useSelector(cartSelector);
  const isOpenCart = useSelector(isOpenCartCompact);
  useEffect(() => {
    setListCart(dataCart);
    setTotal(dataCart.reduce((acc, item) => acc + item.price * item.qty, 0));
  }, [isOpenCart]);
  const dispatch = useDispatch();
  const handleCloseOpenCart = () => {
    dispatch(setIsOpenCartCompact(false));
  };
  const handleFowardCheckoutPage = () => {
    navigate('/checkout');
  };
  return (
    <div className={`wrap-header-cart js-panel-cart z-index-1m ${!!isOpenCart && `show-header-cart`}`}>
      <div className="s-full js-hide-cart"></div>

      <div className="header-cart flex-col-l p-l-65 p-r-25">
        <div className="header-cart-title flex-w flex-sb-m p-b-8">
          <span className="mtext-103 cl2">Your Cart</span>

          <div
            className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart btn-close-expand-cart"
            onClick={() => handleCloseOpenCart()}
          >
            <FaTimes />
          </div>
        </div>

        <div className="header-cart-content flex-w js-pscroll">
          <ul className="header-cart-wrapitem w-full">
            {!!listCart &&
              listCart.map((item, index) => (
                <li className="header-cart-item flex-w flex-t m-b-12" key={index}>
                  <div className="header-cart-item-img">
                    <ImageCustom src={item.image} alt={`cart item - ${index}`} />
                  </div>

                  <div className="header-cart-item-txt p-t-8">
                    <a href={`/product/${item.id}`} className="header-cart-item-name m-b-18 hov-cl1 trans-04">
                      {item.name}
                    </a>

                    <span className="header-cart-item-info">
                      {item.qty} x {formatter.format(item.price)}
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className="w-full">
          <div className="header-cart-total w-full p-tb-40">Total: {formatter.format(total)}</div>

          <div className="header-cart-buttons flex-w w-full">
            <a
              href={'/cart'}
              className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10 cursor-pointer"
            >
              View Cart
            </a>

            <a
              href={'/checkout'}
              className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10 cursor-pointer"
            >
              Check Out
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartCompact;
