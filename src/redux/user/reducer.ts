import { Action, UserState } from 'types/redux';

import types from './type';

const initState: UserState = {
  loading: false,
  users: [],
  total: 0,
};

export default function userReducer(state: UserState = initState, action: Action) {
  switch (action.type) {
    case types.GET_ALL_USERS: {
      return { ...state, loading: true };
    }

    case types.GET_ALL_USERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        users: action.payload.data,
        total: action.payload.total,
      };
    }

    case types.GET_ALL_USERS_FAILED: {
      return { ...state, loading: false };
    }

    case types.CREATE_USER: {
      return { ...state, loading: true };
    }

    case types.CREATE_USER_SUCCESS: {
      const { user } = action.payload;

      return {
        ...state,
        loading: false,
        users: [...state.users, user],
      };
    }

    case types.CREATE_USER_FAILED: {
      return { ...state, loading: false };
    }

    case types.UPDATE_USER: {
      return { ...state, loading: true };
    }

    case types.UPDATE_USER_SUCCESS: {
      const { user } = action.payload;

      return {
        ...state,
        loading: false,
        users: state.users.map((e) => (e._id === user._id ? user : e)),
      };
    }

    case types.UPDATE_USER_FAILED: {
      return { ...state, loading: false };
    }

    case types.DELETE_USER: {
      return { ...state, loading: true };
    }

    case types.DELETE_USER_SUCCESS: {
      const { id } = action.payload;

      return {
        ...state,
        loading: false,
        users: state.users.filter((e) => e._id !== id),
      };
    }

    case types.DELETE_USER_FAILED: {
      return { ...state, loading: false };
    }

    default:
      return state;
  }
}
