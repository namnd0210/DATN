import { Action } from 'types/redux';

import types from './type';

export const getAllAssignments = (data?: any): Action => ({
  type: types.GET_ALL_ASSIGNMENTS,
  payload: data,
});

export const getAllAssignmentsResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.GET_ALL_ASSIGNMENTS_SUCCESS : types.GET_ALL_ASSIGNMENTS_FAILED,
  payload: result,
});

export const getAllAssignmentByUserId = (data: any): Action => ({
  type: types.GET_ALL_ASSIGNMENT_BY_USER_ID,
  payload: data,
});

export const getAllAssignmentByUserIdResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.GET_ALL_ASSIGNMENT_BY_USER_ID_SUCCESS : types.GET_ALL_ASSIGNMENT_BY_USER_ID_FAILED,
  payload: result,
});

export const createAssignment = (data: any): Action => ({
  type: types.CREATE_ASSIGNMENT,
  payload: data,
});

export const createAssignmentResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.CREATE_ASSIGNMENT_SUCCESS : types.CREATE_ASSIGNMENT_FAILED,
  payload: result,
});

export const updateAssignment = (data: any): Action => ({
  type: types.UPDATE_ASSIGNMENT,
  payload: data,
});

export const updateAssignmentResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.UPDATE_ASSIGNMENT_SUCCESS : types.UPDATE_ASSIGNMENT_FAILED,
  payload: result,
});

export const deleteAssignment = (data: any): Action => ({
  type: types.DELETE_ASSIGNMENT,
  payload: data,
});

export const deleteAssignmentResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.DELETE_ASSIGNMENT_SUCCESS : types.DELETE_ASSIGNMENT_FAILED,
  payload: result,
});
