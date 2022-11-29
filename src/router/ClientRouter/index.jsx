import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ClientLayout } from '../../layouts/Client';
import { AboutPage } from '../../pages/Client/AboutPage';
import { CartPage } from '../../pages/Client/CartPage';
import { ProductPage } from '../../pages/Client/ProductPage';
import { ProfilePage } from '../../pages/Client/ProfilePage';
import ProductDetailPage from '../../pages/Client/ProductDetailPage';
import { LoginPage } from '../../pages/Client/AuthPage/Login';
import { RegisterPage } from '../../pages/Client/AuthPage/Register';
import { HomePage } from '../../pages/Client/HomePage';
import { ContactPage } from '../../pages/Client/ContactPage';
import { ProtectedRoutesClient } from '../ProtectedRouters/indexClient';
import { handleGetMeClient } from '../../adapter/auth';
import { deleteCookieClient, getCookiesClient } from '../../api/Client/Auth/authAPI';
import { setClient, setIsLoginClient } from '../../redux/reducer/auth/auth.reducer';
import { useDispatch } from 'react-redux';
import { CheckOutPage } from '../../pages/Client/CheckoutPage';
import { HistoryOrderPage } from '../../pages/Client/HistoryPage';
import { setProfile } from '../../redux/reducer/profile/profile.reducer';

function ClientRouter(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    handleGetMeClient().then((result) => {
      if (result === 401) {
        const token = getCookiesClient('tokenClient');
        dispatch(setIsLoginClient(false));

        if (token) {
          deleteCookieClient('tokenClient');
        }
      } else {
        // dispatch(setIsLoginClient(true));
        dispatch(setProfile(result));
      }
    });
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<ClientLayout slot={<HomePage key={'a'} />} />} />
      <Route path="/product" element={<ClientLayout slot={<ProductPage key={'1'} />} />} />
      <Route path="/product/:id" element={<ClientLayout slot={<ProductDetailPage key={'1'} />} />} />
      <Route path="/about" element={<ClientLayout slot={<AboutPage key={'a'} />} />} />
      <Route path="/contact" element={<ClientLayout slot={<ContactPage key={'a'} />} />} />
      <Route path="/my-account" element={<ClientLayout slot={<ProfilePage key={'a'} />} />} />
      <Route path="/cart" element={<ClientLayout slot={<CartPage key={'a'} />} />} />

      <Route path="/cart" element={<ClientLayout slot={<CartPage key={'a'} />} />} />
      {/* Requỉed login */}
      <Route element={<ProtectedRoutesClient />}>
        <Route path="/my-account" element={<ClientLayout slot={<ProfilePage key={'a'} />} />} />
        <Route path="/checkout" element={<ClientLayout slot={<CheckOutPage key={'a'} />} />} />
        <Route path="/history" element={<ClientLayout slot={<HistoryOrderPage key={'a'} />} />} />
      </Route>
    </Routes>
  );
}

export default ClientRouter;
