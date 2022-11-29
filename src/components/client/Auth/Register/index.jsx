import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaRegUserCircle } from 'react-icons/fa';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaLogin } from '../../../../adapter/auth';
import { handleLogin, setCookies } from '../../../../api/Admin/Auth';

import Notiflix from 'notiflix';
import { useDispatch } from 'react-redux';
import { setIsForgotPassword, setIsLogin } from '../../../../redux/reducer/auth/auth.reducer';
import { BlockUI } from '../../../commons/Layouts/Notiflix';
import { ErrorToast, SuccessToast } from '../../../commons/Layouts/Alerts';
import './style.css';
import ImageLogin from '../../../../utils/imagelogin.png';
import Select from 'react-select';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { addSchema } from '../../../../adapter/customer';
import { handleRegisterClientAPI } from '../../../../api/Client/Auth/authAPI';
export default function FormRegister() {
  const backToPage = useNavigate();
  const [typePassword, setShowPassword] = useState('password');
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(addSchema),
  });

  const onSubmit = async (data) => {
    BlockUI('.section-root-register', 'fixed');
    const resultData = {
      first_name: data.first_name,
      last_name: data.last_name,
      gender: data.gender.label,
      phone: data.phone,
      email: data.email,
      point: '1',
      avatar: '',
      status: 1,
      password: data.password,
      address: data.address,
    };
    const result = await handleRegisterClientAPI(resultData);
    if (result === 403 || result.status === 422) {
      ErrorToast('Email or phone numbers have existed!. Please try again', 3500);
      Notiflix.Block.remove('.sl-box');
      Notiflix.Block.remove('.section-root-register');
      return;
    }
    if (result === 200) {
      SuccessToast('Register account successfully', 3000);
      // setCookies('token', result.data.token, 1);
      Notiflix.Block.remove('.sl-box');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
      return;
    }
  };
  const handleForgorPW = () => {
    dispatch(setIsForgotPassword(true));
  };
  const data_gender = [
    { value: 1, label: 'Male' },
    { value: 2, label: 'Female' },
  ];
  return (
    <>
      <div className="row section-root-register">
        <div className="col-md-5 d-flex sl-box-image ">
          <div className="sl-box-image-content">
            <img src={ImageLogin} alt="" className="sl-box-image-item" />
            <h3 className="title-login">WEBCOME TO MY PAGE</h3>
            <h3 className="text-center">TRESOR</h3>
          </div>
        </div>
        <div className="col-md-7 d-flex ">
          <div className="sl-box-content">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <h4 className="text-center mb-2 mt-2">Account Information</h4>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-2 form-user">
                    <Form.Label className="font-weight-bold">
                      FirstName&nbsp;<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control {...register('first_name')} type="text" />
                  </Form.Group>
                  <div className="d-flex justify-content-between">
                    <small className="text-red font-12px">{errors?.first_name?.message}</small>
                  </div>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-2 form-user">
                    <Form.Label className="font-weight-bold">
                      LastName&nbsp;<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control {...register('last_name')} type="text" />
                  </Form.Group>
                  <div className="d-flex justify-content-between">
                    <small className="text-red font-12px">{errors?.last_name?.message}</small>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-2 form-user">
                    <Form.Label className="font-weight-bold">
                      Phone&nbsp;<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control {...register('phone')} type="text" />
                  </Form.Group>
                  <div className="d-flex justify-content-between">
                    <small className="text-red font-12px">{errors?.phone?.message}</small>
                  </div>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-2">
                    <Form.Label className="label-input">
                      Gender &nbsp;<span className="text-danger">*</span>
                    </Form.Label>
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={data_gender}
                          theme={(theme) => ({
                            ...theme,
                            colors: {
                              ...theme.colors,
                              primary25: '#ffffff',
                              primary50: '##3ca9d5',
                              primary: '#3ca9d5',
                            },
                          })}
                        />
                      )}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-between">
                    <small className="text-red font-12px">{errors?.gender?.message}</small>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <Form.Group className="mb-2 form-user">
                    <Form.Label className="font-weight-bold">
                      Email&nbsp;<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control {...register('email')} type="text" />
                  </Form.Group>
                  <div className="d-flex justify-content-between">
                    <small className="text-red font-12px">{errors?.email?.message}</small>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
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
                  <div className="d-flex justify-content-between">
                    <small className="text-red font-12px">{errors?.password?.message}</small>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <Form.Group className="mb-2 form-user">
                    <Form.Label className="font-weight-bold">
                      Address&nbsp;<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control {...register('address')} type="text" />
                  </Form.Group>
                  <div className="d-flex justify-content-between">
                    <small className="text-red font-12px">{errors?.address?.message}</small>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end gap-2 mt-2">
                <Button
                  variant="secondary"
                  className="font-weight-bold btn-login-client "
                  onClick={() => (backToPage(-1) ? backToPage(-1) : (window.location.href = '/'))}
                >
                  Cancel
                </Button>
                <Button variant="primary" className="font-weight-bold btn-login-client " type="submit">
                  Register
                </Button>
              </div>
              <div className="text-center mt-3 ">
                <span>
                  Do you already have an account ?{' '}
                  <span className="text-primary cursor-pointer">
                    <Link to={'/login'}> Login</Link>
                  </span>
                </span>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
