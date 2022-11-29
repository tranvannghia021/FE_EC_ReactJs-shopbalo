import axiosClient from '../../axiosClient';
import { concatQueryString } from '../../../utils/concatQueryString';
import { getCookies } from '../Auth';

export const configHeadersAuthenticate = () => {
  const token = getCookies('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllDisount = async ({ sort, status, search, page } = {}) => {
  const url = '/api/admin/discount';
  const queryString = [];
  if (sort && sort.length > 0) queryString.push(`sortValue=${sort}`);
  if (search) queryString.push(`q=${search}`);
  if (status) queryString.push(`status=${status}`);
  if (page) queryString.push(`page=${page}`);

  const final_url = concatQueryString(queryString, url);
  const response = await axiosClient.get(final_url, configHeadersAuthenticate());

  if (response.status === 200) {
    return response.data;
  } else {
    return 401;
  }
};

export const getDiscountById = async (id) => {
  const url = `/api/admin/discount/${id}`;
  const response = await axiosClient.get(url, configHeadersAuthenticate());
  if (response.status === 200) {
    return response.data;
  } else {
    return 401;
  }
};

export const addDiscount = async (data) => {
  const url = `/api/admin/discount`;
  const response = await axiosClient.post(url, data, configHeadersAuthenticate());
  if (response.status === 401) {
    return 401;
  } else {
    return response;
  }
};

export const editDiscount = async (id, data) => {
  const url = `/api/admin/discount/${id}`;
  const response = await axiosClient.put(url, data, configHeadersAuthenticate());
  if (response.status === 200) {
    return 200;
  } else if (response.status === 500) {
    return 500;
  } else if (response.status === 401) {
    return 401;
  } else {
    return 404;
  }
};

export const deletePromotion = async (id) => {
  const url = `/api/admin/discount/${id}`;
  const res = await axiosClient.delete(url, configHeadersAuthenticate());
  if (res.status === 200) {
    return 200;
  }
  return 401;
};
