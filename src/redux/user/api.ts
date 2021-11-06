import Axios, { AxiosResponse } from 'axios';
import { CategoryProps } from 'types/redux';

export const getAllUsersApi = (): Promise<AxiosResponse> => {
  return Axios.get('/api/user');
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
