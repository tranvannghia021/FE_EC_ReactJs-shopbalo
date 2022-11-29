// @flow
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { checkLogin } from '../../../adapter/auth';
import FormForgotPW from '../../../components/commons/Auth/ForgotPassword';
import FormNewPassword from '../../../components/commons/Auth/ForgotPassword/newpassword';
import FormLogin from '../../../components/commons/Auth/Login';
import { isForgotPasswordSelector, isForgotPasswordVerifiedSelector } from '../../../redux/selectors';
import './style.css';
export function LoginPage(props) {
  const isAuthenticated = checkLogin();
  const isForgotPassword = useSelector(isForgotPasswordSelector);
  const isForgotPasswordVerified = useSelector(isForgotPasswordVerifiedSelector);
  return (
    <>
      {!isAuthenticated ? (
        <section className="section-login">
          <div className="sl-box">
            <h4 className="mt-2 font-weight-bold text-center">
              {isForgotPassword ? 'Forgot Password' : 'Welcome back'}
            </h4>
            {!isForgotPassword ? (
              <h6 className="mt-2">
                Login to your&nbsp;<span className="font-weight-bold">account</span>
              </h6>
            ) : isForgotPasswordVerified ? (
              <h6 className="mt-2 p-0">Please enter your OTP and Password New</h6>
            ) : (
              <h6 className="mt-2 p-0">Please enter your email</h6>
            )}

            <div className="mt-3">
              {isForgotPassword ? isForgotPasswordVerified ? <FormNewPassword /> : <FormForgotPW /> : <FormLogin />}
            </div>
          </div>
        </section>
      ) : (
        <Navigate to="/admin/" />
      )}
    </>
  );
}
