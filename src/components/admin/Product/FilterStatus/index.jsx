import React from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { HiFilter } from 'react-icons/hi';

import './style.css';

export default function FilterStatus(props) {
  const handleFilter = (value) => {
    if (value === 'All') props.setCurrentFilter();
    else props.setCurrentFilter(value);
  };
  return (
    <Dropdown>
      <Dropdown.Toggle
        id="user-type-filter-btn"
        className="btn-danger filter-button d-flex align-items-center justity-content-center margin-left-12px"
      >
        <p className="flex-grow-1 font-weight-bold">Status</p>
        <div className="fb-icon">
          <HiFilter />
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu id="user-type-filter-menu">
        <Form>
          <Dropdown.Item onClick={() => handleFilter('All')}>
            <Form.Check
              type="radio"
              id="All"
              className="mx-4 my-2 font-weight-bold"
              label="All"
              checked={props.currentFilter === 'All'}
              onChange={() => handleFilter('All')}
            />
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleFilter('Active')}>
            <Form.Check
              type="radio"
              id="Active"
              className="mx-4 my-2 font-weight-bold"
              label="Active"
              checked={props.currentFilter === 'Active'}
              onChange={() => handleFilter('Active')}
            />
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleFilter('Out_of_stock')}>
            <Form.Check
              type="radio"
              id="Out of stock"
              className="mx-4 my-2 font-weight-bold"
              label="Out of stock"
              checked={props.currentFilter === 'Out_of_stock'}
              onChange={() => handleFilter('Out_of_stock')}
            />
          </Dropdown.Item>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
}

// FilterStatus.propTypes = {
//   currentFilter: PropTypes.string,
//   setCurrentFilter: PropTypes.func,
// };
