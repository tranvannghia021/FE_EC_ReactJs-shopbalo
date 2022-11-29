import React from 'react';
import { useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { HiFilter } from 'react-icons/hi';

import './style.css';

export default function FilterOrder(props) {
  // console.log('data cate', props.data);
  const [checkedOrder, setCheckedOrder] = useState('All');
  const handleFilter = (value) => {
    props.setCurrentFilter(value);
    setCheckedOrder(value);
  };
  return (
    <Dropdown>
      <Dropdown.Toggle
        id="user-type-filter-btn"
        className="btn-danger filter-button d-flex align-items-center justity-content-center mr-2"
      >
        <p className="flex-grow-1 font-weight-bold padding-right-1x">Status: {checkedOrder}</p>
        <div className="fb-icon">
          <HiFilter />
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu id="category-type-filter-menu">
        <Form>
          <Dropdown.Item onClick={() => handleFilter('All')} className="category-type-filter-menu-item">
            <Form.Check
              type="radio"
              id="checkbox-all"
              className="mx-4 my-2 font-weight-bold"
              label="All"
              checked={checkedOrder === 'All'}
              onChange={() => handleFilter('All')}
            />
          </Dropdown.Item>
          {props.data !== undefined &&
            props.data.map((item, index) => {
              return (
                <Dropdown.Item
                  onClick={() => handleFilter(item.id)}
                  key={index}
                  className="category-type-filter-menu-item"
                >
                  <Form.Check
                    type="radio"
                    id={`checkbox-${item.id}`}
                    className="mx-4 my-2 font-weight-bold"
                    label={item.value}
                    checked={checkedOrder === item.id}
                    onChange={() => handleFilter(item.id)}
                  />
                </Dropdown.Item>
              );
            })}
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
}

// FilterOrder.propTypes = {
//   currentFilter: PropTypes.string,
//   setCurrentFilter: PropTypes.func,
// };
