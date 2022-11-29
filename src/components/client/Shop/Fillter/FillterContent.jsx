import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../../../../redux/reducer/shop/shop.reducer';
import { categoryIdSelector } from '../../../../redux/selectors/shop/shop.selector';
import './style.css';

const FillterContent = ({ item }) => {
  const dispatch = useDispatch();
  const chooseCategory = useSelector(categoryIdSelector);
  const handleCategoryId = (id) => {
    dispatch(setCategoryId(id));
  };

  return (
    <>
      <div className="t-collapse__content">
        <div className="pb-6">
          <div className="gap-3">
            <div className="d-flex flex-wrap gap-3 cursor-pointer">
              {item !== undefined &&
                item.map((cate, i) => (
                  <span
                    className={`t-collapse__label ${cate.id === chooseCategory && 't-collapse__label-active'}`}
                    key={cate.id}
                    onClick={() => handleCategoryId(cate.id)}
                  >
                    {cate.name}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FillterContent;
