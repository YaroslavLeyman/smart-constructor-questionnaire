import { ADD_PLAY_QUIZ, SET_CURRENT_PLAY_QUIZ_ID } from "../actions/quizPlayActions";

const initialState = {
  playQuizzes: [],
  currentPlayQuizId: null,
};

const quizPlayReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAY_QUIZ:
      return {
        ...state,
        playQuizzes: [...state.playQuizzes, action.payload],
      };
    case SET_CURRENT_PLAY_QUIZ_ID:
      return {
        ...state,
        currentPlayQuizId: action.payload,
      };
    default:
      return state;
  }
};

export default quizPlayReducer;
