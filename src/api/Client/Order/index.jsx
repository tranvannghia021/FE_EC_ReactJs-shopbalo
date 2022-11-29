import axiosClient from '../../axiosClient';
import { concatQueryString } from '../../../utils/concatQueryString';
import { getCookiesClient } from '../Auth/authAPI';

export const configHeadersAuthenticate = () => {
  const token = getCookiesClient('tokenClient');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllOrderByCustomer = async ({ filterId, filterStatus } = {}) => {
  const url = '/api/client/order';
  const queryString = [];
  if (filterStatus) {
    queryString.push(`filter[status]=${filterStatus}`);
  }
  if (filterId) {
    queryString.push(`filter[customer_id]=${filterId}`);
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

export const getOrderDetailById = async (id) => {
  const url = `/api/client/order/${id}?order_details`;
  const response = await axiosClient.get(url, configHeadersAuthenticate());
  if (response.status === 'success') {
    return response.data;
  } else if (response.status === 401) {
    return 401;
  } else {
    return {};
  }
};

export const addOrder = async (body) => {
  const url = '/api/client/order';
  console.log(body);
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
