import types from 'redux/auth/type';
import { Action } from 'types/redux';

export const login = (data: { email: string; password: string }, setLoginErr?: (value: boolean) => void): Action => ({
  type: types.LOGIN,
  payload: { data, setLoginErr },
});

export const register = (data: { name: string; username: string; email: string; password: string }): Action => ({
  type: types.REGISTER,
  payload: { data },
});
