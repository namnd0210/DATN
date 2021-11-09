import types from 'redux/class/type';
import { Action, ClassState } from 'types/redux';

const initState = {
  classes: [],
  loading: false,
  currentClass: {},
  total: 0,
};

export default function classReducer(state: ClassState = initState, action: Action) {
  switch (action.type) {
    case types.GET_ALL_CLASSES: {
      return { ...state, loading: true };
    }

    case types.GET_ALL_CLASSES_SUCCESS: {
      return {
        ...state,
        loading: false,
        classes: action.payload.data,
        total: action.payload.total,
      };
    }

    case types.GET_ALL_CLASSES_FAILED: {
      return { ...state, loading: false };
    }

    case types.CREATE_CLASS: {
      return { ...state, loading: true };
    }

    case types.CREATE_CLASS_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        loading: false,
        classes: [...state.classes, data],
      };
    }

    case types.CREATE_CLASS_FAILED: {
      return { ...state, loading: false };
    }

    case types.UPDATE_CLASS: {
      return { ...state, loading: true };
    }

    case types.UPDATE_CLASS_SUCCESS: {
      const newCategory = action.payload.data;

      return {
        ...state,
        loading: false,
        classes: state.classes.map((e) => (e._id === newCategory._id ? newCategory : e)),
      };
    }

    case types.UPDATE_CLASS_FAILED: {
      return { ...state, loading: false };
    }

    case types.DELETE_CLASS: {
      return { ...state, loading: true };
    }

    case types.DELETE_CLASS_SUCCESS: {
      const { id } = action.payload;

      return {
        ...state,
        loading: false,
        classes: state.classes.filter((e) => e._id !== id),
      };
    }

    case types.DELETE_CLASS_FAILED: {
      return { ...state, loading: false };
    }

    default:
      return state;
  }
}
