import React, { useState, useEffect } from "react";
import styles from "./QuizItem.module.scss";
import { Card, Button, Image, Dropdown, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsTrash } from "react-icons/bs";
import defaultImage from "../../../images/default-image.PNG";
import { setCurrentQuizIndex, deleteQuiz } from "../../../redux/actions/quizActions";
import Quiz from "../../Quiz/Quiz";

const QuizItem = ({ quizData, quizIndex }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [localQuizData, setLocalQuizData] = useState(quizData);
  const [showModal, setShowModal] = useState(false);

  const savedQuizIndex = useSelector((state) => state.quiz.savedQuizIndex);

  const showDropdown = savedQuizIndex === quizIndex;

  useEffect(() => {
    setLocalQuizData(quizData);
  }, [quizData]);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  if (!localQuizData) {
    return null;
  }

  const { name, title } = localQuizData.setting;

  const handleQuizItemClick = () => {
    dispatch(setCurrentQuizIndex(quizIndex));
    navigate("/quiz/create");
  };

  const handleDeleteQuiz = () => {
    dispatch(deleteQuiz(quizIndex));
  };

  return (
    <>
      <Card className={styles.card}>
        <Card.Body>
          <div className={styles.container}>
            <div className={styles.contentContainer}>
              <div>
                <Image src={localQuizData.image || defaultImage} className={styles.image} />
              </div>
              <div>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{title}</Card.Text>
              </div>
            </div>

            <div>
              {showDropdown ? (
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Действия
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleShowModal}>
                      Просмотреть
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleQuizItemClick}>Редактировать</Dropdown.Item>
                    <Dropdown.Item>Копировать</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button variant="success" onClick={handleQuizItemClick}>
                  Продолжить создание
                </Button>
              )}
            </div>
          </div>
          <div className={styles.footer}>
            {showDropdown ? (
              <span className={styles.saved}>Квиз готов</span>
            ) : (
              "Черновик"
            )}
            <Button
              variant="outline-danger"
              size="sm"
              title="Удалить"
              onClick={handleDeleteQuiz}
            >
              <BsTrash />
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Предпросмотр квиза</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Quiz />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default QuizItem;
