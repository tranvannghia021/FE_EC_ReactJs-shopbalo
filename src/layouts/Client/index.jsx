// @flow
import PropTypes from 'prop-types';
import * as React from 'react';
import { useSelector } from 'react-redux';
import './style.css';

import { useEffect, useState } from 'react';
import { cartSelector, exPiredTokenSelector, getUserSelector } from '../../redux/selectors';
import Footer from '../../components/client/Home/Footer';
import { AiOutlineArrowUp } from 'react-icons/ai';
import Header from '../../components/client/Home/Header';
import CartCompact from '../../components/client/Home/CartCompact';

export function ClientLayout(props) {
  const { slot } = props;
  const expiredToken = useSelector(exPiredTokenSelector);
  const [showLogout, setStateModalLogout] = useState(false);
  const user = useSelector(getUserSelector);
  const cart=useSelector(cartSelector)
  useEffect(()=>{
    cart.length !==0 && localStorage.setItem('cart',JSON.stringify({ cart:{cartData:cart}}))
  },[cart])
  return (
    <>
      <Header />
      <CartCompact />
      <main id="main-client" className="main">
        {slot}
      </main>
      {/* {expiredToken && <ExpiredToken show={expiredToken} setStateModal={() => true} />} */}
      {/* <Logout show={showLogout} setStateModal={() => setStateModalLogout(false)} /> */}

      <Footer />

      {/* <!-- Back to top --> */}
      <div className="btn-back-to-top" id="myBtn">
        <span className="symbol-btn-back-to-top">
          <AiOutlineArrowUp />
        </span>
      </div>
    </>
  );
}
ClientLayout.propTypes = {
  slot: PropTypes.element.isRequired,
};
