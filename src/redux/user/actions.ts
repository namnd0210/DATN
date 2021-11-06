import { Action } from 'types/redux';

import types from './type';

export const getAllUsers = (data?: any): Action => ({
  type: types.GET_ALL_USERS,
  payload: data,
});

export const getAllUsersResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.GET_ALL_USERS_SUCCESS : types.GET_ALL_USERS_FAILED,
  payload: result,
});

export const createUser = (data: any): Action => ({
  type: types.CREATE_USER,
  payload: data,
});

export const createUserResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.CREATE_USER_SUCCESS : types.CREATE_USER_FAILED,
  payload: result,
});

export const updateUser = (data: any): Action => ({
  type: types.UPDATE_USER,
  payload: data,
});

export const updateUserResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.UPDATE_USER_SUCCESS : types.UPDATE_USER_FAILED,
  payload: result,
});

export const deleteUser = (data: any): Action => ({
  type: types.DELETE_USER,
  payload: data,
});

export const deleteUserResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.DELETE_USER_SUCCESS : types.DELETE_USER_FAILED,
  payload: result,
});
