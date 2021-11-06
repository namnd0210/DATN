import { all, call, put, takeEvery } from 'redux-saga/effects';

import { createUserResult, deleteUserResult, getAllUsersResult, updateUserResult } from './actions';
import { createUserApi, deleteUserApi, getAllUsersApi, updateUserApi } from './api';
import types from './type';

function* getAllUsersSaga(): any {
  console.log('tessss');
  try {
    const res = yield call(getAllUsersApi);
    if (res.status === 200) {
      yield put(getAllUsersResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(getAllUsersResult(error, isSuccess));
  }
}

function* createUserSaga(props: any): any {
  try {
    const res = yield call(createUserApi, props.payload);
    if (res.status === 200) {
      yield put(createUserResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(createUserResult(error, isSuccess));
  }
}

function* updateUserSaga(props: any): any {
  try {
    const res = yield call(updateUserApi, props.payload);
    if (res.status === 200) {
      yield put(updateUserResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(updateUserResult(error, isSuccess));
  }
}

function* deleteUserSaga(props: any): any {
  try {
    const res = yield call(deleteUserApi, props.payload);
    console.log(props.payload);
    if (res.status === 200) {
      yield put(deleteUserResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(deleteUserResult(error, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(types.GET_ALL_USERS, getAllUsersSaga)]);
  yield all([takeEvery(types.CREATE_USER, createUserSaga)]);
  yield all([takeEvery(types.UPDATE_USER, updateUserSaga)]);
  yield all([takeEvery(types.DELETE_USER, deleteUserSaga)]);
}
