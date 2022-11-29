import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import { editSchema } from '../../../../adapter/staff';
import { useDispatch, useSelector } from 'react-redux';
import { BlockUI } from '../../../commons/Layouts/Notiflix';
import Notiflix from 'notiflix';
import { ErrorToast, SuccessToast } from '../../../commons/Layouts/Alerts';
import { setIsEdit } from '../../../../redux/reducer/staff/staff.reducer';
import { staffByIdSelector } from '../../../../redux/selectors';
import { editStaff } from '../../../../api/Admin/Staff/staffAPI';
import { URL_SERVER } from '../../../../utils/urlPath';
import './style.css';
import { formatDate } from '../../../../utils/formatDate';
import { setExpiredToken } from '../../../../redux/reducer/auth/auth.reducer';
import { deleteCookie, getCookies } from '../../../../api/Admin/Auth';
import ImageCustom from '../../../commons/Layouts/Image';
import { getAllRoles } from '../../../../api/Admin/role/roleAPI';

const StaffEdit = (props) => {
  const staffSelector = useSelector(staffByIdSelector);
  const dataStaff = staffSelector.data;
  const [imageAvatarStaffShow, setImageAvatarStaffShow] = useState(false);
  const [status, setStatus] = useState(dataStaff.status);
  const [listRole, setListRole] = useState([])
  const data_roles = [
    { value: 1, label: 'Admin' },
    { value: 2, label: 'Admin_Warehouse' },
  ];
  const data_gender = [
    { value: 1, label: 'male' },
    { value: 2, label: 'female' },
  ];
  const data_status = [
    { value: 1, label: 'Active' },
    { value: 0, label: 'Disable' },
  ];
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(editSchema),
    defaultValues: {
      first_name: dataStaff.first_name,
      last_name: dataStaff.last_name,
      role_id: { value: dataStaff.role_id, label: dataStaff.role_name },
      gender: { value: 1, label: dataStaff.gender },
      phone: dataStaff.phone,
      password: dataStaff.password,
      email: dataStaff.email,
      avatar: dataStaff.avatar,
      address: dataStaff.address,
      created_date: dataStaff.created_date,
      status: dataStaff.status,
    },
  });

  const dispatch = useDispatch();
  useEffect(() => {
    let filterStatus='Active'
    const getListRoles = async ()=> {
      const result = await getAllRoles({filterStatus});
      setListRole(result.data.map((item)=>
        ( { value: item.id, label: item.name })));
    }
    getListRoles()
  },[])
  const backtoManageStaff = () => {
    dispatch(setIsEdit(false));
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const onSubmit = async (data) => {
    // console.log(data)
    BlockUI('#root', 'fixed');
    const temDirtyFields = { ...dirtyFields };
    Object.keys(temDirtyFields).map((key) => {
      if (key === 'gender') temDirtyFields[key] = data[key].label;
      else if (key === 'role_id') temDirtyFields[key] = data[key].value;
      else temDirtyFields[key] = data[key];
    });
    //console.log('dataBefore:', temDirtyFields);
    if (temDirtyFields.avatar !== undefined) {
      const image = await toBase64(temDirtyFields.avatar);
      temDirtyFields.avatar = [image];
    }
    if (temDirtyFields.created_date !== undefined)
      temDirtyFields.created_date = formatDate(temDirtyFields.created_date, 'YYYY-MM-DD');
    //console.log('dataAfter:', temDirtyFields);

    const result = await editStaff(dataStaff.id, temDirtyFields);
    // console.log('Result:',result);
    Notiflix.Block.remove('#root');
    if (result === 200) {
      SuccessToast('Update staff successfully', 3000);
      props.backToStaffList([
        {
          key: 'updated_at',
          value: 'desc',
        },
      ]);
      backtoManageStaff();
    } else if (result === 404) {
      ErrorToast('Update staffs unsuccessfully', 3000);
      Notiflix.Block.remove('#root');
    } else if (result === 401) {
      handleSetUnthorization();
      Notiflix.Block.remove('#root');
    } else if (result === 402) ErrorToast('Email or phone numbers have existed!', 3000);
    else {
      Notiflix.Block.remove('#root');
      ErrorToast('Something went wrong. Please try again', 3000);
    }
  };
  const uploadImage = (e) => {
    let image = e.target.files[0];
    if (e.target.files.length > 0) {
      setImageAvatarStaffShow(URL.createObjectURL(image));
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
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    isInvalid={errors.last_name}
                    placeholder="Enter last_name"
                    {...register('last_name', { required: true })}
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
            <Form.Group className="mb-3">
              <Form.Label className="label-input">Role</Form.Label>
              <Controller
                name="role_id"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={listRole}
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
                <small className="text-red font-weight-semi">{errors?.role_id?.message}</small>
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
              <Form.Label className="label-input">Created date</Form.Label>
              <Controller
                control={control}
                name="created_date"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    type="date"
                    isInvalid={errors.created_date}
                    placeholder="Enter created date"
                  />
                )}
              />
              <div className="d-flex justify-content-between">
                <small className="text-red font-weight-semi">{errors?.created_date?.message}</small>
              </div>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="label-input">Status</Form.Label>
              {data_status.map((item, index) => (
                <Form.Check
                  key={index}
                  onChange={(e) => {
                    setValue('status', e.target.value, { shouldDirty: true });
                    setStatus(item.value);
                  }}
                  label={item.label}
                  name="status"
                  type="radio"
                  checked={status === item.value}
                  //  className={status.value===1?'status-active':'status-disabled'}
                  value={item.value}
                />
              ))}{' '}
              <div className="d-flex justify-content-between">
                <small className="text-red font-weight-semi">{errors?.password?.message}</small>
              </div>
            </Form.Group>
          </Col>
        </Row>

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
              />
            )}
          />
          <div className="d-flex justify-content-between">
            <small className="text-red font-weight-semi">{errors?.address?.message}</small>
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="label-input">Avatar</Form.Label>
          <Form.Control
            id="avatar"
            type="file"
            onChange={(e) => {
              setValue('avatar', e.target.files[0], { shouldDirty: true });
              uploadImage(e);
            }}
          />
          <div className="d-flex container-avatar">
            <ImageCustom
              className="img-responsive image-avatar"
              src={imageAvatarStaffShow ? imageAvatarStaffShow : dataStaff.avatar}
              alt={'avatar'}
            />
          </div>
        </Form.Group>

        <div className="d-flex justify-content-end p-2 mt-3">
          <Button
            id="product-save-btn"
            variant="danger"
            type="submit"
            className="font-weight-bold me-3"
            disabled={!isDirty}
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
  );
};

StaffEdit.propTypes = {
  backToStaffList: PropTypes.func.isRequired,
};

export default StaffEdit;

{
  /* <Controller control={control} name="status"
                          defaultValue=""
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                           <>
                             <Form.Check  onChange={onChange} value={value} ref={ref}
                                         type='radio'
                                          name='status'
                                          id={1}
                                         label='Active'/>
                             <Form.Check  onChange={onChange} value={value} ref={ref}
                                         type='radio'
                                          name='status'
                                          id={0}
                                         label='Disable'/>
                           </>)
              }
                       />*/
}
