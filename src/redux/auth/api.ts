import axios, { AxiosResponse } from 'axios';
import { LoginProps } from 'types/redux';
import { buildApiUrl } from 'utils';

export const loginApi = (data: LoginProps): Promise<AxiosResponse> =>
  axios.post('/api/user/login', data);
