// @flow
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { checkLoginClient } from '../../../../adapter/auth';
import FormForgotPWClient from '../../../../components/client/Auth/ForgotPassword';
import FormNewPasswordClient from '../../../../components/client/Auth/ForgotPassword/newpassword';
import FormLogin from '../../../../components/client/Auth/Login';
import { isForgotPasswordSelectorClient, isForgotPasswordVerifiedSelectorClient } from '../../../../redux/selectors';
import './style.css';
export function LoginPage() {
  const isForgotPasswordClient = useSelector(isForgotPasswordSelectorClient);
  const isForgotPasswordVerifiedClient = useSelector(isForgotPasswordVerifiedSelectorClient);
  const isLogin = checkLoginClient();
  return (
    <>
      {!isLogin ? (
        <section>
          <div className="mt-3">
            {isForgotPasswordClient ? (
              isForgotPasswordVerifiedClient ? (
                <FormNewPasswordClient />
              ) : (
                <FormForgotPWClient />
              )
            ) : (
              <FormLogin />
            )}
          </div>
        </section>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
