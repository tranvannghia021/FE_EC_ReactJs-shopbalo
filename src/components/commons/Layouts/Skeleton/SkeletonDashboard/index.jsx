import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';

import React from 'react';
import { Skeleton } from 'primereact/skeleton';
import './style.css';
import { Col, Row } from 'react-bootstrap';

export default function SkeletonDashboard(props) {
  return (
    <div className="">
      <div className="">
        <div className="">
          <br/><br/>
          <Row className='m-lg-3'>
            <Col lg={3} md={3} >
              <Skeleton width="12rem" height="8rem" className="d-flex mb-3 "></Skeleton>
            </Col>
            <Col lg={3} md={3} >
              <Skeleton width="12rem" height="8rem" className="d-flex mb-3 "></Skeleton>
            </Col>
            <Col lg={3} md={3} >
              <Skeleton width="12rem" height="8rem" className="d-flex mb-3 "></Skeleton>
            </Col>
            <Col lg={3} md={3} >
              <Skeleton width="12rem" height="8rem" className="d-flex mb-3 "></Skeleton>
            </Col>

          </Row>
          <Skeleton width="72rem" height="30rem" className="d-flex mb-3"></Skeleton>
          <Skeleton width="72rem" height="30rem" className="d-flex mb-3 "></Skeleton>
          <Row>
            <Col lg={6} md={6} >
              <Skeleton width="35rem" height="20rem" className="d-flex mb-3 "></Skeleton>
            </Col>
            <Col lg={6} md={6} >
              <Skeleton width="35rem" height="20rem" className="d-flex mb-3 "></Skeleton>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} >
              <Skeleton width="35rem" height="20rem" className="d-flex mb-3 "></Skeleton>
            </Col>
            <Col lg={6} md={6} >
              <Skeleton width="35rem" height="20rem" className="d-flex mb-3 "></Skeleton>
            </Col>
          </Row>
        </div>
      </div>
    </div>

  );
}

