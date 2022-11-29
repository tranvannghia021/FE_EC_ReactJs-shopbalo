import axiosClient from '../axiosClient';

export const getStorageImage = async params => {
  const url = `api/storage/${params}`;
  const reponse = await axiosClient.get(url);
  if (reponse.status === 401) {
    return 401;
  } else if (reponse.status === 'success') {
    return reponse.data.data[0];
  } else {
    return 500;
  }
};
