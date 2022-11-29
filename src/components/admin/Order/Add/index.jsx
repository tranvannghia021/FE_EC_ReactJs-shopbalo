import Notiflix from 'notiflix';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { deleteCookie, getCookies } from '../../../../api/Admin/Auth';
import { getAllCustomers } from '../../../../api/Admin/Customer/customerAPI';
import { addOrderAdmin } from '../../../../api/Admin/Order/indexAPI';
import { getAllProducts } from '../../../../api/Admin/Product/productAPI';
import { getAllDisount } from '../../../../api/Admin/Promotion/promotionAPI';
import { getAllCities, getAllDictrists, getAllWards } from '../../../../api/Cities';
import { setExpiredToken } from '../../../../redux/reducer/auth/auth.reducer';
import { setIsAdd } from '../../../../redux/reducer/order/order.reducer';
import { getUserSelector } from '../../../../redux/selectors';
import { formatter } from '../../../../utils/formatCurrency';
import { ErrorToast, SuccessToast } from '../../../commons/Layouts/Alerts';
import ImageCustom from '../../../commons/Layouts/Image';
import { BlockUI } from '../../../commons/Layouts/Notiflix';
import './style.css';
function OrderAdd(props) {
  const [listProduct, setListProduct] = useState(null);
  const [listCustomer, setListCustomer] = useState(null);
  const [ifoCus, setInfoCus] = useState(null);
  const [listDiscount, setListDiscount] = useState(null);
  const [errorDescription, setErrorDescription] = useState('');
  const [imageOne, setImageOne] = useState('');
  const [cities, setCities] = useState([]);
  const [distrists, setDistricts] = useState();
  const [editFirstName, setEditFirstName] = useState(true);
  const [editLastName, setEditLastName] = useState(true);
  const [totalPrice1, setTotalPrice] = useState(0);
  const [wards, setWards] = useState();
  const user = useSelector(getUserSelector);
  const [listAddProduct, setListAddProduct] = useState([]);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty, isValid, dirtyFields },
  } = useForm({
    mode: 'onChange',
    // resolver: yupResolver(checkoutSchema),
    defaultValues: {
      customer_id: '',
      email: '',
      phone: '',
      address: '',
      discount_id: '',
      staff_id: '',
    },
  });
  const handleGetCities = async () => {
    const formatDataCities = [];
    const data = await getAllCities();
    data.data.map((item, index) => {
      formatDataCities.push({
        value: item.id,
        label: item.name,
      });
    });
    setCities(formatDataCities);
  };
  const handleGetDistrict = async (id) => {
    const formatDataDistricts = [];
    const data = await getAllDictrists(id);
    data.data.map((item, index) => {
      formatDataDistricts.push({
        value: item.id,
        label: item.name,
      });
    });
    setDistricts(formatDataDistricts);
  };
  const handleGetWards = async (id) => {
    const data = await getAllWards(id);
    const formatDataWard = [];
    data.data.map((item, index) => {
      formatDataWard.push({
        value: item.id,
        label: item.name,
      });
    });
    setWards(formatDataWard);
  };

  useEffect(() => {
    const handleGetAllProducts = async () => {
      const result = await getAllProducts({ getAll: 'get-all' });
      if (result === 401) {
        handleSetUnthorization();
        return false;
      } else if (result === 500) {
        return false;
      } else {
        setListProduct(result);
      }
    };
    const handleGetAllCustomers = async () => {
      const result = await getAllCustomers({ getAll: 'get-all' });
      if (result === 401) {
        handleSetUnthorization();
        return false;
      } else if (result === 500) {
        return false;
      } else {
        setListCustomer(result);
      }
    };
    const handleGetAllDiscount = async () => {
      const result = await getAllDisount();
      if (result === 401) {
        // ErrorToast('Something went wrong. Please try again', 3000);
        handleSetUnthorization();
        return false;
      } else {
        setListDiscount(result.data);
      }
    };

    handleGetAllCustomers();
    handleGetCities();
    handleGetAllProducts();
    handleGetAllDiscount();
  }, [dispatch]);

  const city = useWatch({
    control,
    name: 'cities',
  });
  const district = useWatch({
    control,
    name: 'district',
  });
  const optionCustomer = [];
  listCustomer !== null &&
    listCustomer.data.map((item) => {
      optionCustomer.push({
        value: item.id,
        label: item.first_name + ' ' + item.last_name,
      });
    });
  const optionDiscount = [];
  listDiscount !== null &&
    listDiscount.map((item) => {
      optionDiscount.push({
        value: item.id,
        label: item.name,
        dis: item.value,
      });
    });

  const onSubmit = async (data) => {
    BlockUI('#root', 'fixed');
    const orderDetail = [];
    var totalPrice = 0;
    listAddProduct.map((item) => {
      totalPrice += item.data.price * item.qty;
      orderDetail.push({
        id: item.data.id,
        image: item.data.image,
        name: item.data.name,
        price: item.data.price,
        qty: item.qty,
      });
    });

    const resultData = {
      customer_id: data.customer_id,
      staff_id: user.id,
      discount_id: data.discount_id.id,
      status: 1,
      discount_value: data.discount_id.value,
      total_price: totalPrice - (totalPrice * data.discount_id.value) / 100,
      address_delivery: data.cities + ',' + data.district + ',' + data.ward + ',' + data.address,
      order_detail: orderDetail,
    };

    if (
      data.customer_id === '' ||
      data.discount_id === '' ||
      data.cities === '' ||
      data.distrist === '' ||
      data.ward === '' ||
      data.address === '' ||
      listAddProduct.length === 0
    ) {
      ErrorToast('Order payment unsuccessfully .Please enter enough information ', 5000);
      Notiflix.Block.remove('#root');
    } else {
      const result = await addOrderAdmin(resultData);
      Notiflix.Block.remove('#root');
      if (result === 200) {
        SuccessToast('Order payment successfully', 8000);
        props.backToOrderList([
          {
            key: 'updated_at',
            value: 'desc',
          },
        ]);
        backtoOrder();
      } else if (result === 404) {
        ErrorToast('Order payment unsuccessfully', 3000);
        Notiflix.Block.remove('#root');
      } else if (result === 401) {
        handleSetUnthorization();
        Notiflix.Block.remove('#root');
      } else {
        Notiflix.Block.remove('#root');
        ErrorToast('Something went wrong. Please try again', 3000);
      }
    }
  };
  const backtoOrder = () => {
    dispatch(setIsAdd(false));
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

  const handleOnchangeCustomer = (data) => {
    const re = listCustomer !== null && listCustomer.data.filter((item) => item.id === data);
    setInfoCus(re);
  };

  const handleAddProduct = (data) => {
    const lists = [...listAddProduct];
    const li = lists.filter((item) => item.data.id === data.id);
    if (li.length > 0) {
      const temp = li;
      const kj = lists.indexOf(li[0]);
      lists.splice(kj, 1);
      lists.push({
        data: temp[0].data,
        qty: temp[0].qty + 1,
      });
    } else {
      lists.push({
        data: data,
        qty: 1,
      });
    }

    var total = 0;
    lists.map((item) => {
      total = total + item.data.price * item.qty;
    });
    console.log('tg', total);
    setListAddProduct(lists);
    setTotalPrice(total);
    // var totalPrice = 0;
    // listAddProduct.map((item) => {
    //   totalPrice += item.data.price * item.qty;
    // });
    // setTotalPrice(totalPrice);
  };

  const handleRemoveProduct = (data) => {
    const lists = [...listAddProduct];
    const li = lists.filter((item) => item.data.id === data);
    if (li.length > 0) {
      const temp = li;
      const kj = lists.indexOf(li[0]);
      lists.splice(kj, 1);
    }
    setListAddProduct(lists);
  };
  return (
    <>
      <div className="row mb-5">
        <Form className=" text-black" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex justify-content-end p-2 mt-3">
            <Button
              id="product-save-btn"
              variant="danger"
              type="submit"
              className="font-weight-bold me-3"
              // disabled={!isValid}
            >
              Checkout
            </Button>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Row>
                <div className="col-md-4 ">
                  <Form.Group className="mb-2 font-18px">
                    <Form.Label className="label-input">
                      Customer&nbsp;<span className="text-danger">*</span>
                    </Form.Label>
                    <Controller
                      name="customer_id"
                      control={control}
                      {...register('customer_id')}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Select
                          options={optionCustomer}
                          onChange={(options) => {
                            onChange(options?.value);
                            setValue('customer_id', options.value);
                            handleOnchangeCustomer(options.value);
                          }}
                          theme={(theme) => ({
                            ...theme,
                            colors: {
                              ...theme.colors,
                              primary25: '#ffffff',
                              primary50: '##3ca9d5',
                              primary: '#3ca9d5',
                            },
                          })}
                        />
                      )}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-between">
                    <small className="text-red font-12px">{errors?.customer_id?.message}</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <Form.Group className="mb-3">
                    <Form.Label className="label-input">Email</Form.Label>
                    <Controller
                      control={control}
                      name="email"
                      defaultValue=""
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Control
                          onChange={onChange}
                          value={ifoCus !== null ? ifoCus[0].email : ''}
                          disabled
                          placeholder="Enter email"
                          {...register('email')}
                        />
                      )}
                    />
                    <div className="d-flex justify-content-between">
                      <small className="text-red font-weight-semi">{errors?.email?.message}</small>
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-4 ">
                  <Form.Group className="mb-3">
                    <Form.Label className="label-input">Phone</Form.Label>
                    <Controller
                      control={control}
                      name="phone"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <div className="d-flex icon-edit-checkout">
                          <Form.Control
                            onChange={onChange}
                            value={ifoCus !== null ? ifoCus[0].phone : ''}
                            isInvalid={errors.phone}
                            placeholder="Enter phone"
                            {...register('phone')}
                            disabled
                          />
                          {/* <FaEdit onClick={() => setEditPhone(!editPhone)} /> */}
                        </div>
                      )}
                    />
                    <div className="d-flex justify-content-between">
                      <small className="text-red font-weight-semi">{errors?.phone?.message}</small>
                    </div>
                  </Form.Group>
                </div>
              </Row>
              <Row>
                <div className="col-md-4 ">
                  <Form.Group className="mb-2 font-18px">
                    <Form.Label className="label-input">
                      City &nbsp;<span className="text-danger">*</span>
                    </Form.Label>
                    <Controller
                      name="cities"
                      control={control}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Select
                          options={cities}
                          onChange={(options) => {
                            onChange(options?.value);
                            handleGetDistrict(options?.value);
                            setValue('cities', options.label);
                          }}
                          theme={(theme) => ({
                            ...theme,
                            colors: {
                              ...theme.colors,
                              primary25: '#ffffff',
                              primary50: '##3ca9d5',
                              primary: '#3ca9d5',
                            },
                          })}
                        />
                      )}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-between">
                    <small className="text-red font-12px">{errors?.cities?.message}</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <Form.Group className="mb-2 font-18px">
                    <Form.Label className="label-input">
                      Discount &nbsp;<span className="text-danger">*</span>
                    </Form.Label>
                    <Controller
                      name="discount_id"
                      control={control}
                      {...register('discount_id')}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Select
                          options={optionDiscount}
                          onChange={(options) => {
                            onChange(options?.value);
                            setValue('discount_id', {
                              id: options.value,
                              value: options.dis,
                            });
                          }}
                          theme={(theme) => ({
                            ...theme,
                            colors: {
                              ...theme.colors,
                              primary25: '#ffffff',
                              primary50: '##3ca9d5',
                              primary: '#3ca9d5',
                            },
                          })}
                        />
                      )}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-between">
                    <small className="text-red font-12px">{errors?.discount_id?.message}</small>
                  </div>
                </div>
                <div className="col-md-4 ">
                  <Form.Group className="mb-2 font-18px">
                    <Form.Label className="label-input">Staff</Form.Label>
                    <Controller
                      control={control}
                      name="staff_id"
                      defaultValue=""
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <div className="d-flex icon-edit-checkout">
                          <Form.Control
                            onChange={onChange}
                            value={user.first_name + ' ' + user.last_name}
                            ref={ref}
                            disabled
                            {...register('staff_id')}
                          />
                          {/* <FaEdit onClick={() => setEditPhone(!editPhone)} /> */}
                        </div>
                      )}
                    />
                    <div className="d-flex justify-content-between">
                      <small className="text-red font-weight-semi">{errors?.staff_id?.message}</small>
                    </div>
                  </Form.Group>
                </div>
              </Row>

              <Row>
                <div className="col-md-6 ">
                  <Form.Group className="mb-2 font-18px">
                    <Form.Label className="label-input">
                      District &nbsp;<span className="text-danger">*</span>
                    </Form.Label>
                    <Controller
                      name="district"
                      control={control}
                      render={({ field: { onChange, onBlur, value, ref, disabled } }) => (
                        <Select
                          isDisabled={city ? false : true}
                          options={distrists}
                          onChange={(options) => {
                            onChange(options?.value);
                            setValue('district', options.label);
                            handleGetWards(options?.value);
                          }}
                          theme={(theme) => ({
                            ...theme,
                            colors: {
                              ...theme.colors,
                              primary25: '#ffffff',
                              primary50: '##3ca9d5',
                              primary: '#3ca9d5',
                            },
                          })}
                        />
                      )}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-between">
                    <small className="text-red font-12px">{errors?.cities?.message}</small>
                  </div>
                </div>
                <div className="col-md-6 ">
                  <Form.Group className="mb-2 font-18px">
                    <Form.Label className="label-input">
                      Ward &nbsp;<span className="text-danger">*</span>
                    </Form.Label>
                    <Controller
                      name="ward"
                      control={control}
                      render={({ field: { onChange, onBlur, value, ref, disabled } }) => (
                        <Select
                          isDisabled={district ? false : true}
                          options={wards}
                          onChange={(options) => {
                            onChange(options?.value);
                            setValue('ward', options.label);
                          }}
                          theme={(theme) => ({
                            ...theme,
                            colors: {
                              ...theme.colors,
                              primary25: '#ffffff',
                              primary50: '##3ca9d5',
                              primary: '#3ca9d5',
                            },
                          })}
                        />
                      )}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-between">
                    <small className="text-red font-12px">{errors?.cities?.message}</small>
                  </div>
                </div>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label className="label-input">Address</Form.Label>
                <Controller
                  control={control}
                  name="address"
                  defaultValue=""
                  {...register('address')}
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
            </div>
          </div>
        </Form>
      </div>
      <div className="row mb-5">
        <div className="col-md-5">
          <h4 className="text-center mb-2">List product</h4>
          <div className="wrap-table-checkout-cart">
            <table className="table-checkout-cart text-center">
              <thead>
                <tr className="table_head">
                  <th className="column-1">#</th>
                  <th className="column-2">Image</th>
                  <th className="column-3">Name</th>
                  <th className="column-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {listProduct !== null &&
                  listProduct.data.map((item, index) => {
                    return (
                      <tr className="table_row cursor-pointer" key={index} onClick={() => handleAddProduct(item)}>
                        <td className="column-1">{index + 1}</td>
                        <td className="column-2">
                          <div className="how-itemcheckout">
                            <ImageCustom src={item.image} alt="IMG" />
                          </div>
                        </td>
                        <td className="column-3">{item.name}</td>
                        <td className="column-4">{formatter.format(item.price)}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-7 ">
          <h4 className="text-center mb-2">Information Order</h4>
          <div className="row">
            <div className="wrap-table-checkout-cart">
              <table className="table-checkout-cart text-center">
                <thead>
                  <tr className="table_head">
                    {/* <th className="column-1">#</th> */}
                    <th className="column-1">Image</th>
                    <th className="column-2">Name</th>
                    <th className="column-3">Quantity </th>
                    <th className="column-4">Price</th>
                    <th className="column-5">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {listAddProduct !== null &&
                    listAddProduct
                      .map((item, index) => {
                        return (
                          <tr className="table_row cursor-pointer" key={index}>
                            {/* <td className="column-1">{(count = count + 1)}</td> */}
                            <td className="column-2">
                              <div className="how-itemcheckout">
                                <ImageCustom src={item.data.image} alt="IMG" />
                              </div>
                            </td>
                            <td className="column-3">{item.data.name}</td>
                            <td className="column-3">{item.qty}</td>
                            <td className="column-4">{formatter.format(item.data.price)}</td>
                            <td className="column-4 text-danger" onClick={() => handleRemoveProduct(item.data.id)}>
                              Remove
                            </td>
                          </tr>
                        );
                      })
                      .sort()
                      .reverse()}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row mt-3">
            <div>
              <h4 className="text-end">
                Total price: <span>{formatter.format(totalPrice1)}</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderAdd;
