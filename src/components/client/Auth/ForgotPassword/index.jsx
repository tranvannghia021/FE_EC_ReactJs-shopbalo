import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { schemaForgotPW } from '../../../../adapter/auth';

import Notiflix from 'notiflix';
import { useDispatch } from 'react-redux';
import { senMailOTPClient } from '../../../../api/Client/Auth/authAPI';
import {
  setEmailForgot,
  setEmailForgotClient,
  setIsForgotPassword,
  setIsForgotPasswordClient,
  setIsForgotPasswordVerification,
  setIsForgotPasswordVerificationClient,
} from '../../../../redux/reducer/auth/auth.reducer';
import { ErrorToast, SuccessToast } from '../../../commons/Layouts/Alerts';
import { BlockUI, BlockUICLIENT } from '../../../commons/Layouts/Notiflix';
import ImageLogin from '../../../../utils/imagelogin.png';
export default function FormForgotPWClient() {
  const [typePassword, setShowPassword] = useState('password');
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schemaForgotPW),
  });

  const onSubmit = async (data) => {
    BlockUICLIENT('.section-root-login');
    const result = await senMailOTPClient(data);
    if (result === 400 || result === 404) {
      ErrorToast('Email not found. Please check again ', 3500);
      Notiflix.Block.remove('.section-root-login');
      return;
    }
    if (result === 200) {
      SuccessToast('Verification code send to your email', 5000);
      dispatch(setIsForgotPasswordVerificationClient(true));
      dispatch(setEmailForgotClient(data.email));
      Notiflix.Block.remove('.section-root-login');
      return;
    }
  };
  const handleBack = () => {
    dispatch(setIsForgotPasswordClient(false));
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
            <h3 className="text-center mb-5 font-weight-bold">Please enter your email</h3>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3 form-user">
                <Form.Label className="font-weight-bold">
                  Email&nbsp;<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control {...register('email')} type="text" />
              </Form.Group>
              <div className="d-flex gap-2 justify-content-end ">
                <Button variant="secondary" className="font-weight-bold" onClick={handleBack}>
                  Back
                </Button>
                <Button variant="primary" disabled={!isValid} className="font-weight-bold" type="submit">
                  Next
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
