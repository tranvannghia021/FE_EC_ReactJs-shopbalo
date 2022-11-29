import React from 'react';
import { Placeholder, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './style.css';

export default function Skeleton(props) {
  const { column, lengthItem=14 } = props;

  return (
    <Table id="skeleton" responsive>
      <thead>
        <tr>
          {Array.from({ length: column }).map((_, index) => (
            <th key={index}>
              <Placeholder.Button xs={12} size="lg" aria-hidden="true" animation="wave" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: lengthItem }).map((_, index) => (
          <tr key={index}>
            {Array.from({ length: column }).map((_, index) => (
              <td key={index}>
                <Placeholder.Button xs={12} size="lg" aria-hidden="true" animation="wave" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

Skeleton.propTypes = {
  column: PropTypes.number.isRequired,
};
