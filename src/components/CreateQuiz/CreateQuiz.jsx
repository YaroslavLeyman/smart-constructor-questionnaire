import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./CreateQuiz.module.scss";
import {
    Container,
    ListGroup,
    Button,
} from "react-bootstrap";


export const CreateQuiz = () => {

    return (
        <>
            <Container className={styles.container}>
                <div className={styles.steps}>
                    <ListGroup
                        defaultActiveKey=""
                        className={styles.stepsList}
                    >
                        <ListGroup.Item
                            as={NavLink}
                            action
                            to=""
                            className={styles.stepsLink}
                            end
                        >
                            Настройки
                        </ListGroup.Item>
                        <ListGroup.Item
                            as={NavLink}
                            action
                            to="questions"
                            className={styles.stepsLink}
                        >
                            Вопросы
                        </ListGroup.Item>
                        <ListGroup.Item
                            as={NavLink}
                            action
                            to="results"
                            className={styles.stepsLink}
                        >
                            Результаты
                        </ListGroup.Item>
                        <ListGroup.Item
                             as={NavLink}
                             action
                             to="contacts"
                            className={styles.stepsLink}
                        >
                            Сбор контактов
                        </ListGroup.Item>
                        <ListGroup.Item
                            as={NavLink}
                            action
                            to="design"
                            className={styles.stepsLink}
                        >
                            Дизайн
                        </ListGroup.Item>
                        <ListGroup.Item
                            as={NavLink}
                            action
                            to="extra-setting"
                            className={styles.stepsLink}
                        >
                            Доп.настройки
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            href="#link7"
                            className={styles.stepsLink}
                        >
                            Реклама в Яндекс
                        </ListGroup.Item>
                    </ListGroup>
                </div>

                <>
                    <Outlet />
                </>

                <footer className={styles.footer}>
                    <ul className={styles.stepFooter}>
                        <li className={styles.stepFooterButton}>
                            <Button href="#" size="lg">
                                Назад
                            </Button>
                        </li>
                        <li>
                            <Button href="#" size="lg">
                                Далее
                            </Button>
                        </li>
                    </ul>
                </footer>
            </Container>
        </>
    );
};
