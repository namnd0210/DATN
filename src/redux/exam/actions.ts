import { Action } from 'types/redux';

import types from './type';

export const getAllExams = (data?: any): Action => ({
  type: types.GET_ALL_EXAMS,
  payload: data,
});

export const getAllExamsResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.GET_ALL_EXAMS_SUCCESS : types.GET_ALL_EXAMS_FAILED,
  payload: result,
});

export const getExamById = (data: any): Action => ({
  type: types.GET_EXAM_BY_ID,
  payload: data,
});

export const getExamByIdResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.GET_EXAM_BY_ID_SUCCESS : types.GET_EXAM_BY_ID_FAILED,
  payload: result,
});

export const createExam = (data: any): Action => ({
  type: types.CREATE_EXAM,
  payload: data,
});

export const createExamResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.CREATE_EXAM_SUCCESS : types.CREATE_EXAM_FAILED,
  payload: result,
});

export const createRandomExam = (data: any): Action => ({
  type: types.CREATE_RANDOM_EXAM,
  payload: data,
});

export const createRandomExamResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.CREATE_RANDOM_EXAM_SUCCESS : types.CREATE_RANDOM_EXAM_FAILED,
  payload: result,
});

export const updateExam = (data: any): Action => ({
  type: types.UPDATE_EXAM,
  payload: data,
});

export const updateExamResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.UPDATE_EXAM_SUCCESS : types.UPDATE_EXAM_FAILED,
  payload: result,
});

export const deleteExam = (data: any): Action => ({
  type: types.DELETE_EXAM,
  payload: data,
});

export const deleteExamResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.DELETE_EXAM_SUCCESS : types.DELETE_EXAM_FAILED,
  payload: result,
});
