import React, { useState, useEffect } from "react";
import { Card, Form, Button, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuestionItem,
  updateQuestionItem,
  selectQuestion,
} from "../../../../redux/actions/quizActions";
import { v4 as uuidv4 } from "uuid";

function CreateQuestionItem({
  selectedQuestionData,
  setShowCreateQuestionItem,
  onQuestionAddedOrUpdated,
}) {
  const [questionText, setQuestionText] = useState("");
  const [isNewQuestion, setIsNewQuestion] = useState(true);
  const dispatch = useDispatch();
  const currentQuizIndex = useSelector((state) => state.quiz.currentQuizIndex);
  const selectedQuestion = useSelector((state) => state.quiz.selectedQuestion);
  const [questionType, setQuestionType] = useState("");

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
      let answersArray = [];
  
      if (questionType === "2") {
        answersArray = [
          { text: "Да", isCorrect: false },
          { text: "Нет", isCorrect: false },
        ];
      }
  
      if (isNewQuestion) {
        dispatch(
          addQuestionItem(
            {
              id: uuidv4(),
              text: questionText,
              type: questionType,
              answers: answersArray,
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
            answers: answersArray,
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
    setShowCreateQuestionItem(false);
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
              <option value="">Выберите тип вопроса:</option>
              <option value="1">Выбор из нескольких вариантов</option>
              <option value="2">Выбор ДА/НЕТ</option>
            </Form.Select>
          </FloatingLabel>
          <Form.Group className="mt-3" controlId="formQuestionText">
            <Form.Label>Текст вопроса</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите текст вопроса"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </Form.Group>
          <Button
            className="mt-4"
            variant="outline-danger"
            onClick={handleCancel}
          >
            Отменить
          </Button>{" "}
          <Button
            className="mt-4"
            variant="outline-primary"
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
