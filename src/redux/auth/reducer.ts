import _ from 'lodash';
import types from 'redux/auth/type';
import { Action, AuthState } from 'types/redux';

const initState = {
  isAuthenticated: false,
  loginLoading: false,
  registerLoading: false,
  user: {
    role: 2,
    name: '',
  },
  isAdmin: false,
  isTeacher: false,
  error: '',
};

export default function authReducer(state: AuthState = initState, action: Action) {
  switch (action.type) {
    case types.LOGIN: {
      return { ...state, loginLoading: true };
    }

    case types.LOGIN_SUCCESS: {
      return {
        ...state,
        loginLoading: false,
        isAuthenticated: true,
      };
    }

    case types.LOGIN_FAILED: {
      return { ...state, loginLoading: false, loginStatus: true };
    }

    case types.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload.data,
        isAuthenticated: !_.isEmpty(action.payload.data),
        isAdmin: action.payload.data.role === 0 ? true : false,
        isTeacher: action.payload.data.role === 1 ? true : false,
        loading: false,
        error: '',
      };

    case types.REGISTER: {
      return { ...state, registerLoading: true };
    }

    case types.REGISTER_SUCCESS: {
      return {
        ...state,
        registerLoading: false,
      };
    }

    case types.REGISTER_FAILED: {
      return { ...state, registerLoading: false };
    }

    case types.LOGOUT: {
      return { ...state, isAuthenticated: false };
    }

    default:
      return state;
  }
}
