import { Action } from 'types/redux';

import types from './type';

export const getAllAssignmentResults = (data?: any): Action => ({
  type: types.GET_ALL_ASSIGNMENT_RESULTS,
  payload: data,
});

export const getAllAssignmentResultsResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.GET_ALL_ASSIGNMENT_RESULTS_SUCCESS : types.GET_ALL_ASSIGNMENT_RESULTS_FAILED,
  payload: result,
});

export const getAssignmentResultByUserId = (data: any): Action => ({
  type: types.GET_ASSIGNMENT_RESULT_BY_USER_ID,
  payload: data,
});

export const getAssignmentResultByUserIdResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.GET_ASSIGNMENT_RESULT_BY_USER_ID_SUCCESS : types.GET_ASSIGNMENT_RESULT_BY_USER_ID_FAILED,
  payload: result,
});

export const createAssignmentResult = (data: any): Action => ({
  type: types.CREATE_ASSIGNMENT_RESULT,
  payload: data,
});

export const createAssignmentResultResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.CREATE_ASSIGNMENT_RESULT_SUCCESS : types.CREATE_ASSIGNMENT_RESULT_FAILED,
  payload: result,
});

export const updateAssignmentResult = (data: any): Action => ({
  type: types.UPDATE_ASSIGNMENT_RESULT,
  payload: data,
});

export const updateAssignmentResultResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.UPDATE_ASSIGNMENT_RESULT_SUCCESS : types.UPDATE_ASSIGNMENT_RESULT_FAILED,
  payload: result,
});

export const deleteAssignmentResult = (data: any): Action => ({
  type: types.DELETE_ASSIGNMENT_RESULT,
  payload: data,
});

export const deleteAssignmentResultResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.DELETE_ASSIGNMENT_RESULT_SUCCESS : types.DELETE_ASSIGNMENT_RESULT_FAILED,
  payload: result,
});
