import axiosClient from '../../axiosClient';
import { concatQueryString } from '../../../utils/concatQueryString';
// import { getCookies } from '../Auth';

// export const configHeadersAuthenticate = () => {
//   const token = getCookies('token');
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };

export const getAllSlider = async () => {
  const url = '/api/client/slider';

  const response = await axiosClient.get(url);

  if (response.status === 200) {
    return response.data;
  } else {
    return 401;
  }
};

export const getAllCategory = async () => {
  const url = '/api/client/category';

  const response = await axiosClient.get(url);

  if (response.status === 200) {
    return response.data;
  } else {
    return 401;
  }
};

export const getAllProducts = async ({
  sell,
  sortById,
  page,
  filter,
  start_price,
  end_price,
  per_page,
  dataSearch,
  sortByPrice,
} = {}) => {
  const url = '/api/client/product';
  const queryString = [];
  if (sell) queryString.push(`sell=${sell}`);
  if (sortById && sortById.length > 0) queryString.push(`sort[id]=${sortById}`);
  if (page) queryString.push(`page=${page}`);
  if (filter) queryString.push(`filter[category_id]=${filter}`);
  if (start_price) queryString.push(`start_price=${start_price}`);
  if (end_price) queryString.push(`end_price=${end_price}`);
  if (per_page) queryString.push(`per_page=${per_page}`);
  if (dataSearch) queryString.push(`search=${dataSearch}`);
  if (sortByPrice) queryString.push(`sort_price=${sortByPrice}`);

  const final_url = concatQueryString(queryString, url);
  const response = await axiosClient.get(final_url);

  if (response.status === 200) {
    return response.data;
  } else {
    return 401;
  }
};