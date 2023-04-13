import React, { useState, useCallback, useEffect } from "react";
import { Form, Button, Row, Col, Card, Collapse } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  addQuiz,
  updateQuiz,
  setCurrentQuizIndex,
} from "../../../redux/actions/quizActions";

function CreateQuizSetting() {
  const [state, setState] = useState({
    open: false,
    quiz: {
      setting: {
        name: "",
        title: "",
        contactCheck: false,
        contact: { company: "" },
      },
    },
  });

  const currentQuizIndex = useSelector((state) => state.quiz.currentQuizIndex);
  const quizzes = useSelector((state) => state.quiz.quizzes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentQuizIndex !== null && currentQuizIndex !== undefined) {
      setState((prevState) => ({
        ...prevState,
        quiz: quizzes[currentQuizIndex],
        open: quizzes[currentQuizIndex].setting.contactCheck,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        quiz: {
          setting: {
            name: "",
            title: "",
            contactCheck: false,
            contact: { company: "" },
          },
        },
        open: false,
      }));
    }
  }, [currentQuizIndex, quizzes]);

  const createQuizHandler = useCallback(
    (e) => {
      setState((prevState) => ({
        ...prevState,
        quiz: {
          ...prevState.quiz,
          setting: {
            ...prevState.quiz.setting,
            [e.target.name]: e.target.value,
          },
        },
      }));
    },
    [setState]
  );

  const createQuizSwitchHandler = useCallback(
    (e) => {
      setState((prevState) => ({
        ...prevState,
        open: !prevState.open,
        quiz: {
          ...prevState.quiz,
          setting: {
            ...prevState.quiz.setting,
            [e.target.name]: e.target.checked,
          },
        },
      }));
    },
    [setState]
  );

  const createQuizContactHandler = useCallback(
    (e) => {
      setState((prevState) => ({
        ...prevState,
        quiz: {
          ...prevState.quiz,
          setting: {
            ...prevState.quiz.setting,
            contact: {
              ...prevState.quiz.setting.contact,
              [e.target.name]: e.target.value,
            },
          },
        },
      }));
    },
    [setState]
  );

  const handleSaveSettings = () => {
    if (currentQuizIndex !== null && currentQuizIndex !== undefined) {
      dispatch(updateQuiz(state.quiz, currentQuizIndex));
    } else {
      const newQuiz = { ...state.quiz, id: uuidv4() };
      dispatch(addQuiz(newQuiz));
      const newIndex = quizzes.length;
      dispatch(setCurrentQuizIndex(newIndex));
    }
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>Настройки</Card.Title>
            <Form>
              <Form.Group controlId="formQuizName">
                <Form.Label>Название квиза</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Произвольное название, видно только вам"
                  name="name"
                  value={state.quiz.setting.name || ""}
                  onChange={createQuizHandler}
                />
              </Form.Group>

              <Form.Group controlId="formQuizTitle">
                <Form.Label>Заголовок квиза</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Заголовок, например, узнайте сколько будет стоит диван на заказ"
                  name="title"
                  value={state.quiz.setting.title || ""}
                  onChange={createQuizHandler}
                />
              </Form.Group>

              <Form.Group controlId="formQuizButton">
                <Form.Label>Текст кнопки</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Например, начать"
                  name="textButtonQuiz"
                  value={state.quiz.setting.textButtonQuiz || ""}
                  onChange={createQuizHandler}
                />
              </Form.Group>

              <Form.Group controlId="formQuizAddConact">
                <Form.Check
                  className="mt-3"
                  type="switch"
                  id="custom-switch"
                  label="Добавить контакную информацию"
                  name="contactCheck"
                  checked={state.open}
                  onChange={createQuizSwitchHandler}
                  aria-controls="example-collapse"
                  aria-expanded={state.open}
                />
                <Collapse in={state.open}>
                  <div id="example-collapse">
                    <Form.Group controlId="formQuizNameCompany">
                      <Form.Label>Название компании</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Например, Мебельный"
                        name="company"
                        value={state.quiz.setting.contact.company || ""}
                        onChange={createQuizContactHandler}
                      />
                    </Form.Group>
                  </div>
                </Collapse>
              </Form.Group>
              <Button variant="success" onClick={handleSaveSettings}>
                Сохранить настройки
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      
    </Row>
  );
}

export default CreateQuizSetting;
