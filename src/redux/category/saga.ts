import { all, call, put, takeEvery } from 'redux-saga/effects';

import { createCategoryResult, getAllCategoryResult, updateCategoryResult } from './actions';
import { createCategoryApi, getAllCategoryApi, updateCategoryApi } from './api';
import types from './type';

function* getAllCategorySaga(): any {
  try {
    const res = yield call(getAllCategoryApi);
    if (res.status === 200) {
      yield put(getAllCategoryResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(getAllCategoryResult(error, isSuccess));
  }
}

function* createCategorySaga(props: any): any {
  try {
    const res = yield call(createCategoryApi, props.payload);
    if (res.status === 200) {
      yield put(createCategoryResult(res.data));
    }
  } catch (error) {
    const isSuccess = false;
    yield put(createCategoryResult(error, isSuccess));
  }
}

function* updateCategorySaga(props: any): any {
  try {
    const res = yield call(updateCategoryApi, props.payload);
    if (res.status === 200) {
      console.log(res);
      yield put(updateCategoryResult(res.data));
    }
  } catch (error) {
    const isSuccess = false;
    yield put(updateCategoryResult(error, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(types.GET_ALL_CATEGORY, getAllCategorySaga)]);
  yield all([takeEvery(types.CREATE_CATEGORY, createCategorySaga)]);
  yield all([takeEvery(types.UPDATE_CATEGORY, updateCategorySaga)]);
}
