import Axios, { AxiosResponse } from 'axios';

import { buildApiUrl } from './../utils/index';

export const getCommentApi = (ids: string[]): Promise<AxiosResponse> => {
  return Axios.get(`/api/comment${buildApiUrl(ids)}`);
};

export const createClassApi = (data: any): Promise<AxiosResponse> => {
  return Axios.post('/api/class', data);
};

// add comment to assignment and assignment result
const useComment = () => {
  return {};
};

export default useComment;
