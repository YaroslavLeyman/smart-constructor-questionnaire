import { v4 as uuidv4 } from "uuid";

export const ADD_QUIZ = "ADD_QUIZ";
export const UPDATE_QUIZ = "UPDATE_QUIZ";
export const SET_CURRENT_QUIZ_INDEX = "SET_CURRENT_QUIZ_INDEX";
export const RESET_CURRENT_QUIZ_INDEX = "RESET_CURRENT_QUIZ_INDEX";
export const SET_SAVED_QUIZ_INDEX = "SET_SAVED_QUIZ_INDEX";
export const ADD_QUESTION_ITEM = "ADD_QUESTION_ITEM";
export const UPDATE_QUESTION_ITEM = "UPDATE_QUESTION_ITEM";
export const DELETE_QUESTION_ITEM = "DELETE_QUESTION_ITEM";
export const DUPLICATE_QUESTION_ITEM = "DUPLICATE_QUESTION_ITEM";
export const MOVE_QUESTION_ITEM = "MOVE_QUESTION_ITEM";
export const SELECT_QUESTION = "SELECT_QUESTION";
export const UPDATE_ANSWER = "UPDATE_ANSWER";


export const addQuiz = (quizData) => ({
  type: ADD_QUIZ,
  payload: { ...quizData, questions: [] },
});

export const updateQuiz = (quizData, quizIndex) => ({
  type: UPDATE_QUIZ,
  payload: { quizData, quizIndex },
});

export const setCurrentQuizIndex = (quizIndex) => ({
  type: SET_CURRENT_QUIZ_INDEX,
  payload: quizIndex,
});

export const resetCurrentQuizIndex = () => ({
  type: RESET_CURRENT_QUIZ_INDEX,
});

export const setSavedQuizIndex = (index) => ({
  type: SET_SAVED_QUIZ_INDEX,
  payload: index,
});

export const addQuestionItem = (questionItem, quizIndex) => ({
  type: ADD_QUESTION_ITEM,
  payload: { quizIndex, questionItem },
});

export const updateQuestionItem = (quizIndex, questionIndex, questionData) => ({
  type: UPDATE_QUESTION_ITEM,
  payload: { quizIndex, questionIndex, questionData },
});

export const deleteQuestionItem = (quizIndex, questionIndex) => ({
  type: DELETE_QUESTION_ITEM,
  payload: { quizIndex, questionIndex },
});

export const duplicateQuestionItem = (quizIndex, questionIndex) => (dispatch, getState) => {
  const originalQuestion = getState().quiz.quizzes[quizIndex].questions[questionIndex];
  const duplicatedQuestion = {
    ...originalQuestion,
    id: uuidv4(),
    answers: originalQuestion.answers.map((answer) => ({
      ...answer,
      id: uuidv4(),
    })),
  };

  dispatch({
    type: DUPLICATE_QUESTION_ITEM,
    payload: { quizIndex, questionData: duplicatedQuestion },
  });
};

export const moveQuestionItem = (quizIdx, fromIndex, toIndex) => ({
  type: MOVE_QUESTION_ITEM,
  payload: { quizIdx, fromIndex, toIndex },
});

export const selectQuestion = (questionIndex) => ({
  type: SELECT_QUESTION,
  payload: questionIndex,
});

export const updateAnswer = (quizIndex, questionIndex, answerText) => ({
  type: UPDATE_ANSWER,
  payload: { quizIndex, questionIndex, answerText },
});