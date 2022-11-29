import Notiflix from 'notiflix';
import { ErrorToast, SuccessToast } from '../../../components/commons/Layouts/Alerts';
import axiosClient from '../../axiosClient';

export const setCookiesClient = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
};
export const getCookiesClient = (cname) => {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  if (decodedCookie) {
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
  }

  return '';
};
export const deleteCookieClient = (name) => {
  document.cookie = setCookiesClient(name, '', -1);
};

export const configHeadersAuthenticate = () => {
  const token = getCookiesClient('tokenClient');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const handleRegisterClientAPI = async (body) => {
  const response = await axiosClient.post('api/client/register', body);
  if (response.status === 200) {
    return 200;
  } else {
    return 403;
  }
};

export const handleLoginClientAPI = async (body) => {
  const url = 'api/client/login';
  const response = await axiosClient.post(url, body);
  if (response.status === 200) {
    return response;
  } else if (response.status === 401) {
    return 401;
  } else {
    return 403;
  }
};

export const handleGetInformationClient = async () => {
  const response = await axiosClient.get('api/client/getme', configHeadersAuthenticate());
  if (response.status === 401) {
    return 401;
  }
  if (response.status === 'success') {
    return response.data;
  }
};

export const logoutClient = async () => {
  const response = await axiosClient.post('api/client/logout', {}, configHeadersAuthenticate());
  const { status } = response;
  // console.log('dhgj', status);
  switch (status) {
    case 'success':
      SuccessToast('Logout successfully', 1000);
      return 200;
    case 401:
      Notiflix.Block.remove('.modal-content');
      return 401;
    default:
      ErrorToast(3500, 'Server error. Please try again');
      Notiflix.Block.remove('.modal-content');
      return 500;
  }
};

export const senMailOTPClient = async (body) => {
  const response = await axiosClient.post('api/client/otp-sendmail', body);
  if (response.status === 200) {
    return 200;
  } else if (response.status === 404) {
    return 404;
  } else if (response.status === 400) {
    return 400;
  }
};

export const forgotPasswordClient = async (body) => {
  const response = await axiosClient.put('api/client/forgot-password', body);
  if (response.status === 'success') {
    return 200;
  } else {
    return 403;
  }
};

export const editProfile = async (id, body) => {
  const url = `/api/client/updateprofile/${id}`;
  const response = await axiosClient.put(url, body, configHeadersAuthenticate());
  if (response.status === 401) {
    return 401;
  } else if (response.status === 'success') {
    return 200;
  } else if (response.status === 500) {
    return 500;
  } else {
    return 404;
  }
};
