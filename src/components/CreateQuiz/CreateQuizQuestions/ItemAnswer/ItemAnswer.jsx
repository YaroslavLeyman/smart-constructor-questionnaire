import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ItemAnswer.module.scss";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { updateQuestionItem } from "../../../../redux/actions/quizActions";

function QuestionItemAnswer({ questionIndex, setIsEditingAnswer }) {
  const dispatch = useDispatch();
  const currentQuizIndex = useSelector((state) => state.quiz.currentQuizIndex);
  const selectedQuestion = useSelector((state) => state.quiz.selectedQuestion);
  const questionData = useSelector(
    (state) =>
      state.quiz.quizzes[currentQuizIndex]?.questions[selectedQuestion] || {}
  );

  const [answers, setAnswers] = useState(questionData.answers || []);

  useEffect(() => {
    if (questionData.answers) {
      setAnswers(questionData.answers);
    }
  }, [questionData.answers]);

  const handleSaveAnswers = () => {
    dispatch(
      updateQuestionItem(currentQuizIndex, selectedQuestion, {
        ...questionData,
        answers,
      })
    );
    setIsEditingAnswer(false);
  };

  const handleCancel = () => {
    setIsEditingAnswer(false);
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index].text = value;
    setAnswers(newAnswers);
  };

  const handleCorrectAnswerChange = (index) => {
    const newAnswers = [...answers];
    newAnswers.forEach((answer, i) => {
      answer.isCorrect = i === index;
    });
    setAnswers(newAnswers);
  };

  const addAnswer = () => {
    setAnswers([...answers, { text: "", isCorrect: false }]);
  };

  const deleteAnswer = (index) => {
    const newAnswers = answers.filter((_, i) => i !== index);
    setAnswers(newAnswers);
  };

  return (
    <Card>
      <Card.Body>
        <Form>
          <Button
            variant="outline-success"
            className="mb-3"
            onClick={addAnswer}
          >
            Добавить ответ
          </Button>
          {answers.map((answer, index) => (
            <Form.Group controlId={`formAnswerText${index}`} key={index}>
              <Form.Label>Ответ {index + 1}</Form.Label>
              <div className={styles.answerContainer}>
                <Form.Control
                  type="text"
                  placeholder="Напишите вариант ответа"
                  value={answer.text}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
                <div className={styles.footerAnswerContainer}>
                  <Form.Check
                    type="checkbox"
                    label="Правильный ответ"
                    checked={answer.isCorrect}
                    onChange={() => handleCorrectAnswerChange(index)}
                  />
                  <Button
                    variant="outline-danger"
                    size="sm"
                    title="Удалить"
                    onClick={() => deleteAnswer(index)}
                  >
                    <BsTrash />
                  </Button>
                </div>
              </div>
            </Form.Group>
          ))}

          <Row className={styles.blockButtonQuestion}>
            <Col>
              <Button variant="outline-danger" onClick={handleCancel}>
                Отменить
              </Button>
              <Button
                variant="outline-primary"
                className={styles.buttonAddQuestion}
                onClick={handleSaveAnswers}
              >
                Сохранить
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default QuestionItemAnswer;
