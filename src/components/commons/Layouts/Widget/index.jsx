import PropTypes from 'prop-types';
import React from 'react';
import './style.css';
export default function InfoTile(props) {
  const { iconInfo, titleInfo, numberInfo, dateInfo, backgroundInfo } = props;
  return (
    <>
      <div className="col col-md-3 widget-container">
        <div className="row widget-content " style={{ backgroundColor: backgroundInfo }}>
          <div className="col-md-5 widget-image">{iconInfo}</div>
          <div className="col-md-7 widget-body">
            <h4 className="title-info">{titleInfo}</h4>
            <h3 className="number-info">{numberInfo}</h3>
            <p className="date-info">{dateInfo}</p>
          </div>
        </div>
      </div>
    </>
  );
}

InfoTile.propTypes = {
  iconInfo: PropTypes.element.isRequired,
  titleInfo: PropTypes.string.isRequired,
  numberInfo: PropTypes.string.isRequired,
  dateInfo: PropTypes.string.isRequired,
  backgroundInfo: PropTypes.string.isRequired,
};
