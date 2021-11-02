import { all, call, put, takeEvery } from 'redux-saga/effects';

import { createCategoryResult, getAllCategoryResult } from './actions';
import { createCategoryApi, getAllCategoryApi } from './api';
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
    if (res.data?.success) {
      if (res.headers) {
        yield put(createCategoryResult(res.data));
      }
    } else {
      const isSuccess = false;
      yield put(createCategoryResult(res.data, isSuccess));
    }
  } catch (error) {
    const isSuccess = false;
    yield put(createCategoryResult(error, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(types.GET_ALL_CATEGORY, getAllCategorySaga)]);
  yield all([takeEvery(types.CREATE_CATEGORY, createCategorySaga)]);
}
