import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navibar from "../Navibar/Navibar";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import { Quizzes } from "../../pages/quizzes/quizzes";
import { Templates } from "../../pages/templates/templates";
import { CreateQuiz } from "../../components/CreateQuiz/CreateQuiz";
import {
  CreateQuizQuestions,
  CreateQuizSetting,
  CreateQuizResults,
} from "../CreateQuiz";

function App() {
  return (
    <>
      <Router>
        <Navibar />
        <Routes>
          <Route path="/quiz" element={<Quizzes />} />
          <Route path="/quiz/templates" element={<Templates />} />
          <Route path="/quiz/create" element={<CreateQuiz />}>
            <Route index element={<CreateQuizSetting />} />
            <Route path="questions" element={<CreateQuizQuestions />} />
            <Route path="results" element={<CreateQuizResults />} />
          </Route>

          <Route path="*" element={<Navigate to="/quiz" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
