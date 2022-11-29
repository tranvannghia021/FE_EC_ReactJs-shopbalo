import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm, useWatch } from 'react-hook-form';
import Select from 'react-select';
import { addSchema, editSchema } from '../../../../adapter/product';
import CustomEditor from '../../../commons/Layouts/Edittor';
import './style.css';
import { setIsEdit } from '../../../../redux/reducer/product/product.reducer';
import { useState } from 'react';
import { addProduct, editProduct } from '../../../../api/Admin/Product/productAPI';
import { ErrorToast, SuccessToast } from '../../../commons/Layouts/Alerts';
import Notiflix from 'notiflix';
import { BlockUI } from '../../../commons/Layouts/Notiflix';
import { FaTimesCircle } from 'react-icons/fa';
import { productByIdSelector } from '../../../../redux/selectors/product/product.selector';
import { getAll } from '../../../../api/Admin/Category/categoryAPI';
import ImageCustom from '../../../commons/Layouts/Image';
import { setExpiredToken } from '../../../../redux/reducer/auth/auth.reducer';
import { deleteCookie, getCookies } from '../../../../api/Admin/Auth';
function ProductEdit(props) {
  const dispatch = useDispatch();
  const productDetailById = useSelector(productByIdSelector);
  const [imageOne, setImageOne] = useState(productDetailById.image);
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { isValid, isDirty, dirtyFields, errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(editSchema),
    defaultValues: {
      name: productDetailById.name,
      category_id: productDetailById.category_id,
      code_color: productDetailById.code_color,
      image: productDetailById.image,
      image_slide: productDetailById.image_slide,
      amount: productDetailById.amount,
      price: productDetailById.price,
      description: productDetailById.description,
      status: productDetailById.status,
    },
  });
  const [fileImageSlide, setFileImageSlide] = useState({
    file: [],
  });
  const [fileImageSlideShow, setFileImageSlideShow] = useState({
    file: [],
  });

  useEffect(() => {
    register('description', { required: true });
    register('image_slide');
    // register('category_id');
    register('color');
    if (fileImageSlide.file.length > 0) {
      setValue('image_slide', fileImageSlide, { shouldDirty: true });
    }
  }, [register, fileImageSlide]);
  const description = useWatch({
    control,
    name: 'description',
  });
  const image_slide = useWatch({
    control,
    name: 'image_slide',
  });
  const typeOptionsCategory = [];
  props.dataCategory != null &&
    props.dataCategory.map((item) => {
      typeOptionsCategory.push({ value: item.id, label: item.name });
    });
  const typeOptionsColor = [
    { value: '1', label: 'Green' },
    { value: '2', label: 'Blue' },
  ];
  const typeOptionsSatus = [
    { value: 0, label: 'Active' },
    { value: 1, label: 'Out of stock' },
  ];
  const editorDescription = (value) => {
    setValue('description', value, { shouldDirty: true });
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
    const temDirtyFields = { ...dirtyFields };
    Object.keys(temDirtyFields).map((key) => {
      temDirtyFields[key] = data[key];
    });
    if (temDirtyFields.image !== undefined) {
      const image1 = await toBase64(data.image[0]);
      temDirtyFields.image = [image1];
    }
    if (temDirtyFields.image_slide !== undefined) {
      const image_slide_array = [];
      for (let i = 0; i < data.image_slide.file.length; i++) {
        image_slide_array.push(await toBase64(data.image_slide.file[i]));
      }
      temDirtyFields.image_slide = image_slide_array;
    }
    if (temDirtyFields.image_slide !== undefined) {
      if (temDirtyFields.image_slide.length === 0) {
        temDirtyFields.image_slide = undefined;
      }
    }
    const result = await editProduct(productDetailById.id, temDirtyFields);
    Notiflix.Block.remove('#root');
    if (result === 200) {
      SuccessToast('Update product successfully', 3000);
      props.backToProductList([
        {
          key: 'updated_at',
          value: 'desc',
        },
      ]);
      backtoProduct();
    } else if (result === 404) {
      ErrorToast('Update product unsuccessfully', 3000);
      Notiflix.Block.remove('#root');
    } else if (result === 401) {
      handleSetUnthorization();
      Notiflix.Block.remove('#root');
    } else {
      Notiflix.Block.remove('#root');
      ErrorToast('Something went wrong. Please try again', 3000);
    }
  };
  const backtoProduct = () => {
    dispatch(setIsEdit(false));
  };
  const uploadImageSlide = async (e) => {
    if (e.target.files.length > 0) {
      setFileImageSlide({ file: [...fileImageSlide.file, e.target.files[0]] });
      setFileImageSlideShow({ file: [...fileImageSlideShow.file, URL.createObjectURL(e.target.files[0])] });
    }
  };
  const onRemoveImage = (id) => {
    image_slide.file.forEach((value, index) => {
      if (index === id) {
        image_slide.file.splice(index, 1);
      }
    });

    setFileImageSlide({ file: image_slide.file });
    setValue('image_slide', image_slide);
    fileImageSlideShow.file.splice(id, 1);
  };
  const uploadImage = (e) => {
    let image = e.target.files[0];
    if (e.target.files.length > 0) {
      setImageOne(URL.createObjectURL(image));
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
    <>
      <div className=" edit_form d-flex justify-content-center">
        <Form className="font_add_edit_prduct" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <table align="center" border="0" className="table table-bordered mb-0">
            <tbody>
              <tr>
                <td with="15%">
                  <p className="font-weight-bold">Product Name</p>
                </td>
                <td width="85%">
                  <Form.Control id="name" type="text" maxLength="128" {...register('name')} />
                  <div className="d-flex justify-content-between">
                    <small className="text-red font-weight-semi">{errors?.name?.message}</small>
                  </div>
                </td>
              </tr>

              <tr>
                <td with="30%">
                  <p className="font-weight-bold">Category Name</p>
                </td>
                <td width="70%">
                  <Controller
                    control={control}
                    name="category_id"
                    {...register('category_id')}
                    ref={null}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        options={typeOptionsCategory}
                        onChange={(options) => {
                          onChange(options?.value);
                          setValue('category_id', options.value);
                        }}
                        value={typeOptionsCategory.filter((option) => value === option.value)}
                        placeholder=""
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
                </td>
              </tr>

              <tr>
                <td with="30%">
                  <p className="font-weight-bold">Color</p>
                </td>
                <td width="70%">
                  <Controller
                    control={control}
                    name="code_color"
                    render={({ field: { value, onChange } }) => (
                      <Form.Control
                        onChange={(e) => {
                          onChange(e.target.value);
                        }}
                        type="color"
                        value={value}
                        {...register('code_color')}
                      />
                    )}
                  />
                </td>
              </tr>
              <tr>
                <td width="30%">
                  <p className="font-weight-bold">Status</p>
                </td>
                <td width="70%">
                  <Controller
                    control={control}
                    name="status"
                    {...register('status')}
                    ref={null}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        options={typeOptionsSatus}
                        onChange={(options) => {
                          onChange(options?.value);
                          setValue('status', options.value);
                        }}
                        value={typeOptionsSatus.filter((option) => value === option?.value)}
                        placeholder=""
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
                </td>
              </tr>
              <tr>
                <td with="30%">
                  <p className="font-weight-bold">Image</p>
                </td>
                <td width="70%">
                  <Form.Control id="image" type="file" {...register('image')} onChange={(e) => uploadImage(e)} />
                  <div className="image-product-slide">
                    {imageOne && (
                      <div className="d-flex image-product-slide ">
                        <ImageCustom className="multi-preview-slide-product" src={imageOne} alt={'image_product'} />
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-between">
                    <small className="text-red font-weight-semi">
                      {/* {errors.image?.message || image.length === 0 ? 'Image can not blank' : ''} */}
                    </small>
                  </div>
                </td>
              </tr>

              <tr>
                <td with="30%">
                  <p className="font-weight-bold">Image Slide</p>
                </td>
                <td width="70%">
                  <Form.Control id="image-slide" type="file" multiple onChange={uploadImageSlide} />

                  <div className="image-product-slide">
                    {fileImageSlideShow.file !== [] &&
                      fileImageSlideShow.file.map((url, index) => (
                        <div key={index} className="image-product-slide-item">
                          <img className="multi-preview-slide-product " src={url} alt="..." />
                          {/* <Button onClick={() => onRemoveImage(index)} id={index} value={index} /> */}
                          <FaTimesCircle onClick={() => onRemoveImage(index)} className="btn-delete-product-slide" />
                        </div>
                      ))}
                  </div>
                  <div className="d-flex justify-content-between">
                    <small className="text-red font-weight-semi">{errors.image_slide?.message}</small>
                  </div>
                </td>
              </tr>
              <tr>
                <td with="30%">
                  <p className="font-weight-bold">Amount</p>
                </td>
                <td width="70%">
                  <Form.Control id="amount" type="number" maxLength="128" {...register('amount')} />
                  <div className="d-flex justify-content-between">
                    <small className="text-red font-weight-semi">{errors.amount?.message}</small>
                  </div>
                </td>
              </tr>

              <tr>
                <td with="30%">
                  <p className="font-weight-bold">Price</p>
                </td>
                <td width="70%">
                  <Form.Control id="price" type="number" maxLength="128" {...register('price')} />
                  <div className="d-flex justify-content-between">
                    <small className="text-red font-weight-semi">{errors.price?.message}</small>
                  </div>
                </td>
              </tr>
              <tr>
                <td with="30%">
                  <p className="font-weight-bold">Description</p>
                </td>
                <td width="70%">
                  <CustomEditor id="description" editorDescription={editorDescription} defaultValues={description} />
                  <div className="ckeditor-wrapper" />

                  <div className="d-flex justify-content-between">
                    <small className="text-red font-weight-semi">
                      {errors.description && 'Description can not blank'}
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
              disabled={fileImageSlide.file.length > 0 ? false : !isDirty}
            >
              Save
            </Button>
            <Button
              id="product-save-cancel"
              onClick={() => backtoProduct()}
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

export default ProductEdit;
