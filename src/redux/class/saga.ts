import { all, call, put, takeEvery } from 'redux-saga/effects';

import { createClassResult, deleteClassResult, getAllClassesResult, updateClassResult } from './actions';
import { createClassApi, deleteClassApi, getAllClassesApi, updateClassApi } from './api';
import types from './type';

function* getAllClassesSaga(): any {
  try {
    const res = yield call(getAllClassesApi);
    if (res.status === 200) {
      yield put(getAllClassesResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(getAllClassesResult(error, isSuccess));
  }
}

function* createClassSaga(props: any): any {
  try {
    const res = yield call(createClassApi, props.payload);
    if (res.status === 200) {
      yield put(createClassResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(createClassResult(error, isSuccess));
  }
}

function* updateClassSaga(props: any): any {
  try {
    const res = yield call(updateClassApi, props.payload);
    if (res.status === 200) {
      yield put(updateClassResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(updateClassResult(error, isSuccess));
  }
}

function* deleteClassSaga(props: any): any {
  try {
    const res = yield call(deleteClassApi, props.payload);
    console.log(props.payload);
    if (res.status === 200) {
      yield put(deleteClassResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(deleteClassResult(error, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(types.GET_ALL_CLASSES, getAllClassesSaga)]);
  yield all([takeEvery(types.CREATE_CLASS, createClassSaga)]);
  yield all([takeEvery(types.UPDATE_CLASS, updateClassSaga)]);
  yield all([takeEvery(types.DELETE_CLASS, deleteClassSaga)]);
}
