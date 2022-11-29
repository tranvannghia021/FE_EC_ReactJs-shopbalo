import { CITIES, DISTRICTS, WARDS } from '../../utils/urlPath';
import axiosClient from '../axiosClient';

export const getAllCities = async () => {
  const url = CITIES;
  const response = await axiosClient.get(url);
  return response;
};
export const getAllDictrists = async (id) => {
  const url = DISTRICTS + id + '.json';
  const response = await axiosClient.get(url);
  return response;
};
export const getAllWards = async (id) => {
  const url = WARDS + id + '.json';
  const response = await axiosClient.get(url);
  return response;
};
