import React from "react";
import styles from "./quizzes.module.scss"
import { Container, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const Quizzes = () => {
    return (
        <>
            <Container>
                <div className={styles.emptyQuizzes}>
                    <h2>Вы не создали ни одного квиза</h2>
                    <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            + СОЗДАТЬ КВИЗ
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item as={NavLink} to="/quiz/create">С нуля</Dropdown.Item>
                            <Dropdown.Item as={NavLink} to="/quiz/templates">На основе шаблона</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Импортировать</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Container>
        </>
    )
}