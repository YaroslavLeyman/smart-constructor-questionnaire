import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  saveResultsSettings,
} from "../../../redux/actions/quizActions";
import { toPng } from "html-to-image";
import QuizResult from "../../Quiz/QuizResult/QuizResult";

function CreateQuizResults() {
  const dispatch = useDispatch();
  const currentQuizIndex = useSelector((state) => state.quiz.currentQuizIndex);
  const resultsSettings = useSelector(
    (state) => state.quiz.quizzes[currentQuizIndex]?.resultsSettings || {}
  );
  const [resultTitle, setResultTitle] = useState(resultsSettings.title || "");
  const [resultDescription, setResultDescription] = useState(
    resultsSettings.description || ""
  );
  const [showRetryButton, setShowRetryButton] = useState(
    resultsSettings.showRetryButton || false
  );
  const loadedResultsSettings = useSelector(
    (state) => state.quiz.quizzes[currentQuizIndex]?.resultsSettings || {}
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [retryButton, setRetryButton] = useState(false);

  useEffect(() => {
    setResultTitle(loadedResultsSettings.title || "");
    setResultDescription(loadedResultsSettings.description || "");
    setShowRetryButton(loadedResultsSettings.showRetryButton || false);
  }, [currentQuizIndex, loadedResultsSettings.title, loadedResultsSettings.description, loadedResultsSettings.showRetryButton]);

  const handleShowRetrySwitch = (e) => {
    setShowRetryButton(e.target.checked);
  };

  const cardRef = useRef(null);
  const imgRef = useRef(null);

  const generateImage = async () => {
    const dataUrl = await toPng(cardRef.current);
    if (imgRef.current) {
      imgRef.current.src = dataUrl;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveResultsSettings(currentQuizIndex, {
        title: resultTitle,
        description: resultDescription,
        showRetryButton,
      })
    );
    setTitle(resultTitle);
    setDescription(resultDescription);
    setRetryButton(showRetryButton);
    generateImage();
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>Результаты</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mt-3" controlId="resultTitle">
                <Form.Label>Название результата</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите название результата"
                  value={resultTitle}
                  onChange={(e) => setResultTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mt-3" controlId="resultDescription">
                <Form.Label>Описание результата</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Введите описание результата"
                  value={resultDescription}
                  onChange={(e) => setResultDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Check
                className="mt-3"
                type="switch"
                id="showRetrySwitch"
                label="Добавить кнопку 'Попробовать снова'"
                checked={showRetryButton}
                onChange={handleShowRetrySwitch}
              />
              <Button className="mt-4" variant="success" type="submit">
                Сохранить результаты
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card id="thumbnail-container-result" ref={cardRef}>
          <Card.Body>
            <Card.Title>Предпросмотр результатов*</Card.Title>
            <QuizResult
              correct={5}
              totalQuestions={5}
              resultsSettings={{
                title: title,
                description: description,
                showRetryButton: retryButton,
              }}
              onRetry={() => {}}
            />
          </Card.Body>
        </Card>
        <Card.Text>*Картинка результата зависит от количества правильных ответов, в предпросмотре результатов указан пример максимального количества правильных ответов</Card.Text>
      </Col>
    </Row>
  );
}

export default CreateQuizResults;
