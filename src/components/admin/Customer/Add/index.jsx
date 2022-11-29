import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import { addSchema } from '../../../../adapter/customer';
import { useDispatch } from 'react-redux';
import { BlockUI } from '../../../commons/Layouts/Notiflix';
import Notiflix from 'notiflix';
import { ErrorToast, SuccessToast } from '../../../commons/Layouts/Alerts';
import { setIsAdd } from '../../../../redux/reducer/customer/customer.reducer';
import './style.css';
import { addCustomer } from '../../../../api/Admin/Customer/customerAPI';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { setExpiredToken } from '../../../../redux/reducer/auth/auth.reducer';
import { deleteCookie, getCookies } from '../../../../api/Admin/Auth';

const CustomerAdd = (props) => {
  const data_gender = [
    { value: 1, label: 'male' },
    { value: 2, label: 'female' },
  ];
  const [showPassword, setShowPassword] = useState('password');
  const [imageAvatarCustomerShow, setImageAvatarCustomerShow] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(addSchema),
  });
  const dispatch = useDispatch();

  const backtoManageCustomer = () => {
    dispatch(setIsAdd(false));
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const onSubmit = async (data) => {
    BlockUI('#root', 'fixed');

    const image = !!data.avatar[0]?[await toBase64(data.avatar[0])]:`avatarGR-${data.last_name.slice(0,1)}`
    const resultData = {
      first_name: data.first_name,
      last_name: data.last_name,
      gender: data.gender.label,
      phone: data.phone,
      email: data.email,
      password: data.password,
      point: 0,
      avatar: image,
      status: 1,
      address: data.address,
    };
    const result = await addCustomer(resultData);
    Notiflix.Block.remove('#root');
    if (result === 200) {
      SuccessToast('Create customer successfully', 3000);
      props.backToCustomerList([
        {
          key: 'created_at',
          value: 'desc',
        },
      ]);
      backtoManageCustomer();
    } else if (result === 404) {
      ErrorToast('Create customer unsuccessfully', 3000);
      Notiflix.Block.remove('#root');
    } else if (result === 401) {
      handleSetUnthorization();
      Notiflix.Block.remove('#root');
    } else if (result === 402) ErrorToast('Email or phone numbers have existed!', 3000);
    else {
      Notiflix.Block.remove('#root');
      ErrorToast('Something went wrong. Please try again', 4000);
    }
  };
  const uploadImage = (e) => {
    let image = e.target.files[0];
    if (e.target.files.length > 0) {
      setImageAvatarCustomerShow(URL.createObjectURL(image));
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
    <div className=" edit_form d-flex justify-content-center">
      <Form className="font_add_edit_prduct" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="label-input">First Name</Form.Label>
              <Controller
                control={control}
                name="fisrt_name"
                defaultValue=""
                {...register('first_name', { required: true })}
                ref={null}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    isInvalid={errors.fisrt_name}
                    placeholder="Enter fisrt_name"
                  />
                )}
              />
              <div className="d-flex justify-content-between">
                <small className="text-red font-weight-semi">{errors?.first_name?.message}</small>
              </div>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="label-input">Last Name</Form.Label>
              <Controller
                control={control}
                name="last_name"
                defaultValue=""
                {...register('last_name', { required: true })}
                ref={null}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    isInvalid={errors.last_name}
                    placeholder="Enter last_name"
                  />
                )}
              />
              <div className="d-flex justify-content-between">
                <small className="text-red font-weight-semi">{errors?.last_name?.message}</small>
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="label-input">Phone</Form.Label>
              <Controller
                control={control}
                name="phone"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    isInvalid={errors.phone}
                    placeholder="Enter phone"
                    {...register('phone', { required: true, pattern: /^0[3|7|8|9|5]\d{7,8}$/ })}
                  />
                )}
              />
              <div className="d-flex justify-content-between">
                <small className="text-red font-weight-semi">{errors?.phone?.message}</small>
              </div>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="label-input">Email</Form.Label>
              <Controller
                control={control}
                name="email"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    isInvalid={errors.email}
                    placeholder="Enter email"
                    {...register('email', {
                      required: true,
                      pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    })}
                  />
                )}
              />
              <div className="d-flex justify-content-between">
                <small className="text-red font-weight-semi">{errors?.email?.message}</small>
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3 form-password">
              <Form.Label className="label-input">Password</Form.Label>
              <Controller
                control={control}
                name="password"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <div className="fp-input">
                    <Form.Control
                      onChange={onChange}
                      value={value}
                      ref={ref}
                      type={showPassword}
                      isInvalid={errors.password}
                      placeholder="Enter password"
                      className="input-password"
                      {...register('password', {
                        required: true,
                        minLength: 8,
                      })}
                    />
                    {showPassword === 'text' ? (
                      <FaEye onClick={() => setShowPassword('password')} />
                    ) : (
                      <FaEyeSlash onClick={() => setShowPassword('text')} />
                    )}
                  </div>
                )}
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <AiFillEyeInvisible className="show-pass-icon" />
                ) : (
                  <AiFillEye className="show-pass-icon" />
                )}
              </span>

              <div className="d-flex justify-content-between">
                <small className="text-red font-weight-semi">{errors?.password?.message}</small>
              </div>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="label-input">Gender</Form.Label>
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
                        primary25: '#f9d2e4',
                        primary50: '#f9d2e4',
                        primary: '#d6001c',
                      },
                    })}
                  />
                )}
              />
              <div className="d-flex justify-content-between">
                <small className="text-red font-weight-semi">{errors?.gender?.message}</small>
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="label-input">Address</Form.Label>
              <Controller
                control={control}
                name="address"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    type="address"
                    isInvalid={errors.address}
                    placeholder="Enter address"
                    {...register('address', { required: true })}
                  />
                )}
              />
              <div className="d-flex justify-content-between">
                <small className="text-red font-weight-semi">{errors?.address?.message}</small>
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label className="label-input">Avatar</Form.Label>
          <Form.Control id="avatar" type="file" {...register('avatar')} onChange={(e) => uploadImage(e)} />
          {imageAvatarCustomerShow && (
            <div className="d-flex container-avatar">
              <img className="img-responsive image-avatar" src={imageAvatarCustomerShow} alt={'avatar'} />
            </div>
          )}
        </Form.Group>

        <div className="d-flex justify-content-end p-2 mt-3">
          <Button
            id="product-save-btn"
            variant="danger"
            type="submit"
            className="font-weight-bold me-3"
            disabled={!isValid}
          >
            Save
          </Button>
          <Button
            id="product-save-cancel"
            onClick={() => backtoManageCustomer()}
            variant="outline-secondary"
            className="font-weight-bold"
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

CustomerAdd.propTypes = {
  backToCustomerList: PropTypes.func.isRequired,
};

export default CustomerAdd;
