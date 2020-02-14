import React from "react";
import { Row, Col } from "reactstrap";
import { theme } from "../../../Defaults";
import { Icon } from "react-fa";
import PropTypes from "prop-types";

const Stats = () => (
    <div>
        <div style={{ backgroundColor: theme.secondary[1], color: "white", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", padding: 50 }}>
            <h1 className="display-4 theme-font">The Numbers</h1>
        </div>
        <Row className="d-flex align-items-center" style={{ textAlign: "center"}}>
            <Col>
                <Stat back={theme.primary[1]} accent={theme.accent[0]} text="Hackers" number="600+" icon="users" />
            </Col>
            <Col>
                <Stat back={theme.primary[1]} accent={theme.accent[0]} text="In Prizes" number="$14,000+" icon="trophy" />
            </Col>
            <Col>
                <Stat back={theme.primary[1]} accent={theme.accent[0]} text="Projects" number="50+" icon="terminal" />
            </Col>
        </Row>
    </div>
);

const Stat = ({ number, text, back, accent, icon }) => (
    <div style={{ backgroundColor: back, color: "white", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", padding: 50, marginTop: 25 }}>
        <div style={{ position: "absolute", left: "calc(15px)", top: 25, height: "calc(100% - 25px)", backgroundColor: accent, width: 10 }}></div>
        <h1 className="display-2">{number} </h1>
        <h1>  {text}      <Icon name={icon} style={{ marginRight: 10, color: accent }} />
 </h1>
    </div>
);

Stat.propTypes = {
    number: PropTypes.string,
    text: PropTypes.string
};

export default Stats;
