import { concatQueryString } from '../../../utils/concatQueryString';
import { getCookies } from '../Auth';

import axiosClient from '../../axiosClient';

export const configHeadersAuthenticate = () => {
  const token = getCookies('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAll = async ({ sort_id, search, status, page } = {}) => {
  const url = '/api/admin/category';
  const queryString = [];
  if (sort_id) queryString.push(`sort_id=${sort_id}`);
  if (search) queryString.push(`q=${search}`);
  if (status) queryString.push(`status=${status}`);
  if (page) queryString.push(`page=${page}`);

  const final_url = concatQueryString(queryString, url);
  const reponse = await axiosClient.get(final_url, configHeadersAuthenticate());

  if (reponse.status === 200) {
    return reponse.data;
  } else {
    return 401;
  }
};
export const getAllNotPage = async () => {
  const url = '/api/admin/category?get_all';
  const reponse = await axiosClient.get(url, configHeadersAuthenticate());

  if (reponse.status === 200) {
    return reponse.data;
  } else {
    return 401;
  }
};
export const addCategory = async (data) => {
  const url = '/api/admin/category';

  const reponse = await axiosClient.post(url, data, configHeadersAuthenticate());

  if (reponse.status === 200) {
    return reponse;
  } else {
    return 401;
  }
};
export const showCategory = async (id) => {
  const url = `/api/admin/category/${id}`;
  const res = await axiosClient.get(url, configHeadersAuthenticate());
  if (res.status === 200) {
    return res.data;
  }
  return 401;
};
export const updateCategory = async (id, data) => {
  const url = `/api/admin/category/${id}`;
  const res = await axiosClient.put(url, data, configHeadersAuthenticate());
  if (res.status === 200) {
    return 200;
  }
  return 401;
};
export const destroyCategory = async (id) => {
  const url = `/api/admin/category/${id}`;
  const res = await axiosClient.delete(url, configHeadersAuthenticate());
  if (res.status === 200) {
    return { status: 200, message: res.message };
  }
  return { status: 401, message: res.message };
};
export const forgotCategory = async (id) => {
  const url = `/api/admin/category/${id}/forgot`;
  const res = await axiosClient.delete(url, configHeadersAuthenticate());
  if (res.status === 200) {
    return 200;
  }
  return 401;
};
