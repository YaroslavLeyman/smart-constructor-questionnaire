import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navibar from "../Navibar/Navibar";
import { Route, Routes, BrowserRouter as Router, Navigate } from "react-router-dom";
import { Quizzes } from "../../pages/quizzes/quizzes";
import { Templates } from "../../pages/templates/templates";
import { CreateQuiz } from "../../components/CreateQuiz/CreateQuiz";
import {
    CreateQuizQuestions,
    CreateQuizSetting,
} from "../CreateQuiz";


function App() {

    const [quiz, setQuiz] = useState({
        setting: {
            name: 'Тестовая кнопка',
            title: 'заголовок',
            contactCheck: false,
            textButtonQuiz: "Начать квиз",
            contact: {
                company: 'Рога и копыта',
                descriptionCompany: "Продажа мяса",
                telCompany: "+7 (499) 000-00-00",
                workingHoursCompany: "Время работы: 6.00 - 23.00" 
            },
        },
        questions: {
            textQuestion: "Сколько мяса вы покупаете?",
            textHint: "Колличество кг влияет на ваш вес",
            switchChooseAnyVariant: false,
            switchDropDownList: false,
            pictureQuestion: false,
            textRightAnswer: "Правильный ответ",
            textWrongAnswer: "Неправильный ответ",
            textTypeSelect: ""
        },
    })

    return (
        <>
            <Router>
                <Navibar />
                <Routes>
                    <Route path="/quiz" element={<Quizzes/>}/>
                        <Route path="/quiz/templates" element={<Templates />} />
                        <Route path="/quiz/create" element={<CreateQuiz />} >
							<Route index element={<CreateQuizSetting quiz={quiz} setQuiz={setQuiz} />} />
							<Route path="questions" element={<CreateQuizQuestions quiz={quiz} setQuiz={setQuiz} />} />
						</Route>
						
                    <Route path="*" element={<Navigate to="/quiz" replace />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
