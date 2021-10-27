import types from 'redux/auth/type';
import { Action, AuthState } from 'types/redux';

const initState = {
  authenticated: false,
  loginLoading: false,
};

export default function authReducer(
  state: AuthState = initState,
  action: Action,
) {
  switch (action.type) {
    case types.LOGIN: {
      return { ...state, loginLoading: true };
    }

    //add info data here
    case types.LOGIN_SUCCESS: {
      return {
        ...state,
        loginLoading: true,
        authenticated: true,
      };
    }

    case types.LOGIN_FAILED: {
      return { ...state, loginLoading: false, loginStatus: true };
    }

    default:
      return state;
  }
}
