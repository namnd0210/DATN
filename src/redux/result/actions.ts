import { Action } from 'types/redux';

import types from './type';

export const getAllResults = (data?: any): Action => ({
  type: types.GET_ALL_RESULTS,
  payload: data,
});

export const getAllResultsResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.GET_ALL_RESULTS_SUCCESS : types.GET_ALL_RESULTS_FAILED,
  payload: result,
});

export const getResultById = (data: any): Action => ({
  type: types.GET_RESULT_BY_ID,
  payload: data,
});

export const getResultByIdResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.GET_RESULT_BY_ID_SUCCESS : types.GET_RESULT_BY_ID_FAILED,
  payload: result,
});

export const createResult = (data: any): Action => ({
  type: types.CREATE_RESULT,
  payload: data,
});

export const createResultResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.CREATE_RESULT_SUCCESS : types.CREATE_RESULT_FAILED,
  payload: result,
});

export const updateResult = (data: any): Action => ({
  type: types.UPDATE_RESULT,
  payload: data,
});

export const updateResultResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.UPDATE_RESULT_SUCCESS : types.UPDATE_RESULT_FAILED,
  payload: result,
});

export const deleteResult = (data: any): Action => ({
  type: types.DELETE_RESULT,
  payload: data,
});

export const deleteResultResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.DELETE_RESULT_SUCCESS : types.DELETE_RESULT_FAILED,
  payload: result,
});
