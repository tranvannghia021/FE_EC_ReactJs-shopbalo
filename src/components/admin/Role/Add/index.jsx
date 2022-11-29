import { default as React, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { deleteCookie, getCookies } from '../../../../api/Admin/Auth';
import { setExpiredToken } from '../../../../redux/reducer/auth/auth.reducer';
import { addSchemaRole } from '../../../../adapter/role';
import { setIsAdd } from '../../../../redux/reducer/role/role.reducer';
import ToggleButton from '../../../commons/Layouts/ToggleButton';
import "./style.css"
import { addRole, getAllPermissions } from '../../../../api/Admin/role/roleAPI';
import { ErrorToast, SuccessToast } from '../../../commons/Layouts/Alerts';
import { BlockUI } from '../../../commons/Layouts/Notiflix';

const RoleAdd = (props) => {
  const [listPermissions,setListPermissions] = useState([])
  const data_permission = [
    {id:1,name: 'Manage Staff'},
    {id:2,name: 'Manage Products'},
    {id:3,name: 'Manage Types'},
    {id:4,name: 'Manage Customer'},
    {id:5,name: 'Manage Order'}
  ]
  useEffect(() => {
    const getPermissions = async ()=>{
      const result = await getAllPermissions()
      if (result!==401 && result!==500){
        setListPermissions(result.data)
      }

    }
    getPermissions()
  },[])
  //console.log(listPermissions);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(addSchemaRole),
  });
  const dispatch = useDispatch();

  const backtoManageRole = () => {
    dispatch(setIsAdd(false));
  };

  const onSubmit = async (data) => {
    BlockUI('#root', 'fixed');
    var listPermissions = [];
    Object.keys(data).forEach(key=>{
      (data[key]===true) && listPermissions.push({permission_id:+key.split('-')[1]})
    })
    const roleData = {
      name: data.name,
      listPermissions:listPermissions,
      status: 'Active',
    };
    console.log(roleData);
    const result= await addRole(roleData);
    Notiflix.Block.remove('#root');
    if (result === 200) {
      SuccessToast('Create role successfully', 3000);
      props.backToRoleList([
        {
          key: 'created_at',
          value: 'desc',
        },
      ]);
      backtoManageRole();
    } else if (result === 404) {
      ErrorToast('Create role unsuccessfully', 3000);
      Notiflix.Block.remove('#root');
    } else if (result === 401) {
      Notiflix.Block.remove('#root');
      handleSetUnthorization();
    }
    else {
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



              {listPermissions.map((item)=>(
                <Form.Group  >
                <Form.Check
                  key={item.id}
                control={control}
                name={`permission-${item.id}`}
                defaultValue=''
                type='switch'
                {...register(`permission-${item.id}`, { required: true })}
                id={`permission-${item.id}`}
                label={item.name}



              />

                </Form.Group>
              ))}

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

RoleAdd.propTypes = {
  backToRoleList: PropTypes.func.isRequired,
};

export default RoleAdd;
