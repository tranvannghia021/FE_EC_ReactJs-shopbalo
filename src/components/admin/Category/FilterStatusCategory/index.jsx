import React from 'react';

import { Dropdown, Form } from 'react-bootstrap';
import { HiFilter } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { setStatus } from '../../../../redux/reducer/category/category.reducer';
import { isStatusSelector } from '../../../../redux/selectors/category/category.selector';




import './style.css';

export default function FilterStatusCategory(props) {

    const status = useSelector(isStatusSelector);
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
                    <Dropdown.Item as={'li'} onClick={() => handleFilter('UnActive')}>
                        <Form.Check
                            type="radio"
                            id="checkbox-unactive"
                            className="mx-4 my-2 font-weight-bold"
                            label="UnActive"
                            checked={status === 'UnActive'}
                            onChange={() => handleFilter('UnActive')}
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
