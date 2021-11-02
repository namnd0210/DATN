import { all, call, put, takeEvery } from 'redux-saga/effects';

import { createQuestionResult, deleteQuestionResult, getAllQuestionsResult, updateQuestionResult } from './actions';
import { createQuestionApi, deleteQuestionApi, getAllQuestionsApi, updateQuestionApi } from './api';
import types from './type';

function* getAllQuestionsSaga(): any {
  try {
    const res = yield call(getAllQuestionsApi);
    if (res.status === 200) {
      yield put(getAllQuestionsResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(getAllQuestionsResult(error, isSuccess));
  }
}

function* createQuestionSaga(props: any): any {
  try {
    const res = yield call(createQuestionApi, props.payload);
    if (res.status === 200) {
      yield put(createQuestionResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(createQuestionResult(error, isSuccess));
  }
}

function* updateQuestionSaga(props: any): any {
  try {
    const res = yield call(updateQuestionApi, props.payload);
    if (res.status === 200) {
      console.log(res);
      yield put(updateQuestionResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(updateQuestionResult(error, isSuccess));
  }
}

function* deleteQuestionSaga(props: any): any {
  try {
    const res = yield call(deleteQuestionApi, props.payload);
    console.log(props.payload);
    if (res.status === 200) {
      console.log(res);
      yield put(deleteQuestionResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(deleteQuestionResult(error, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(types.GET_ALL_QUESTIONS, getAllQuestionsSaga)]);
  yield all([takeEvery(types.CREATE_QUESTION, createQuestionSaga)]);
  yield all([takeEvery(types.UPDATE_QUESTION, updateQuestionSaga)]);
  yield all([takeEvery(types.DELETE_QUESTION, deleteQuestionSaga)]);
}
