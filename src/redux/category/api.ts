import Axios, { AxiosResponse } from 'axios';
import { CategoryProps } from 'types/redux';

export const getAllCategoryApi = (): Promise<AxiosResponse> => {
  return Axios.get('/api/category/login');
};

export const createCategoryApi = (data: CategoryProps): Promise<AxiosResponse> => {
  return Axios.post('/api/category', data);
};

export const updateCategoryApi = (data: CategoryProps): Promise<AxiosResponse> => {
  return Axios.put('/api/category/:id', data);
};

export const deleteCategoryApi = (data: CategoryProps): Promise<AxiosResponse> => {
  return Axios.delete('/api/category/:id');
};
