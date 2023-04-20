import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import quizReducer from "./reducers/quizReducer";
import quizPlayReducer from "./reducers/quizPlayReducer";

const rootReducer = combineReducers({
  quiz: quizReducer,
  quizPlay: quizPlayReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware))
);

export default store;