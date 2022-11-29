import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { schemaForgotNewPW } from '../../../../adapter/auth';
import { forgotPassword } from '../../../../api/Admin/Auth';

import Notiflix from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsForgotPasswordClient,
  setIsForgotPasswordVerificationClient,
} from '../../../../redux/reducer/auth/auth.reducer';
import { emailForgotSelector, emailForgotSelectorClient } from '../../../../redux/selectors';
import ImageLogin from '../../../../utils/imagelogin.png';
import { ErrorToast, SuccessToast } from '../../../commons/Layouts/Alerts';
import { BlockUI, BlockUICLIENT } from '../../../commons/Layouts/Notiflix';
import { forgotPasswordClient } from '../../../../api/Client/Auth/authAPI';
export default function FormNewPasswordClient() {
  const [typePassword, setShowPassword] = useState('password');
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schemaForgotNewPW),
  });
  const emailFGClient = useSelector(emailForgotSelectorClient);
  const onSubmit = async (data) => {
    BlockUICLIENT('.section-root-login');
    const resultData = {
      password: data.password,
      otp: data.otp,
      email: emailFGClient,
    };
    const result = await forgotPasswordClient(resultData);
    if (result === 403) {
      ErrorToast('OTP is not correct . Please try again', 3500);
      Notiflix.Block.remove('.section-root-login');
      return;
    }
    if (result === 200) {
      SuccessToast('Forgot Password Successfully', 2000);
      dispatch(setIsForgotPasswordVerificationClient(false));
      dispatch(setIsForgotPasswordClient(false));
      Notiflix.Block.remove('.section-root-login');
      return;
    }
  };
  const handleBack = () => {
    dispatch(setIsForgotPasswordVerificationClient(false));
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
            <h3 className="text-center mb-5 font-weight-bold">Create new password</h3>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3 form-user">
                <Form.Label className="font-weight-bold">
                  OTP&nbsp;<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control {...register('otp')} type="number" />
              </Form.Group>

              <Form.Group className="mb-2 form-password">
                <Form.Label className="font-weight-bold">
                  New Password&nbsp;<span className="text-danger">*</span>
                </Form.Label>
                {/* <Form.Control {...register('password')} type="password" /> */}
                <div className="fp-input">
                  <Form.Control {...register('password')} type={typePassword} />
                  {typePassword === 'text' ? (
                    <FaEye onClick={() => setShowPassword('password')} />
                  ) : (
                    <FaEyeSlash onClick={() => setShowPassword('text')} />
                  )}
                </div>
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
