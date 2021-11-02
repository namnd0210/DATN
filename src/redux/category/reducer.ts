import types from 'redux/category/type';
import { Action, CategoryState } from 'types/redux';

const initState = {
  loadingCategory: false,
  categories: [],
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
      };
    }

    case types.GET_ALL_CATEGORY_FAILED: {
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

    default:
      return state;
  }
}
