import React, { useRef, useState } from 'react';
import { ListGroup as ListGroupBootstrap } from 'react-bootstrap';
import { MdSearch, MdShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { data_menu_top } from '../../../../asset/data/client/data_header_client';
import { data_header_client } from '../../../../asset/data/data_header_client';
import '../../../../asset/js/jquery-custom';
import { setIsOpenCartCompact } from '../../../../redux/reducer/home/home.reducer';
import { setSearch } from '../../../../redux/reducer/shop/shop.reducer';
import { cartSelector } from '../../../../redux/selectors';
import './style.css';

import { checkLoginClient } from '../../../../adapter/auth';
import LogoutClient from '../../Auth/Logout';

// const data_menu_top = ['Help & FAQs', 'My Account', 'EN', 'USD'];
const data_menu_top_in_login = [
  {
    id: 1,
    name: 'Help & FAQs',
    links: '#',
  },
  {
    id: 2,
    name: 'My Account',
    links: '/my-account',
  },
  {
    id: 3,
    name: 'Logout',
    links: '/my-account',
  },
  {
    id: 4,
    name: 'EN',
    links: '#',
  },
];
const data_menu_top_no_login = [
  {
    id: 1,
    name: 'Help & FAQs',
    links: '#',
  },
  {
    id: 2,
    name: 'Login',
    links: '/login',
  },
  {
    id: 2,
    name: 'Register',
    links: '/register',
  },
  {
    id: 3,
    name: 'EN',
    links: '#',
  },
];
const data_menu_list = data_header_client;

const Header = () => {
  const cart = useSelector(cartSelector);
  const dispatch = useDispatch();
  const [dataSearch, setDataSearch] = useState('');
  const navigate = useNavigate();
  const ref = useRef(null);

  const handleOpenCartCompact = () => {
    dispatch(setIsOpenCartCompact(true));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearch(dataSearch));
    navigate('/product');
    ref.current.value = '';
  };
  const isLoginClient = checkLoginClient();

  const [showLogout, setShowLogout] = useState(false);

  return (
    <>
      <header>
        <div className="container-menu-desktop">
          <div className="wrap-menu-desktop">
            <nav className="top-bar">
              <div className="content-topbar flex-sb-m h-full container">
                <div className="left-top-bar">Free shipping for standa rd order over $100</div>

                <div className="right-top-bar flex-w h-full main-menu">
                  <div className="right-top-bar flex-w h-full">
                    {isLoginClient ? (
                      <>
                        <Link to="#" className="flex-c-m trans-04 p-lr-25">
                          Help & FAQs
                        </Link>
                        <Link to="/my-account" className="flex-c-m trans-04 p-lr-25">
                          My Account
                        </Link>
                        <Link to="#" className="flex-c-m trans-04 p-lr-25" onClick={() => setShowLogout(true)}>
                          Logout
                        </Link>
                        <Link to="#" className="flex-c-m trans-04 p-lr-25">
                          EN
                        </Link>
                      </>
                    ) : (
                      data_menu_top_no_login.map((item, index) => (
                        <Link to={item.links} className="flex-c-m trans-04 p-lr-25" key={index}>
                          {item.name}
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </nav>
            <nav className="limiter-menu-desktop container-fluid">
              {/* <!-- Logo desktop --> */}
              <Link to="/" className="me-5">
                <h4 className="font-weight-black text-black">TRESOR</h4>
              </Link>

              {/* <!-- Menu desktop --> */}
              <div className="menu-desktop main-menu">
                {data_menu_list.map((element) => (
                  <NavLink
                    to={element.link}
                    key={element.id}
                    className={({ isActive }) =>
                      isActive ? 'main-menu-li active-link' : 'main-menu-li not-active-link'
                    }
                  >
                    <ListGroupBootstrap.Item as="li">
                      <span className="ms-3">{element.name}</span>
                    </ListGroupBootstrap.Item>
                  </NavLink>
                ))}
              </div>

              {/* <!-- Icon header --> */}
              <div className="wrap-icon-header flex-w flex-r-m">
                {/* start search */}
                <form
                  onSubmit={handleSubmit}
                  className="icon-header-item cl2 hov-cl1 trans-04 js-show-modal-search d-flex align-items-center search-header"
                >
                  <input
                    ref={ref}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Search..."
                    onChange={(e) => setDataSearch(e.target.value)}
                  ></input>
                  <button type="submit" className="icon-search">
                    <MdSearch />
                  </button>
                </form>
                {/* end search */}

                <div
                  className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart"
                  data-notify={cart.length > 0 ? cart.length : 0}
                  onClick={() => handleOpenCartCompact()}
                >
                  <MdShoppingCart />
                </div>

                <span className="dis-block  cl2  trans-04 p-l-22 p-r-11 icon-header-noti"></span>
              </div>
            </nav>
          </div>
        </div>
      </header>
      {<LogoutClient show={showLogout} setStateModal={() => setShowLogout(false)} />}
    </>
  );
};

export default Header;
