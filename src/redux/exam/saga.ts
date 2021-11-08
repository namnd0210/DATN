import { all, call, put, takeEvery } from 'redux-saga/effects';

import { createExamResult, deleteExamResult, getAllExamsResult, getExamByIdResult, updateExamResult } from './actions';
import { createExamApi, deleteExamApi, getAllExamsApi, getExamByIdApi, updateExamApi } from './api';
import types from './type';

function* getAllExamsSaga(): any {
  try {
    const res = yield call(getAllExamsApi);
    if (res.status === 200) {
      yield put(getAllExamsResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(getAllExamsResult(error, isSuccess));
  }
}

function* getExamByIdSaga(props: any): any {
  try {
    const res = yield call(getExamByIdApi, props.payload);
    if (res.status === 200) {
      yield put(getExamByIdResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(getExamByIdResult(error, isSuccess));
  }
}

function* createExamSaga(props: any): any {
  try {
    const res = yield call(createExamApi, props.payload);
    if (res.status === 200) {
      yield put(createExamResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(createExamResult(error, isSuccess));
  }
}

function* updateExamSaga(props: any): any {
  try {
    const res = yield call(updateExamApi, props.payload);
    if (res.status === 200) {
      yield put(updateExamResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(updateExamResult(error, isSuccess));
  }
}

function* deleteExamSaga(props: any): any {
  try {
    const res = yield call(deleteExamApi, props.payload);
    console.log(props.payload);
    if (res.status === 200) {
      yield put(deleteExamResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(deleteExamResult(error, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(types.GET_ALL_EXAMS, getAllExamsSaga)]);
  yield all([takeEvery(types.GET_EXAM_BY_ID, getExamByIdSaga)]);
  yield all([takeEvery(types.CREATE_EXAM, createExamSaga)]);
  yield all([takeEvery(types.UPDATE_EXAM, updateExamSaga)]);
  yield all([takeEvery(types.DELETE_EXAM, deleteExamSaga)]);
}
