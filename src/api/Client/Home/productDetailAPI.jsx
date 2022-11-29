import axiosClient from '../../axiosClient';

export const getDetailProductById = async (id) => {
  const url = `/api/client/product/${id}`;
  const response = await axiosClient.get(url);
  if (response.status === 200) {
    return response.data;
  } else if (response.status === 500) {
    return 500;
  } else {
    return {};
  }
};
export const getRelateProducts = async (id) => {
  const url = `/api/client/product?filter[category_id]=${id}`;
  const response = await axiosClient.get(url);

  if (response.status === 200) {
    return response.data;
  } else if (response.status === 500) {
    return 500;
  } else {
    return {};
  }
};
