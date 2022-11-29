import React, { memo } from 'react';
import "./index.css"
import { Col, Row } from 'react-bootstrap';
import { FaArchive, FaCoins, FaPeopleArrows, FaShoppingCart } from 'react-icons/fa';
import { formatter } from '../../../../utils/formatCurrency';
function SummaryStatisTic(props) {
  console.log('render SummaryStatisTic')
  return (
    <Row className="summary-container">
      <Col  className=" small-box st-orders">
          <div className="inner">
            <h3 className='title-main'>{!!props.order?props.order:0}</h3>

            <p className='title' >New Orders</p>
          </div>
          <div className="icon">
            <FaShoppingCart className='icon-cart '/>
          </div>
      </Col>
      <Col   className=" small-box st-revenue">
        <div className="inner">
          <h3 className='title-main'>{!!props.revenue? formatter.format(props.revenue):formatter.format(0)}</h3>

          <p className='title'>Revenue Today</p>
        </div>
        <div className="icon">
          <FaCoins className='icon-revenue' />
        </div>
      </Col>
      <Col  className=" small-box  st-customers">
        <div className="inner">
          <h3 className='title-main'>{!!props.customer?props.customer:0}</h3>

          <p className='title'>New Customers</p>
        </div>
        <div className="icon">
          <FaPeopleArrows className='icon-customer m-l-2' />
        </div>
      </Col>
      <Col  className=" small-box  st-customers">
        <div className="inner">
          <h3 className='title-main'>2</h3>

          <p className='title'>New Products</p>
        </div>
        <div className="icon">
          <FaArchive className='icon-product m-l-2'/>
        </div>
      </Col>


    </Row>

  );
}

export default memo(SummaryStatisTic);