import React from 'react';
import Pagination from 'react-js-pagination';
import PropTypes from 'prop-types';

import './style.css';

export default function PaginationUI(props) {
  const handlePageChange = (page) => {
    props.handlePageChange(page);
  };

  return (
    <Pagination
      activePage={props.currentPage}
      itemsCountPerPage={props.perPage}
      totalItemsCount={props.totalRecord}
      pageRangeDisplayed={3}
      prevPageText="Previous"
      nextPageText="Next"
      itemClass="page-item"
      linkClass="page-link"
      onChange={handlePageChange}
      className="pagination-client"
    />
  );
}

PaginationUI.propTypes = {
  handlePageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  totalRecord: PropTypes.number,
  perPage: PropTypes.number,
};
