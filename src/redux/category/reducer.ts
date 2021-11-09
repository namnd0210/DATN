import types from 'redux/category/type';
import { Action, CategoryState } from 'types/redux';

const initState = {
  loadingCategory: false,
  categories: [],
  total: 0,
};

export default function categoryReducer(state: CategoryState = initState, action: Action) {
  switch (action.type) {
    case types.GET_ALL_CATEGORY: {
      return { ...state, loadingCategory: true };
    }

    case types.GET_ALL_CATEGORY_SUCCESS: {
      return {
        ...state,
        loadingCategory: false,
        categories: action.payload.data,
        total: action.payload.total,
      };
    }

    case types.GET_ALL_CATEGORY_FAILED: {
      return { ...state, loadingCategory: false };
    }

    case types.CREATE_CATEGORY: {
      return { ...state, loadingCategory: true };
    }

    case types.CREATE_CATEGORY_SUCCESS: {
      const { category } = action.payload;

      return {
        ...state,
        loadingCategory: false,
        categories: [...state.categories, category],
      };
    }

    case types.CREATE_CATEGORY_FAILED: {
      return { ...state, loadingCategory: false };
    }

    case types.UPDATE_CATEGORY: {
      return { ...state, loadingCategory: true };
    }

    case types.UPDATE_CATEGORY_SUCCESS: {
      const newCategory = action.payload.data;

      return {
        ...state,
        loadingCategory: false,
        categories: state.categories.map((e) => (e._id === newCategory._id ? newCategory : e)),
      };
    }

    case types.UPDATE_CATEGORY_FAILED: {
      return { ...state, loadingCategory: false };
    }

    case types.DELETE_CATEGORY: {
      return { ...state, loadingCategory: true };
    }

    case types.DELETE_CATEGORY_SUCCESS: {
      const { id } = action.payload;

      return {
        ...state,
        loadingCategory: false,
        categories: state.categories.filter((e) => e._id !== id),
      };
    }

    case types.DELETE_CATEGORY_FAILED: {
      return { ...state, loadingCategory: false };
    }

    default:
      return state;
  }
}
