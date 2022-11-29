import { getCookies } from '../Auth';
import { concatQueryString } from '../../../utils/concatQueryString';
import axiosClient from '../../axiosClient';
export const configHeadersAuthenticate = () => {
  const token = getCookies('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllReviews = async ({ sortPoint, sortStatus, search, page } = {}) => {
  const url = '/api/admin/rating';
  const queryString = [];
  if (sortPoint && sortPoint.length > 0) queryString.push(`sortPoint=${sortPoint}`);
  if (sortStatus) queryString.push(`sortStatus=${sortStatus}`);
  if (search) queryString.push(`q=${search}`);
  if (page) queryString.push(`page=${page}`);

  const final_url = concatQueryString(queryString, url);
  const response = await axiosClient.get(final_url, configHeadersAuthenticate());
  if (response.status === 200) return response.data;
  else if (response.status === 404) return 404;
  else if (response.status === 401) return 401;
  else return 500;
};

export const getReviewById = async (id) => {
  const url = `/api/admin/rating/${id}`;
  const response = await axiosClient.get(url, configHeadersAuthenticate());
  if (response.status === 200) return response.data;
  else if (response.status === 404) return 404;
  else if (response.status === 401) return 401;
  else return 500;
};

export const addReview = async (data) => {
  const url = `/api/admin/rating`;
  const response = await axiosClient.post(url, data, configHeadersAuthenticate());
  if (response.status === 200) return response.data;
  else if (response.status === 404) return 404;
  else if (response.status === 401) return 401;
  else return 500;
};

export const editReview = async (id, data) => {
  const url = `/api/admin/rating/${id}`;
  const response = await axiosClient.put(url, data, configHeadersAuthenticate());
  if (response.status === 200) return response;
  else if (response.status === 404) return 404;
  else if (response.status === 401) return 401;
  else return 500;
};

export const deleteReview = async (id) => {
  const url = `/api/admin/rating/${id}`;
  const response = await axiosClient.delete(url, configHeadersAuthenticate());
  if (response.status === 200) return 200;
  else if (response.status === 404) return 404;
  else if (response.status === 401) return 401;
  else return 500;
};
