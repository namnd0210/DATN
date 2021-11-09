import sign from 'jwt-encode';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import setAuthToken from 'utils/setTokenAuth';

import { loginResult, registerResult, setCurrentUser } from './actions';
import { loginApi, registerApi } from './api';
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
        yield all([put(loginResult(res.data)), put(setCurrentUser(res.data))]);
      }
    } else {
      const isSuccess = false;
      setLoginErr && setLoginErr();
      yield put(loginResult(res, isSuccess));
    }
  } catch (error) {
    const isSuccess = false;
    setLoginErr && setLoginErr();
    yield put(loginResult(error, isSuccess));
  }
}

function* registerSaga(props: any): any {
  const { data } = props.payload;
  try {
    const res = yield call(registerApi, data);
    if (res.data?.success) {
      // setAuthToken(res.headers);
      const secret = 'secret';
      const jwt = sign(res.headers, secret);
      localStorage.setItem('token', jwt);
      yield put(registerResult(res));
    }
  } catch (error) {
    const isSuccess = false;
    yield put(registerResult(error, isSuccess));
  }
}

function* logoutSaga(props: any): any {
  const { data } = props.payload;

  try {
    const res = yield call(registerApi, data);
    if (res.data?.success) {
      localStorage.removeItem('token');
      setAuthToken(false);
      // yield put(loginActionResult(res));
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
  // yield all([takeEvery(types.LOGOUT, logoutSaga)]);
}
