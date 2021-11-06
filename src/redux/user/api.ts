import Axios, { AxiosResponse } from 'axios';
import { CategoryProps } from 'types/redux';

import { buildApiUrl } from './../../utils/index';

export const getAllUsersApi = (params: { role: number; page: number }): Promise<AxiosResponse> => {
  return Axios.get(`/api/user/${buildApiUrl(params)}`);
};

export const createUserApi = (data: CategoryProps): Promise<AxiosResponse> => {
  return Axios.post('/api/user', data);
};

export const updateUserApi = (data: CategoryProps): Promise<AxiosResponse> => {
  return Axios.put(`/api/user/update`, data);
};

export const deleteUserApi = (id: string): Promise<AxiosResponse> => {
  return Axios.delete(`/api/user/${id}`);
};
