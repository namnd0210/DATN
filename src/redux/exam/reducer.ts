import { Action, ExamState } from 'types/redux';

import types from './type';

const initState = {
  exams: [],
  loading: false,
  exam: {},
  total: 0,
};

export default function examReducer(state: ExamState = initState, action: Action) {
  switch (action.type) {
    case types.GET_ALL_EXAMS: {
      return { ...state, loading: true };
    }

    case types.GET_ALL_EXAMS_SUCCESS: {
      return {
        ...state,
        loading: false,
        exams: action.payload.data,
        total: action.payload.total,
      };
    }

    case types.GET_ALL_EXAMS_FAILED: {
      return { ...state, loading: false };
    }

    case types.GET_EXAM_BY_ID: {
      return { ...state, loading: true };
    }

    case types.GET_EXAM_BY_ID_SUCCESS: {
      const { exam } = action.payload;

      return {
        ...state,
        loading: false,
        exam,
      };
    }

    case types.GET_EXAM_BY_ID_FAILED: {
      return { ...state, loading: false };
    }

    case types.CREATE_EXAM: {
      return { ...state, loading: true };
    }

    case types.CREATE_EXAM_SUCCESS: {
      const { exam } = action.payload;

      return {
        ...state,
        loading: false,
        exams: [...state.exams, exam],
      };
    }

    case types.CREATE_EXAM_FAILED: {
      return { ...state, loading: false };
    }

    case types.UPDATE_EXAM: {
      return { ...state, loading: true };
    }

    case types.UPDATE_EXAM_SUCCESS: {
      const { exam } = action.payload;

      return {
        ...state,
        loading: false,
        exams: state.exams.map((e) => (e._id === exam._id ? exam : e)),
      };
    }

    case types.UPDATE_EXAM_FAILED: {
      return { ...state, loading: false };
    }

    case types.DELETE_EXAM: {
      return { ...state, loading: true };
    }

    case types.DELETE_EXAM_SUCCESS: {
      const { id } = action.payload;

      return {
        ...state,
        loading: false,
        exams: state.exams.filter((e) => e._id !== id),
      };
    }

    case types.DELETE_EXAM_FAILED: {
      return { ...state, loading: false };
    }

    default:
      return state;
  }
}
