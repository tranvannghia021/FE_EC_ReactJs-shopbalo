import React from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { HiFilter } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../../../../redux/reducer/shop/shop.reducer';
import { sortPrice } from '../../../../redux/selectors/shop/shop.selector';

import './style.css';

export default function SortPrice(props) {
  const sort = useSelector(sortPrice);

  const dispatch = useDispatch();

  const handleFilter = (value) => {
    dispatch(setSort(value));
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        id="user-type-filter-btn"
        className="btn-primary-custom filter-button d-flex align-items-center justity-content-center mr-2"
      >
        <p className="flex-grow-1 font-weight-bold">Sort Price </p>
        <div className="fb-icon">
          <HiFilter />
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu id="user-type-filter-menu">
        <Form>
          <Dropdown.Item as={'li'} onClick={() => handleFilter('asc')}>
            <Form.Check
              type="radio"
              id="checkbox-asc"
              className="mx-4 my-2 font-weight-bold"
              label="↑ Asc"
              checked={sort === 'asc'}
              onChange={() => handleFilter('asc')}
            />
          </Dropdown.Item>
          <Dropdown.Item as={'li'} onClick={() => handleFilter('desc')}>
            <Form.Check
              type="radio"
              id="checkbox-desc"
              className="mx-4 my-2 font-weight-bold"
              label="↓ Desc"
              checked={sort === 'desc'}
              onChange={() => handleFilter('desc')}
            />
          </Dropdown.Item>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
}

// FilterCategory.propTypes = {
//   currentFilter: PropTypes.string,
//   setCurrentFilter: PropTypes.func,
// };
