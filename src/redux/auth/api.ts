import Axios, { AxiosResponse } from 'axios';
import { LoginProps } from 'types/redux';
import { buildApiUrl } from 'utils';

export const loginApi = (data: LoginProps): Promise<AxiosResponse> => {
  return Axios.post('/api/user/login', data);
};

export const registerApi = (data: LoginProps): Promise<AxiosResponse> => {
  return Axios.post('/api/user/register', data);
};
