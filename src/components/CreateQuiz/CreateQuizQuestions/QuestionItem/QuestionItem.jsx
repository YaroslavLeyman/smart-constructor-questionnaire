import React, { useRef, useState } from "react";
import styles from "./QuestionItem.module.scss";
import { Card, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { BsList, BsTrash, BsLayers, BsChevronCompactUp } from "react-icons/bs";

import {
  selectQuestion,
  deleteQuestionItem,
  duplicateQuestionItem,
  moveQuestionItem,
  updateQuestionItem,
} from "../../../../redux/actions/quizActions";

function QuestionItem({
  questionData,
  questionIndex,
  setIsEditingAnswer,
  onQuestionSelected,
}) {
  const dispatch = useDispatch();
  const selectedQuestion = useSelector((state) => state.quiz.selectedQuestion);
  const currentQuizIndex = useSelector((state) => state.quiz.currentQuizIndex);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [{ isDragging }, dragRef] = useDrag({
    type: "question",
    item: { questionIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, dropRef] = useDrop({
    accept: "question",
    drop: (item) =>
      dispatch(
        moveQuestionItem(currentQuizIndex, item.questionIndex, questionIndex)
      ),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const ref = useRef(null);
  dragRef(dropRef(ref));

  if (!questionData) {
    return null;
  }

  const { text } = questionData;
  const isSelected = questionIndex === selectedQuestion;

  const questionTypeText = (() => {
    switch (questionData.type) {
      case "1":
        return "Выбор из нескольких вариантов";
      case "2":
        return "Выбор ДА/НЕТ";
      default:
        return "Варианты";
    }
  })();

  const hasAnswers = questionData.answers && questionData.answers.length > 0;

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    dispatch(deleteQuestionItem(currentQuizIndex, questionIndex));
  };

  const handleDuplicateClick = (e) => {
    e.stopPropagation();
    dispatch(duplicateQuestionItem(currentQuizIndex, questionIndex));
  };

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleQuestionItemClick = (event) => {
    if (event.target.tagName !== "BUTTON") {
      setIsEditingAnswer(false);
      dispatch(selectQuestion(questionIndex));
      onQuestionSelected();
    }
  };

  const handleCorrectAnswerChange = (index) => {
    if (questionData.type === "2") {
      const newAnswers = questionData.answers.map((answer, i) => {
        return {
          ...answer,
          isCorrect: i === index,
        };
      });
      dispatch(
        updateQuestionItem(currentQuizIndex, questionIndex, {
          ...questionData,
          answers: newAnswers,
        })
      );
    }
  };

  return (
    <Card
      ref={ref}
      className={`${styles.questionCard} ${isSelected ? styles.selected : ""}`}
      onClick={handleQuestionItemClick}
      style={{ opacity: isDragging || isOver ? 0.5 : 1 }}
    >
      <Card.Body>
        <div className={styles.cardTop}>
          <div className={styles.cardQuestion}>
            <div className={styles.questionNumber}>
              Вопрос {questionIndex + 1}
            </div>
            <div className={styles.questionType}>
              {isCollapsed ? (
                <Card.Text className={styles.cardTextQuestion}>
                  {text}
                </Card.Text>
              ) : (
                questionTypeText
              )}
            </div>
          </div>
          <div className={styles.icons}>
            <Button
              variant="outline-dark"
              size="sm"
              onClick={handleCollapseToggle}
              title="Свернуть"
            >
              <BsChevronCompactUp
                style={{
                  transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </Button>
          </div>
        </div>
        {!isCollapsed && (
          <>
            <Card.Text className={styles.cardTextQuestion}>{text}</Card.Text>
            {questionData.answers &&
              questionData.answers.map((answer, index) => (
                <div key={index} className={styles.cardTextAnswer}>
                  Ответ {index + 1}: {answer.text}{" "}
                  {questionData.type === "2" && (
                    <Form.Check
                      type="checkbox"
                      label="Правильный ответ"
                      checked={answer.isCorrect}
                      onChange={() => handleCorrectAnswerChange(index)}
                    />
                  )}
                  {answer.isCorrect && questionData.type !== "2" && (
                    <span>(Правильный ответ)</span>
                  )}
                </div>
              ))}

            <div className={styles.cardFooterContainer}>
              <div>
                {questionData.type === "2" ? (
                  <Card.Text className={styles.cardFooterText}>
                    {/* Ответом на вопрос будет выбор ДА или Нет */}
                  </Card.Text>
                ) : (
                  <Button
                    variant="outline-primary"
                    className={styles.buttonAddAnswer}
                    onClick={() => {
                      dispatch(selectQuestion(questionIndex));
                      setIsEditingAnswer(true);
                    }}
                  >
                    {hasAnswers ? "Редактировать ответы" : "Добавить ответы"}
                  </Button>
                )}
              </div>

              <div className={styles.cardFooterIcons}>
                <Button
                  variant="outline-dark"
                  size="sm"
                  title="Копировать"
                  onClick={handleDuplicateClick}
                >
                  <BsLayers />
                </Button>
                <Button variant="outline-dark" size="sm" title="Переместить">
                  <BsList />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  title="Удалить"
                  onClick={handleDeleteClick}
                >
                  <BsTrash />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default QuestionItem;
