// import React from 'react';
import { concatQueryString } from '../../../utils/concatQueryString';
import { titleToSlug } from '../../../utils/titleToSlug';
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

export const getAllOrder = async ({ sort, filterStatus, filterCategory, search, page } = {}) => {
  const url = '/api/admin/order';
  const queryString = [];
  if (sort && sort.length > 0) {
    sort.forEach((item) => {
      queryString.push(`sort[${titleToSlug(item.key)}]=${item.value}`);
    });
  }
  if (search) {
    queryString.push(`search=${search}`);
  }
  if (page) {
    queryString.push(`page=${page}`);
  }
  if (filterStatus) {
    queryString.push(`filter[status]=${filterStatus}`);
  }
  if (filterCategory) {
    queryString.push(`filter[category_id]=${filterCategory}`);
  }
  const final_url = concatQueryString(queryString, url);
  const reponse = await axiosClient.get(final_url, configHeadersAuthenticate());
  if (reponse.status === 401) {
    return 401;
  } else if (reponse.status === 'success') {
    return reponse.data;
  } else {
    return 500;
  }
};

// export const getProductById = async (id) => {
//   const url = `/api/admin/product/${id}`;
//   const response = await axiosClient.get(url);
//   if (response.status === 'success') {
//     return response.data;
//   } else if (response.status === 401) {
//     return 401;
//   } else {
//     return {};
//   }
// };
// export const addProduct = async (body) => {
//   const url = '/api/admin/product';
//   const response = await axiosClient.post(url, body);
//   if (response.status === 401) {
//     return 401;
//   } else if (response.status === 'success') {
//     return 200;
//   } else if (response.status === 500) {
//     return 500;
//   } else {
//     return 404;
//   }
// };
export const getOrderById = async (id) => {
  const url = `/api/admin/order/${id}`;
  const response = await axiosClient.get(url, configHeadersAuthenticate());
  if (response.status === 'success') {
    return response.data;
  } else if (response.status === 401) {
    return 401;
  } else {
    return {};
  }
};
export const getOrderDetailById = async (id) => {
  const url = `/api/admin/order/${id}?order_details`;
  const response = await axiosClient.get(url, configHeadersAuthenticate());
  if (response.status === 'success') {
    return response.data;
  } else if (response.status === 401) {
    return 401;
  } else {
    return {};
  }
};
export const updateStatusOrder = async (id, body) => {
  const url = `/api/admin/order/${id}`;
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

export const addOrderAdmin = async (body) => {
  const url = '/api/admin/order';
  const response = await axiosClient.post(url, body, configHeadersAuthenticate());
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
