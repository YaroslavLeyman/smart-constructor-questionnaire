import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardGroup,
  Button,
  Modal,
} from "react-bootstrap";
import QuizOne from "../../components/QuizTemplates/QuizOne/QuizOne";
import styles from "./templates.module.scss";
import { quizSets } from "../../components/QuizTemplates/quizSets";

export const Templates = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);

  const handleClose = () => setShowModal(false);
  const handleShow = (quizIndex) => () => {
    setSelectedQuizIndex(quizIndex);
    setShowModal(true);
  };

  const cards = [
    { title: "React", text: "Проверь свои знания React" },
    { title: "JavaScript", text: "Проверь свои знания JS" },
    { title: "TypeScript", text: "Проверь свои знания TS" },
    { title: "Redux", text: "Проверь свои знания Redux" },
    { title: "Node.js", text: "Проверь свои знания Node.js" },
    { title: "Git", text: "Проверь свои знания Git" },
  ];

  return (
    <Container className={styles.container}>
      <Row className="justify-content-center">
        <Col xs="auto">
          <h2 className="text-center mt-4">Шаблоны квизов</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <CardGroup>
            {cards.map((card, index) => (
              <Col
                key={index}
                xs={12}
                md={6}
                lg={4}
                className={`mb-4 ${styles.colMargin}`}
              >
                <div className={styles.cardWrapper}>
                  <Card>
                    <Card.Body>
                      <Card.Title>{card.title}</Card.Title>
                      <Card.Text>{card.text}</Card.Text>
                      <Button variant="primary" onClick={handleShow(index)}>
                        Посмотреть
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            ))}
          </CardGroup>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <QuizOne questions={quizSets[selectedQuizIndex]} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
