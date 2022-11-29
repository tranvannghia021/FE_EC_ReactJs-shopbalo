import React, { useState } from 'react';
import { Button, Form, NavLink } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaRegUserCircle } from 'react-icons/fa';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaLogin } from '../../../../adapter/auth';

import Notiflix from 'notiflix';
import { useDispatch } from 'react-redux';
import {
  setIsForgotPassword,
  setIsForgotPasswordClient,
  setIsLogin,
  setIsLoginClient,
} from '../../../../redux/reducer/auth/auth.reducer';
import { BlockUI, BlockUICLIENT } from '../../../commons/Layouts/Notiflix';
import { ErrorToast, SuccessToast } from '../../../commons/Layouts/Alerts';
import './style.css';
import ImageLogin from '../../../../utils/imagelogin.png';
import { Link, useNavigate } from 'react-router-dom';
import { handleLoginClientAPI, setCookiesClient } from '../../../../api/Client/Auth/authAPI';

export default function FormLogin() {
  const historyLocation = useNavigate();
  const [typePassword, setShowPassword] = useState('password');
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schemaLogin),
  });

  const onSubmit = async (data) => {
    // handleLogin(data);
    BlockUICLIENT('.section-root-login');
    const result = await handleLoginClientAPI(data);
    if (result === 403 || result === 422) {
      ErrorToast('Email or password is incorrect. Please try again', 3500);
      Notiflix.Block.remove('.section-root-login');
      return;
    }
    if (result.status === 401 || result === 401) {
      ErrorToast('Your account has been locked.', 3500);
      Notiflix.Block.remove('.section-root-login');
      return;
    }
    if (result.status === 200) {
      SuccessToast('Logged in successfully', 2000);
      setCookiesClient('tokenClient', result.data, 1);
      dispatch(setIsLoginClient(true));
      // Notiflix.Block.remove('.sl-box');
      setTimeout(() => {
        // window.location.href = '/';
        historyLocation(-1);
      }, 1000);
      return;
    }
  };
  const handleForgorPW = () => {
    dispatch(setIsForgotPasswordClient(true));
  };
  return (
    <>
      <div className="row section-root-login">
        <div className="col-md-6 d-flex sl-box-image ">
          <div className="sl-box-image-content">
            <img src={ImageLogin} alt="" className="sl-box-image-item" />
            <h3 className="title-login">WEBCOME TO MY PAGE</h3>
            <h3 className="text-center">TRESOR</h3>
          </div>
        </div>
        <div className="col-md-6 d-flex ">
          <div className="sl-box-content">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3 form-user">
                <Form.Label className="font-weight-bold">
                  Email&nbsp;<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control {...register('email')} type="text" />
              </Form.Group>

              <Form.Group className="mb-2 form-password">
                <Form.Label className="font-weight-bold">
                  Password&nbsp;<span className="text-danger">*</span>
                </Form.Label>
                <div className="fp-input">
                  <Form.Control {...register('password')} type={typePassword} />
                  {typePassword === 'text' ? (
                    <FaEye onClick={() => setShowPassword('password')} />
                  ) : (
                    <FaEyeSlash onClick={() => setShowPassword('text')} />
                  )}
                </div>
              </Form.Group>
              <Form.Group className="mb-3 text-end ">
                <span className="text-primary  text-end cursor-pointer " onClick={handleForgorPW}>
                  Fogot password ?
                </span>
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button
                  onClick={() => (historyLocation(-1) ? historyLocation(-1) : (window.location.href = '/'))}
                  className=" btn font-weight-bold btn-login-client margin-right-10px btn-secondary "
                >
                  Cancel
                </Button>
                <Button className="font-weight-bold btn-login-client" type="submit" disabled={!isValid}>
                  Login
                </Button>
              </div>
            </Form>
            <div className="text-center mt-5">
              <span>
                You don't have an account ?
                <span className="text-primary cursor-pointer  ">
                  <Link to={'/register'}> Register</Link>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
