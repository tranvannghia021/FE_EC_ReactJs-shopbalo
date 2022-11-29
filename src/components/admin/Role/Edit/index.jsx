import { default as React, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCookie, getCookies } from '../../../../api/Admin/Auth';
import { setExpiredToken } from '../../../../redux/reducer/auth/auth.reducer';
import { editSchemaRole } from '../../../../adapter/role';
import { setIsEdit } from '../../../../redux/reducer/role/role.reducer';
import ToggleButton from '../../../commons/Layouts/ToggleButton';

import { addRole, editRole, getAllPermissions } from '../../../../api/Admin/role/roleAPI';
import { ErrorToast, SuccessToast } from '../../../commons/Layouts/Alerts';
import { BlockUI } from '../../../commons/Layouts/Notiflix';
import { roleSelector } from '../../../../redux/selectors';

const RoleEdit = (props) => {
  const [listPermissions, setListPermissions] = useState([]);
  const role = useSelector(roleSelector);
  console.log(role);
  const [status, setStatus] = useState(role.data.status);
  const data_status = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'Disable' },
  ];

  useEffect(() => {
    const getPermissions = async () => {
      const result = await getAllPermissions();
      if (result !== 401 && result !== 500) {
        setListPermissions(result.data);
      }
    };
    getPermissions();
  }, []);
  //console.log(listPermissions);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(editSchemaRole),
    defaultValues: {
      name: role.data.name,
      status: role.data.status,
    },
  });
  const dispatch = useDispatch();

  const backtoManageRole = () => {
    dispatch(setIsEdit(false));
  };

  const onSubmit = async (data) => {
    console.log(data);
    //BlockUI('#root', 'fixed');
    var listPermissions = [];
    Object.keys(data).forEach((key) => {
      data[key] === true && listPermissions.push({ permission_id: key.split('-')[1] });
    });
    const roleData = {
      name: data.name,
      listPermissions: listPermissions,
      status: data.status,
    };
    console.log('datasend  ', roleData);
    const result = await editRole(role.data.id, roleData);
    Notiflix.Block.remove('#root');
    if (result === 200) {
      SuccessToast('Update role successfully', 3000);
      props.backToRoleList([
        {
          key: 'created_at',
          value: 'desc',
        },
      ]);
      backtoManageRole();
    } else if (result === 404) {
      ErrorToast('Update role unsuccessfully', 3000);
      Notiflix.Block.remove('#root');
    } else if (result === 401) {
      Notiflix.Block.remove('#root');
      handleSetUnthorization();
    } else {
      Notiflix.Block.remove('#root');
      ErrorToast('Something went wrong. Please try again', 4000);
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
        <Form.Group className="mb-3">
          <Form.Label className="label-input">Name Role </Form.Label>
          <Controller
            control={control}
            name="name"
            defaultValue=""
            {...register('name', { required: true })}
            ref={null}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.name}
                placeholder="Enter role name"
              />
            )}
          />
          <div className="d-flex justify-content-between">
            <small className="text-red font-weight-semi">{errors?.name?.message}</small>
          </div>
        </Form.Group>
        <Form.Label className="label-input mt-3 mb-4">List Permissions :</Form.Label>

        {listPermissions.map((item) => (
          <Form.Group>
            <Form.Check
              key={item.id}
              control={control}
              name={`permission-${item.id}`}
              defaultValue=""
              type="switch"
              //  checked={!!role.data && !!role.data.list_permissions.find((pr)=>pr.id===item.id)}

              {...register(`permission-${item.id}`, { required: true })}
              id={`permission-${item.id}`}
              label={item.name}
            />
          </Form.Group>
        ))}

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
              isInvalid={errors.status}
              //  className={status.value===1?'status-active':'status-disabled'}
              value={item.value}
            />
          ))}{' '}
          <div className="d-flex justify-content-between">
            <small className="text-red font-weight-semi">{errors?.password?.message}</small>
          </div>
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
            onClick={() => backtoManageRole()}
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

RoleEdit.propTypes = {
  backToRoleList: PropTypes.func.isRequired,
};

export default RoleEdit;
