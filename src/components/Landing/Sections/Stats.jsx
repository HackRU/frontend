import React from "react";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";

const Stats = () => (
    <div>
        <h1 className="display-4 theme-font">The Numbers</h1>
        <hr />
        <Row className="d-flex align-items-center"
            style={{ textAlign: "center"}}>
            <Col> <Stat text="Hackers"
                number="600+"/> </Col>
            <Col> <Stat text="In Prizes"
                number="$14,000+"/> </Col>
            <Col> <Stat text="Projects"
                number="50+"/> </Col>
        </Row>
        <hr />
    </div>
);

const Stat = ({ number, text }) => (
    <div>
        <h1 className="display-2"> {number} </h1>
        <h1> {text} </h1>
    </div>
);

Stat.propTypes = {
    number: PropTypes.number,
    text: PropTypes.string
};

export default Stats;
