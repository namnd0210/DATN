import { Action, ResultState } from 'types/redux';

import types from './type';

const initState = {
  results: [],
  loading: false,
  result: {},
  total: 0,
};

export default function resultReducer(state: ResultState = initState, action: Action) {
  switch (action.type) {
    case types.GET_ALL_RESULTS: {
      return { ...state, loading: true };
    }

    case types.GET_ALL_RESULTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        results: action.payload.data,
        total: action.payload.total,
      };
    }

    case types.GET_ALL_RESULTS_FAILED: {
      return { ...state, loading: false };
    }

    case types.GET_RESULT_BY_USER_ID: {
      return { ...state, loading: true };
    }

    case types.GET_RESULT_BY_USER_ID_SUCCESS: {
      const { results } = action.payload;

      return {
        ...state,
        loading: false,
        results,
      };
    }

    case types.GET_RESULT_BY_USER_ID_FAILED: {
      return { ...state, loading: false };
    }

    case types.CREATE_RESULT: {
      return { ...state, loading: true };
    }

    case types.CREATE_RESULT_SUCCESS: {
      const { result } = action.payload;

      return {
        ...state,
        loading: false,
        results: [...state.results, result],
      };
    }

    case types.CREATE_RESULT_FAILED: {
      return { ...state, loading: false };
    }

    case types.UPDATE_RESULT: {
      return { ...state, loading: true };
    }

    case types.UPDATE_RESULT_SUCCESS: {
      const { result } = action.payload;

      return {
        ...state,
        loading: false,
        results: state.results.map((e) => (e._id === result._id ? result : e)),
      };
    }

    case types.UPDATE_RESULT_FAILED: {
      return { ...state, loading: false };
    }

    case types.DELETE_RESULT: {
      return { ...state, loading: true };
    }

    case types.DELETE_RESULT_SUCCESS: {
      const { id } = action.payload;

      return {
        ...state,
        loading: false,
        results: state.results.filter((e) => e._id !== id),
      };
    }

    case types.DELETE_RESULT_FAILED: {
      return { ...state, loading: false };
    }

    default:
      return state;
  }
}
