import * as yup from 'yup';
import { deleteCookie, getCookies, handleGetInformation, handleLogin1 } from '../../api/Admin/Auth';
import { handleGetInformationClient } from '../../api/Client/Auth/authAPI';
import { BlockUI } from '../../components/commons/Layouts/Notiflix';
export const schemaLogin = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();
export const schemaForgotPW = yup
  .object({
    email: yup.string().required(),
  })
  .required();

export const schemaForgotNewPW = yup
  .object({
    otp: yup.number().required(),
    password: yup.string().required(),
  })
  .required();
export const checkLogin = () => {
  const token = getCookies('token');
  // const getMe = handleGetMe();
  // console.log('fe', getMe);
  // console.log('tike', getMe);
  // if (token) {
  //   console.log('token', token);
  //   // if (getMe === 401) {
  //   //   console.log('dhk');
  //   //   deleteCookie('token');
  //   //   return false;
  //   // } else {
  //   //   console.log('eh');
  //   //   return true;
  //   // }
  // } else {
  //   console.log('dhk');
  //   return false;
  // }
  return token ? true : false;
};
export const handleGetMe = async () => {
  const response = await handleGetInformation();
  if (response === 401) {
    return 401;
  } else {
    return response;
  }
};

export const checkLoginClient = () => {
  const getTokenClient = getCookies('tokenClient');
  return getTokenClient ? true : false;
};
export const handleGetMeClient = async () => {
  const response = await handleGetInformationClient();
  if (response === 401) {
    return 401;
  } else {
    return response;
  }
};
