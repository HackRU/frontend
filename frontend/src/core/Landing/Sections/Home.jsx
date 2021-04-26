import React, { useEffect, useState } from "react";
import { Container, Grid, Button, ButtonGroup, Collapse } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { defaults, theme } from "../../../Defaults";
import { Icon } from "react-fa";
import Logo from "./Logo";
// import { ProfileType } from "../../Profile";
import PropTypes from "prop-types";
import { Motion, spring } from "react-motion";
import { Link } from "react-router-dom";
import ScrollableAnchor from "react-scrollable-anchor";

/**
 * Home component for the landing page
 */
function Home(props) {
    const [open, setOpen] = useState(true);
    let loggoutMsg = null;
    console.log("home");
    if (props.loggedout) {
        let addin = {};
        if (!props.isMobile) {
            addin = {
                right: 0,
                position: "absolute",
            };
        }
        loggoutMsg = (
            <Collapse in={open}>
                <Alert
                    style={{
                        ...addin,
                        border: "none",
                        background: "rgba(0, 255, 0, 0.25)",
                        color: "white",
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    color="success"
                    isOpen={props.loggedout}
                    toggle={props.dismissAlert}
                >
                    You are logged out
                </Alert>
            </Collapse>
        );
    }
    let returnedMessage = null;
    if (!props.isMobile) {
        returnedMessage = (
            <Grid
                container
                fluid
                id="landing-section"
                maxWidth={false}
                disableGutters={true}
                style={{
                    zIndex: 3,
                    width: "100%",
                    minHeight: "100vh",
                    textAlign: "center",
                    userSelect: "none",
                    backgroundColor: theme.secondary[1],
                }}
            >
                <Motion
                    defaultStyle={{ movement: 5, opacity: 0 }}
                    style={{
                        movement: spring(-5, { stiffness: 2, damping: 0 }),
                        opacity: spring(1, { stiffness: 0.5, damping: 4 }),
                    }}
                >
                    {({ movement, opacity }) => (
                        <div
                            style={{
                                position: "absolute",
                                overflow: "hidden",
                                padding: 0,
                                margin: 0,
                                left: 0,
                                top: 0,
                            }}
                        >
                            <div
                                style={{
                                    padding: 0,
                                    margin: 0,
                                    position: "relative",
                                    height: "100vh",
                                    width: "100vw",
                                    overflow: "hidden",
                                }}
                            >
                                <div
                                    style={{
                                        opacity,
                                        position: "absolute",
                                        bottom: -(window.innerHeight / 4) + movement,
                                        right: -100,
                                        userSelect: "none",
                                        pointerEvents: "none",
                                        zIndex: 10,
                                    }}
                                >
                                    <img
                                        alt="background"
                                        src={"./assets/background/target_green.svg"}
                                        height={window.innerHeight / 2}
                                    />
                                </div>
                                <div
                                    style={{
                                        opacity,
                                        position: "absolute",
                                        bottom: -(window.innerHeight / 3) - movement,
                                        left: -100,
                                        userSelect: "none",
                                        pointerEvents: "none",
                                        zIndex: 10,
                                    }}
                                >
                                    <img
                                        alt="background"
                                        src={"./assets/background/target_yellow.svg"}
                                        height={window.innerHeight / 2}
                                    />
                                </div>
                                <div
                                    style={{
                                        opacity,
                                        position: "absolute",
                                        top: window.innerHeight / 2 - window.innerHeight / 8,
                                        right: movement,
                                        userSelect: "none",
                                        pointerEvents: "none",
                                        zIndex: 10,
                                    }}
                                >
                                    <img
                                        alt="background"
                                        src={"./assets/background/shape_white.svg"}
                                        height={window.innerHeight / 4}
                                    />
                                </div>
                                <div
                                    style={{
                                        opacity,
                                        position: "absolute",
                                        top: window.innerHeight / 8 + movement / 2,
                                        right: -100 - movement,
                                        userSelect: "none",
                                        pointerEvents: "none",
                                        zIndex: 10,
                                    }}
                                >
                                    <img
                                        alt="background"
                                        src={"./assets/background/cross_yellow.svg"}
                                        height={window.innerHeight / 3}
                                    />
                                </div>
                                <div
                                    style={{
                                        opacity,
                                        position: "absolute",
                                        bottom: window.innerHeight / 8 + movement,
                                        left: window.innerWidth / 4,
                                        userSelect: "none",
                                        pointerEvents: "none",
                                        zIndex: 10,
                                        transform: "rotate(30deg)",
                                    }}
                                >
                                    <img
                                        alt="background"
                                        src={"./assets/background/cross_white.svg"}
                                        height={window.innerHeight / 10}
                                    />
                                </div>
                                <div
                                    style={{
                                        opacity,
                                        position: "absolute",
                                        bottom: -(window.innerHeight / 5),
                                        right: window.innerWidth / 7 - movement,
                                        userSelect: "none",
                                        pointerEvents: "none",
                                        zIndex: 10,
                                        transform: "rotate(" + movement + "deg)",
                                    }}
                                >
                                    <img
                                        alt="background"
                                        src={"./assets/background/circle-dotted_yellow.svg"}
                                        height={window.innerHeight / 3}
                                    />
                                </div>
                                <div
                                    style={{
                                        opacity,
                                        position: "absolute",
                                        top: -(window.innerHeight / 5) - movement,
                                        right: window.innerWidth / 7,
                                        userSelect: "none",
                                        pointerEvents: "none",
                                        zIndex: 10,
                                        transform: "rotate(30deg)",
                                    }}
                                >
                                    <img
                                        alt="background"
                                        src={"./assets/background/circle_green.svg"}
                                        height={window.innerHeight / 3}
                                    />
                                </div>
                                <div
                                    style={{
                                        opacity,
                                        position: "absolute",
                                        top: -(window.innerHeight / 4),
                                        right: window.innerWidth / 3 + movement,
                                        userSelect: "none",
                                        pointerEvents: "none",
                                        zIndex: 10,
                                        transform: "rotate(30deg)",
                                    }}
                                >
                                    <img
                                        alt="background"
                                        src={"./assets/background/circle-dotted_white.svg"}
                                        height={window.innerHeight / 2}
                                    />
                                </div>
                                <div
                                    style={{
                                        opacity,
                                        position: "absolute",
                                        top: window.innerHeight / 20 + movement,
                                        left: window.innerWidth / 10 + movement,
                                        userSelect: "none",
                                        pointerEvents: "none",
                                        zIndex: 10,
                                        transform: "rotate(30deg)",
                                    }}
                                >
                                    <img
                                        alt="background"
                                        src={"./assets/background/target_yellow.svg"}
                                        height={window.innerHeight / 3}
                                    />
                                </div>
                                <div
                                    style={{
                                        opacity,
                                        position: "absolute",
                                        top: window.innerHeight / 2 - window.innerHeight / 6,
                                        left: -(window.innerHeight / 6),
                                        userSelect: "none",
                                        pointerEvents: "none",
                                        zIndex: 10,
                                        transform: "rotate(30deg)",
                                    }}
                                >
                                    <img
                                        alt="background"
                                        src={"./assets/background/target_white.svg"}
                                        height={window.innerHeight / 3}
                                    />
                                </div>
                                <div
                                    style={{
                                        opacity,
                                        position: "absolute",
                                        bottom: window.innerHeight / 4,
                                        left: window.innerWidth / 7 - movement / 10,
                                        userSelect: "none",
                                        pointerEvents: "none",
                                        zIndex: 10,
                                    }}
                                >
                                    <img
                                        alt="background"
                                        src={"./assets/background/cross_green.svg"}
                                        height={window.innerHeight / 10}
                                    />
                                </div>
                                <div
                                    style={{
                                        opacity,
                                        position: "absolute",
                                        bottom: window.innerHeight / 5 - movement,
                                        left: -(window.innerHeight / 6),
                                        userSelect: "none",
                                        pointerEvents: "none",
                                        zIndex: 10,
                                    }}
                                >
                                    <img
                                        alt="background"
                                        src={"./assets/background/square-dotted_white.svg"}
                                        height={window.innerHeight / 3}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </Motion>
                <Grid
                    style={{ minWidth: "100%", minHeight: "100vh" }}
                    className="d-flex align-items-center"
                >
                    <Grid xs={2}></Grid>
                    <Grid xs={8} style={{ display: "block" }}>
                        <Motion
                            defaultStyle={{ opacity: 0 }}
                            style={{ opacity: spring(1, { stiffness: 1, damping: 1 }) }}
                        >
                            {({ opacity }) => (
                                <Logo
                                    repeat={true}
                                    style={{ opacity }}
                                    noCircle
                                    src="./assets/icons/hru-text.svg"
                                />
                            )}
                        </Motion>
                        {/* <h1 style={{ color: theme.accent[0], marginTop: -100, marginBottom: 100 }}>hack all knight</h1> */}
                        <Motion
                            defaultStyle={{ opacity: 0, top: 1000 }}
                            style={{
                                opacity: spring(1, { stiffness: 1, damping: 1 }),
                                top: spring(0, { stiffness: 20, damping: 4 }),
                            }}
                        >
                            {({ opacity, top }) => (
                                <h2
                                    style={{
                                        marginTop: -50 + top,
                                        color: theme.accent[0],
                                        opacity: opacity,
                                    }}
                                    className="display-4 theme-font"
                                >
                                    {defaults.slogan}
                                </h2>
                            )}
                        </Motion>

                        <Motion
                            defaultStyle={{ opacity: 0 }}
                            style={{ opacity: spring(1, { stiffness: 1, damping: 1 }) }}
                        >
                            {({ opacity }) => (
                                <div>
                                    <h2 style={{ opacity: opacity }} className="lead theme-font">
                                        <Icon style={{ marginRight: 5 }} name="map-marker" />{" "}
                                        {defaults.locationText}
                                    </h2>
                                    <h2 style={{ opacity: opacity }} className="lead theme-font">
                                        <Icon style={{ marginRight: 5 }} name="calendar" />{" "}
                                        {defaults.dateText}
                                    </h2>
                                    <hr style={{ opacity }} />
                                    <ButtonGroup>
                                        {true ? (
                                            <div>
                                                <Link to="/login">
                                                    <Button
                                                        outline
                                                        className="pill-btn"
                                                        color="warning"
                                                        size="lg"
                                                        style={{ opacity }}
                                                    >
                                                        Login
                                                    </Button>
                                                </Link>
                                                <Link to="/signup">
                                                    <Button
                                                        className="pill-btn"
                                                        color="success"
                                                        size="lg"
                                                        style={{ opacity }}
                                                    >
                                                        Register
                                                    </Button>
                                                </Link>
                                            </div>
                                        ) : (
                                            <div>
                                                <Link to="/dashboard">
                                                    <Button
                                                        outline
                                                        className="pill-btn"
                                                        color="warning"
                                                        size="lg"
                                                        style={{ opacity }}
                                                    >
                                                        Dashboard
                                                    </Button>
                                                </Link>
                                                <Link to="/logout">
                                                    <Button
                                                        outline
                                                        className="pill-btn"
                                                        color="warning"
                                                        size="lg"
                                                        style={{ opacity }}
                                                    >
                                                        Logout
                                                    </Button>
                                                </Link>
                                            </div>
                                        )}
                                    </ButtonGroup>
                                </div>
                            )}
                        </Motion>
                    </Grid>
                    <div
                        style={{
                            position: "absolute",
                            bottom: 10,
                            left: 10,
                            right: 10,
                            margin: "0 auto",
                        }}
                    >
                        {loggoutMsg}
                        {defaults.volunteers.display && (
                            <div>
                                <div>
                                    Want to help? Sign up to{" "}
                                    <a href={defaults.volunteers.vol_url}>volunteer</a> or{" "}
                                    <a href={defaults.volunteers.mentor_url}>mentor</a>!
                                </div>
                                <div>
                                    Want to receive updates? Subscribe{" "}
                                    <a href={defaults.mailing}>here</a>!
                                </div>
                            </div>
                        )}
                        <Button
                            href="#about"
                            outline
                            size="lg"
                            style={{
                                border: "none",
                                zIndex: 1,
                                fontWeight: "bold",
                                borderRadius: 100,
                            }}
                        >
                            <Icon name="chevron-down" />
                        </Button>
                    </div>
                </Grid>
            </Grid>
        );
        return packagedHome(returnedMessage);
    } else {
        returnedMessage = (
            <Container
                fluid
                id="landing-section"
                disableGutters={true}
                maxWidth={false}
                style={{
                    zIndex: 3,
                    width: "100%",
                    minHeight: "100vh",
                    textAlign: "center",
                    userSelect: "none",
                    backgroundColor: theme.secondary[1],
                }}
            >
                <Motion
                    defaultStyle={{ movement: 5, opacity: 0 }}
                    style={{
                        movement: spring(-5, { stiffness: 2, damping: 0 }),
                        opacity: spring(1, { stiffness: 0.5, damping: 4 }),
                    }}
                >
                    {({ movement, opacity }) => (
                        <div
                            style={{
                                position: "absolute",
                                overflow: "hidden",
                                padding: 0,
                                margin: 0,
                                left: 0,
                                top: 0,
                            }}
                        >
                            <div
                                style={{
                                    padding: 0,
                                    margin: 0,
                                    position: "relative",
                                    height: "100vh",
                                    width: "100vw",
                                    overflow: "hidden",
                                }}
                            >
                                <div
                                    style={{
                                        opacity,
                                        position: "absolute",
                                        bottom: -(window.innerHeight / 4) + movement,
                                        right: -100,
                                        userSelect: "none",
                                        pointerEvents: "none",
                                        zIndex: 10,
                                    }}
                                >
                                    <img
                                        alt="background"
                                        src={"./assets/background/target_green.svg"}
                                        height={window.innerHeight / 2}
                                    />
                                </div>
                                <div
                                    style={{
                                        opacity,
                                        position: "absolute",
                                        bottom: -(window.innerHeight / 3) - movement,
                                        left: -100,
                                        userSelect: "none",
                                        pointerEvents: "none",
                                        zIndex: 10,
                                    }}
                                >
                                    <img
                                        alt="background"
                                        src={"./assets/background/target_yellow.svg"}
                                        height={window.innerHeight / 2}
                                    />
                                </div>
                                <div
                                    style={{
                                        opacity,
                                        position: "absolute",
                                        bottom: window.innerHeight / 8 + movement,
                                        left: window.innerWidth / 4,
                                        userSelect: "none",
                                        pointerEvents: "none",
                                        zIndex: 10,
                                        transform: "rotate(30deg)",
                                    }}
                                >
                                    <img
                                        alt="background"
                                        src={"./assets/background/cross_white.svg"}
                                        height={window.innerHeight / 10}
                                    />
                                </div>
                                <div
                                    style={{
                                        opacity,
                                        position: "absolute",
                                        top: -(window.innerHeight / 5) - movement,
                                        right: window.innerWidth / 7,
                                        userSelect: "none",
                                        pointerEvents: "none",
                                        zIndex: 10,
                                        transform: "rotate(30deg)",
                                    }}
                                >
                                    <img
                                        alt="background"
                                        src={"./assets/background/circle_green.svg"}
                                        height={window.innerHeight / 3}
                                    />
                                </div>
                                <div
                                    style={{
                                        opacity,
                                        position: "absolute",
                                        top: window.innerHeight / 2 - window.innerHeight / 2,
                                        left: -(window.innerHeight / 6),
                                        userSelect: "none",
                                        pointerEvents: "none",
                                        zIndex: 10,
                                        transform: "rotate(30deg)",
                                    }}
                                >
                                    <img
                                        alt="background"
                                        src={"./assets/background/target_white.svg"}
                                        height={window.innerHeight / 3}
                                    />
                                </div>
                                <div
                                    style={{
                                        opacity,
                                        position: "absolute",
                                        bottom: window.innerHeight / 5,
                                        left: window.innerWidth / 7 - movement / 10,
                                        userSelect: "none",
                                        pointerEvents: "none",
                                        zIndex: 10,
                                    }}
                                >
                                    <img
                                        alt="background"
                                        src={"./assets/background/cross_green.svg"}
                                        height={window.innerHeight / 10}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </Motion>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    style={{ minWidth: "100%", minHeight: "100vh" }}
                    // className="d-flex align-items-center"
                >
                    <Grid style={{ display: "block" }}>
                        {loggoutMsg}
                        <Motion
                            defaultStyle={{ opacity: 0 }}
                            style={{ opacity: spring(1, { stiffness: 1, damping: 1 }) }}
                        >
                            {({ opacity }) => (
                                <Logo
                                    repeat={true}
                                    style={{ opacity }}
                                    noCircle
                                    src="./assets/icons/hru-text.svg"
                                />
                            )}
                        </Motion>
                        <Motion
                            defaultStyle={{ opacity: 0, top: 1000 }}
                            style={{
                                opacity: spring(1, { stiffness: 1, damping: 1 }),
                                top: spring(0, { stiffness: 20, damping: 4 }),
                            }}
                        >
                            {({ opacity, top }) => (
                                <h2
                                    style={{
                                        marginTop: "calc(" + (-100 + top) + "px + 20vw)",
                                        color: theme.accent[0],
                                        opacity: opacity,
                                    }}
                                    className="display-5 theme-font"
                                >
                                    {defaults.slogan}
                                </h2>
                            )}
                        </Motion>
                        <Motion
                            defaultStyle={{ opacity: 0 }}
                            style={{ opacity: spring(1, { stiffness: 1, damping: 1 }) }}
                        >
                            {({ opacity }) => (
                                <div>
                                    <h2 style={{ opacity: opacity }} className="lead theme-font">
                                        <Icon style={{ marginRight: 5 }} name="map-marker" />{" "}
                                        {defaults.locationText}
                                    </h2>
                                    <h2 style={{ opacity: opacity }} className="lead theme-font">
                                        <Icon style={{ marginRight: 5 }} name="calendar" />{" "}
                                        {defaults.dateText}
                                    </h2>
                                    <ButtonGroup>
                                        {true ? (
                                            <div>
                                                <div>
                                                    <Link to="/login">
                                                        <Button
                                                            outline
                                                            className="pill-btn"
                                                            color="warning"
                                                            size="lg"
                                                            style={{ opacity }}
                                                        >
                                                            Login
                                                        </Button>
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link to="/signup">
                                                        <Button
                                                            className="pill-btn"
                                                            color="success"
                                                            size="lg"
                                                            style={{ opacity }}
                                                        >
                                                            Register
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div>
                                                    <Link to="/dashboard">
                                                        <Button
                                                            outline
                                                            className="pill-btn"
                                                            color="warning"
                                                            size="lg"
                                                            style={{ opacity }}
                                                        >
                                                            Dashboard
                                                        </Button>
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link to="/logout">
                                                        <Button
                                                            outline
                                                            className="pill-btn"
                                                            color="warning"
                                                            size="lg"
                                                            style={{ opacity }}
                                                        >
                                                            Logout
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </ButtonGroup>
                                </div>
                            )}
                        </Motion>
                        {/* {navContainer} */}
                        {defaults.volunteers.display && (
                            <div>
                                <div>
                                    Want to help? Sign up to{" "}
                                    <a href={defaults.volunteers.vol_url}>volunteer</a> or{" "}
                                    <a href={defaults.volunteers.mentor_url}>mentor</a>!
                                </div>
                                <div>
                                    Want to receive updates? Subscribe{" "}
                                    <a href={defaults.mailing}>here</a>!
                                </div>
                            </div>
                        )}
                    </Grid>
                </Grid>
            </Container>
        );
        return packagedHome(returnedMessage);
    }
}
const packagedHome = (comp) => {
    return (
        <ScrollableAnchor id="home">
            <div>
                <Grid container className="section">
                    {comp}
                </Grid>
            </div>
        </ScrollableAnchor>
    );
};
Home.propTypes = {
    // profile: ProfileType,
    loggedout: PropTypes.bool,
    dismissAlert: PropTypes.func,
    isMobile: PropTypes.bool,
};

export default Home;
