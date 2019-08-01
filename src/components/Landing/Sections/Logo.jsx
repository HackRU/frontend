import React, { Component } from "react";
import { Container, Col } from "reactstrap";
import { theme } from "../../../Defaults";
import anime from "animejs";
import PropTypes from "prop-types";

/**
 * Home component for the landing page
 */
class Logo extends Component {
    constructor(props) {
        super(props);
        fetch(this.props.src).then(response => {
            response.text().then(text => {
                this.setState(
                    {
                        file: text,
                    },
                    () => {
                        anime({
                            targets: "path",
                            strokeDashoffset: [anime.setDashoffset, 0],
                            easing: "easeInOutExpo",
                            duration: 7500,
                            direction: "alternate",
                            delay: () => {
                                return 1000;
                            },
                            loop: true,
                        });
                    }
                );
            });
        });
    }
    componentWillMount() {
        this.setState({
            file: "",
        });
    }
    render() {
        return (
            <Container
                style={{
                    minHeight: theme["hero-height"],
                    maxWidth: theme["hero-width"],
                    background: this.props.noCircle ? "" : theme["hero-background"],
                    borderRadius: theme["hero-border-radius"],
                    color: theme.primary[0] + "FF",
                }}
                className="d-flex align-items-center"
            >
                <Col xs={12} dangerouslySetInnerHTML={{ __html: this.state.file }} />
            </Container>
        );
    }
}

Logo.propTypes = {
    src: PropTypes.string,
    noCircle: PropTypes.bool,
};

export default Logo;
