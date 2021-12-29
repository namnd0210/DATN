import types from 'redux/question/type';
import { Action } from 'types/redux';

export const getAllQuestions = (data?: any): Action => ({
  type: types.GET_ALL_QUESTIONS,
  payload: data,
});

export const getAllQuestionsResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.GET_ALL_QUESTIONS_SUCCESS : types.GET_ALL_QUESTIONS_FAILED,
  payload: result,
});

export const createQuestion = (data: any): Action => ({
  type: types.CREATE_QUESTION,
  payload: data,
});

export const createQuestionResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.CREATE_QUESTION_SUCCESS : types.CREATE_QUESTION_FAILED,
  payload: result,
});

export const updateQuestion = (data: any): Action => ({
  type: types.UPDATE_QUESTION,
  payload: data,
});

export const updateQuestionResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.UPDATE_QUESTION_SUCCESS : types.UPDATE_QUESTION_FAILED,
  payload: result,
});

export const deleteQuestion = (data: any): Action => ({
  type: types.DELETE_QUESTION,
  payload: data,
});

export const deleteQuestionResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.DELETE_QUESTION_SUCCESS : types.DELETE_QUESTION_FAILED,
  payload: result,
});

export const importQuestionCsv = (data: any): Action => ({
  type: types.IMPORT_QUESTION_CSV,
  payload: data,
});

export const importQuestionCsvResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.IMPORT_QUESTION_CSV_SUCCESS : types.IMPORT_QUESTION_CSV_FAILED,
  payload: result,
});
