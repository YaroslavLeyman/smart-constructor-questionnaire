import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import styles from "../CreateQuiz.module.scss";
import QuestionItem from "./QuestionItem/QuestionItem";
import CreateQuestionItem from "./CreateQuestionItem/CreateQuestionItem";
import QuestionItemAnswer from "./QuestionItemAnswer/QuestionItemAnswer";
import {
  addQuestionItem,
  selectQuestion,
} from "../../../redux/actions/quizActions";

function CreateQuizQuestions() {
  const dispatch = useDispatch();
  const currentQuizIndex = useSelector((state) => state.quiz.currentQuizIndex);
  const questions = useSelector(
    (state) => state.quiz.quizzes[currentQuizIndex]?.questions || []
  );

  const selectedQuestion = useSelector((state) => state.quiz.selectedQuestion);
  const [isEditingAnswer, setIsEditingAnswer] = React.useState(false);
  const [showCreateQuestionItem, setShowCreateQuestionItem] =
    React.useState(false);

  React.useEffect(() => {
    const hasQuestionsChanged = new CustomEvent("hasQuestionsChanged", {
      detail: questions.length > 0,
    });
    window.dispatchEvent(hasQuestionsChanged);
  }, [questions]);

  const handleAddQuestion = (question) => {
    if (question.text) {
      dispatch(addQuestionItem(question, currentQuizIndex));
      setShowCreateQuestionItem(false);
    }
  };

  const [resetForm, setResetForm] = React.useState(() => () => {});

  const handleResetFormClick = () => {
    resetForm();
    dispatch(selectQuestion(null));
    setShowCreateQuestionItem(true);
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <div className={styles.containerQuestion}>
              <Card.Title>Вопросы</Card.Title>
              <Button size="sm" onClick={handleResetFormClick}>
                Добавить вопрос
              </Button>
            </div>
            <DndProvider backend={HTML5Backend}>
              {questions.length === 0 ? (
                <Form>
                  <div
                    className={styles.blockNewQuestion}
                    onClick={handleResetFormClick}
                    style={{ cursor: "pointer" }}
                  >
                    <span className={styles.newQuestion}>новый вопрос</span>
                    <p className={styles.paragraphQuestion}>
                      Здесь будут сохраняться Ваши вопросы
                    </p>
                  </div>
                </Form>
              ) : (
                questions.map((question, index) => (
                  <QuestionItem
                    key={`question-${question.id}`}
                    questionData={question}
                    questionIndex={index}
                    setIsEditingAnswer={setIsEditingAnswer}
                    onQuestionSelected={() => setShowCreateQuestionItem(true)}
                  />
                ))
              )}
            </DndProvider>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        {isEditingAnswer ? (
          <QuestionItemAnswer
            questionIndex={selectedQuestion}
            setIsEditingAnswer={setIsEditingAnswer}
          />
        ) : (
          showCreateQuestionItem && (
            <CreateQuestionItem
              onAddQuestion={handleAddQuestion}
              setResetForm={setResetForm}
              selectedQuestionData={
                selectedQuestion !== null ? questions[selectedQuestion] : null
              }
              currentQuizIndex={currentQuizIndex}
              selectedQuestion={selectedQuestion}
              setShowCreateQuestionItem={setShowCreateQuestionItem}
              onQuestionAddedOrUpdated={() => setShowCreateQuestionItem(false)}
            />
          )
        )}
      </Col>
    </Row>
  );
}

export default CreateQuizQuestions;
