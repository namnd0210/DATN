import authSagas from 'redux/auth/saga';
import categorySagas from 'redux/category/saga';
import questionSagas from 'redux/question/saga';
import userSagas from 'redux/user/saga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([authSagas(), categorySagas(), questionSagas(), userSagas()]);
}
