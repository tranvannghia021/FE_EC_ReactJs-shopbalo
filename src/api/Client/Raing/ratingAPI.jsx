import axiosClient from '../../axiosClient';

export const getRatingWithProductID = async (id) => {
  const url = `/api/client/rating?filter=${id}`;
  //console.log(url)
  const response = await axiosClient.get(url);

  if (response.status === 200) {
    return response.data;
  } else if (response.status === 500) {
    return 500;
  } else {
    return {};
  }
};

export const addRattingProduct = async (body) => {
  const url = `/api/client/rating`;
  //console.log(url)
  const response = await axiosClient.post(url, body);
  if (response.status === 200) {
    return response;
  } else if (response.status === 500) {
    return 500;
  } else {
    return {};
  }
};
