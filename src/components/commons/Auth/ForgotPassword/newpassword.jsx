import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaForgotNewPW, schemaForgotPW, schemaLogin } from '../../../../adapter/auth';
import { forgotPassword, handleLogin, senMailOTP, setCookies } from '../../../../api/Admin/Auth';
import { BlockUI } from '../../Layouts/Notiflix';
import { ErrorToast, SuccessToast } from '../../Layouts/Alerts';
import Notiflix from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsForgotPassword,
  setIsForgotPasswordVerification,
  setIsLogin,
} from '../../../../redux/reducer/auth/auth.reducer';
import { emailForgotSelector } from '../../../../redux/selectors';

export default function FormNewPassword() {
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
  const emailFG = useSelector(emailForgotSelector);
  const onSubmit = async (data) => {
    // BlockUI('.sl-box');
    const resultData = {
      password: data.password,
      otp: data.otp,
      email: emailFG,
    };
    const result = await forgotPassword(resultData);
    if (result === 403) {
      ErrorToast('OTP is not correct . Please try again', 3500);
      Notiflix.Block.remove('.sl-box');
      return;
    }
    if (result === 200) {
      SuccessToast('Forgot Password Successfully', 2000);
      dispatch(setIsForgotPasswordVerification(false));
      dispatch(setIsForgotPassword(false));
      return;
    }
  };
  const handleBack = () => {
    dispatch(setIsForgotPasswordVerification(false));
  };
  return (
    <>
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
          <Button variant="danger" className="font-weight-bold" onClick={handleBack}>
            Back
          </Button>
          <Button variant="danger" disabled={!isValid} className="font-weight-bold" type="submit">
            Next
          </Button>
        </div>
      </Form>
    </>
  );
}
