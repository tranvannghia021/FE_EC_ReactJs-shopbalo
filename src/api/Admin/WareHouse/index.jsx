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

export const getAllStorage = async ({ sort, search, page } = {}) => {
  const url = '/api/admin/warehouse/storage';
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
export const getAllImportHistory = async ({ sort, search, page } = {}) => {
  const url = '/api/admin/warehouse/storage';
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
  queryString.push('listimport');
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

export const getAllExportHistory = async ({ sort, search, page } = {}) => {
  const url = '/api/admin/warehouse/storage';
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
  queryString.push('listexport');
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

export const getAllProvider = async ({ sort, search, page } = {}) => {
  const url = '/api/admin/warehouse/provider';
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
  queryString.push('listimport');
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
//   const response = await axiosClient.get(url, configHeadersAuthenticate());
//   if (response.status === 'success') {
//     return response.data;
//   } else if (response.status === 401) {
//     return 401;
//   } else {
//     return {};
//   }
// };

export const importStorage = async (body) => {
  const url = '/api/admin/warehouse/storage';
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
export const exportStorage = async (body) => {
  const url = '/api/admin/warehouse/storage?exportstorage';
  const response = await axiosClient.post(url, body, configHeadersAuthenticate());
  return response;
};

export const getAmountImport = async ({ start,end } = {}) => {
  const url = '/api/admin/warehouse/amount-import';
  const queryString = [];
  if (start && end) {
    queryString.push(`start=${start}`);
    queryString.push(`end=${end}`);
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
export const getAmountExport = async ({ start,end } = {}) => {
  const url = '/api/admin/warehouse/amount-export';
  const queryString = [];
  if (start && end) {
    queryString.push(`start=${start}`);
    queryString.push(`end=${end}`);
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
// export const editProduct = async (id, body) => {
//   const url = `/api/admin/product/${id}`;
//   const response = await axiosClient.put(url, body, configHeadersAuthenticate());
//   if (response.status === 401) {
//     return 401;
//   } else if (response.status === 'Success') {
//     return 200;
//   } else if (response.status === 500) {
//     return 500;
//   } else {
//     return 404;
//   }
// };
