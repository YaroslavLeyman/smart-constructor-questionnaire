import React, { useState, useCallback } from "react";
import styles from "../CreateQuiz.module.scss";
import { Form, Button, Row, Col, Card, Collapse } from "react-bootstrap";

function CreateQuizSetting({ quiz, setQuiz }) {
  const [open, setOpen] = useState(false);

  const createQuizHandler = useCallback(
    (e) => {
      setQuiz((prevQuiz) => ({
        ...prevQuiz.setting,
        [e.target.name]: e.target.value,
      }));
    },
    [setQuiz]
  );

  const createQuizSwitchHandler = useCallback(
    (e) => {
      setOpen((prevOpen) => !prevOpen);
      setQuiz((prevQuiz) => ({
        ...prevQuiz,
        setting: {
          ...prevQuiz.setting,
          [e.target.name]: e.target.checked,
        },
      }));
    },
    [setQuiz]
  );

  const createQuizContactHandler = useCallback(
    (e) => {
      setQuiz((prevQuiz) => ({
        ...prevQuiz,
        setting: {
          ...prevQuiz.setting,
          contact: {
            ...prevQuiz.setting.contact,
            [e.target.name]: e.target.value,
          },
        },
      }));
    },
    [setQuiz]
  );

  console.log(quiz.setting);

  return (
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>Настройки</Card.Title>
            <Form>
              <Form.Group controlId="formQuizName">
                <Form.Label>Название квиза</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Произвольное название, видно только вам"
                  name="name"
                  onChange={createQuizHandler}
                />
              </Form.Group>

              <Form.Group controlId="formQuizTitle">
                <Form.Label>Заголовок квиза</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Заголовок, например, узнайте сколько будет стоит диван на заказ"
                  name="title"
                  onChange={createQuizHandler}
                />
              </Form.Group>

              <Form.Check
                className="mt-3"
                type="switch"
                label="Эффект печатной машинки"
              />

              <Form.Group controlId="formQuizButton">
                <Form.Label>Текст кнопки</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Например, начать"
                  name="textButtonQuiz"
                  onChange={createQuizHandler}
                />
              </Form.Group>

              <Form.Group controlId="formQuizAddConact">
                <Form.Check
                  className="mt-3"
                  type="switch"
                  label="Добавить контакную информацию"
                  name="contactCheck"
                  onClick={createQuizSwitchHandler}
                  aria-controls="example-collapse"
                  aria-expanded={open}
                />
                <Collapse in={open}>
                  <div id="example-collapse">
                    
                    <Form.Group controlId="formQuizNameCompany">
                      <Form.Label>Название компании</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Например, Мебельный"
                        name="company"
                        onChange={createQuizContactHandler}
                      />
                    </Form.Group>
                    <Form.Group controlId="formQuizDescrCompany">
                      <Form.Label>Описание деятельности</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Доставляем диваны по всей России"
                        name="descriptionCompany"
                        onChange={createQuizContactHandler}
                      />
                    </Form.Group>
                    <Form.Group controlId="formQuizPhoneCompany">
                      <Form.Label>Телефон</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="+7 (495) 000-00-00"
                        name="telCompany"
                        onChange={createQuizContactHandler}
                      />
                    </Form.Group>
                    <Form.Group controlId="formQuizTimeCompany">
                      <Form.Label>Время работы</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Время работы: 9.00 - 18.00"
                        name="workingHoursCompany"
                        onChange={createQuizContactHandler}
                      />
                    </Form.Group>
                  </div>
                </Collapse>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Body>
            <div className={styles.stepContent}>
              <div>
                <h2 className={styles.stepContentInfoHeader}>
                  Введите заголовок квиза
                </h2>
                <Button variant="primary">Пройти тест</Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default CreateQuizSetting;
