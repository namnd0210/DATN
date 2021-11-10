import Axios, { AxiosResponse } from 'axios';

export const getAllResultsApi = (): Promise<AxiosResponse> => {
  return Axios.get('/api/result');
};

export const getResultByUserIdApi = (id: string): Promise<AxiosResponse> => {
  return Axios.get(`/api/result/user/${id}`);
};

export const createResultApi = (data: any): Promise<AxiosResponse> => {
  return Axios.post('/api/result', data);
};

export const updateResultApi = (data: any): Promise<AxiosResponse> => {
  return Axios.put(`/api/result/update`, data);
};

export const deleteResultApi = (id: string): Promise<AxiosResponse> => {
  return Axios.delete(`/api/result/${id}`);
};
