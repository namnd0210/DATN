import types from 'redux/question/type';
import { Action, QuestionState } from 'types/redux';

const initState = {
  loadingQuestion: false,
  questions: [],
};

export default function questionReducer(state: QuestionState = initState, action: Action) {
  switch (action.type) {
    case types.GET_ALL_QUESTIONS: {
      return { ...state, loadingQuestion: true };
    }

    case types.GET_ALL_QUESTIONS_SUCCESS: {
      return {
        ...state,
        loadingQuestion: false,
        questions: action.payload.data,
      };
    }

    case types.GET_ALL_QUESTIONS_FAILED: {
      return { ...state, loadingQuestion: false };
    }

    case types.CREATE_QUESTION: {
      return { ...state, loadingQuestion: true };
    }

    case types.CREATE_QUESTION_SUCCESS: {
      const { question } = action.payload;

      return {
        ...state,
        loadingQuestion: false,
        questions: [...state.questions, question],
      };
    }

    case types.CREATE_QUESTION_FAILED: {
      return { ...state, loadingQuestion: false };
    }

    case types.UPDATE_QUESTION: {
      return { ...state, loadingQuestion: true };
    }

    case types.UPDATE_QUESTION_SUCCESS: {
      const newCategory = action.payload.data;

      return {
        ...state,
        loadingQuestion: false,
        questions: state.questions.map((e) => (e._id === newCategory._id ? newCategory : e)),
      };
    }

    case types.UPDATE_QUESTION_FAILED: {
      return { ...state, loadingQuestion: false };
    }

    case types.DELETE_QUESTION: {
      return { ...state, loadingQuestion: true };
    }

    case types.DELETE_QUESTION_SUCCESS: {
      const { id } = action.payload;

      return {
        ...state,
        loadingQuestion: false,
        questions: state.questions.filter((e) => e._id !== id),
      };
    }

    case types.DELETE_QUESTION_FAILED: {
      return { ...state, loadingQuestion: false };
    }

    default:
      return state;
  }
}
