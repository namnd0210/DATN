import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
  createAssignmentResultResult,
  deleteAssignmentResultResult,
  getAllAssignmentResultsResult,
  getAssignmentResultByUserIdResult,
  updateAssignmentResultResult,
} from './actions';
import {
  createAssignmentResultApi,
  deleteAssignmentResultApi,
  getAllAssignmentResultsApi,
  getAssignmentResultByUserIdApi,
  updateAssignmentResultApi,
} from './api';
import types from './type';

function* getAllResultsSaga(): any {
  try {
    const res = yield call(getAllAssignmentResultsApi);
    if (res.status === 200) {
      yield put(getAllAssignmentResultsResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(getAllAssignmentResultsResult(error, isSuccess));
  }
}

function* getResultByUserIdSaga(props: any): any {
  try {
    const res = yield call(getAssignmentResultByUserIdApi, props.payload.id);
    if (res.status === 200) {
      yield put(getAssignmentResultByUserIdResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(getAssignmentResultByUserIdResult(error, isSuccess));
  }
}

function* createResultSaga(props: any): any {
  try {
    const res = yield call(createAssignmentResultApi, props.payload);
    if (res.status === 200) {
      yield put(createAssignmentResultResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(createAssignmentResultResult(error, isSuccess));
  }
}

function* updateResultSaga(props: any): any {
  try {
    const res = yield call(updateAssignmentResultApi, props.payload);
    if (res.status === 200) {
      yield put(updateAssignmentResultResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(updateAssignmentResultResult(error, isSuccess));
  }
}

function* deleteResultSaga(props: any): any {
  try {
    const res = yield call(deleteAssignmentResultApi, props.payload);
    console.log(props.payload);
    if (res.status === 200) {
      yield put(deleteAssignmentResultResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(deleteAssignmentResultResult(error, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(types.GET_ALL_ASSIGNMENT_RESULTS, getAllResultsSaga)]);
  yield all([takeEvery(types.GET_ASSIGNMENT_RESULT_BY_USER_ID, getResultByUserIdSaga)]);
  yield all([takeEvery(types.CREATE_ASSIGNMENT_RESULT, createResultSaga)]);
  yield all([takeEvery(types.UPDATE_ASSIGNMENT_RESULT, updateResultSaga)]);
  yield all([takeEvery(types.DELETE_ASSIGNMENT_RESULT, deleteResultSaga)]);
}
