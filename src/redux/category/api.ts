import Axios, { AxiosResponse } from 'axios';
import { CategoryProps } from 'types/redux';

export const getAllCategoryApi = (): Promise<AxiosResponse> => {
  return Axios.get('/api/category');
};

export const createCategoryApi = (data: CategoryProps): Promise<AxiosResponse> => {
  return Axios.post('/api/category', data);
};

export const updateCategoryApi = (data: CategoryProps): Promise<AxiosResponse> => {
  return Axios.put(`/api/category/update`, data);
};

export const deleteCategoryApi = (id: string): Promise<AxiosResponse> => {
  return Axios.delete(`/api/category/${id}`);
};
