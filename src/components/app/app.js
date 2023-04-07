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
    CreateQuizResults,
    CreateQuizContacts,
    CreateQuizDesign,
    CreateQuizExtraSetting
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
            switch: false
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
        results: {
            switchShowResult: false,
            typesOfResults: {
                fixedRadio: false,
                settlementRadio: false,
                mixedRadio: false
            },
            switchButtonAddResult: false,
            typeOfResult: {
                textRadio: false,
                urlRadio: false,
                expandedRadio: false
            },
            textTitleResult: "Вот ваш результат",
            descriptionResult: "Вы мясоед",
            pictureResult: false,
            switchSendEmailResult: false,
            switchShowResultBefore: false
        },
        сontacts: {
            switchTurnOnContacts: false,
            metodCollectionContacts: {
                formContactsRadio: false,
                messengersContactsRadio: false
            },
            switchSkipInput: false,
            switchOneContact: false,
            textTitleContact: "Заголовок",
            textDescriptionContact: "Описание",
            codeCountryDefaultContact: "+7",
            textDataPrivacy: "Конф. данные",
            textButtonViewResult: "Посмотреть результат",
            textAfterCompletingQuiz: "Вы завершили квиз" 
        },
        design: {
            pictureBackground: false,
            pictureSideImage: false,
            pictureFavicon: false,
            additionally: {
                switchShowCoverQuiz: false,
                switchShowExpert: false,
                switchShowDiscount: false
            },
            showExpert: {
                nameExpert: "Иван",
                jobExpert: "Продавец мяса",
                pictureExpert: false
            },
            showDiscount: {
                textDiscount: "Ваша скидка",
                sizeDiscount: "5%"
            }
        },
        extraSetting: {
            showQuizExtraSetting: {
                separatePageRadio: false,
                yourSiteRadio: false
            },
            notificationsExtraSetting: {
                switchDefaultEmail: false,
                switchExtraEmail: false,
                switchSendWebhook: false,
                switchTurnOnAnalitics: false
            },
            extraEmail: {
                emailFirst: "email1",
                emailSecond: "email2",
                emailThird: "email3"
            },
            urlWebhook: "https://domain.ru/fasfwg"
        }
    })

console.log(quiz);
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
                            <Route path="results" element={<CreateQuizResults quiz={quiz} setQuiz={setQuiz} />} />
                            <Route path="contacts" element={<CreateQuizContacts quiz={quiz} setQuiz={setQuiz} />} />
                            <Route path="design" element={<CreateQuizDesign quiz={quiz} setQuiz={setQuiz} />} />
                            <Route path="extra-setting" element={<CreateQuizExtraSetting quiz={quiz} setQuiz={setQuiz} />} />
						</Route>
						
                    <Route path="*" element={<Navigate to="/quiz" replace />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
