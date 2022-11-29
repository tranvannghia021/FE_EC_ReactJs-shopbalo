import React from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { HiFilter } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { setStatus } from '../../../../redux/reducer/slider/slider.reducer';
import { isStatusSelectorSlider } from '../../../../redux/selectors/slider/slider.selector';

const FilterStatus = () => {
  const status = useSelector(isStatusSelectorSlider);

  const dispatch = useDispatch();

  const handleFilter = (value) => {
    dispatch(setStatus(value));
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
          <Dropdown.Item as={'li'} onClick={() => handleFilter('All')}>
            <Form.Check
              type="radio"
              id="checkbox-all"
              className="mx-4 my-2 font-weight-bold"
              label="All"
              checked={status === 'All'}
              onChange={() => handleFilter('All')}
            />
          </Dropdown.Item>
          <Dropdown.Item as={'li'} onClick={() => handleFilter('Active')}>
            <Form.Check
              type="radio"
              id="checkbox-admin"
              className="mx-4 my-2 font-weight-bold"
              label="Active"
              checked={status === 'Active'}
              onChange={() => handleFilter('Active')}
            />
          </Dropdown.Item>
          <Dropdown.Item as={'li'} onClick={() => handleFilter('InActive')}>
            <Form.Check
              type="radio"
              id="checkbox-inactive"
              className="mx-4 my-2 font-weight-bold"
              label="InActive"
              checked={status === 'InActive'}
              onChange={() => handleFilter('InActive')}
            />
          </Dropdown.Item>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default FilterStatus;
