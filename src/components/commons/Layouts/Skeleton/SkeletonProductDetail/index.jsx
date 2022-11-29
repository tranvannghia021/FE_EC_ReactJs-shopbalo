import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';

import React from 'react';
import { Skeleton } from 'primereact/skeleton';
import './index.css';
import { Col, Row } from 'react-bootstrap';

export const SkeletonProductDetail = () => {

  return (
      <div className="">
        <div className="grid formgrid">
          <div className="field col-12 md:col-6 md:pr-6 pr-0">
            <br/><br/>
            <Skeleton width="15rem" height="1rem" className="d-flex m-l-200"></Skeleton>
            <br/><br/><br/><br/>
            <Row className='p-lr-200'>
              <Col lg={7} className='p-lr-20'>
                <Row>
                  <Col lg={2} className='p-lr-2'>
                    <Skeleton width="95%" height="90px" className='mb-3' ></Skeleton>
                    <Skeleton width="95%" height="90px"  className='mb-3'></Skeleton>
                    <Skeleton width="95%" height="90px" className='mb-3' ></Skeleton>
                  </Col>
                  <Col lg={1}></Col>
                  <Col lg={9} className='p-lr-2'>
                    <Skeleton width="96%" height="550px"></Skeleton>
                  </Col>
                </Row>

              </Col>
              <Col lg={5} className='p-lr-20'>
                <Skeleton width="20rem" height="2.5rem" className="mb-3"></Skeleton>
                <Skeleton width="10rem" height="1.5rem" className="mb-3"></Skeleton>
                <Skeleton width="40rem" height="1.5rem" className="mb-3"></Skeleton>
                <Skeleton width="40rem" height="1.5rem" className="mb-3"></Skeleton>
                <Skeleton width="40rem" height="1.5rem" className="mb-5"></Skeleton>
                <Skeleton width="20rem" height="2rem" className="mb-3"></Skeleton>
                <Skeleton width="30rem" height="2.2rem" className="mb-3"></Skeleton>
                <Skeleton width="20rem" height="4rem" className="mb-2"></Skeleton>
              </Col>
            </Row>
            <br/><br/><br/><br/>
            <br/><br/>
            <Skeleton width="15rem" height="3rem" className="d-flex m-auto"></Skeleton>
            <Row className="d-flex m-t-50 p-all-60">

              <Col lg={4}><div className='w-100'></div></Col>
              <Col lg={6}>
                <div className="d-flex mb-3 mb-2">
                  <Skeleton shape="circle" size="6rem" className="mr-2"></Skeleton>
                  <div className="m-l-5 ">
                    <Skeleton width="15rem" className="mb-2"></Skeleton>
                    <Skeleton width="40rem" className="mb-2"></Skeleton>
                    <Skeleton width="30rem" height="6rem" className="mb-4"></Skeleton>
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <Skeleton shape="circle" size="6rem" className="mr-2"></Skeleton>
                  <div className="m-l-5 ">
                    <Skeleton width="15rem" className="mb-2"></Skeleton>
                    <Skeleton width="40rem" className="mb-2"></Skeleton>
                    <Skeleton width="30rem" height="6rem" className="mb-4"></Skeleton>
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <Skeleton shape="circle" size="6rem" className="mr-2"></Skeleton>
                  <div className="m-l-5 ">
                    <Skeleton width="15rem" className="mb-2"></Skeleton>
                    <Skeleton width="40rem" className="mb-2"></Skeleton>
                    <Skeleton width="30rem" height="6rem" className="mb-4"></Skeleton>
                  </div>
                </div>
              </Col>
              <Col lg={2}></Col>
            </Row>
          </div>
          <br/><br/>
          <Skeleton width="15rem" height="3rem" className="d-flex m-auto"></Skeleton>
          <br/><br/>
          <div className="field col-12 md:col-6 md:pr-6 pr-0 m-l-200">

            <Row>
              <Col lg={3}>
                <Skeleton width="25rem" height="28rem" className="m-lr-10"></Skeleton>
                <Skeleton width="25rem" height="2rem" className="m-lr-10 mt-3"></Skeleton>
                <Skeleton width="8rem" height="2rem" className="m-lr-10 mt-3"></Skeleton>
              </Col>
              <Col lg={3}>
                <Skeleton width="25rem" height="28rem" className="m-lr-10"></Skeleton>
                <Skeleton width="25rem" height="2rem" className="m-lr-10 mt-3"></Skeleton>
                <Skeleton width="8rem" height="2rem" className="m-lr-10 mt-3"></Skeleton>
              </Col>
              <Col lg={3}>
                <Skeleton width="25rem" height="28rem" className="m-lr-10"></Skeleton>
                <Skeleton width="25rem" height="2rem" className="m-lr-10 mt-3"></Skeleton>
                <Skeleton width="8rem" height="2rem" className="m-lr-10 mt-3"></Skeleton>
              </Col>

            </Row>
          </div>

        </div>


      </div>

  );
}
