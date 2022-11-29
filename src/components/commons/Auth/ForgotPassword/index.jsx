import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaForgotPW, schemaLogin } from '../../../../adapter/auth';
import { handleLogin, senMailOTP, setCookies } from '../../../../api/Admin/Auth';
import { BlockUI } from '../../Layouts/Notiflix';
import { ErrorToast, SuccessToast } from '../../Layouts/Alerts';
import Notiflix from 'notiflix';
import { useDispatch } from 'react-redux';
import {
  setEmailForgot,
  setIsForgotPassword,
  setIsForgotPasswordVerification,
  setIsLogin,
} from '../../../../redux/reducer/auth/auth.reducer';

export default function FormForgotPW() {
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
    BlockUI('.sl-box');
    const result = await senMailOTP(data);
    if (result === 400 || result === 404) {
      ErrorToast('Email not found. Please check again ', 3500);
      Notiflix.Block.remove('.sl-box');
      return;
    }
    if (result === 200) {
      SuccessToast('Verification code send to your email', 5000);
      dispatch(setIsForgotPasswordVerification(true));
      dispatch(setEmailForgot(data.email));
      Notiflix.Block.remove('.sl-box');
      return;
    }
  };
  const handleBack = () => {
    dispatch(setIsForgotPassword(false));
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3 form-user">
          <Form.Label className="font-weight-bold">
            Email&nbsp;<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control {...register('email')} type="text" />
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
