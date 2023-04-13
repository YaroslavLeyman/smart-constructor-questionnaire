import React, { useState, useCallback } from "react";
import styles from "../CreateQuiz.module.scss";
import { Form, Row, Col, Card, Collapse } from "react-bootstrap";
import { BsQuestionCircleFill } from 'react-icons/bs';


function CreateQuizContacts({quiz, setQuiz}) {

    //включает свитч сбор контактов
    const [open, setOpen] = useState(false);

    const createContactsHandler = useCallback((e) => {
        setQuiz((prevQuiz) => ({...prevQuiz.сontacts, [e.target.name]: e.target.value}));
    }, [setQuiz]);
    
    const createTurnOnContactsSwitchHandler = useCallback((e) => {
        setOpen((prevOpen) => !prevOpen);
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            сontacts: {
            ...prevQuiz.сontacts,
            [e.target.name]: e.target.checked,
            },
        }));
    }, [setQuiz]);

    const createSkipInputSwitchHandler = useCallback((e) => {
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            сontacts: {
            ...prevQuiz.сontacts,
            [e.target.name]: e.target.checked,
            },
        }));
    }, [setQuiz]);

    const createOneContactSwitchHandler = useCallback((e) => {
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            сontacts: {
            ...prevQuiz.сontacts,
            [e.target.name]: e.target.checked,
            },
        }));
    }, [setQuiz]);

    return (
        <Row>
            <Col>

                <Form.Check
                    className="mt-3"
                    type="switch"
                    label="ВКЛЮЧИТЬ СБОР КОНТАКТОВ"
                    name="switchTurnOnContacts"
                    onClick={createTurnOnContactsSwitchHandler}
                    aria-controls="example-collapse"
                    aria-expanded={open}
                />
                <Collapse in={open}>
                    <Form id="example-collapse">
                        <Row className={styles.turnOnContacts}>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Метод сбора контактов</Card.Title>
                                        <Form.Group className={styles.methodCollectingContacts} id="metodContacts">
                                            <Form.Check
                                                type="radio"
                                                label="Форма сбора контактов"
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios1"
                                            />
                                            <p>По окончанию квиза отображается форма для ввода контактов</p>
                                            <Form.Check
                                                type="radio"
                                                label="Кнопки мессенджеров"
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios2"
                                            />
                                            <p>В конце квиза отображаются кнопки мессенджеров</p>
                                        </Form.Group>

                                        <Card.Title className={styles.blockResults}>Тут будут поля для формы или мессенджеры</Card.Title>

                                        <Form.Check
                                            className="mt-3"
                                            type="switch"
                                            label="ВОЗМОЖНО ПРОПУСТИТЬ ВВОД КОНТАКТОВ"
                                            name="switchSkipInput"
                                            onClick={createSkipInputSwitchHandler}
                                        />
                                        <Form.Check
                                            className="mt-3"
                                            type="switch"
                                            label="ВВОД ХОТЯ БЫ ОДНОГО КОНТАКТА"
                                            name="switchOneContact"
                                            onClick={createOneContactSwitchHandler}
                                        />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Тексты</Card.Title>
                                        <Form.Group controlId="textTitleContacts" className={styles.textContacts}>
                                            <Form.Label>Заголовок</Form.Label>
                                            <Form.Control
                                                as="textarea" 
                                                rows={2}
                                                name="textTitleContact"
                                                onChange={createContactsHandler}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="textDescrContacts" className={styles.textContacts}>
                                            <Form.Label>Описание</Form.Label>
                                            <Form.Control
                                                as="textarea" 
                                                rows={3}
                                                name="textDescriptionContact"
                                                onChange={createContactsHandler}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="phoneDefaultContacs" className={styles.textContacts}>
                                            <Form.Label>Телефонный код страны по умолчанию</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="codeCountryDefaultContact"
                                                onChange={createContactsHandler}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="textPrivacyContacts" className={styles.textContacts}>
                                            <Form.Label>Текст о конфиденциальности данных</Form.Label>
                                            <Form.Control
                                                as="textarea" 
                                                rows={3}
                                                name="textDataPrivacy"
                                                onChange={createContactsHandler}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="textButtonRequestContacs" className={styles.textContacts}>
                                            <Form.Label>Текст кнопки запроса результатов</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="textButtonViewResult"
                                                onChange={createContactsHandler}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="completionQuizContacts" className={styles.textContacts}>
                                            <Form.Label>Текст после отправки контактов/Завершения квиза</Form.Label>
                                            <BsQuestionCircleFill />
                                            <Form.Control
                                                as="textarea" 
                                                rows={4}
                                                name="textAfterCompletingQuiz"
                                                onChange={createContactsHandler}
                                            />
                                        </Form.Group>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Form>
                </Collapse>
                
            </Col>
        </Row>
    );
}

export default CreateQuizContacts;