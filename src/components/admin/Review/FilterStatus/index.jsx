import React from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { HiFilter } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { isStatusSelectorReview } from '../../../../redux/selectors/review/review.selector';
import { setStatus } from '../../../../redux/reducer/review/review.reducer';

const FilterStatus = () => {
  const status = useSelector(isStatusSelectorReview);

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
          <Dropdown.Item as={'li'} onClick={() => handleFilter('all')}>
            <Form.Check
              type="radio"
              id="checkbox-all"
              className="mx-4 my-2 font-weight-bold"
              label="All"
              checked={status === 'all'}
              onChange={() => handleFilter('all')}
            />
          </Dropdown.Item>
          <Dropdown.Item as={'li'} onClick={() => handleFilter('pending')}>
            <Form.Check
              type="radio"
              id="checkbox-admin"
              className="mx-4 my-2 font-weight-bold"
              label="Pending"
              checked={status === 'pending'}
              onChange={() => handleFilter('pending')}
            />
          </Dropdown.Item>
          <Dropdown.Item as={'li'} onClick={() => handleFilter('pushlished')}>
            <Form.Check
              type="radio"
              id="checkbox-inactive"
              className="mx-4 my-2 font-weight-bold"
              label="Pushlished"
              checked={status === 'pushlished'}
              onChange={() => handleFilter('pushlished')}
            />
          </Dropdown.Item>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default FilterStatus;
