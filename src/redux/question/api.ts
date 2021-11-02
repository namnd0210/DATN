import Axios, { AxiosResponse } from 'axios';

export const getAllQuestionsApi = (): Promise<AxiosResponse> => {
  return Axios.get('/api/question');
};

export const createQuestionApi = (data: any): Promise<AxiosResponse> => {
  return Axios.post('/api/question', data);
};

export const updateQuestionApi = (data: any): Promise<AxiosResponse> => {
  return Axios.put(`/api/question/update`, data);
};

export const deleteQuestionApi = (id: string): Promise<AxiosResponse> => {
  return Axios.delete(`/api/question/${id}`);
};
