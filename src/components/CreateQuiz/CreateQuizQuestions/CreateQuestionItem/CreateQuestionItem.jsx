import React, { useState, useEffect } from "react";
import styles from "./CreateQuestionItem.module.scss";
import { Card, Form, Button, FloatingLabel, FormCheck } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuestionItem,
  updateQuestionItem,
  selectQuestion,
} from "../../../../redux/actions/quizActions";
import { v4 as uuidv4 } from "uuid";


function CreateQuestionItem({ selectedQuestionData, setShowCreateQuestionItem, onQuestionAddedOrUpdated }) {
  const [questionText, setQuestionText] = useState("");
  const [isNewQuestion, setIsNewQuestion] = useState(true);
  const dispatch = useDispatch();
  const currentQuizIndex = useSelector((state) => state.quiz.currentQuizIndex);
  const selectedQuestion = useSelector((state) => state.quiz.selectedQuestion);
  const [questionType, setQuestionType] = useState("");
  const [disableSkipping, setDisableSkipping] = useState(false);

  useEffect(() => {
    if (selectedQuestionData) {
      setIsNewQuestion(false);
      setQuestionText(selectedQuestionData.text);
      setQuestionType(selectedQuestionData.type || "");
    } else {
      setIsNewQuestion(true);
      setQuestionText("");
      setQuestionType("");
    }
  }, [selectedQuestionData]);

  const handleAddQuestionClick = () => {
    if (questionText.trim() !== "") {
      if (isNewQuestion) {
        dispatch(
          addQuestionItem(
            {
              id: uuidv4(),
              text: questionText,
              type: questionType,
              answers: [],
              disableSkipping: questionType === "2" ? disableSkipping : undefined,
            },
            currentQuizIndex
          )
        );
        setQuestionText("");
      } else {
        dispatch(
          updateQuestionItem(currentQuizIndex, selectedQuestion, {
            ...selectedQuestionData,
            text: questionText,
            type: questionType,
          })
        );
      }
      onQuestionAddedOrUpdated();
    }
  };

  const handleQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);
  };

  const handleCancel = () => {
    setQuestionText("");
    setQuestionType("");
    setShowCreateQuestionItem(false)
    dispatch(selectQuestion(null));
  };

  return (
    <Card>
      <Card.Body>
        <Form>
          <FloatingLabel controlId="floatingSelect" label="ТИП ВОПРОСА">
            <Form.Select
              aria-label="Floating label select example"
              name="textTypeSelect"
              value={questionType}
              onChange={handleQuestionTypeChange}
            >
              <option value="">Выберите тип вопроса</option>
              <option value="1">Выбор из нескольких текстовых вариантов</option>
              <option value="2">
                Произвольный ввод текста (однострочный или многострочный)
              </option>
            </Form.Select>
          </FloatingLabel>
          <Form.Group controlId="formQuestionText">
            <Form.Label>Текст вопроса</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите текст вопроса"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </Form.Group>

          {questionType === "2" && (
            <Form.Group className="mt-3">
              <FormCheck
                type="switch"
                id="disableSkippingSwitch"
                label="Пропустить вопрос нельзя"
                checked={disableSkipping}
                onChange={(e) => setDisableSkipping(e.target.checked)}
              />
            </Form.Group>
          )}

          <Button variant="outline-danger" onClick={handleCancel}>
            Отменить
          </Button>
          <Button
            variant="outline-primary"
            className={styles.buttonAddQuestion}
            onClick={handleAddQuestionClick}
          >
            {isNewQuestion ? "Создать" : "Сохранить"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CreateQuestionItem;
