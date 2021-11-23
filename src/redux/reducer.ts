import { TypedUseSelectorHook } from 'react-redux';
import { useSelector as rawUseSelector } from 'react-redux';
import { combineReducers } from 'redux';

import assignmentReducer from './assignment/reducer';
import authReducer from './auth/reducer';
import categoryReducer from './category/reducer';
import classReducer from './class/reducer';
import examReducer from './exam/reducer';
import questionReducer from './question/reducer';
import resultReducer from './result/reducer';
import userReducer from './user/reducer';

const reducers = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  question: questionReducer,
  user: userReducer,
  exam: examReducer,
  class: classReducer,
  result: resultReducer,
  assignment: assignmentReducer,
});

type RootState = ReturnType<typeof reducers>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;

export default reducers;
