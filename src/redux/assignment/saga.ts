import { message } from 'antd';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
  createAssignmentResult,
  deleteAssignmentResult,
  getAllAssignmentByUserIdResult,
  getAllAssignmentsResult,
  getAssignmentByIdResult,
  updateAssignmentResult,
} from './actions';
import {
  createAssignmentApi,
  deleteAssignmentApi,
  getAllAssignmentByUserIdApi,
  getAllAssignmentsApi,
  getAssignmentByIdApi,
  updateAssignmentApi,
} from './api';
import types from './type';

function* getAllAssignmentsSaga(): any {
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

function* getAssignmentByIdSaga(props: any): any {
  try {
    const res = yield call(getAssignmentByIdApi, props.payload);
    if (res.status === 200) {
      yield put(getAssignmentByIdResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(getAssignmentByIdResult(error, isSuccess));
  }
}

function* getAllAssignmentByUserIdSaga(props: any): any {
  try {
    const res = yield call(getAllAssignmentByUserIdApi, props.payload);
    if (res.status === 200) {
      yield put(getAllAssignmentByUserIdResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(getAllAssignmentByUserIdResult(error, isSuccess));
  }
}

function* createAssignmentSaga(props: any): any {
  try {
    const res = yield call(createAssignmentApi, props.payload);
    if (res.status === 200) {
      yield put(createAssignmentResult(res.data));
      message.success('Thêm thành công');
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    message.error('Thêm thất bại');
    yield put(createAssignmentResult(error, isSuccess));
  }
}

function* updateAssignmentSaga(props: any): any {
  try {
    const res = yield call(updateAssignmentApi, props.payload);
    if (res.status === 200) {
      yield put(updateAssignmentResult(res.data));
      message.success('Cập nhật thành công');
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    message.error('Cập nhật thất bại');
    yield put(updateAssignmentResult(error, isSuccess));
  }
}

function* deleteAssignmentSaga(props: any): any {
  try {
    const res = yield call(deleteAssignmentApi, props.payload);
    console.log(props.payload);
    if (res.status === 200) {
      yield put(deleteAssignmentResult(res.data));
      message.success('Xóa thành công');
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    message.error('Xoá thất bại');
    yield put(deleteAssignmentResult(error, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(types.GET_ALL_ASSIGNMENTS, getAllAssignmentsSaga)]);
  yield all([takeEvery(types.GET_ALL_ASSIGNMENT_BY_USER_ID, getAllAssignmentByUserIdSaga)]);
  yield all([takeEvery(types.GET_ASSIGNMENT_BY_ID, getAssignmentByIdSaga)]);
  yield all([takeEvery(types.CREATE_ASSIGNMENT, createAssignmentSaga)]);
  yield all([takeEvery(types.UPDATE_ASSIGNMENT, updateAssignmentSaga)]);
  yield all([takeEvery(types.DELETE_ASSIGNMENT, deleteAssignmentSaga)]);
}
