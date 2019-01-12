import React from 'react';
import { Container } from 'reactstrap';
import { BounceLoader, PulseLoader } from "react-spinners";
import { theme } from '../../Defaults';
/**
 * Render a loading  screen
 * @param {String} Text Loading subtext
 */
const Loading = ({ text }) => (
    <Container fluid style={{ width: "100%", minHeight: "100vh", textAlign: "center", backgroundColor: theme.secondary[1] }} className="d-flex align-items-center">
        <div style={{ width: "100%", color: "rgba(255, 255, 255, 0.1)" }} align="center">
            <div style={{ display: "inline-block" }}>
                <h1 className="display-1">L</h1>
            </div>
            <div style={{ display: "inline-block" }}>
                <BounceLoader color="rgba(255, 255, 255, 0.1)" />
            </div>
            <div style={{ display: "inline-block" }}>
                <h1 className="display-1">ading</h1>
            </div>
            <div style={{ display: "inline-block" }}>
                <PulseLoader color="rgba(255, 255, 255, 0.1)" />
            </div>
            <p className="lead"> { text } </p>
        </div>
    </Container>
);

export default Loading;
