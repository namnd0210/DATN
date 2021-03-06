import types from 'redux/auth/type';
import { Action } from 'types/redux';
import setAuthToken from 'utils/setTokenAuth';

export const login = (data: { email: string; password: string }, setLoginErr?: (value: boolean) => void): Action => ({
  type: types.LOGIN,
  payload: { data, setLoginErr },
});

export const loginResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.LOGIN_SUCCESS : types.LOGIN_FAILED,
  payload: result,
});

export const setCurrentUser = (decoded: any) => {
  return {
    type: types.SET_CURRENT_USER,
    payload: decoded,
  };
};

export const register = (data: { name: string; username: string; email: string; password: string }): Action => ({
  type: types.REGISTER,
  payload: { data },
});

export const registerResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.REGISTER_SUCCESS : types.REGISTER_FAILED,
  payload: result,
});

export const getAllClassesByUserId = (payload: any): Action => ({
  type: types.GET_ALL_CLASSES_BY_USER_ID,
  payload,
});

export const getAllClassesByUserIdResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.GET_ALL_CLASSES_BY_USER_ID_SUCCESS : types.GET_ALL_CLASSES_BY_USER_ID_FAILED,
  payload: result,
});

export const logout = () => {
  localStorage.removeItem('token');
  setAuthToken(false);

  return {
    type: types.LOGOUT,
  };
};
