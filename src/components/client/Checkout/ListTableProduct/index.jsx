import React from 'react';
import './style.css';
import ImageCustom from '../../../commons/Layouts/Image';
import { formatter } from '../../../../utils/formatCurrency';
export default function ListTableProductCheckOut(props) {
  const { dataListCart } = props;
  return (
    <div className="wrap-table-checkout-cart">
      <table className="table-checkout-cart text-center">
        <thead>
          <tr className="table_head">
            <th className="column-1">Product</th>
            <th className="column-2"></th>
            <th className="column-3">Price</th>
            <th className="column-4">Quantity</th>
            <th className="column-5">Total</th>
          </tr>
        </thead>
        <tbody>
          {dataListCart.map((item, index) => {
            return (
              <tr className="table_row" key={index}>
                <td className="column-1">
                  <div className="how-itemcheckout">
                    <ImageCustom src={item.image} alt="IMG" />
                  </div>
                </td>
                <td className="column-2">{item.name}</td>
                <td className="column-3">{formatter.format(item.price)}</td>
                <td className="column-4">{item.qty}</td>
                <td className="column-5">{formatter.format(item.price * item.qty)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
