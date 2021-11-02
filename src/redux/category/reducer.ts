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
      console.log(action.payload.data);

      return {
        ...state,
        loadingCategory: false,
        categories: action.payload.data,
      };
    }

    case types.GET_ALL_CATEGORY_FAILED: {
      return { ...state, loadingCategory: false };
    }

    default:
      return state;
  }
}
