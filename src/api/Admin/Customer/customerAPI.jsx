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

export const getAllCustomers = async ({ sort, filterStatus, filterRole, filter, search, page, getAll } = {}) => {
  const url = '/api/admin/customer';
  const queryString = [];
  if (sort && sort.length > 0) {
    sort.forEach((item) => {
      queryString.push(`sort[${titleToSlug(item.key)}]=${item.value}`);
    });
  }
  if (search) {
    queryString.push(`${filter}=${search}`);
  }
  if (page) {
    queryString.push(`page=${page}`);
  }

  if (filterStatus === 1 || filterStatus === 0) {
    queryString.push(`filter[status]=${filterStatus}`);
  }
  if (filterRole) {
    queryString.push(`filter[category_id]=${filterRole}`);
  }
  if (getAll) {
    queryString.push(`get-all`);
  }
  const final_url = concatQueryString(queryString, url);
  //console.log(final_url)
  const reponse = await axiosClient.get(final_url, configHeadersAuthenticate());
  if (reponse.status === 401) {
    return 401;
  } else if (reponse.status === 'success') {
    return reponse.data;
  } else {
    return 500;
  }
};

export const getCustomerById = async (id) => {
  const url = `/api/admin/customer/${id}`;
  const response = await axiosClient.get(url, configHeadersAuthenticate());
  if (response.status === 'success') {
    return response.data;
  } else if (response.status === 401) {
    return 401;
  } else {
    return {};
  }
};
export const addCustomer = async (body) => {
  const url = '/api/admin/customer';
  //check email and phonenumber existance
  const email = body.email;
  const phoneNumber = body.phone;
  const check_email_existence = await getAllCustomersWithEmailAndPhone({ email, phoneNumber });
  if (check_email_existence === 401) return 401;
  if (check_email_existence.data.length > 0) return 402;
  else {
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
  }
};

export const editCustomer = async (id, body) => {
  const url = `/api/admin/customer/${id}`;
  if (body.email || body.phone) {
    const check_email_existence = await getAllCustomersWithEmailAndPhone({
      email: body.email,
      phoneNumber: body.phone,
    });
    if (check_email_existence === 401) return 401;
    if (check_email_existence.data.length > 0) return 402;
  }
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
export const deleteCustomer = async (id) => {
  const url = `/api/admin/customer/${id}`;
  const response = await axiosClient.delete(url, configHeadersAuthenticate());
  if (response.status === 401) {
    return 401;
  } else if (response.status === 'Success') {
    return 200;
  } else if (response.status === 500) {
    return 500;
  } else {
    return 404;
  }
};
export const getAllCustomersWithEmailAndPhone = async ({ email, phoneNumber } = {}) => {
  const url = '/api/admin/customer';
  const queryString = [];
  if (email) {
    queryString.push(`email=${email}`);
  }
  if (phoneNumber) {
    queryString.push(`phone=${phoneNumber}`);
  }

  const final_url = concatQueryString(queryString, url);
  // console.log(final_url)
  const reponse = await axiosClient.get(final_url, configHeadersAuthenticate());
  if (reponse.status === 401) {
    return 401;
  } else if (reponse.status === 'success') {
    return reponse.data;
  } else {
    return 500;
  }
};
