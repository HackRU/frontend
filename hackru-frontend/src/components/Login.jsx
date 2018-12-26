/**
 * @author Shivan Modha
 * @description The standard login/signup page
 * @version 0.0.1
 * Created 12/25/18
 */
/***************************************************************IMPORTS***************************************************************/
import React, { Component } from "react";
import { Container, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, Button, FormText } from "reactstrap";
import { theme } from "../Defaults";
import { Icon } from "react-fa";
/***************************************************************IMPORTS***************************************************************/

/*****************************************************************APP*****************************************************************/
/**
 * Login application for "/login"
 */
class LoginPage extends Component {
    render() {
        return (
            <Container fluid style={{ width: "100%", height: "100vh", textAlign: "center", backgroundColor: theme.secondary[1] }} className="d-flex align-items-center">
                <Col />
                <Col xs={3} style={{ display: "block", zIndex: 3, color: "white", background: "rgba(255, 255, 255, 0.05)" }}>
                    <div style={{ padding: 30 }}>
                        <h1 className="display-1 theme-font">Login</h1>
                        <p className="lead">Welcome to HackRU!</p>
                        <Form>
                            <FormGroup row>
                                <InputGroup>
                                    <Input required id="email" type="email" placeholder="email" style={{ borderRadius: 0, background: "rgba(255, 255, 255, 0.2)", border: "none", color: "black" }} />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup row>
                                <InputGroup>
                                    <Input required type="password" id="password" placeholder="password" style={{ borderRadius: 0, background: "rgba(255, 255, 255, 0.2)", border: "none", color: "black" }} />
                                    <InputGroupAddon addonType="append">
                                        <Button color="success" style={{ borderRadius: 0 }}><Icon name="chevron-right" /></Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                            <FormText><a href="/signup" style={{ color: "rgba(255, 255, 255, 0.5)" }}>Not a member? Create an Account!</a></FormText>
                        </Form>
                    </div>
                </Col>
                <Col />
            </Container>
        );
    }
}
/*****************************************************************APP*****************************************************************/

/***************************************************************EXPORTS***************************************************************/
export default LoginPage;
/***************************************************************EXPORTS***************************************************************/