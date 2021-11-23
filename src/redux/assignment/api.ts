import Axios, { AxiosResponse } from 'axios';

export const getAllAssignmentsApi = (): Promise<AxiosResponse> => {
  return Axios.get('/api/assignment');
};

export const getAllAssignmentByUserIdApi = (id: string): Promise<AxiosResponse> => {
  return Axios.get(`/api/assignment/${id}`);
};

export const createAssignmentApi = (data: any): Promise<AxiosResponse> => {
  return Axios.post('/api/assignment', data);
};

export const updateAssignmentApi = (data: any): Promise<AxiosResponse> => {
  return Axios.put(`/api/assignment/update`, data);
};

export const deleteAssignmentApi = (id: string): Promise<AxiosResponse> => {
  return Axios.delete(`/api/assignment/${id}`);
};
