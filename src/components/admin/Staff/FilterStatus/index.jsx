import React from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { IoMdArrowDropdown } from 'react-icons/io';
import PropTypes from 'prop-types';

import './style.css';

export default function FilterStatus(props) {
  const {setFilterStatus,data_options}=props
  const [currentFilter,setCurrentFilter]=React.useState({name:'All',value:'All'})
  const handleFilter = (item) => {
    setCurrentFilter(item)
    setFilterStatus(item.value)
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        id="user-type-filter-btn"
        className="btn-danger filter-status-button d-flex align-items-center justity-content-center margin-left-12px"
      >
        <p className="flex-grow-1 font-weight-bold">Status : {currentFilter.name}</p>
        <div className="">
          <IoMdArrowDropdown/>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu id="user-type-filter-menu">
        <Form>
          {
            data_options.map((item) =>
              <Dropdown.Item key={item.id} onClick={() => handleFilter(item) }>
                <Form.Check
                  type="radio"
                  id="checkbox-all"
                  className="mx-4 my-2 font-weight-bold"
                  label={item.name}
                  checked={currentFilter.value === item.value}
                  onChange={() => handleFilter(item)}
                />
              </Dropdown.Item>
            )
          }
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
}

FilterStatus.propTypes = {
  data_options: PropTypes.array,
  setFilterStatus: PropTypes.func,
};
