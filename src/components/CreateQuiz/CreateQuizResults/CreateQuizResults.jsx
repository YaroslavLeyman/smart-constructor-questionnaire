import React, { useState, useCallback } from "react";
import styles from "../CreateQuiz.module.scss";
import { Row, Col, Card, Form, Collapse, Button } from "react-bootstrap";


function CreateQuizResults({quiz, setQuiz}) {

    //показывает и добавляет результат
    const [open, setOpen] = useState(false);
    const [add, setAdd] = useState(false);

    // console.log(quiz);
    const createResultsHandler = useCallback((e) => {
        setQuiz((prevQuiz) => ({...prevQuiz.results, [e.target.name]: e.target.value}));
    }, [setQuiz]);

    const createShowResultSwitchHandler = useCallback((e) => {
        setOpen((prevOpen) => !prevOpen);
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            results: {
            ...prevQuiz.results,
            [e.target.name]: e.target.checked,
            },
        }));
    }, [setQuiz]);

    const createButtonAddResultSwitchHandler = useCallback((e) => {
        setAdd((prevAdd) => !prevAdd);
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            results: {
            ...prevQuiz.results,
            [e.target.name]: e.target.checked,
            },
        }));
    }, [setQuiz]);

    const createSendEmailResultSwitchHandler = useCallback((e) => {
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            results: {
            ...prevQuiz.results,
            [e.target.name]: e.target.checked,
            },
        }));
    }, [setQuiz]);

    const createShowResultBeforeSwitchHandler = useCallback((e) => {
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            results: {
            ...prevQuiz.results,
            [e.target.name]: e.target.checked,
            },
        }));
    }, [setQuiz]);
    

    console.log(quiz.results);

    return (
        <Row>
            <Col>  
                <Card>
                    <Card.Body>

                        <Card.Title>Результаты</Card.Title>
                        <Row>
                            <Col>
                            <Form>
                                <Form.Check
                                    className="mt-3"
                                    type="switch"
                                    label="Показывать результаты?"
                                    name="switchShowResult"
                                    onClick={createShowResultSwitchHandler}
                                    aria-controls="example-collapse"
                                    aria-expanded={open}
                                /></Form>
                                <Collapse in={open} className={styles.typesResults}>
                                    <Form id="example-collapse">
                                        <Card.Subtitle>Виды результатов</Card.Subtitle>
                                        <Form.Group className={styles.blockResults} id="formQuizRadioResult">
                                            <Form.Check
                                                type="radio"
                                                label="ФИКСИРОВАННЫЕ"
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios1"
                                            />
                                            <p className={styles.descrTypesResult}>По окончанию отображается какое-либо сообщение или происходит переход на URL</p>
                                        
                                            <Form.Check
                                                type="radio"
                                                label="РАСЧЕТНЫЕ"
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios2"
                                            />
                                            <p className={styles.descrTypesResult}>Результат рассчитывается по формуле на основании введенных клиентом данных</p>
                                    
                                            <Form.Check
                                                type="radio"
                                                label="СМЕШАННЫЙ"
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios3"
                                            />
                                            <p className={styles.descrTypesResult}>Комбинированный вариант, когда клиенту показывается расчет и далее происходит конкретное действие</p>
                                        </Form.Group>
                                    </Form>
                                </Collapse>
                            </Col>

                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Form>
                                            <Button 
                                                className={styles.buttonAddResult}
                                                size="lg"
                                                name="switchButtonAddResult"
                                                onClick={createButtonAddResultSwitchHandler}
                                                // onClick={() => setAdd(!add)}
                                                aria-controls="add-result"
                                                aria-expanded={add} 
                                            >
                                                + Добавить результат
                                            </Button>
                                            <Collapse in={add} className={styles.typesResults}>
                                                <Form id="add-result">
                                                    <Card.Subtitle>Тип результата</Card.Subtitle>
                                                    <Form.Group id="formQuizTypeResult" className={styles.formQuizTypeResult}>
                                                        <Form.Check
                                                            type="radio"
                                                            label="ТЕКСТ/ИЗОБРАЖЕНИЕ"
                                                            name="formHorizontalRadios"
                                                            id="typeResultText"
                                                        />
                                                        <Form.Check
                                                            type="radio"
                                                            label="ПЕРЕСЫЛКА НА URL"
                                                            name="formHorizontalRadios"
                                                            id="typeResultUrl"
                                                        />
                                                        <Form.Check
                                                            type="radio"
                                                            label="РАСШИРЕННЫЙ"
                                                            name="formHorizontalRadios"
                                                            id="typeResultExpand"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group controlId="titleResult" className={styles.formResult}>
                                                        <Form.Label>Текст</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Заголовок, например, Вот Ваш результат"
                                                            name="textTitleResult"
                                                            onChange={createResultsHandler}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group controlId="descrResult" className={styles.formResult}>
                                                        <Form.Label>Описание</Form.Label>
                                                        <Form.Control
                                                            as="textarea" 
                                                            rows={3}
                                                            placeholder="Например, Тренировка с тренером даст быстрый и устойчивый результат, который будет заметен через неделю тренировок"
                                                            name="descriptionResult"
                                                            onChange={createResultsHandler}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group controlId="pictureResult" className={styles.formResult}>
                                                        <Form.Label>Изображение</Form.Label>
                                                        <Form.Control 
                                                            type="file" 
                                                            size="sm" 
                                                            name="pictureResult"
                                                        />
                                                    </Form.Group>

                                                    <Form.Check
                                                        className={styles.formResult}
                                                        type="switch"
                                                        label="Отправлять письмо с результатом на email клиента"
                                                        name="switchSendEmailResult"
                                                        onClick={createSendEmailResultSwitchHandler}
                                                    />

                                                    <Form.Check
                                                        className={styles.formResult}
                                                        type="switch"
                                                        label="Показывать результаты до формы контактов?"
                                                        name="switchShowResultBefore"
                                                        onClick={createShowResultBeforeSwitchHandler}
                                                    />
                                                    <Row className={styles.formResult}>
                                                        <Col>
                                                            <Button variant="outline-secondary">Закрыть</Button>
                                                            <Button variant="outline-primary" className={styles.buttonAddQuestion}>Добавить</Button>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Collapse>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                    </Card.Body>
                </Card>
            </Col> 
        </Row>
    );
}

export default CreateQuizResults;