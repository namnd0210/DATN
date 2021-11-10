import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
  createResultResult,
  deleteResultResult,
  getAllResultsResult,
  getResultByUserIdResult,
  updateResultResult,
} from './actions';
import { createResultApi, deleteResultApi, getAllResultsApi, getResultByUserIdApi, updateResultApi } from './api';
import types from './type';

function* getAllResultsSaga(): any {
  try {
    const res = yield call(getAllResultsApi);
    if (res.status === 200) {
      yield put(getAllResultsResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(getAllResultsResult(error, isSuccess));
  }
}

function* getResultByUserIdSaga(props: any): any {
  try {
    const res = yield call(getResultByUserIdApi, props.payload.id);
    if (res.status === 200) {
      yield put(getResultByUserIdResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(getResultByUserIdResult(error, isSuccess));
  }
}

function* createResultSaga(props: any): any {
  try {
    const res = yield call(createResultApi, props.payload);
    if (res.status === 200) {
      yield put(createResultResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(createResultResult(error, isSuccess));
  }
}

function* updateResultSaga(props: any): any {
  try {
    const res = yield call(updateResultApi, props.payload);
    if (res.status === 200) {
      yield put(updateResultResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(updateResultResult(error, isSuccess));
  }
}

function* deleteResultSaga(props: any): any {
  try {
    const res = yield call(deleteResultApi, props.payload);
    console.log(props.payload);
    if (res.status === 200) {
      yield put(deleteResultResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(deleteResultResult(error, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(types.GET_ALL_RESULTS, getAllResultsSaga)]);
  yield all([takeEvery(types.GET_RESULT_BY_USER_ID, getResultByUserIdSaga)]);
  yield all([takeEvery(types.CREATE_RESULT, createResultSaga)]);
  yield all([takeEvery(types.UPDATE_RESULT, updateResultSaga)]);
  yield all([takeEvery(types.DELETE_RESULT, deleteResultSaga)]);
}
