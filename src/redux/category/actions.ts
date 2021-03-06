import types from 'redux/category/type';
import { Action } from 'types/redux';

export const getAllCategory = (data?: any): Action => ({
  type: types.GET_ALL_CATEGORY,
  payload: data,
});

export const getAllCategoryResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.GET_ALL_CATEGORY_SUCCESS : types.GET_ALL_CATEGORY_FAILED,
  payload: result,
});

export const createCategory = (data: any): Action => ({
  type: types.CREATE_CATEGORY,
  payload: data,
});

export const createCategoryResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.CREATE_CATEGORY_SUCCESS : types.CREATE_CATEGORY_FAILED,
  payload: result,
});

export const updateCategory = (data: any): Action => ({
  type: types.UPDATE_CATEGORY,
  payload: data,
});

export const updateCategoryResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.UPDATE_CATEGORY_SUCCESS : types.UPDATE_CATEGORY_FAILED,
  payload: result,
});

export const deleteCategory = (data: any): Action => ({
  type: types.DELETE_CATEGORY,
  payload: data,
});

export const deleteCategoryResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.DELETE_CATEGORY_SUCCESS : types.DELETE_CATEGORY_FAILED,
  payload: result,
});
