import { all, call, put, takeEvery } from 'redux-saga/effects';

import { getAllCategory, getAllCategoryResult } from './actions';
import types from './type';

function* getAllCategorySaga(props: any): any {
  const { data } = props.payload;
  try {
    console.log(props, data);
    const res = yield call(getAllCategory, data);
    if (res.data?.success) {
      if (res.headers) {
        yield put(getAllCategoryResult(res.data));
      }
    } else {
      const isSuccess = false;
      yield put(getAllCategoryResult(res.data, isSuccess));
    }
  } catch (error) {
    const isSuccess = false;
    yield put(getAllCategoryResult(error, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(types.GET_ALL_CATEGORY, getAllCategorySaga)]);
}
