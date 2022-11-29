// @flow
import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { checkLoginClient } from '../../../../adapter/auth';
import FormRegister from '../../../../components/client/Auth/Register';
export function RegisterPage() {
  const checkLogin = checkLoginClient();
  return (
    <>
      {!checkLogin ? (
        <section>
          <FormRegister />;
        </section>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
