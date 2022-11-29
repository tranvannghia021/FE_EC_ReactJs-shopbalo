import React from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { HiFilter } from 'react-icons/hi';

import './style.css';

export default function FilterCategory(props) {
  // console.log('data cate', props.data);
  const handleFilter = (value) => {
    props.setCurrentFilter(value);
  };
  return (
    <Dropdown>
      <Dropdown.Toggle
        id="user-type-filter-btn"
        className="btn-danger filter-button d-flex align-items-center justity-content-center mr-2"
      >
        <p className="flex-grow-1 font-weight-bold">Category</p>
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
              checked={props.currentFilter === 'All'}
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
                    label={item.name}
                    checked={props.currentFilter === item.id}
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

// FilterCategory.propTypes = {
//   currentFilter: PropTypes.string,
//   setCurrentFilter: PropTypes.func,
// };
