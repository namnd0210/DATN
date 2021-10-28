import { TypedUseSelectorHook } from 'react-redux';
import { useSelector as rawUseSelector } from 'react-redux';
import { combineReducers } from 'redux';

import authReducer from './auth/reducer';

const reducers = combineReducers({
  auth: authReducer,
});

type RootState = ReturnType<typeof reducers>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;

export default reducers;
