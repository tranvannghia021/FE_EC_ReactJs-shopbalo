import React, { memo } from 'react';
import { formatter } from '../../../../utils/formatCurrency';
import RowProductCart from '../CartItem';

function TableProductCart({ data_product_cart,onSetTotal }) {
  console.log('table -rerender')
  // const data_product_cart=[
  //   {id:1,name: 'BackPack 2988',limit_amount:25,quantity_cart:2,price:450,image:'https://th.bing.com/th/id/R.e1168e16cd516e419a23bc992e74c20e?rik=QM571JAin9on6A&pid=ImgRaw&r=0'},
  //   {id:2,name: 'Superbuu 25',limit_amount:10,quantity_cart:1,price:650,image:'https://th.bing.com/th/id/R.e1168e16cd516e419a23bc992e74c20e?rik=QM571JAin9on6A&pid=ImgRaw&r=0'},
  // ]

  return (
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
          {
            data_product_cart.map((item)=>(
          <RowProductCart id={item.id} name={item.name}
                          price={item.price} key={item.id}
                          quantity_cart={item.quantity_cart}
              limit_amount={item.amount}
              image={item.image}
              />
            ))
          }
          </tbody>
        </table>
      </div>

      <div className="flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm">
        <div className="flex-w flex-m m-r-20 m-tb-5">
          <input className="stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-r-10 m-tb-5" type="text"
                 name="coupon" placeholder="Coupon Code"/>

            <div
              className="flex-c-m stext-101 cl2 size-118 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-5">
              Apply coupon
            </div>
        </div>

        <div
          className="flex-c-m stext-101 cl2 size-119 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-10">
          Update Cart
        </div>
      </div>
    </div>
  );
}

export default memo(TableProductCart);