import { Skeleton } from 'primereact/skeleton';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

const SkeletonProductList = ({quantity}) => {
  const n = quantity;
  return (
    <>
      <h1 className="d-flex justify-content-center mt-3">
        <Skeleton width="30%" height="4rem"></Skeleton>
      </h1>
      <div className="field mx-5 my-3">
        <Row>
          {[...Array(n)].map((_, index) => (
            <Col lg={3} key={index}>
              <Skeleton width="100%" height="25rem" className="m-lr-10"></Skeleton>
              <Skeleton width="100%" height="2rem" className="m-lr-10 mt-3"></Skeleton>
              <Skeleton width="8rem" height="2rem" className="m-lr-10 mt-3"></Skeleton>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default SkeletonProductList;
