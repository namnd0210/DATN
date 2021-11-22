import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
  createAssignmentResult,
  deleteAssignmentResult,
  getAllAssignmentsResult,
  updateAssignmentResult,
} from './actions';
import { createAssignmentApi, deleteAssignmentApi, getAllAssignmentsApi, updateAssignmentApi } from './api';
import types from './type';

function* getAllResultsSaga(): any {
  try {
    const res = yield call(getAllAssignmentsApi);
    if (res.status === 200) {
      yield put(getAllAssignmentsResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(getAllAssignmentsResult(error, isSuccess));
  }
}

function* createAssignmentSaga(props: any): any {
  try {
    const res = yield call(createAssignmentApi, props.payload);
    if (res.status === 200) {
      yield put(createAssignmentResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(createAssignmentResult(error, isSuccess));
  }
}

function* updateAssignmentSaga(props: any): any {
  try {
    const res = yield call(updateAssignmentApi, props.payload);
    if (res.status === 200) {
      yield put(updateAssignmentResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(updateAssignmentResult(error, isSuccess));
  }
}

function* deleteAssignmentSaga(props: any): any {
  try {
    const res = yield call(deleteAssignmentApi, props.payload);
    console.log(props.payload);
    if (res.status === 200) {
      yield put(deleteAssignmentResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(deleteAssignmentResult(error, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(types.GET_ALL_ASSIGNMENTS, getAllResultsSaga)]);
  yield all([takeEvery(types.CREATE_ASSIGNMENT, createAssignmentSaga)]);
  yield all([takeEvery(types.UPDATE_ASSIGNMENT, updateAssignmentSaga)]);
  yield all([takeEvery(types.DELETE_ASSIGNMENT, deleteAssignmentSaga)]);
}
