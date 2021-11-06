import { TypedUseSelectorHook } from 'react-redux';
import { useSelector as rawUseSelector } from 'react-redux';
import { combineReducers } from 'redux';

import authReducer from './auth/reducer';
import categoryReducer from './category/reducer';
import classReducer from './class/reducer';
import examReducer from './exam/reducer';
import questionReducer from './question/reducer';
import userReducer from './user/reducer';

const reducers = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  question: questionReducer,
  user: userReducer,
  exam: examReducer,
  class: classReducer,
});

type RootState = ReturnType<typeof reducers>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;

export default reducers;
