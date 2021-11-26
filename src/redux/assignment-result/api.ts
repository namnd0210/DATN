import Axios, { AxiosResponse } from 'axios';

export const getAllAssignmentResultsApi = (): Promise<AxiosResponse> => {
  return Axios.get('/api/assignment-result');
};

export const getAssignmentResultByUserIdApi = (id: string): Promise<AxiosResponse> => {
  return Axios.get(`/api/assignment-result/user/${id}`);
};

export const getAssignmentResultByAssignmentIdApi = (id: string): Promise<AxiosResponse> => {
  return Axios.get(`/api/assignment-result/assignment/${id}`);
};

export const createAssignmentResultApi = (data: any): Promise<AxiosResponse> => {
  return Axios.post('/api/assignment-result', data);
};

export const updateAssignmentResultApi = (data: any): Promise<AxiosResponse> => {
  return Axios.put(`/api/assignment-result/update`, data);
};

export const deleteAssignmentResultApi = (id: string): Promise<AxiosResponse> => {
  return Axios.delete(`/api/assignment-result/${id}`);
};
