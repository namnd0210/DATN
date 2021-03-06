import assignmentSagas from 'redux/assignment/saga';
import assignmentResultSagas from 'redux/assignment-result/saga';
import authSagas from 'redux/auth/saga';
import categorySagas from 'redux/category/saga';
import classSaga from 'redux/class/saga';
import examSagas from 'redux/exam/saga';
import questionSagas from 'redux/question/saga';
import resultSagas from 'redux/result/saga';
import userSagas from 'redux/user/saga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    authSagas(),
    categorySagas(),
    questionSagas(),
    userSagas(),
    examSagas(),
    classSaga(),
    resultSagas(),
    assignmentSagas(),
    assignmentResultSagas(),
  ]);
}
