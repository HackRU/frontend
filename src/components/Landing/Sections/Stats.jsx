import React from "react";
import { theme } from '../../../Defaults'
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";

const Stats = () => (
    <div style={{ backgroundColor: theme.secondary[1], color: "white", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", padding: 50 }}>
        <div style={{ position: "absolute", right: "calc(15px)", top: 0, height: "100%", backgroundColor: theme.primary[1], width: 10 }}></div>
        <h1 className="display-4 theme-font">The Numbers</h1>
        <div className="row mb-3" style={{ marginLeft: -50, marginRight: -50 }}>
            <div style={{ color: "white", padding: 50, paddingBottom: 0 }} className="col-xs-12 col-sm-12">
                <Row className="d-flex align-items-center"
                    style={{ textAlign: "center"}}>
                    <Col> <Stat text="Hackers"
                        number="600+"/> </Col>
                    <Col> <Stat text="In Prizes"
                        number="$14,000+"/> </Col>
                    <Col> <Stat text="Projects"
                        number="50+"/> </Col>
                </Row>
            </div>
        </div>
    </div>
);

const Stat = ({ number, text }) => (
    <div>
        <h1 className="display-2"> {number} </h1>
        <h1> {text} </h1>
    </div>
);

Stat.propTypes = {
    number: PropTypes.string,
    text: PropTypes.string
};

export default Stats;
