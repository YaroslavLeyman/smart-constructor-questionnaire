import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import styles from "./CreateQuiz.module.scss";
import { Container, ListGroup, Button } from "react-bootstrap";
import { setSavedQuizIndex as setSavedQuizIndexAction } from "../../redux/actions/quizActions";

export const CreateQuiz = () => {
  const currentQuizIndex = useSelector((state) => state.quiz.currentQuizIndex);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const dispatch = useDispatch();

  const [hasQuestions, setHasQuestions] = useState(false);

  useEffect(() => {
    const handleHasQuestionsChanged = (event) => {
      setHasQuestions(event.detail);
    };

    window.addEventListener("hasQuestionsChanged", handleHasQuestionsChanged);
    return () => {
      window.removeEventListener(
        "hasQuestionsChanged",
        handleHasQuestionsChanged
      );
    };
  }, []);

  const handleBackClick = () => {
    if (path.endsWith("/questions")) {
      navigate("/quiz/create");
      setHasQuestions(false);
    }
  };

  const handleNextClick = () => {
    if (!path.endsWith("/questions")) {
      navigate("questions");
    }
  };

  const handleSaveQuiz = () => {
    dispatch(setSavedQuizIndexAction(currentQuizIndex));
  };

  const isBackDisabled = !path.endsWith("/questions");

  return (
    <>
      <Container className={styles.container}>
        <div className={styles.steps}>
          <ListGroup defaultActiveKey="" className={styles.stepsList}>
            <ListGroup.Item
              as={NavLink}
              action
              to=""
              className={styles.stepsLink}
              end
            >
              Настройки
            </ListGroup.Item>
            <ListGroup.Item
              as={NavLink}
              action
              to="questions"
              className={styles.stepsLink}
            >
              Вопросы
            </ListGroup.Item>
          </ListGroup>
        </div>

        <>
          <Outlet />
        </>

        <footer className={styles.footer}>
          <ul className={styles.stepFooter}>
            <li className={styles.stepFooterButton}>
              <Button
                onClick={handleBackClick}
                disabled={isBackDisabled}
                size="lg"
              >
                Назад
              </Button>
            </li>
            <li>
              {hasQuestions ? (
                <Button onClick={handleSaveQuiz} size="lg">Сохранить квиз</Button>
              ) : (
                <Button onClick={handleNextClick} size="lg">
                  Далее
                </Button>
              )}
            </li>
          </ul>
        </footer>
      </Container>
    </>
  );
};

