import React, { useState, useCallback } from "react";
import styles from "../CreateQuiz.module.scss";
import { Form, Row, Col, Card, Collapse } from "react-bootstrap";


function CreateQuizExtraSetting({quiz, setQuiz}) {

    //показывает доп email и webhook
    const [open, setOpen] = useState(false);
    const [webhookOpen, setWebhookOpen] = useState(false);
    
    // console.log(quiz);
    const createDefaultEmailSwitchHandler = useCallback((e) => {
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            extraSetting: {
                ...prevQuiz.extraSetting,
                notificationsExtraSetting: {
                ...prevQuiz.extraSetting.notificationsExtraSetting,
                [e.target.name]: e.target.checked,
                },
            },
        }));
    }, [setQuiz]);

    const createExtraEmailSwitchHandler = useCallback((e) => {
        setOpen((prevOpen) => !prevOpen);
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            extraSetting: {
                ...prevQuiz.extraSetting,
                notificationsExtraSetting: {
                ...prevQuiz.extraSetting.notificationsExtraSetting,
                [e.target.name]: e.target.checked,
                },
            },
        }));
    }, [setQuiz]);

    const createSendWebhookSwitchHandler = useCallback((e) => {
        setWebhookOpen((prevWebhookOpen) => !prevWebhookOpen);
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            extraSetting: {
                ...prevQuiz.extraSetting,
                notificationsExtraSetting: {
                ...prevQuiz.extraSetting.notificationsExtraSetting,
                [e.target.name]: e.target.checked,
                },
            },
        }));
    }, [setQuiz]);

    const createTurnOnAnaliticsSwitchHandler = useCallback((e) => {
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            extraSetting: {
                ...prevQuiz.extraSetting,
                notificationsExtraSetting: {
                ...prevQuiz.extraSetting.notificationsExtraSetting,
                [e.target.name]: e.target.checked,
                },
            },
        }));
    }, [setQuiz]);


    const createExtraEmailHandler = useCallback((e) => {
        setQuiz((prevQuiz) => ({
          ...prevQuiz,
          extraSetting: {
            ...prevQuiz.extraSetting,
            extraEmail: {
              ...prevQuiz.extraSetting.extraEmail,
              [e.target.name]: e.target.value,
            },
          },
        }));
    }, [setQuiz]);

    const createUrlWebhookHandler = useCallback((e) => {
        setQuiz((prevQuiz) => ({...prevQuiz.extraSetting, [e.target.name]: e.target.value}));
    }, [setQuiz]);

    console.log(quiz.extraSetting);

    return (
        <Row>
            <Col>
                <Card>
                    <Card.Body>

                        <Card.Title>Отображение квиза</Card.Title>
                        <Form>
                            <Form.Group className={styles.blockExtraSetting} id="blockExtraSetting">
                                <Form.Check
                                    type="radio"
                                    label="На отдельной странице"
                                    name="separatePageRadio"
                                />
                                <p className={styles.descrExtraSetting}>Вы можете не добавлять квиз на ваш сайт, а направлять посетителей напрямую на квиз.</p>
                            
                                <Form.Check
                                    type="radio"
                                    label="На вашем сайте"
                                    name="yourSiteRadio"
                                />
                                <p className={styles.descrExtraSetting}>Квиз будет появляться на вашем сайте.</p>
                            </Form.Group>
                        </Form>


                        <Card.Title className={styles.titleExtraSetting}>Уведомления</Card.Title>
                        <Form.Group>
                            <Form.Check
                                className="mt-3"
                                type="switch"
                                label="Уведомлять по Email (тут будет default email нашего user)"
                                name="switchDefaultEmail"
                                onClick={createDefaultEmailSwitchHandler}
                            />
                        </Form.Group>
                        <Form.Group controlId="showExtraEmailSetting">
                            <Form.Group>
                                <Form.Check
                                    className="mt-3"
                                    type="switch"
                                    label="Дополнительные Email адреса"
                                    name="switchExtraEmail"
                                    onClick={createExtraEmailSwitchHandler}
                                    aria-controls="example-collapse"
                                    aria-expanded={open}
                                />
                            </Form.Group>
                            <Collapse in={open}>
                                <Form id="example-collapse">
                                    <Form.Group id="extraEmailSetting" className={styles.blockExtraSetting}>
                                        <Form.Group controlId="extraEmail">
                                            <Form.Control
                                                type="email"
                                                placeholder="Email1"
                                                name="emailFirst"
                                                onChange={createExtraEmailHandler}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="extraEmail">
                                            <Form.Control
                                                type="email"
                                                placeholder="Email2"
                                                name="emailSecond"
                                                onChange={createExtraEmailHandler}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="extraEmail">
                                            <Form.Control
                                                type="email"
                                                placeholder="Email3"
                                                name="emailThird"
                                                onChange={createExtraEmailHandler}
                                            />
                                        </Form.Group>
                                    </Form.Group>
                                </Form>
                            </Collapse>
                        </Form.Group>
                        <Form.Group controlId="showSendWebhookSetting">
                            <Form.Group>
                                <Form.Check
                                    className="mt-3"
                                    type="switch"
                                    label="Отправлять Webhook"
                                    name="switchSendWebhook"
                                    onClick={createSendWebhookSwitchHandler}
                                    aria-controls="webhook-collapse"
                                    aria-expanded={webhookOpen}
                                />
                            </Form.Group>
                            <Collapse in={webhookOpen}>
                                <Form id="webhook-collapse">
                                    <Form.Group id="sendWebhookSetting" className={styles.webhookExtraSetting}>
                                        <Form.Group controlId="sendWebhook">
                                            <Form.Label>URL для отправки webhook</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="https://domain.ru/somescript"
                                                name="urlWebhook"
                                                onChange={createUrlWebhookHandler}
                                            />
                                        </Form.Group>
                                    </Form.Group>
                                </Form>
                            </Collapse>
                        </Form.Group>
                        <Form.Group>
                            <Form.Check
                                className="mt-3"
                                type="switch"
                                label="Включить аналитику"
                                name="switchTurnOnAnalitics"
                                onClick={createTurnOnAnaliticsSwitchHandler}
                            />
                        </Form.Group>


                        <div className={styles.integrationsExtraSetting}>
                            <p>Ссылка на интеграции</p>
                        </div>

                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default CreateQuizExtraSetting;