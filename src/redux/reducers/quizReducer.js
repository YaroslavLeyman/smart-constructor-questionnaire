import {
  ADD_QUIZ,
  UPDATE_QUIZ,
  DELETE_QUIZ,
  SET_CURRENT_QUIZ_INDEX,
  RESET_CURRENT_QUIZ_INDEX,
  SET_SAVED_QUIZ_INDEX,
  ADD_QUESTION_ITEM,
  UPDATE_QUESTION_ITEM,
  DELETE_QUESTION_ITEM,
  DUPLICATE_QUESTION_ITEM,
  MOVE_QUESTION_ITEM,
  SELECT_QUESTION,
  UPDATE_ANSWER,
} from "../actions/quizActions";

import { v4 as uuidv4 } from "uuid";

const initialState = {
  quizzes: [],
  currentQuizIndex: null,
  savedQuizIndex: null,
  selectedQuestion: null,
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUIZ:
      return {
        ...state,
        quizzes: [...state.quizzes, { ...action.payload, questions: [] }],
      };
    case UPDATE_QUIZ:
      return {
        ...state,
        quizzes: state.quizzes.map((quiz, index) =>
          index === action.payload.quizIndex ? action.payload.quizData : quiz
        ),
      };
    case DELETE_QUIZ:
      return {
        ...state,
        quizzes: state.quizzes.filter((_, index) => index !== action.payload),
      };
    case SET_CURRENT_QUIZ_INDEX:
      return {
        ...state,
        currentQuizIndex: action.payload,
      };
    case RESET_CURRENT_QUIZ_INDEX:
      return {
        ...state,
        currentQuizIndex: null,
      };
    case SET_SAVED_QUIZ_INDEX:
      return {
        ...state,
        savedQuizIndex: action.payload,
      };
    case ADD_QUESTION_ITEM:
      return {
        ...state,
        quizzes: state.quizzes.map((quiz, index) => {
          if (index === action.payload.quizIndex) {
            return {
              ...quiz,
              questions: [...quiz.questions, action.payload.questionItem],
            };
          }
          return quiz;
        }),
      };
    case UPDATE_QUESTION_ITEM:
      return {
        ...state,
        quizzes: state.quizzes.map((quiz, quizIndex) => {
          if (quizIndex === action.payload.quizIndex) {
            return {
              ...quiz,
              questions: quiz.questions.map((question, questionIndex) => {
                if (questionIndex === action.payload.questionIndex) {
                  return {
                    ...action.payload.questionData,
                    answers: action.payload.questionData.answers.map(
                      (answer) => ({
                        ...answer,
                        id: answer.id || uuidv4(),
                      })
                    ),
                  };
                }
                return question;
              }),
            };
          }
          return quiz;
        }),
      };

    case DELETE_QUESTION_ITEM:
      return {
        ...state,
        quizzes: state.quizzes.map((quiz, index) => {
          if (index === action.payload.quizIndex) {
            return {
              ...quiz,
              questions: quiz.questions.filter(
                (_, questionIndex) =>
                  questionIndex !== action.payload.questionIndex
              ),
            };
          }
          return quiz;
        }),
      };
    case DUPLICATE_QUESTION_ITEM:
      const duplicatedQuestion = action.payload.questionData;
      return {
        ...state,
        quizzes: state.quizzes.map((quiz, idx) => {
          if (idx === action.payload.quizIndex) {
            return {
              ...quiz,
              questions: [...quiz.questions, duplicatedQuestion],
            };
          } else {
            return quiz;
          }
        }),
      };
    case MOVE_QUESTION_ITEM:
      const { quizIdx, fromIndex, toIndex } = action.payload;
      const quiz = state.quizzes[quizIdx];
      const newQuestions = [...quiz.questions];

      const [removed] = newQuestions.splice(fromIndex, 1);
      newQuestions.splice(toIndex, 0, removed);

      return {
        ...state,
        quizzes: state.quizzes.map((quiz, index) =>
          index === quizIdx ? { ...quiz, questions: newQuestions } : quiz
        ),
      };
    case SELECT_QUESTION:
      return {
        ...state,
        selectedQuestion: action.payload,
      };
    case UPDATE_ANSWER:
      return {
        ...state,
        quizzes: state.quizzes.map((quiz, quizIndex) => {
          if (quizIndex === action.payload.quizIndex) {
            return {
              ...quiz,
              questions: quiz.questions.map((question, questionIndex) => {
                if (questionIndex === action.payload.questionIndex) {
                  return {
                    ...question,
                    answer: action.payload.answerText,
                  };
                }
                return question;
              }),
            };
          }
          return quiz;
        }),
      };

    default:
      return state;
  }
};

export default quizReducer;
