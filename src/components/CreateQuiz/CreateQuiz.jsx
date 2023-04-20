import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import styles from "./CreateQuiz.module.scss";
import { Container, ListGroup, Button } from "react-bootstrap";
import { setQuizSavedStatus } from "../../redux/actions/quizActions";

export const CreateQuiz = () => {
  const quizIndex = useSelector((state) => state.quiz.currentQuizIndex);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const dispatch = useDispatch();

  const handleBackClick = () => {
    if (path.endsWith("/questions")) {
      navigate("/quiz/create");
    } else if (path.endsWith("/results")) {
      navigate("/quiz/create/questions");
    }
  };

  const handleNextClick = () => {
    if (path === "/quiz/create") {
      navigate("/quiz/create/questions");
    } else if (path.endsWith("/questions")) {
      navigate("/quiz/create/results");
    } else if (path.endsWith("/results")) {
      dispatch(setQuizSavedStatus(quizIndex, true));
      navigate("/quiz");
    }
  };

  const isBackDisabled = path === "/quiz/create";

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
            <ListGroup.Item
              as={NavLink}
              action
              to="results"
              className={styles.stepsLink}
            >
              Результаты
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
              <Button
                onClick={handleNextClick}
                size="lg"
                variant={path.endsWith("/results") ? "outline-success" : "primary"}
              >
                {path.endsWith("/results") ? "Сохранить квиз" : "Далее"}
              </Button>
            </li>
          </ul>
        </footer>
      </Container>
    </>
  );
};
