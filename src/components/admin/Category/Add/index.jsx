import React, { useState, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import './style.css';
import { addSchemaCategory } from '../../../../adapter/category';
import { addCategory } from '../../../../api/Admin/Category/categoryAPI';
import { useDispatch } from 'react-redux';
import { setIsAdd } from '../../../../redux/reducer/category/category.reducer';
import { BlockUI } from '../../../commons/Layouts/Notiflix';
import { ErrorToast, SuccessToast } from '../../../commons/Layouts/Alerts';
import Notiflix from 'notiflix';
import { setExpiredToken } from '../../../../redux/reducer/auth/auth.reducer';
import { deleteCookie, getCookies } from '../../../../api/Admin/Auth';
function CreateCategoryForm(props) {
  const dispatch = useDispatch();
  const [imageCategory, setImageCategory] = useState();
  const category = [];
  const useRefSelect = useRef('');

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(addSchemaCategory),
    defaultValues: {
      Category: '',
      parent_id: '',
      image: '',
    },
  });

  props.data.map((item) => {
    category.push({
      value: item.id,
      label: item.name,
      parent_id: item.parent_id,
    });
  });
  const backtoManagerUser = () => {
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
    if (data.image.length != 0) {
      BlockUI('#root', 'fixed');
      const image = await toBase64(data.image[0]);
      const resultData = {
        name: data.Category,
        parent_id: data.parent_id === '' ? 0 : data.parent_id,
        image: image,
      };
      const result = await addCategory(resultData);
      Notiflix.Block.remove('#root');

      if (result.status === 200) {
        SuccessToast('Create category successfully', 3000);

        backtoManagerUser();
      } else if (result.status === 401) {
        handleSetUnthorization();
      } else {
        ErrorToast('Something went wrong. Please try again', 3000);
      }
    } else {
      ErrorToast('Image is invalid', 3000);
    }
  };
  const uploadImage = (e) => {
    let image = e.target.files[0];
    if (e.target.files.length > 0) {
      setImageCategory(URL.createObjectURL(image));
    }
  };

  const categoryTree = (array, cate_id = 0, level = 0) => {
    var result = [];
    for (let value of array) {
      if (value.parent_id === cate_id) {
        value.level = level;
        result.push(value);
        let child = categoryTree(category, value.value, level + 1);
        result = result.concat(child);
      }
    }
    return result;
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
    <>
      <div className=" edit_form d-flex justify-content-center">
        <Form className="font_add_edit_prduct" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <table align="center" border="0" className="table table-bordered mb-0">
            <tbody>
              <tr>
                <td with="15%">
                  <p className="font-weight-bold">Category Name</p>
                </td>
                <td width="85%">
                  <Form.Control id="Category" type="text" maxLength="128" {...register('Category')} />
                  <div className="d-flex justify-content-between">
                    <small className="text-red font-weight-semi">{errors?.Category?.message}</small>
                  </div>
                </td>
              </tr>

              <tr>
                <td with="30%">
                  <p className="font-weight-bold">Category Parent</p>
                </td>
                <td width="70%">
                  <select
                    name="parent_id"
                    ref={useRefSelect}
                    onChange={() => setValue('parent_id', useRefSelect.current.value)}
                    className="select-option"
                  >
                    <option value="0">----Chose category---</option>
                    {categoryTree(category).map((cate, index) => {
                      return (
                        <option key={index} value={cate.value}>
                          {' '}
                          {'--'.repeat(cate.level)}
                          {cate.label}
                        </option>
                      );
                    })}
                  </select>
                </td>
              </tr>

              <tr>
                <td with="30%">
                  <p className="font-weight-bold">Image</p>
                </td>
                <td width="70%">
                  <Form.Control id="image" type="file" {...register('image')} onChange={(e) => uploadImage(e)} />
                  <div className="image-product-slide">
                    {imageCategory && (
                      <div className="d-flex image-product-slide ">
                        <img className="multi-preview-slide-product" src={imageCategory} alt={'image_product'} />
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-between">
                    <small className="text-red font-weight-semi">
                      <small className="text-red font-weight-semi">{errors?.image?.message}</small>
                    </small>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
              onClick={backtoManagerUser}
              variant="outline-secondary"
              className="font-weight-bold"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default CreateCategoryForm;
