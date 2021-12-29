import Axios, { AxiosResponse } from 'axios';
import { buildApiUrl } from 'utils';

export const getAllQuestionsApi = (query?: any): Promise<AxiosResponse> => {
  return Axios.get(`/api/question${buildApiUrl(query)}`);
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

export const importQuestionCsvApi = (data: any): Promise<AxiosResponse> => {
  return Axios.post('/api/question/csv', data, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};
