import React from "react";
import styles from "./Navibar.module.scss"
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Navibar() {

    return (
        <>
            <Container className={styles.container}>
                <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" className={styles.navbar}>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className={styles.nav}>
                            <NavLink className={styles.navLink} to="/quiz">Квизы</NavLink>
                            <NavLink className={styles.navLink} to="/quiz/templates">Шаблоны</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </>
    );
}