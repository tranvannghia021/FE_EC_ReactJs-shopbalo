import React from 'react';
import { Table as TableBootstrap } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './style.css';

export default function TableLayout(props) {
  const { tableHeader, tableBody } = props;
  return (
    <TableBootstrap id="table" responsive>
      <thead>
        <tr>
          {tableHeader.map((element) => (
            <th key={element.id} className={`${element.cursor ? 'cursor-pointer' : ''}`}>
              <div className="d-flex align-items-center">
                <p className="me-2">{element.name}</p>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{tableBody}</tbody>
    </TableBootstrap>
  );
}

TableLayout.propTypes = {
  tableHeader: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      isSortAsc: PropTypes.bool,
      isSortDesc: PropTypes.bool,
    })
  ),
  tableBody: PropTypes.any,
  handleSort: PropTypes.func,
  tableSort: PropTypes.func,
};
