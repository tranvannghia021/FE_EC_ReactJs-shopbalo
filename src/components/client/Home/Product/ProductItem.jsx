import React from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings/build/star-ratings';
import { formatter } from '../../../../utils/formatCurrency';

const ProductItem = (props) => {
  const { item } = props;
  return (
    <div
      className="border rounded"
      style={{
        width: '20rem',
        height: '27rem',
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
      }}
    >
      <div className="block2">
        <div className="block2-pic hov-img0" style={{ height: '20rem' }}>
          <img src={item.image} alt="IMG-PRODUCT" style={{ height: '20rem', objectFit: 'cover' }} />
          <Link
            to={`/product/${item.id}`}
            className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
          >
            Quick View
          </Link>
        </div>

        <div className="block2-txt flex-w flex-t p-3">
          <div className="d-flex flex-column w-100 justify-content-between" style={{ height: '5rem' }}>
            <a href={`/product/${item.id}`} className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
              {item.name.length < 60 ? item.name : `${item.name.substring(0, 60)} . . .`}
            </a>

            <div className="d-flex justify-content-between align-items-end">
              <span className="stext-105 cl3"> {formatter.format(item.price)} </span>

              <StarRatings
                rating={parseInt(item.ratings.point)}
                starRatedColor="rgb(252,202,25)"
                starDimension="20px"
                starSpacing="3px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
