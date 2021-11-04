import Axios, { AxiosResponse } from 'axios';

export const getAllClassesApi = (): Promise<AxiosResponse> => {
  return Axios.get('/api/class');
};

export const createClassApi = (data: any): Promise<AxiosResponse> => {
  return Axios.post('/api/class', data);
};

export const updateClassApi = (data: any): Promise<AxiosResponse> => {
  return Axios.put(`/api/class/update`, data);
};

export const deleteClassApi = (id: string): Promise<AxiosResponse> => {
  return Axios.delete(`/api/class/${id}`);
};
