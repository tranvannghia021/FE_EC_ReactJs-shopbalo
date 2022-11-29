import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCookieClient, getCookiesClient, handleGetInformationClient } from '../../../api/Client/Auth/authAPI';
import { getAllDiscountQueryPoint } from '../../../api/Client/Discount';
import { getDetailProductById } from '../../../api/Client/Home/productDetailAPI';
import InfoPromotion from '../../../components/client/Checkout/InfoPromotion';
import FormInfomationCheckout from '../../../components/client/Checkout/InformationOrder';
import ListTableProductCheckOut from '../../../components/client/Checkout/ListTableProduct';
import NotFoundData from '../../../components/commons/Layouts/NotFoundData';
import Skeleton from '../../../components/commons/Layouts/Skeleton';
import { cartSelector } from '../../../redux/selectors';
import { profileSelector } from '../../../redux/selectors/profile/profile.selector';
import { formatter } from '../../../utils/formatCurrency';

export function CheckOutPage() {
  const [total, setTotal] = useState([]);
  // const dataCartList = useSelector(cartSelector);
  // const [listCartProduct, setListCartProduct] = useState([]);
  const [dataProfile, setDataProfile] = useState('');
  const [loading, setLoading] = useState(false);
  const listCartProduct = JSON.parse(localStorage.getItem('cart'));

  // listCartProduct1 !== null && setListCartProduct(listCartProduct1.cart.cartData);
  // const getInfoProductWithID = async (id) => {
  //   const result = await getDetailProductById(id);
  //   if (result === 401) {
  //     return false;
  //   } else if (result === 500) {
  //     return false;
  //   } else {
  //     return result;
  //   }
  // };
  // const handleGetDataProduct = async (dataCart, callback, callback2) => {
  //   let data = dataCart.map(async (item) => await getInfoProductWithID(item.id));
  //   let temp = await Promise.all(data);
  //   const remakedata = temp.map((item, index) => {
  //     return { ...item, quantity_cart: dataCart[index].qty };
  //   });
  //   callback(remakedata);
  //   callback2(remakedata.reduce((acc, item) => acc + item.price * item.quantity_cart, 0));
  //   setLoading(false);
  // };

  const dispatch = useDispatch();
  // const dataProfile = useSelector(profileSelector);
  useEffect(() => {
    // (async () => await handleGetDataProduct(dataCartList, setListCartProduct, setTotal))();
    const handleGetInformationCL = async () => {
      const result = await handleGetInformationClient();
      if (result === 401) {
        handleSetUnthorization();
        window.location.href = '/login';
        return false;
      } else if (result === 500) {
        return false;
      } else {
        setDataProfile(result);
      }
      // setLoading(false);
    };
    handleGetInformationCL();
  }, [dispatch]);
  const handleSetUnthorization = () => {
    const token = getCookiesClient('tokenClient');
    if (token) {
      deleteCookieClient('tokenClient');
    }
  };

  return (
    <section>
      <div className="container-fluid  animsition ">
        <div className="container">
          <div className="row">
            <h3 className="mb-5">Checkout</h3>
          </div>
          {listCartProduct !== null && listCartProduct.cart.cartData ? (
            <>
              <div className="row">
                <div className="col-md-7 ">
                  {loading ? (
                    <Skeleton column={6} />
                  ) : (
                    <ListTableProductCheckOut dataListCart={listCartProduct.cart.cartData} totalCart={total} />
                  )}
                </div>
                <div className="col-md-5">
                  {dataProfile != '' ? (
                    <InfoPromotion dataListCart={listCartProduct} dataProfile={dataProfile} totalCart={total} />
                  ) : (
                    <Skeleton column={6} />
                  )}
                </div>
              </div>
              <div className="row mb-5">
                <div className="col-md-12">
                  <h4 className=" mt-5 text-center font-weight-bold mb-3 mt-1 text-black">Order Infomation</h4>
                  {dataProfile != '' ? (
                    <FormInfomationCheckout
                      dataListCart={listCartProduct.cart.cartData}
                      dataProfile={dataProfile}
                      totalCart="0"
                    />
                  ) : (
                    <Skeleton column={6} />
                  )}
                </div>
              </div>
            </>
          ) : (
            <NotFoundData btnLink="Purchase" />
          )}
        </div>
      </div>
    </section>
  );
}
