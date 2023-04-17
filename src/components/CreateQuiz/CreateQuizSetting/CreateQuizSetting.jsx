import React, { useState, useCallback, useEffect } from "react";
import { Form, Button, Row, Col, Card, Collapse, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import styles from "./CreateQuizSetting.module.scss";
import { toPng } from "html-to-image";
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
  const [showToast, setShowToast] = useState(false);

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

  const generateThumbnail = async () => {
    const node = document.getElementById("thumbnail-container");

    if (node) {
      const dataUrl = await toPng(node);
      return dataUrl;
    }
    return null;
  };

  const handleSaveSettings = async () => {
    const thumbnail = await generateThumbnail();

    if (currentQuizIndex !== null && currentQuizIndex !== undefined) {
      dispatch(
        updateQuiz({ ...state.quiz, image: thumbnail }, currentQuizIndex)
      );
    } else {
      const newQuiz = { ...state.quiz, id: uuidv4(), image: thumbnail };
      dispatch(addQuiz(newQuiz));
      const newIndex = quizzes.length;
      dispatch(setCurrentQuizIndex(newIndex));
    }
    setShowToast(true);
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title className="m-0">Обложка квиза</Card.Title>
            <Form>
              <Form.Group className="mt-3" controlId="formQuizName">
                <Form.Label>Название квиза</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Произвольное название, видно только вам"
                  name="name"
                  value={state.quiz.setting.name || ""}
                  onChange={createQuizHandler}
                />
              </Form.Group>

              <Form.Group className="mt-3" controlId="formQuizTitle">
                <Form.Label>Заголовок квиза</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Заголовок, например, узнайте сколько будет стоит диван на заказ"
                  name="title"
                  value={state.quiz.setting.title || ""}
                  onChange={createQuizHandler}
                />
              </Form.Group>

              <Form.Group className="mt-3" controlId="formQuizButton">
                <Form.Label>Текст кнопки</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Например, пройти тест"
                  name="textButtonQuiz"
                  value={state.quiz.setting.textButtonQuiz || ""}
                  onChange={createQuizHandler}
                />
              </Form.Group>

              <Form.Group controlId="formQuizAddConact">
                <Form.Check
                  className="mt-4"
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
                    <Form.Group
                      className="mt-3"
                      controlId="formQuizNameCompany"
                    >
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
              <Button
                className="mt-4"
                variant="success"
                onClick={handleSaveSettings}
              >
                Сохранить настройки
              </Button>
              <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={3000}
                autohide
                style={
                  {
                    // position: "absolute",
                    // top: 0,
                    // right: 0,
                  }
                }
              >
                <Toast.Body>
                  Черновик сохранен на главной странице квизов
                </Toast.Body>
              </Toast>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card id="thumbnail-container">
          <Card.Body>
            <div className={styles.viewContainer}>
              <div className={styles.viewContentContainer}>
                <h2 className={styles.viewContentInfoHeader}>
                  {state.quiz.setting?.title || "Введите заголовок квиза"}
                </h2>
                <Button variant="primary">
                  {state.quiz.setting.textButtonQuiz || "Пройти тест"}
                </Button>
              </div>
            </div>
            <div className={styles.viewNameCompany}>
              {state.quiz.setting.contact.company || ""}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default CreateQuizSetting;
