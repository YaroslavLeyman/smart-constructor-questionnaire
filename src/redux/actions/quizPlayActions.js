import { v4 as uuidv4 } from "uuid";

export const ADD_PLAY_QUIZ = "ADD_PLAY_QUIZ";
export const SET_CURRENT_PLAY_QUIZ_ID = "SET_CURRENT_PLAY_QUIZ_ID";

export const addPlayQuiz = (quizData) => ({
  type: ADD_PLAY_QUIZ,
  payload: { ...quizData, id: uuidv4() },
});

export const setCurrentPlayQuizId = (quizId) => ({
  type: SET_CURRENT_PLAY_QUIZ_ID,
  payload: quizId,
});