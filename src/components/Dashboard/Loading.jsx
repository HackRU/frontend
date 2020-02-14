import React from "react";
import { Container } from "reactstrap";
import { BounceLoader, PulseLoader } from "react-spinners";
import { theme } from "../../Defaults";
import PropTypes from "prop-types";

/**
 * Render a loading  screen
 * @param {String} Text Loading subtext
 */
const Loading = ({ text }) => (
    <Container fluid
        style={{ width: "100%", minHeight: "100vh", textAlign: "center" }}
        className="d-flex align-items-center">
        <div style={{ width: "100%", color: theme.accent[0] }}
            align="center">
            <div style={{ display: "inline-block" }}>
                <h1 className="display-1">L</h1>
            </div>
            <div style={{ display: "inline-block" }}>
                <BounceLoader color={theme.accent[0]} />
            </div>
            <div style={{ display: "inline-block" }}>
                <h1 className="display-1">ading</h1>
            </div>
            <div style={{ display: "inline-block" }}>
                <PulseLoader color={theme.accent[0]} />
            </div>
            <p className="lead"> { text } </p>
        </div>
    </Container>
);
Loading.propTypes = {
    text: PropTypes.string,
};
export default Loading;
