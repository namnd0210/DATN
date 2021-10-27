import sign from 'jwt-encode';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import { loginApi } from './api';
import types from './type';

function* loginSaga(props: any): any {
  const { data, setLoginErr } = props.payload;
  try {
    const res = yield call(loginApi, data);
    if (res.data?.success) {
      if (res.headers) {
        // setAuthToken(res.headers);
        const secret = 'secret';
        const jwt = sign(res.headers, secret);
        localStorage.setItem('token', jwt);
        // yield put(loginActionResult(res));
      }
    } else {
      const isSuccess = false;
      setLoginErr();
      // yield put(loginActionResult(res, isSuccess));
    }
  } catch (error) {
    const isSuccess = false;
    setLoginErr();
    // yield put(loginActionResult(error, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(types.LOGIN, loginSaga)]);
}
