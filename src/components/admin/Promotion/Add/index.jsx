import { yupResolver } from '@hookform/resolvers/yup';
import Notiflix from 'notiflix';
import { Button, Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { addSchemaPromotion } from '../../../../adapter/promotion';
import { deleteCookie, getCookies } from '../../../../api/Admin/Auth';
import { addDiscount } from '../../../../api/Admin/Promotion/promotionAPI';
import { setExpiredToken } from '../../../../redux/reducer/auth/auth.reducer';
import { setIsAdd } from '../../../../redux/reducer/promotion/promotion.reducer';
import { ErrorToast, SuccessToast } from '../../../commons/Layouts/Alerts';
import { BlockUI } from '../../../commons/Layouts/Notiflix';
import CustomEditor from '../../../commons/Layouts/Edittor';
import './style.css';

function PromotionAdd(props) {
  const dispatch = useDispatch();

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
    resolver: yupResolver(addSchemaPromotion),
    defaultValues: {
      name: '',
      value: '',
      point: '',
      status: '',
      description: '',
    },
  });

  const backToManage = () => {
    dispatch(setIsAdd(false));
  };

  const onSubmit = async (data) => {
    BlockUI('#root', 'fixed');

    const resultData = {
      name: data.name,
      value: data.value,
      point: data.point,
      status: data.status,
      description: data.description,
    };

    const result = await addDiscount(resultData);

    Notiflix.Block.remove('#root');
    if (result.status === 200) {
      SuccessToast('Create a item promotion successfully', 3000);
      backToManage();
      props.backToPromotionList([
        {
          key: 'id',
          value: 'desc',
        },
      ]);
    } else if (result.status === 401) {
      handleSetUnthorization();
    } else {
      ErrorToast('Something went wrong. Please try again', 3000);
    }
  };

  const editorDescription = (value) => {
    setValue('description', value);
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
                    <Form.Control id="value" type="text" {...register('value')} />
                    <div className="d-flex justify-content-between">
                      <small className="text-red font-weight-semi">{errors?.value?.message}</small>
                    </div>
                  </>
                }
              >
                Value
              </TableRow>

              <TableRow
                control={
                  <>
                    <Form.Control id="point" type="text" {...register('point')} />
                    <div className="d-flex justify-content-between">
                      <small className="text-red font-weight-semi">{errors?.point?.message}</small>
                    </div>
                  </>
                }
              >
                Point
              </TableRow>

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

              <TableRow
                control={
                  <>
                    <CustomEditor id="description" editorDescription={editorDescription} {...register('description')} />
                    <div className="ckeditor-wrapper" />
                    <div className="d-flex justify-content-between">
                      <small className="text-red font-weight-semi">
                        {errors.description && 'Description can not blank'}
                      </small>
                    </div>
                  </>
                }
              >
                Description
              </TableRow>
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
              onClick={backToManage}
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

export default PromotionAdd;
