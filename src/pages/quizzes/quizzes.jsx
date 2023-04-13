import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./quizzes.module.scss";
import { Container, Dropdown, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import QuizItem from "../../components/CreateQuiz/QuizItem/QuizItem";
import { resetCurrentQuizIndex } from "../../redux/actions/quizActions";

export const Quizzes = () => {
  const quizzes = useSelector((state) => state.quiz.quizzes);
  const dispatch = useDispatch();

  const handleCreateQuiz = () => {
    dispatch(resetCurrentQuizIndex());
  };

  return (
    <Container>
      {quizzes.length > 0 ? (
        <>
          <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              + СОЗДАТЬ КВИЗ
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <Dropdown.Item as={NavLink} to="/quiz/create" onClick={handleCreateQuiz}>
                С нуля
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Row>
            {quizzes.map((quiz, index) => (
              <Col key={index} md={10}>
                <QuizItem key={quiz.id} quizData={quiz} quizIndex={index} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <div className={styles.emptyQuizzes}>
          <h2>Вы не создали ни одного квиза</h2>
          <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              + СОЗДАТЬ КВИЗ
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <Dropdown.Item as={NavLink} to="/quiz/create">
                С нуля
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </Container>
  );
};
