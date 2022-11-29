import { yupResolver } from '@hookform/resolvers/yup';
import Notiflix from 'notiflix';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { setIsAdd, setIsEdit } from '../../../../redux/reducer/slider/slider.reducer';
import { ErrorToast, SuccessToast } from '../../../commons/Layouts/Alerts';
import { BlockUI } from '../../../commons/Layouts/Notiflix';
import { addSchemaSlider } from '../../../../adapter/slider';
import { editSlider } from '../../../../api/Admin/Slider/sliderAPI';
import { isSliderSelector } from '../../../../redux/selectors/slider/slider.selector';
import CustomEditor from '../../../commons/Layouts/Edittor';
import ImageCustom from '../../../commons/Layouts/Image';

function SliderEdit(props) {
  const dispatch = useDispatch();
  const sliderSelector = useSelector(isSliderSelector);
  const [imageOne, setImageOne] = useState(sliderSelector.image);

  const typeOptionsStatus = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { isDirty, errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(addSchemaSlider),
    defaultValues: {
      name: sliderSelector.name,
      status: sliderSelector.status,
      description: sliderSelector.description,
      url: sliderSelector.url,
      image: sliderSelector.image,
    },
  });

  const image = useWatch({
    control,
    name: 'image',
  });

  const description = useWatch({
    control,
    name: 'description',
  });

  const editorDescription = (value) => {
    setValue('description', value, { shouldDirty: true });
  };

  const backToManage = () => {
    dispatch(setIsAdd(false));
    dispatch(setIsEdit(false));
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const uploadImage = (e) => {
    let image = e.target.files[0];
    if (e.target.files.length > 0) {
      setImageOne(URL.createObjectURL(image));
    }
  };

  const onSubmit = async (data) => {
    BlockUI('#root', 'fixed');

    if (data.image.length !== 0) {
      const image1 = await toBase64(data.image[0]);

      const resultData = {
        name: data.name,
        status: data.status,
        description: data.description,
        url: data.url,
        image: image1,
      };
      console.log('🚀 ~ file: index.jsx ~ line 87 ~ onSubmit ~ resultData', resultData);

      const result = await editSlider(sliderSelector.id, resultData);
      // console.log('🚀 ~ file: index.jsx ~ line 90 ~ onSubmit ~ result', result);

      Notiflix.Block.remove('#root');
      if (result === 200) {
        SuccessToast('Create a item promotion successfully', 3000);
        backToManage();
      } else {
        ErrorToast('Something went wrong. Please try again', 3000);
      }
    } else {
      ErrorToast('Please, Image can not blank', 3000);
      setTimeout(function () {
        Notiflix.Block.remove('#root');
      }, 1000);
      return;
    }
  };

  const TableRow = (props) => {
    return (
      <tr>
        <td with="30%">
          <p className="font-weight-bold">{props.children}</p>
        </td>
        <td width="70%">{props.control}</td>
      </tr>
    );
  };

  return (
    <>
      <div className=" edit_form d-flex justify-content-center">
        <Form className="font_add_edit_prduct" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <table align="center" border="0" className="table table-bordered mb-0">
            <tbody>
              <TableRow
                control={
                  <>
                    <Form.Control id="name" type="text" {...register('name')} />
                    <div className="d-flex justify-content-between">
                      <small className="text-red font-weight-semi">{errors?.name?.message}</small>
                    </div>
                  </>
                }
              >
                Name
              </TableRow>

              <TableRow
                control={
                  <>
                    <Form.Control id="url" type="text" {...register('url')} />
                    <div className="d-flex justify-content-between">
                      <small className="text-red font-weight-semi">{errors?.url?.message}</small>
                    </div>
                  </>
                }
              >
                Url Button
              </TableRow>

              <tr>
                <td with="30%">
                  <p className="font-weight-bold">Image</p>
                </td>
                <td width="70%">
                  <Form.Control
                    id="image"
                    type="file"
                    {...register('image')}
                    onChange={(e) => uploadImage(e)}
                  />
                  <div className="image-product-slide">
                    {imageOne && (
                      <div className="d-flex image-product-slide ">
                        <ImageCustom className="multi-preview-slide-product" src={imageOne} alt={'image_product'} />
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-between">
                    <small className="text-red font-weight-semi">{}</small>
                  </div>
                </td>
              </tr>

              <TableRow
                control={
                  <Controller
                    control={control}
                    name="status"
                    render={({ field: { value, onChange } }) => (
                      <Select
                        options={typeOptionsStatus}
                        onChange={(options) => {
                          onChange(options?.value);
                          if (options?.value === 'Active') {
                            setValue('status', options.value);
                          }
                        }}
                        value={typeOptionsStatus?.filter((option) => value === option?.value)}
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
                }
              >
                Status
              </TableRow>

              <tr>
                <td with="30%">
                  <p className="font-weight-bold">Description</p>
                </td>
                <td width="70%">
                  <CustomEditor id="description" editorDescription={editorDescription} defaultValues={description} />
                  <div className="ckeditor-wrapper" />

                  <div className="d-flex justify-content-between">
                    <small className="text-red font-weight-semi">{}</small>
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
              disabled={!isDirty}
            >
              Save
            </Button>
            <Button
              id="product-save-cancel"
              onClick={() => backToManage()}
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

export default SliderEdit;
