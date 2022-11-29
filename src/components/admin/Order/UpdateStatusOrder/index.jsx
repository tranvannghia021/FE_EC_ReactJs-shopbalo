import Notiflix from 'notiflix';
import React from 'react';

import { Button, Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { deleteCookie, getCookies } from '../../../../api/Admin/Auth';
import { updateStatusOrder } from '../../../../api/Admin/Order/indexAPI';
import { setExpiredToken } from '../../../../redux/reducer/auth/auth.reducer';
import { setIsEdit } from '../../../../redux/reducer/order/order.reducer';
import { orderByIdSelector } from '../../../../redux/selectors/order/order.selector';
import { ErrorToast, SuccessToast } from '../../../commons/Layouts/Alerts';

import { BlockUI } from '../../../commons/Layouts/Notiflix';
// import './style.css';
function UpdateStatusOrder(props) {
  const idStatusUpdate = useSelector(orderByIdSelector);
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { dirtyFields, isDirty },
  } = useForm({
    mode: 'onChange',
    // resolver: yupResolver(addSchema),
    defaultValues: {
      status: idStatusUpdate.status,
    },
  });
  const dispatch = useDispatch();
  /* Status: 1. Cho xac nhan 2.Xac nhan 3.Dang giao hang 4.Giao hang thanh cong 5. Giao hang that bai  6. Da hoan thanh 7 that bai */

  const typeOptionsStatusOrder = [
    { value: 1, label: 'Wait for confirmation... ' },
    { value: 2, label: 'Confirm' },
    { value: 3, label: 'Delivery' },
    { value: 4, label: 'Successfully delivery' },
    { value: 5, label: ' Delivery failed' },
    { value: 6, label: 'Successfully' },
    { value: 7, label: 'Failed' },
  ];

  const onSubmit = async (data) => {
    BlockUI('#root', 'fixed');
    const temDirtyFields = { ...dirtyFields };

    Object.keys(temDirtyFields).map((key) => {
      temDirtyFields[key] = data[key];
    });
    const result = await updateStatusOrder(idStatusUpdate.order_id, temDirtyFields);
    Notiflix.Block.remove('#root');
    if (result === 200) {
      SuccessToast('Update status Order successfully', 3000);
      props.backToOrderList([
        {
          key: 'updated_at',
          value: 'desc',
        },
      ]);
      backtoOrder();
    } else if (result === 404) {
      ErrorToast('Update status Order unsuccessfully', 3000);
      Notiflix.Block.remove('#root');
    } else if (result === 401) {
      handleSetUnthorization();
      Notiflix.Block.remove('#root');
    } else {
      Notiflix.Block.remove('#root');
      ErrorToast('Something went wrong. Please try again', 3000);
    }

    // const data=await updateStatusOrder()
    console.log('gr', data);
  };
  const backtoOrder = () => {
    dispatch(setIsEdit(false));
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
                <td with="30%">
                  <p className="font-weight-bold">Status order</p>
                </td>
                <td width="70%">
                  <Controller
                    control={control}
                    name="status"
                    {...register('status')}
                    ref={null}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        options={typeOptionsStatusOrder}
                        onChange={(options) => {
                          onChange(options?.value);
                          setValue('status', options.value);
                        }}
                        value={typeOptionsStatusOrder.filter((option) => value === option?.value)}
                        placeholder="Select..."
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
            </tbody>
          </table>
          <div className="d-flex justify-content-end p-2 mt-3">
            <Button
              id="order-save-btn"
              variant="danger"
              type="submit"
              className="font-weight-bold me-3"
              disabled={!isDirty}
            >
              Save
            </Button>
            <Button
              id="order-save-cancel"
              onClick={() => backtoOrder()}
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

export default UpdateStatusOrder;
