// @flow
import * as React from 'react';
import Header from '../../components/commons/Layouts/Header';
import PropTypes from 'prop-types';
import ListGroup from '../../components/commons/Layouts/ListGroup';
import { menu_admin_item } from '../../asset/data/menu_admin_item';
import Drawer from '../../components/commons/Layouts/Drawer';
import { FaUsers } from 'react-icons/fa';
import './style.css';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import ExpiredToken from '../../components/commons/Auth/ExpiredToken';
import { exPiredTokenSelector, getUserSelector } from '../../redux/selectors';
import Logout from '../../components/commons/Auth/Logout';
import { useState } from 'react';
import { menu_admin_item_storage } from '../../asset/data/menu_admin_storage_item';
import Skeleton from '../../components/commons/Layouts/Skeleton';

export function AdminLayout(props) {
  const { slot } = props;
  const menu_admin_item_data = [...menu_admin_item];
  const menu_admin_item_storage_data = [...menu_admin_item_storage];
  const expiredToken = useSelector(exPiredTokenSelector);
  const [showLogout, setStateModalLogout] = useState(false);
  const user = useSelector(getUserSelector);
  return (
    <>
      <Header />
      <Drawer
        slot={
          <>
            {/* <img src={Logo} alt="Logo" width="80" height="80" /> */}

            <h5 className="font-weight-black text-center text-white mt-4">
              {user === undefined ? (
                <Skeleton colomn="1" />
              ) : (
                <>
                  <FaUsers /> Admin: {user != undefined && user.first_name + ' ' + user.last_name}
                </>
              )}
            </h5>
            <div className="py-5">
              {/* {user?.role_id === 1 && <ListGroup data={menu_admin_item_data} />} */}
              {/* {user?.role_id === 2 && <ListGroup data={menu_admin_item_storage_data} />} */}
              {<ListGroup data={menu_admin_item_data} />}
            </div>
            <div className="d-flex justify-content-center ">
              <Button className="btn-danger" onClick={() => setStateModalLogout(true)}>
                Logout
              </Button>
            </div>
          </>
        }
      />
      <main id="main" className="main p-5">
        {slot}
      </main>
      {expiredToken && <ExpiredToken show={expiredToken} setStateModal={() => true} />}
      <Logout show={showLogout} setStateModal={() => setStateModalLogout(false)} />
    </>
  );
}
AdminLayout.propTypes = {
  slot: PropTypes.element.isRequired,
};
