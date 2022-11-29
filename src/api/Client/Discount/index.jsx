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

export const getAllDiscountQueryPoint = async ({ filterPoint } = {}) => {
  const url = '/api/client/discount?filter[point]=' + filterPoint;
  const reponse = await axiosClient.get(url);
  if (reponse.status === 401) {
    return 401;
  } else if (reponse.status === 'success') {
    return reponse.data;
  } else {
    return 500;
  }
};
