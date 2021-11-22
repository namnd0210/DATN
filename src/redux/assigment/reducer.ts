import { Action, AssignmentState } from 'types/redux';

import types from './type';

const initState = {
  assignments: [],
  loading: false,
  total: 0,
};

export default function assignmentReducer(state: AssignmentState = initState, action: Action) {
  switch (action.type) {
    case types.GET_ALL_ASSIGNMENTS: {
      return { ...state, loading: true };
    }

    case types.GET_ALL_ASSIGNMENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        assignments: action.payload.data,
        total: action.payload.total,
      };
    }

    case types.GET_ALL_ASSIGNMENTS_FAILED: {
      return { ...state, loading: false };
    }

    case types.CREATE_ASSIGNMENT: {
      return { ...state, loading: true };
    }

    case types.CREATE_ASSIGNMENT_SUCCESS: {
      const { result } = action.payload;

      return {
        ...state,
        loading: false,
        assignments: [...state.assignments, result],
      };
    }

    case types.CREATE_ASSIGNMENT_FAILED: {
      return { ...state, loading: false };
    }

    case types.UPDATE_ASSIGNMENT: {
      return { ...state, loading: true };
    }

    case types.UPDATE_ASSIGNMENT_SUCCESS: {
      const { result } = action.payload;

      return {
        ...state,
        loading: false,
        assignments: state.assignments.map((e) => (e._id === result._id ? result : e)),
      };
    }

    case types.UPDATE_ASSIGNMENT_FAILED: {
      return { ...state, loading: false };
    }

    case types.DELETE_ASSIGNMENT: {
      return { ...state, loading: true };
    }

    case types.DELETE_ASSIGNMENT_SUCCESS: {
      const { id } = action.payload;

      return {
        ...state,
        loading: false,
        assignments: state.assignments.filter((e) => e._id !== id),
      };
    }

    case types.DELETE_ASSIGNMENT_FAILED: {
      return { ...state, loading: false };
    }

    default:
      return state;
  }
}
