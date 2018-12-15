/**
 * @author Shivan Modha
 * @description Landing Page: Home Component 
 * @version 0.0.1
 * Created 12/10/18
 */
/***************************************************************IMPORTS***************************************************************/
import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { defaults } from "../../../Defaults";
/***************************************************************IMPORTS***************************************************************/

/*****************************************************************HOME****************************************************************/
/**
 * Home component for the landing page
 */
class Home extends Component {
    /**
    * Object constructor
    * @param {object} props React properties that are passed in to this component 
    */
    constructor(props) {
        super(props);
        // Add a onresize event listener so that we can switch the navigation to mobile
        window.addEventListener("resize", () => {
            // Recalculate the mobile, and change the state to trigger a render
            this.setState({
                isMobile: window.innerWidth <= defaults.mobileWidthThresholdRelaxed,
            });
        })
    }
    /**
     * The first pre-render state
     */
    componentWillMount() {
        // Set the initial state so that the render function works properly
        this.setState({
            isMobile: window.innerWidth <= defaults.mobileWidthThresholdRelaxed,
        });
    }
    render() {
        if (!this.state.isMobile) {
            return (
                <Container fluid id="landing-section" style={{ marginLeft: "15%" }}>
                    <Row style={{ marginTop: "350px", marginBottom: "30vh" }}>
                        <Col xs={5}>
                            <h1 className="display-3">{defaults.title}</h1>
                            <h1>{defaults.dateText}</h1>
                            <br />
                            <h3>{defaults.locationText}</h3>
                            <h3>{defaults.universityText}</h3>
                        </Col>
                        <Col xs={5}>
                            <img id="hero-img" src="./assets/icons/hackethon_alien_noplat_2.png" alt=""/>
                        </Col>
                    </Row>
                </Container>
            )
        } else {
            return (
                <Container fluid id="landing-section" style={{ marginLeft: "5%", marginRight: "5%" }}>
                    <Row style={{ marginTop: "350px", marginBottom: "30vh", textAlign: "center" }}>
                        <div style={{ textAlign: "center", width: "100%" }}>
                            <h1 className="display-4" style={{ textAlign: "center" }}>{defaults.title}</h1>
                            <h1 style={{ textAlign: "center" }}>{defaults.dateText}</h1>
                            <br />
                            <h3 style={{ textAlign: "center" }}>{defaults.locationText}</h3>
                            <h3 style={{ textAlign: "center" }}>{defaults.universityText}</h3>
                        </div>
                        <div style={{ textAlign: "center", width: "100%" }}>
                            <img style={{ maxWidth: "100%", maxHeight: "500px" }} src="./assets/icons/hackethon_alien_noplat_2.png" alt="" />
                        </div>
                    </Row>
                </Container>
            )
        }
    }
}
/*****************************************************************HOME****************************************************************/

/***************************************************************EXPORTS***************************************************************/
export default Home;
/***************************************************************EXPORTS***************************************************************/