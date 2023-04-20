import React, { useState, useCallback, useEffect } from "react";
import { Form, Button, Row, Col, Card, Toast } from "react-bootstrap";
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
        backgroundColor: "#ffffff",
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
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        quiz: {
          setting: {
            name: "",
            title: "",
            backgroundColor: "#ffffff",
            titleColor: "#000000",
          },
        },
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

  const handleBackgroundColorChange = useCallback(
    (e) => {
      setState((prevState) => ({
        ...prevState,
        quiz: {
          ...prevState.quiz,
          setting: {
            ...prevState.quiz.setting,
            backgroundColor: e.target.value,
          },
        },
      }));
    },
    [setState]
  );

  const handleTitleColorChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      quiz: {
        ...prevState.quiz,
        setting: {
          ...prevState.quiz.setting,
          titleColor: e.target.value,
        },
      },
    }));
  };

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
                  placeholder="Введите название квиза"
                  name="name"
                  value={state.quiz.setting.name || ""}
                  onChange={createQuizHandler}
                />
              </Form.Group>
              <Form.Group className="mt-3" controlId="formQuizTitle">
                <Form.Label>Заголовок обложки квиза</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите заголовок обложки"
                  name="title"
                  value={state.quiz.setting.title || ""}
                  onChange={createQuizHandler}
                />
              </Form.Group>

              <Form.Group className="mt-3" controlId="formQuizBackgroundColor">
                <Form.Label>Выберите цвет фона обложки</Form.Label>
                <Form.Control
                  type="color"
                  name="backgroundColor"
                  value={state.quiz.setting.backgroundColor || "#ffffff"}
                  onChange={handleBackgroundColorChange}
                />
              </Form.Group>

              <Form.Group className="mt-3" controlId="formQuizTitleColor">
                <Form.Label>Цвет текста заголовка</Form.Label>
                <Form.Control
                  type="color"
                  name="titleColor"
                  value={state.quiz.setting.titleColor || "#000000"}
                  onChange={handleTitleColorChange}
                />
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
              >
                <Toast.Body>
                  Настройки квиза сохранены
                </Toast.Body>
              </Toast>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>Предпросмотр обложки</Card.Title>
            <div
              id="thumbnail-container"
              className={styles.viewContainer}
              style={{ backgroundColor: state.quiz.setting.backgroundColor }}
            >
              <div className={styles.viewContentContainer}>
                <h2
                  className={styles.viewContentInfoHeader}
                  style={{ color: state.quiz.setting.titleColor }}
                >
                  {state.quiz.setting?.title || "Введите заголовок квиза"}
                </h2>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default CreateQuizSetting;
