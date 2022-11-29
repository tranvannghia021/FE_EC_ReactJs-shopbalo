// Check login authentication

import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { checkLoginClient } from '../../adapter/auth';

export function ProtectedRoutesClient(props) {
  const isAuthenticate = checkLoginClient();
  return isAuthenticate ? <Outlet /> : <Navigate to="/login" />;
}
