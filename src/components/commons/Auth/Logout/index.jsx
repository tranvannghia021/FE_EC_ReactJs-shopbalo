import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../Layouts/Modal';
import { deleteCookie, getCookies, logout } from '../../../../api/Admin/Auth';
import { setExpiredToken, setIsLogin, setUser } from '../../../../redux/reducer/auth/auth.reducer';

export default function Logout(props) {
  const [backdrop, setBackdrop] = React.useState('static');

  const dispatch = useDispatch();

  const handleLogout = async () => {
    setBackdrop('static');
    const response = await logout();
    if (response === 500) {
      setBackdrop('static');
    }
    if (response === 401) {
      props.setStateModal();
      handleSetUnthorization();
    }
    if (response === 200) {
      const token = getCookies('token');
      dispatch(setIsLogin(false));
      dispatch(setUser({}));
      if (token) {
        deleteCookie('token');
      }
    }
  };
  const handleSetUnthorization = () => {
    dispatch(setExpiredToken(true));
    const token = getCookies('token');
    // dispatch(setIsLogin(false));
    dispatch(setExpiredToken(true));
    if (token) {
      deleteCookie('token');
    }
  };
  return (
    <Modal
      show={props.show}
      backdrop={backdrop}
      setStateModal={() => props.setStateModal()}
      elementModalTitle={<p>Are you sure?</p>}
      elementModalBody={
        <div className="p-3">
          <h6 className="mb-3">Do you want to logout?</h6>
          <div className="d-flex align-items-center justify-content-end">
            <Button type="submit" variant="danger" className="me-3 font-weight-bold" onClick={() => handleLogout()}>
              Logout
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="font-weight-bold"
              onClick={() => props.setStateModal()}
            >
              Cancel
            </Button>
          </div>
        </div>
      }
    />
  );
}

Logout.propTypes = {
  show: PropTypes.bool.isRequired,
  setStateModal: PropTypes.func.isRequired,
};
