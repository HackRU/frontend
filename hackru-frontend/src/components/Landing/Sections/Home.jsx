/**
 * @author Shivan Modha
 * @description Landing Page: Home Component
 * @version 0.0.1
 * Created 12/10/18
 */
/***************************************************************IMPORTS***************************************************************/
import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { defaults, theme, navlinks } from "../../../Defaults";
import { Parallax } from "react-scroll-parallax";
import { Link } from "react-router-dom";
/***************************************************************IMPORTS***************************************************************/

/****************************************************************ABOUT****************************************************************/
/**
 * Home component for the landing page
 */
class Home extends Component {
    constructor(props) {
        super(props);
        this._event_onResize = this._event_onResize.bind(this);
        window.addEventListener("resize", this._event_onResize);
    }
    _event_onResize() {
        this.setState({
            mobile: (window.innerWidth < defaults.mobileWidthThresholdRelaxed)
        });
    }
    componentWillMount() {
        this._event_onResize();
    }
    render() {
        let navigation = [];
        let keys = Object.keys(navlinks);
        for (let i = 0; i < keys.length; i++) {
            if (navlinks[keys[i]].enabled) {
                navigation.push(
                    <p className="lead" key={keys[i]}><a href={navlinks[keys[i]].url} className="theme-home-link" style={{ color: theme.primary[0] + "ff", textDecoration: "none" }}>{keys[i]}</a></p>
                )
            }
        }
        let navContainer = (
            <div>
                {navigation}
                <hr style={{ backgroundColor: "rgba(255, 255, 255, 0.15)", width: "100px" }} />
                <Button outline color="dark" style={{ color: theme.accent[1], border: "none", borderRadius: 0 }}>Sign Up</Button>
                <Link to="/login"><Button outline color="dark" style={{ color: "rgba(255, 255, 255, 0.5)", border: "none", borderRadius: 0 }}>Login</Button></Link>
            </div>
        );
        if (!this.state.mobile) {
            return (
                <Container fluid id="landing-section" style={{ zIndex: 3, width: "100%", minHeight: "100vh", textAlign: "center", userSelect: "none" }}>
                    <Row style={{ minWidth: "100%", minHeight: "100vh" }} className="d-flex align-items-center">
                        <Col xs={2}></Col>
                        <Col xs={8} style={{ display: "block" }}>
                            <img id="alien" src="./assets/icons/hru-alien-noplat-color.png" style={{ maxHeight: "400px", maxWidth: "100%", background: "radial-gradient(#5A7A96AA, #5A7A9600, #5A7A9633)", borderRadius: "100%" }} alt="" />
                            <h1 className="display-1 theme-font">{defaults.title.split(" ")[0]}</h1>
                            <h2 className="theme-font">{defaults.dateText}</h2>
                        </Col>
                        <Col xs={2} style={{ overflow: "hidden", paddingTop: 10, paddingBottom: 10 }}>
                            <Parallax offsetXMin={-100} offsetXMax={100}>
                                {navContainer}
                            </Parallax>
                        </Col>
                    </Row>
                </Container>
            )
        } else {
            return (
                <Container fluid id="landing-section" style={{ zIndex: 3, width: "100%", minHeight: "100vh", textAlign: "center", userSelect: "none" }}>
                    <Row style={{ minWidth: "100%", minHeight: "100vh" }} className="d-flex align-items-center">
                        <Col style={{ display: "block" }}>
                            <img id="alien" src="./assets/icons/hru-alien-noplat-color.png" style={{ maxHeight: "400px", maxWidth: "100%", background: "radial-gradient(#5A7A96AA, #5A7A9600, #5A7A9633)", borderRadius: "100%" }} alt="" />
                            <h1 className="display-3 theme-font">{defaults.title.split(" ")[0]}</h1>
                            <h2 className="theme-font">{defaults.dateText}</h2>
                            {navContainer}
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}
/****************************************************************ABOUT****************************************************************/

/***************************************************************EXPORTS***************************************************************/
export default Home;
/***************************************************************EXPORTS***************************************************************/