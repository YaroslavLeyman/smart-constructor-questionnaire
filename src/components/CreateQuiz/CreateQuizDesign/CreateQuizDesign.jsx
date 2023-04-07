import React, { useState, useCallback } from "react";
import styles from "../CreateQuiz.module.scss";
import { Form, Row, Col, Card, Collapse } from "react-bootstrap";
import { BsQuestionCircleFill } from 'react-icons/bs';


function CreateQuizDesign({quiz, setQuiz}) {

    //отображает эксперта и скидку
    const [open, setOpen] = useState(false);
    const [openDiscountOpen, setDiscountOpen] = useState(false);

    // console.log(quiz);
    const createShowCoverQuizSwitchHandler = useCallback((e) => {
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            design: {
                ...prevQuiz.design,
                additionally: {
                ...prevQuiz.design.additionally,
                [e.target.name]: e.target.checked,
                },
            },
        }));
    }, [setQuiz]);

    const createShowExpertSwitchHandler = useCallback((e) => {
        setOpen((prevOpen) => !prevOpen);
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            design: {
                ...prevQuiz.design,
                additionally: {
                ...prevQuiz.design.additionally,
                [e.target.name]: e.target.checked,
                },
            },
        }));
    }, [setQuiz]);

    const createShowDiscountSwitchHandler = useCallback((e) => {
        setDiscountOpen((prevOpenDiscountOpen) => !prevOpenDiscountOpen);
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            design: {
                ...prevQuiz.design,
                additionally: {
                ...prevQuiz.design.additionally,
                [e.target.name]: e.target.checked,
                },
            },
        }));
    }, [setQuiz]);

    const createDesignShowExpertHandler = useCallback((e) => {
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            design: {
                ...prevQuiz.design,
                showExpert: {
                ...prevQuiz.design.showExpert,
                [e.target.name]: e.target.value,
                },
            },
        }));
    }, [setQuiz]);

    const createDesignShowDiscountHandler = useCallback((e) => {
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            design: {
                ...prevQuiz.design,
                showDiscount: {
                ...prevQuiz.design.showDiscount,
                [e.target.name]: e.target.value,
                },
            },
        }));
    }, [setQuiz]);

    console.log(quiz.design);
    
    return (
        <Row>
            <Col>
                <Card>
                    <Card.Body>

                        <Card.Title>Цветовая схема</Card.Title>
                        <Form className={styles.frormDesign}>
                            <Form.Group className={styles.frormGroupDesign}>
                                <Form.Label htmlFor="colorBackgroundDesign" className={styles.titleFormDesign}>Фон</Form.Label>
                                <Form.Control
                                    type="color"
                                    id="colorBackgroundDesign"
                                    defaultValue="#563d7c"
                                    title="Choose your color"
                                />
                            </Form.Group>
                            <Form.Group className={styles.frormGroupDesign}>
                                <Form.Label htmlFor="colorTextDesign" className={styles.titleFormDesign}>Текст</Form.Label>
                                <Form.Control
                                    type="color"
                                    id="colorTextDesign"
                                    defaultValue="#ffffff"
                                    title="Choose your color"
                                />
                            </Form.Group>
                            <Form.Group className={styles.frormGroupDesign}>
                                <Form.Label htmlFor="colorElementsDesign" className={styles.titleFormDesign}>Елементы</Form.Label>
                                <Form.Control
                                    type="color"
                                    id="colorElementsDesign"
                                    defaultValue="#ff0000"
                                    title="Choose your color"
                                />
                            </Form.Group>
                        </Form>


                        <Card.Title className={styles.titleDesign}>Изображения</Card.Title>
                        <Form>
                            <Form.Group controlId="backgroundPictureDesign" className={styles.pictureDesign}>
                                <Form.Label>Фон обложки</Form.Label>
                                <BsQuestionCircleFill />
                                <Form.Control 
                                    type="file" 
                                    size="sm"
                                    name="pictureBackground" 
                                />
                            </Form.Group>
                            <Form.Group controlId="sidePictureDesign" className={styles.pictureDesign}>
                                <Form.Label>Боковое изображение</Form.Label>
                                <BsQuestionCircleFill />
                                <Form.Control 
                                    type="file" 
                                    size="sm"
                                    name="pictureSideImage" 
                                />
                            </Form.Group>
                            <Form.Group controlId="faviconPictureDesign" className={styles.pictureDesign}>
                                <Form.Label>Favicon</Form.Label>
                                <BsQuestionCircleFill />
                                <Form.Control 
                                    type="file" 
                                    size="sm"
                                    name="pictureFavicon" 
                                />
                            </Form.Group>
                        </Form>

                        <Card.Title className={styles.titleDesign}>Дополнительно</Card.Title>
                        <Form>
                            <Form.Group className={styles.showFormDesign}>
                                <Form.Check
                                    className="mt-3"
                                    type="switch"
                                    label="ПОКАЗЫВАТЬ ОБЛОЖКУ КВИЗА"
                                    name="switchShowCoverQuiz"
                                    onClick={createShowCoverQuizSwitchHandler}
                                />
                                <BsQuestionCircleFill />
                            </Form.Group>
                            <Form.Group controlId="showExpertDesign">
                                <Form.Group className={styles.showFormDesign}>
                                    <Form.Check
                                        className="mt-3"
                                        type="switch"
                                        label="ОТОБРАЖАТЬ ЭКСПЕРТА"
                                        name="switchShowExpert"
                                        onClick={createShowExpertSwitchHandler}
                                        aria-controls="example-collapse"
                                        aria-expanded={open}
                                    />
                                    <BsQuestionCircleFill />
                                </Form.Group>
                                <Collapse in={open}>
                                    <Form id="example-collapse">
                                        <Form.Group className={styles.blockExpertDesign} id="blockExpertDesign">
                                            <Form.Group controlId="nameExpertDesign">
                                                <Form.Label>Имя</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Имя эксперта"
                                                    name="nameExpert"
                                                    onChange={createDesignShowExpertHandler}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="jobExpertDesign" className={styles.jobExpertDesign}>
                                                <Form.Label>Должность</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Должность эксперта"
                                                    name="jobExpert"
                                                    onChange={createDesignShowExpertHandler}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="photoExpertDesign" className={styles.photoExpertDesign}>
                                                <Form.Label>Фотография</Form.Label>
                                                <Form.Control 
                                                    type="file" 
                                                    size="sm"
                                                    name="pictureExpert" 
                                                />
                                            </Form.Group>
                                        </Form.Group>
                                    </Form>
                                </Collapse>
                            </Form.Group>
                            <Form.Group controlId="showDiscountDesign">
                                <Form.Group className={styles.showFormDesign}>
                                    <Form.Check
                                        className="mt-3"
                                        type="switch"
                                        label="ОТОБРАЖАТЬ СКИДКУ"
                                        name="switchShowDiscount"
                                        onClick={createShowDiscountSwitchHandler}
                                        aria-controls="discount-collapse"
                                        aria-expanded={openDiscountOpen}
                                    />
                                    <BsQuestionCircleFill />
                                </Form.Group>
                                <Collapse in={openDiscountOpen}>
                                    <Form id="discount-collapse">
                                        <Form.Group className={styles.blockDiscountDesign} id="blockDiscountDesign">
                                            <Form.Group controlId="textDiscount">
                                                <Form.Label>Текст</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Например, скидка"
                                                    name="textDiscount"
                                                    onChange={createDesignShowDiscountHandler}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="sizeDiscount" className={styles.sizeDiscountDesign}>
                                                <Form.Label>Размер скидки</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Например, 5%"
                                                    name="sizeDiscount"
                                                    onChange={createDesignShowDiscountHandler}
                                                />
                                            </Form.Group>
                                        </Form.Group>
                                    </Form>
                                </Collapse>
                            </Form.Group>
                        </Form>

                        <Card.Title className={styles.titleDesign}>Язык квиза</Card.Title>
                        <Form>
                            <Form.Select aria-label="Default select example" className={styles.chooseLanguageDesign}>
                                <option value="1">Русский</option>
                                <option value="2">English</option>
                            </Form.Select>
                        </Form>


                        <Card.Title className={styles.titleDesign}>Анимация кнопок</Card.Title>
                        <Form>
                            <Form.Select aria-label="Default select example" className={styles.animationButtonDesign}>
                                <option value="1">Без анимации</option>
                                <option value="2">Пульс</option>
                                <option value="3">Блик</option>
                                <option value="4">Пульс + блик</option>
                            </Form.Select>
                        </Form>


                        <Card.Title className={styles.titleDesign}>Стиль анимации слайдов</Card.Title>
                        <Form>
                            <Form.Select aria-label="Default select example" className={styles.animationSlidesDesign}>
                                <option value="1">Без анимации</option>
                                <option value="2">Снизу вверх</option>
                                <option value="3">Сверху вниз</option>
                                <option value="4">Слево направо</option>
                                <option value="5">Справа налево</option>
                            </Form.Select>
                        </Form>

                        <Form>
                            <Form.Group controlId="redefinitionStylesDesign">
                                <Form.Label className={styles.redefinitionStylesDesign}>Переопределение стилей по умолчанию</Form.Label>
                                <BsQuestionCircleFill />
                                <Form.Control
                                    as="textarea" 
                                    rows={4}
                                    placeholder=".background-quiz { ..."
                                />
                            </Form.Group>
                        </Form>

                    </Card.Body>
                </Card>
            </Col>
            
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>Предпросмотр дизайна</Card.Title>
                        <div className={styles.stepContent}>
                            
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default CreateQuizDesign;