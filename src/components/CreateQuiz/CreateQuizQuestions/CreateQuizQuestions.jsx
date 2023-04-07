import React, { useCallback } from "react";
import styles from "../CreateQuiz.module.scss";
import { Row, Col, Card, Form, Button, FloatingLabel } from "react-bootstrap";


function CreateQuizQuestions({quiz, setQuiz}) {

    // console.log(quiz);
    const createQuestionsHandler = useCallback((e) => {
        setQuiz((prevQuiz) => ({...prevQuiz.questions, [e.target.name]: e.target.value}));
    }, [setQuiz]);
    
    const createChooseSwitchHandler = useCallback((e) => {
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            questions: {
            ...prevQuiz.questions,
            [e.target.name]: e.target.checked,
            },
        }));
    }, [setQuiz]);

    const createDropDownSwitchHandler = useCallback((e) => {
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            questions: {
            ...prevQuiz.questions,
            [e.target.name]: e.target.checked,
            },
        }));
    }, [setQuiz]);

    console.log(quiz.questions);

    return (
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>Вопросы</Card.Title>
                            <Form>
                                <Button href="#" size="sm">
                                    + Вопрос
                                </Button>
                                <div className={styles.blockNewQuestion}>
                                    <span className={styles.newQuestion}>новый вопрос</span>
                                    <p className={styles.paragraphQuestion}>Укажите необходимые данные и нажмите добавить</p>
                                </div>
                            </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Body>
                        <Form>
                            <FloatingLabel controlId="floatingSelect" label="ТИП ВОПРОСА">
                                <Form.Select aria-label="Floating label select example" 
                                    name="textTypeSelect" 
                                    onChange={createQuestionsHandler}
                                >
                                    <option>Выбор из нескольких текстовых вариантов</option>
                                    <option value="1">Выбор из нескольких вариантов с картинками</option>
                                    <option value="2">Мотиватор. Варианты с картинками или без них</option>
                                    <option value="3">ДА/НЕТ. Когда нужно получить утвердительный или отрицательный ответ</option>
                                    <option value="4">Числовое. Позволяет запросить числовое значение</option>
                                    <option value="5">Произвольный ввод текста (однострочный или многострочный)</option>
                                    <option value="6">Загрузка файла. Позволяет посетителю загрузить свой файл</option>
                                </Form.Select>
                            </FloatingLabel>
                            <Form.Group controlId="formQuestionText">
                                <Form.Label>Текст вопроса</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Например, сколько комнат в вашей квартире?"
                                    name="textQuestion"
                                    onChange={createQuestionsHandler}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formQuestionHint">
                                <Form.Label>Текст подсказки</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={3}
                                    placeholder="Необязательно, но очень рекомендуем заполнить, например: Количество комнат влияет на итоговый расчет системы кондиционирования"
                                    name="textHint"
                                    onChange={createQuestionsHandler} 
                                />
                            </Form.Group>
                            <Form.Check
                                className="mt-3"
                                type="switch"
                                label="ВОЗМОЖНОСТЬ ВЫБОРА НЕСКОЛЬКИХ ВАРИАНТОВ"
                                name="switchChooseAnyVariant"
                                onClick={createChooseSwitchHandler}
                            />
                            <Form.Check
                                className="mt-3"
                                type="switch"
                                label="ВЫПАДАЮЩИЙ СПИСОК"
                                name="switchDropDownList"
                                onClick={createDropDownSwitchHandler}
                            />
                            <Form.Group controlId="formQuestionPicture" className="mb-3">
                                <Form.Label>Картинка вопроса</Form.Label>
                                <Form.Control 
                                    type="file" 
                                    size="sm" 
                                    name="pictureQuestion"
                                />
                            </Form.Group>
                            <Form.Group controlId="formQuestionAnswer">
                                <Form.Label>Текст в случае правильного ответа</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Правильный ответ"
                                    name="textRightAnswer"
                                    onChange={createQuestionsHandler}
                                />
                            </Form.Group>
                            <Form.Group controlId="formQuestionWrongAnswer">
                                <Form.Label>Текст в случае неправильного ответа</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Неравильный ответ"
                                    name="textWrongAnswer"
                                    onChange={createQuestionsHandler}
                                />
                            </Form.Group>
                            <Row className={styles.blockButtonQuestion}>
                                <Col>
                                    <Button variant="outline-danger">Отменить</Button>
                                    <Button variant="outline-primary" className={styles.buttonAddQuestion}>Добавить</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default CreateQuizQuestions;
