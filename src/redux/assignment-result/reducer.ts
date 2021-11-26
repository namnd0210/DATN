import { Action, AssignmentResultState } from 'types/redux';

import types from './type';

const initState = {
  results: [],
  loading: false,
  result: {},
  total: 0,
};

export default function resultReducer(state: AssignmentResultState = initState, action: Action) {
  switch (action.type) {
    case types.GET_ALL_ASSIGNMENT_RESULTS: {
      return { ...state, loading: true };
    }

    case types.GET_ALL_ASSIGNMENT_RESULTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        results: action.payload.data,
        total: action.payload.total,
      };
    }

    case types.GET_ALL_ASSIGNMENT_RESULTS_FAILED: {
      return { ...state, loading: false };
    }

    case types.GET_ASSIGNMENT_RESULT_BY_USER_ID: {
      return { ...state, loading: true };
    }

    case types.GET_ASSIGNMENT_RESULT_BY_USER_ID_SUCCESS: {
      const { results } = action.payload;

      return {
        ...state,
        loading: false,
        results,
      };
    }

    case types.GET_ASSIGNMENT_RESULT_BY_USER_ID_FAILED: {
      return { ...state, loading: false };
    }

    case types.GET_ASSIGNMENT_RESULT_BY_ASSIGNMENT_ID: {
      return { ...state, loading: true };
    }

    case types.GET_ASSIGNMENT_RESULT_BY_ASSIGNMENT_ID_SUCCESS: {
      const { result } = action.payload;

      return {
        ...state,
        loading: false,
        result,
      };
    }

    case types.GET_ASSIGNMENT_RESULT_BY_ASSIGNMENT_ID_FAILED: {
      return { ...state, loading: false };
    }

    case types.CREATE_ASSIGNMENT_RESULT: {
      return { ...state, loading: true };
    }

    case types.CREATE_ASSIGNMENT_RESULT_SUCCESS: {
      const { result } = action.payload;

      return {
        ...state,
        loading: false,
        results: [...state.results, result],
      };
    }

    case types.CREATE_ASSIGNMENT_RESULT_FAILED: {
      return { ...state, loading: false };
    }

    case types.UPDATE_ASSIGNMENT_RESULT: {
      return { ...state, loading: true };
    }

    case types.UPDATE_ASSIGNMENT_RESULT_SUCCESS: {
      const { result } = action.payload;

      return {
        ...state,
        loading: false,
        results: state.results.map((e) => (e._id === result._id ? result : e)),
      };
    }

    case types.UPDATE_ASSIGNMENT_RESULT_FAILED: {
      return { ...state, loading: false };
    }

    case types.DELETE_ASSIGNMENT_RESULT: {
      return { ...state, loading: true };
    }

    case types.DELETE_ASSIGNMENT_RESULT_SUCCESS: {
      const { id } = action.payload;

      return {
        ...state,
        loading: false,
        results: state.results.filter((e) => e._id !== id),
      };
    }

    case types.DELETE_ASSIGNMENT_RESULT_FAILED: {
      return { ...state, loading: false };
    }

    default:
      return state;
  }
}
