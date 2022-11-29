import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import { addSchema } from '../../../adapter/staff';
import { useDispatch } from 'react-redux';
import { setIsAdd } from '../../../redux/reducer/staff/staff.reducer';
import { BlockUI } from '../../../components/commons/Layouts/Notiflix';
import { formatDate } from '../../../utils/formatDate';
import { addStaff } from '../../../api/Admin/Staff/staffAPI';
import Notiflix from 'notiflix';
import { ErrorToast, SuccessToast } from '../../../components/commons/Layouts/Alerts';
import { setExpiredToken } from '../../../redux/reducer/auth/auth.reducer';
import { deleteCookie, getCookies } from '../../../api/Admin/Auth';

function AddImport(props) {
  const data_provider = [
    { value: 1, label: 'DVRK' },
    { value: 2, label: 'SUNG NAMBLK' },
    { value: 3, label: 'Dệt May Vĩnh Hưng' },
  ];
  const data_product = [
    { value: 1, label: 'DVRK' },
    { value: 2, label: 'SUNG NAMBLK' },
    { value: 3, label: 'Dệt May Vĩnh Hưng' },
  ];
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

  const backtoManageStaff = () => {
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
    if (data.created_date) data.created_date = formatDate(data.created_date, 'YYYY-MM-DD');
    const image = await toBase64(data.avatar[0]);
    const resultData = {
      first_name: data.first_name,
      last_name: data.last_name,
      role_id: data.role_id.value,
      gender: data.gender.label,
      phone: data.phone,
      email: data.email,
      password: data.password,
      avatar: [image],
      status: 1,
      address: data.address,
      created_date: data.created_date,
    };
    const result = await addStaff(resultData);
    Notiflix.Block.remove('#root');
    if (result === 200) {
      SuccessToast('Create staff successfully', 3000);
      props.backToStaffList([
        {
          key: 'created_at',
          value: 'desc',
        },
      ]);
      backtoManageStaff();
    } else if (result === 404) {
      ErrorToast('Create staff unsuccessfully', 3000);
      Notiflix.Block.remove('#root');
    } else if (result === 401) {
      Notiflix.Block.remove('#root');
      handleSetUnthorization();
    } else if (result === 402) ErrorToast('Email or phone numbers have existed!', 3000);
    else {
      Notiflix.Block.remove('#root');
      ErrorToast('Something went wrong. Please try again', 4000);
    }
  };
  const uploadImage = (e) => {
    let image = e.target.files[0];
    if (e.target.files.length > 0) {
      ///   setImageAvatarStaffShow(URL.createObjectURL(image));
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
    <div>
      <div className=" edit_form d-flex justify-content-center">
        <Form className="font_add_edit_prduct" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <h5 className="text-danger font-weight-bold mb-3">Add Import</h5>
          <Row>
            <Col lg={12} md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="label-input">Product</Form.Label>
                <Controller
                  name="product_id"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={data_product}
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
                  <small className="text-red font-weight-semi">{errors?.product_id?.message}</small>
                </div>
              </Form.Group>
            </Col>
            <Col lg={12} md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="label-input">Provider</Form.Label>
                <Controller
                  name="provider_id"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={data_provider}
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
                  <small className="text-red font-weight-semi">{errors?.provider_id?.message}</small>
                </div>
              </Form.Group>
            </Col>

          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="label-input">Amount</Form.Label>
                <Controller
                  control={control}
                  name="amount"
                  defaultValue=""
                  {...register('first_name', { required: true })}
                  ref={null}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Form.Control
                      onChange={onChange}
                      value={value}
                      ref={ref}
                      isInvalid={errors.amount}
                      placeholder="Enter amount"
                    />
                  )}
                />
                <div className="d-flex justify-content-between">
                  <small className="text-red font-weight-semi">{errors?.amount?.message}</small>
                </div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="label-input">Price</Form.Label>
                <Controller
                  control={control}
                  name="price"
                  defaultValue=""
                  {...register('price', { required: true })}
                  ref={null}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Form.Control
                      onChange={onChange}
                      value={value}
                      ref={ref}
                      isInvalid={errors.price}
                      placeholder="Enter price"
                    />
                  )}
                />
                <div className="d-flex justify-content-between">
                  <small className="text-red font-weight-semi">{errors?.price?.message}</small>
                </div>
              </Form.Group>
            </Col>
          </Row>

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
              onClick={() => backtoManageStaff()}
              variant="outline-secondary"
              className="font-weight-bold"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AddImport;