/**
 * @author Shivan Modha
 * @description Landing Page: HomePOC Component
 * @version 0.0.1
 * Created 12/10/18
 */
/***************************************************************IMPORTS***************************************************************/
import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { defaults } from "../../../Defaults";
/***************************************************************IMPORTS***************************************************************/

/****************************************************************ABOUT****************************************************************/
/**
 * About component for the landing page
 */
class HomePOC extends Component {
    render() {
        return (
            <Container fluid id="landing-section" style={{ zIndex: 3, width: "100%", height: "100%", textAlign: "center", userSelect: "none" }}>
                <Row style={{ position: "absolute", width: "100%", height: "100%" }} className="d-flex align-items-center">
                    <Col style={{ display: "block" }}>
                        <img id="alien" src="./assets/icons/hackethon_alien_noplat_2_color.png" style={{ maxHeight: "500px", maxWidth: "100%", background: "radial-gradient(#5A7A96AA, #5A7A9600, #5A7A9633)", borderRadius: "100%" }} alt="" />
                        <h1 className="display-1">{defaults.title.split(" ")[0]}</h1>
                        <h2>{defaults.dateText}</h2>
                    </Col>
                </Row>
            </Container>
        )
    }
}
/****************************************************************ABOUT****************************************************************/

/***************************************************************EXPORTS***************************************************************/
export default HomePOC;
/***************************************************************EXPORTS***************************************************************/