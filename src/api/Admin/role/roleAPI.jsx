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
export const getAllRoles = async ({ sort, filterStatus, search, page } = {}) => {
  const url = '/api/admin/role';
  const queryString = [];
  if (sort && sort.length > 0) {
    sort.forEach((item) => {
      queryString.push(`sort[${titleToSlug(item.key)}]=${item.value}`);
    });
  }
  if (filterStatus === 'Active' || filterStatus === 'InActive') {
    queryString.push(`filter[status]=${filterStatus}`);
  }
  if (search) {
    queryString.push(`name=${search}`);
  }
  if (page) {
    queryString.push(`page=${page}`);
  }

  const final_url = concatQueryString(queryString, url);
  console.log(final_url);
  const reponse = await axiosClient.get(final_url, configHeadersAuthenticate());
  if (reponse.status === 401) {
    return 401;
  } else if (reponse.status === 'success') {
    return reponse.data;
  } else {
    return 500;
  }
};
export const getRoleById = async (id) => {
  const url = `/api/admin/role/${id}`;
  const response = await axiosClient.get(url, configHeadersAuthenticate());
  if (response.status === 'success') {
    return response.data;
  } else if (response.status === 401) {
    return 401;
  } else {
    return {};
  }
};

export const addRole = async (body) => {
  const url = '/api/admin/role';

    const response = await axiosClient.post(url, body, configHeadersAuthenticate());
  console.log(response);
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

export const editRole = async (id, body) => {
  const url = `/api/admin/role/${id}`;
  console.log(url);
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
export const deleteRole = async (id) => {
  const url = `/api/admin/role/${id}`;
  const response = await axiosClient.delete(url, configHeadersAuthenticate());
  console.log(response)
  console.log(url);
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
export const getAllPermissions = async () => {
  const url = '/api/admin/permission';
  const queryString = [];
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