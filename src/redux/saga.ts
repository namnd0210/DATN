import authSagas from 'redux/auth/saga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([authSagas()]);
}
