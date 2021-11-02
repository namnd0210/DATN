import Axios, { AxiosResponse } from 'axios';
import { LoginProps } from 'types/redux';

export const loginApi = (data: LoginProps): Promise<AxiosResponse> => {
  return Axios.post('/api/user/login', data);
};

export const registerApi = (data: LoginProps): Promise<AxiosResponse> => {
  return Axios.post('/api/user/register', data);
};

// export const logoutApi = (data: LoginProps): Promise<AxiosResponse> => {
//   return Axios.post('/api/user/logout', data);
// };
