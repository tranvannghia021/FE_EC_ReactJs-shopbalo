import React, {  useEffect, useState } from 'react';
import { formatter } from '../../../../utils/formatCurrency';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {
  decreaseQuantityCart,
  deleteItemCart,
  increaseQuantityCart,
} from '../../../../redux/reducer/cart/cart.reducer';
import ImageCustom from '../../../commons/Layouts/Image';

function CartItem({ id, name, price, image, quantity_cart, limit_amount }) {
  const [quantity, setQuantity] = useState(limit_amount <= 0 ? 0 : quantity_cart);
  const [totalPrice, setTotalPrice] = useState(quantity_cart * price);
  const dispatch = useDispatch();
  useEffect(() => {
    setTotalPrice(quantity * price);
  }, [quantity]);
  const handleIncreaseQuantityCartIem = async (id) => {
    await dispatch(increaseQuantityCart({ id: id }));
    setQuantity((prev) => (prev === limit_amount ? limit_amount : prev + 1));
  };
  const handleDecreaseQuantityCartIem = async (id) => {
    await dispatch(decreaseQuantityCart({ id: id }));
    setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
  };
  const handleDeleteCartItem =  (id) => {
     dispatch(deleteItemCart({ id: id }));
  };
  return (
    <tr className="table_row " key={id}>
      <td className="column-1">
        <div className="how-itemcart1" onClick={() => handleDeleteCartItem(id)}>
          <ImageCustom src={image} alt="IMG" />
        </div>
      </td>
      <td className="column-2">  <a href={`/product/${id}`} className="header-cart-item-name m-b-8 hov-cl1 trans-04">
        {name}
      </a></td>
      <td className="column-3">{formatter.format(price)}</td>
      <td className="column-4">
        <div className="wrap-num-product flex-w m-l-auto m-r-0">
          <div
            className={`btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m ${(
              (quantity === 1 || limit_amount <= 0) &&
              'disabled'
            ).toString()}`}
            onClick={() => handleDecreaseQuantityCartIem(id)}
          >
            <FaMinus />
          </div>

          <input
            className="mtext-104 cl3 txt-center num-product"
            type="number"
            name="num-product1"
            onChange={() => setQuantity(quantity)}
            value={limit_amount > 0 ? quantity : 0}
          />

          <div
            className={`btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m  ${(
              (quantity === limit_amount || limit_amount <= 0) &&
              'disabled'
            ).toString()}`}
            onClick={() => handleIncreaseQuantityCartIem(id)}
          >
            <FaPlus />
          </div>
        </div>
      </td>
      <td className="column-5">{formatter.format(totalPrice)}</td>
    </tr>
  );
}

export default CartItem;