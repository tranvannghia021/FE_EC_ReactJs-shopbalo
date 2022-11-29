import React, { useRef, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { GrSubtract } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { setFillterPriceEnd, setFillterPriceStart } from '../../../../redux/reducer/shop/shop.reducer';
import { fillterPriceEnd, fillterPriceStart } from '../../../../redux/selectors/shop/shop.selector';
import FillterContent from './FillterContent';
import './style.css';

const Fillter = ({ item, title, isContent, isClear }) => {
  const dispatch = useDispatch();
  const [isToggle, setIsToggle] = useState(true);

  const [startPrice, setStartPrice] = useState('');
  const [endPrice, setEndPrice] = useState('');
  const refStartPrice = useRef(null);
  const refEndPrice = useRef(null);

  const start_price = useSelector(fillterPriceStart);
  const end_price = useSelector(fillterPriceEnd);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setFillterPriceStart(startPrice));
    dispatch(setFillterPriceEnd(endPrice));

    // 👇️ clear all input values in the form
    if (isClear) {
      refStartPrice.current.value = '';
      refEndPrice.current.value = '';
    }
  };

  return (
    <>
      <div className="section-filter">
        <div className="d-flex flex-column">
          <div className="t-collapse t-collapse--active">
            <span
              className="t-collapse__heading d-flex align-items-center justify-content-between"
              onClick={() => setIsToggle(!isToggle)}
            >
              <h3 className="t-collapse__title">{title}</h3>
              <span className="t-collapse__icon ">{isToggle ? <GrSubtract /> : <FiPlus />}</span>
            </span>
            {isContent ? (
              isToggle && <FillterContent item={item} />
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="d-flex">
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="From"
                      id="from"
                      ref={refStartPrice}
                      onChange={(e) => setStartPrice(e.target.value)}
                    />
                    <label htmlFor="from">From</label>
                  </div>
                  <span className="fs-2">{' - '}</span>
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="To"
                      id="to"
                      ref={refEndPrice}
                      onChange={(e) => setEndPrice(e.target.value)}
                    />
                    <label htmlFor="to">To</label>
                  </div>
                </div>
                <button type="submit" className="btn btn-danger">
                  Fillter
                </button>
              </form>
            )}

            <hr></hr>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fillter;
