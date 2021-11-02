import authSagas from 'redux/auth/saga';
import categorySagas from 'redux/category/saga';
import questionSagas from 'redux/category/saga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([authSagas(), categorySagas(), questionSagas()]);
}
