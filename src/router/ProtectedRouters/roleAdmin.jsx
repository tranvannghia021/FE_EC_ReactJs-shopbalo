// Check login authentication

import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { checkLogin } from '../../adapter/auth';
import { handleGetInformation } from '../../api/Admin/Auth';
import NotFoundData from '../../components/commons/Layouts/NotFoundData';
import { getUserSelector } from '../../redux/selectors';
// import { checkLogin } from '../../api/Auth';

export function RoleAdminRoutes(props) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const handleGetUser = async () => {
      const response = await handleGetInformation();
      if (response === 401) {
        setLoading(false);
        return 401;
      } else {
        setLoading(false);
        setUser(response);
      }
    };
    handleGetUser();
  }, [dispatch]);
  return (
    user !== null &&
    user.role_permissions.map((item) => {
      if (item.permission_id === props.userRole) {
        return <Outlet />;
      }
    })
  );
  // const user = useSelector(getUserSelector);

  // props.userRole === user.role_id ? <Outlet /> : <NotFoundData />;
}
