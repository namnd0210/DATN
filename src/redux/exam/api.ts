import Axios, { AxiosResponse } from 'axios';

export const getAllExamsApi = (): Promise<AxiosResponse> => {
  return Axios.get('/api/exam');
};

export const createExamApi = (data: any): Promise<AxiosResponse> => {
  return Axios.post('/api/exam', data);
};

export const updateExamApi = (data: any): Promise<AxiosResponse> => {
  return Axios.put(`/api/exam/update`, data);
};

export const deleteExamApi = (id: string): Promise<AxiosResponse> => {
  return Axios.delete(`/api/exam/${id}`);
};
