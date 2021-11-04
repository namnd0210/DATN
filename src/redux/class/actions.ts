import types from 'redux/class/type';
import { Action } from 'types/redux';

export const getAllClasses = (data: any): Action => ({
  type: types.GET_ALL_CLASSES,
  payload: data,
});

export const getAllClassesResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.GET_ALL_CLASSES_SUCCESS : types.GET_ALL_CLASSES_FAILED,
  payload: result,
});

export const createClass = (data: any): Action => ({
  type: types.CREATE_CLASS,
  payload: data,
});

export const createClassResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.CREATE_CLASS_SUCCESS : types.CREATE_CLASS_FAILED,
  payload: result,
});

export const updateClass = (data: any): Action => ({
  type: types.UPDATE_CLASS,
  payload: data,
});

export const updateClassResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.UPDATE_CLASS_SUCCESS : types.UPDATE_CLASS_FAILED,
  payload: result,
});

export const deleteClass = (data: any): Action => ({
  type: types.DELETE_CLASS,
  payload: data,
});

export const deleteClassResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.DELETE_CLASS_SUCCESS : types.DELETE_CLASS_FAILED,
  payload: result,
});
