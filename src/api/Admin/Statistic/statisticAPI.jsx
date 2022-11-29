import { titleToSlug } from '../../../utils/titleToSlug';
import { concatQueryString } from '../../../utils/concatQueryString';
import axiosClient from '../../axiosClient';
import { getCookies } from '../Auth';

export const configHeadersAuthenticate = () => {
  const token = getCookies('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const getStatistisOrder = async ({ filter } = {}) => {
  const url = '/api/admin/statistics/order';
  const queryString = [];

  if (filter) {
    queryString.push(`filter=${filter}`);
  }
  const final_url = concatQueryString(queryString, url);
  //console.log(final_url);
  const reponse = await axiosClient.get(final_url, configHeadersAuthenticate());
  if (reponse.status === 401) {
    return 401;
  } else if (reponse.status === 'success') {
    return reponse.data;
  } else {
    return 500;
  }
};
export const getStatistisRevenue = async ({ filter, search } = {}) => {
  const url = '/api/admin/statistics/revenue';
  const queryString = [];

  if (filter) {
    queryString.push(`filter=${filter}`);
  }
  const final_url = concatQueryString(queryString, url);
  //console.log(final_url);
  const reponse = await axiosClient.get(final_url, configHeadersAuthenticate());
  if (reponse.status === 401) {
    return 401;
  } else if (reponse.status === 'success') {
    return reponse.data;
  } else {
    return 500;
  }
};
export const getStatisticStaff = async ({ filter } = {}) => {
  const url = '/api/admin/statistics/staff';
  const queryString = [];

  if (filter) {
    queryString.push(`filter=${filter}`);
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
export const getStatisticCustomer = async ({ filter } = {}) => {
  const url = '/api/admin/statistics/customer';
  const queryString = [];

  if (filter) {
    queryString.push(`filter=${filter}`);
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
export const getStatistisCategory = async ({ filterStatus, filter, search } = {}) => {
  const url = '/api/admin/statistics/category-sell';
  const queryString = [];

  if (search) {
    queryString.push(`${filter}=${search}`);
  }
  if (filterStatus === 1 || filterStatus === 0) {
    queryString.push(`filter[status]=${filterStatus}`);
  }
  const final_url = concatQueryString(queryString, url);
  // console.log(final_url);
  const reponse = await axiosClient.get(final_url, configHeadersAuthenticate());
  if (reponse.status === 401) {
    return 401;
  } else if (reponse.status === 'success') {
    return reponse.data;
  } else {
    return 500;
  }
};

export const getFigureNewOrderToday = async () => {
  const url = '/api/admin/statistics/order-today';
  const reponse = await axiosClient.get(url, configHeadersAuthenticate());
  if (reponse.status === 401) {
    return 401;
  } else if (reponse.status === 'success') {
    return reponse.data;
  } else {
    return 500;
  }
};
export const getFigureRevenueToday = async () => {
  const url = '/api/admin/statistics/revenue-today';
  const reponse = await axiosClient.get(url, configHeadersAuthenticate());
  if (reponse.status === 401) {
    return 401;
  } else if (reponse.status === 'success') {
    return reponse.data;
  } else {
    return 500;
  }
};
export const getFigureNewCustomer = async () => {
  const url = '/api/admin/statistics/newcustomer';
  const reponse = await axiosClient.get(url, configHeadersAuthenticate());
  if (reponse.status === 401) {
    return 401;
  } else if (reponse.status === 'success') {
    return reponse.data;
  } else {
    return 500;
  }
};
