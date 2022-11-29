import React, { useEffect, useState } from 'react';
import { formatter } from '../../../utils/formatCurrency';
import { useDispatch, useSelector } from 'react-redux';
import { cartSelector } from '../../../redux/selectors';
import CartItem from '../../../components/client/Cart/CartItem';
import NotFoundData from '../../../components/commons/Layouts/NotFoundData';
import SkeletonCart from '../../../components/commons/Layouts/Skeleton/SkeletonCart';
import { NavLink } from 'react-router-dom';

export function CartPage(props) {
  const [listCartProduct, setListCartProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const dataCart = useSelector(cartSelector);
  useEffect(() => {
    setListCartProduct(dataCart);
  }, [dataCart]);
  return (
    <>
      {!loading ? (
        <section>
          <div className="container-fluid mt-5 animsition">
            <form className="bg0 p-t-75 p-b-85">
              <div className="container">
                {dataCart.length > 0 ? (
                  <div className="row">
                    <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
                      <div className="m-l-25 m-r--38 m-lr-0-xl">
                        <div className="wrap-table-shopping-cart">
                          <table className="table-shopping-cart">
                            <tbody>
                              <tr className="table_head">
                                <th className="column-1">Product</th>
                                <th className="column-2"></th>
                                <th className="column-3">Price</th>
                                <th className="column-4">Quantity</th>
                                <th className="column-5">Total</th>
                              </tr>
                              {listCartProduct.length > 0 &&
                                listCartProduct.map((item) => (
                                  <CartItem
                                    id={item.id}
                                    name={item.name}
                                    price={item.price}
                                    key={item.id}
                                    quantity_cart={item.qty}
                                    limit_amount={item.amount}
                                    image={item.image}
                                  />
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
                      <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                        <h4 className="mtext-109 cl2 p-b-30">Cart Totals</h4>

                        <div className="flex-w flex-t p-t-27 bor12 p-b-33 m-b-10">
                          <div className="size-208">
                            <span className="mtext-101 cl2">Total:</span>
                          </div>

                          <div className="size-209 p-t-1">
                            <span className="mtext-110 cl2">
                              {formatter.format(listCartProduct.reduce((acc, item) => acc + item.price * item.qty, 0))}
                            </span>
                          </div>
                        </div>

                        {/* <button className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer"> */}
                        <NavLink
                          className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer"
                          to="/checkout"
                        >
                          {' '}
                          Proceed to Checkout
                        </NavLink>
                        {/* </button> */}
                      </div>
                    </div>
                  </div>
                ) : (
                  <NotFoundData />
                )}
              </div>
            </form>
          </div>
        </section>
      ) : (
        <SkeletonCart />
      )}
    </>
  );
}
