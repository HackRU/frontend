/**
 * @author Shivan Modha
 * @description The standard signup page
 * @version 0.0.1
 * Created 12/26/18
 */
/***************************************************************IMPORTS***************************************************************/
import React, { Component } from "react";
import { Container, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, Button, FormText } from "reactstrap";
import { theme } from "../Defaults";
import { Icon } from "react-fa";
import { Link } from "react-router-dom";
/***************************************************************IMPORTS***************************************************************/

/*****************************************************************APP*****************************************************************/
/**
 * Signup application for "/signup"
 */
class SignUpPage extends Component {
    render() {
        let contents = (
            <div style={{ padding: 30 }}>
                <h1 className="display-1 theme-font">Sign Up</h1>
                <p className="lead">Join us at HackRU!</p>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    let email = document.getElementById("email").value;
                    let password = document.getElementById("password").value;
                    this.props.profile.SignUp(email, password, (msg) => {
                        if (msg) {
                            console.log(msg);
                        } else {
                            console.log("YAYA");
                        }
                    });
                }}>
                    <FormGroup row>
                        <Col xs={6} style={{ margin: 0, paddingLeft: 0, paddingRight: 7 }}>
                            <Input required id="First" type="text" placeholder="first name" style={{ borderRadius: 0, background: "rgba(255, 255, 255, 0.2)", border: "none", color: "black" }} />
                        </Col>
                        <Col xs={6} style={{ margin: 0, paddingRight: 0, paddingLeft: 7 }}>
                            <Input required id="Last" type="text" placeholder="last name" style={{ borderRadius: 0, background: "rgba(255, 255, 255, 0.2)", border: "none", color: "black" }} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Input required type="email" id="email" placeholder="email" style={{ borderRadius: 0, background: "rgba(255, 255, 255, 0.2)", border: "none", color: "black" }} />
                    </FormGroup>
                    <hr style={{ background: "rgba(255, 255, 255, 0.25)" }} />
                    <FormGroup row>
                        <Input required type="password" id="password" placeholder="password" style={{ borderRadius: 0, background: "rgba(255, 255, 255, 0.2)", border: "none", color: "black" }} />
                    </FormGroup>
                    <FormGroup row>
                        <InputGroup>
                            <Input required type="password" id="conpassword" placeholder="confirm password" style={{ borderRadius: 0, background: "rgba(255, 255, 255, 0.2)", border: "none", color: "black" }} />
                            <InputGroupAddon addonType="append">
                                <Button color="success" style={{ borderRadius: 0 }}><Icon name="chevron-right" /></Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                    <FormText><Link to="/login" style={{ color: "rgba(255, 255, 255, 0.5)" }}>Already a member? Login!</Link></FormText>
                    <FormText><Link to="/" style={{ color: "rgba(255, 255, 255, 0.5)" }}>Return Home</Link></FormText>
                </Form>
            </div>
        );
        if (!this.props.isMobile) {
            return (
                <Container fluid style={{ width: "100%", minHeight: "100vh", textAlign: "center", backgroundColor: theme.secondary[1] }} className="d-flex align-items-center">
                    <Col />
                    <Col xs={3} style={{ display: "block", zIndex: 3, color: "white", background: "rgba(255, 255, 255, 0.05)" }}>
                        {contents}
                    </Col>
                    <Col />
                </Container>
            );
        } else {
            return (
                <Container fluid style={{ width: "100%", minHeight: "100vh", textAlign: "center", backgroundColor: theme.secondary[1] }} className="d-flex align-items-center">
                    <Col xs={12} style={{ display: "block", zIndex: 3, color: "white", background: "rgba(255, 255, 255, 0.05)" }}>
                        {contents}
                    </Col>
                </Container>
            );
        }
    }
}
/*****************************************************************APP*****************************************************************/

/***************************************************************EXPORTS***************************************************************/
export default SignUpPage;
/***************************************************************EXPORTS***************************************************************/