import sign from 'jwt-encode';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import { loginApi, registerApi } from './api';
import types from './type';

function* loginSaga(props: any): any {
  const { data, setLoginErr } = props.payload;
  try {
    console.log(data);
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
      setLoginErr && setLoginErr();
      // yield put(loginActionResult(res, isSuccess));
    }
  } catch (error) {
    const isSuccess = false;
    setLoginErr && setLoginErr();
    // yield put(loginActionResult(error, isSuccess));
  }
}

function* registerSaga(props: any): any {
  const { data } = props.payload;
  try {
    console.log(data);
    const res = yield call(registerApi, data);
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
      // yield put(loginActionResult(res, isSuccess));
    }
  } catch (error) {
    const isSuccess = false;
    // yield put(loginActionResult(error, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(types.LOGIN, loginSaga)]);
  yield all([takeEvery(types.REGISTER, registerSaga)]);
}
