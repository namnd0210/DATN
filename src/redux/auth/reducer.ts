import types from 'redux/auth/type';
import { Action, AuthState } from 'types/redux';

const initState = {
  authenticated: false,
  loginLoading: false,
  registerLoading: false,
};

export default function authReducer(state: AuthState = initState, action: Action) {
  switch (action.type) {
    case types.LOGIN: {
      return { ...state, loginLoading: true };
    }

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

    case types.REGISTER: {
      return { ...state, registerLoading: true };
    }

    case types.REGISTER_SUCCESS: {
      return {
        ...state,
        registerLoading: true,
      };
    }

    case types.REGISTER_FAILED: {
      return { ...state, registerLoading: false };
    }

    default:
      return state;
  }
}
