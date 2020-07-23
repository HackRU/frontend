
import React, { Component } from "react";
import { Container, Grid} from "@material-ui/core";
import { theme } from "../../../Defaults";
import anime from "animejs";
import PropTypes from "prop-types";

/**
 * Home component for the landing page
 */
class Logo extends Component {
    constructor(props) {
        super(props);
        fetch(this.props.src).then((response) => {
            response.text().then((text) => {
                this.setState({
                    file: text
                }, () => {
                    anime({
                        targets: "path",
                        strokeDashoffset: (el) => {
                            let pathLength = 0;
                            if (el.getTotalLength) {
                                pathLength = el.getTotalLength();
                                el.setAttribute("stroke-dasharray", pathLength);
                            }
                            return [pathLength, 0];
                        },
                        easing: "easeInOutExpo",
                        duration: (el) => {
                            let defaultVal = 1000;
                            let cns = el.className.baseVal.split(" ");
                            for (let i = 0; i < cns.length; i++) {
                                if (cns[i].includes("idx-")) {
                                    let idx = parseInt(cns[i].replace("idx-", ""));
                                    return idx * defaultVal;
                                }
                            }
                            return defaultVal;
                        },
                        direction: "alternate",
                        delay: () => { return 500; },
                        loop: props.repeat === null ? true : props.repeat,
                        begin: function(anim) {
                            anime.remove(anim.targets);
                        }
                    });
                });
            });
        });
    }
    UNSAFE_componentWillMount() {
        this.setState({
            file: "",
        });
    }
    render() {
        return (
            <Container style={{ ...this.props.style, minHeight: theme["hero-height"], maxWidth: theme["hero-width"], background: (this.props.noCircle) ? ("") : (theme["hero-background"]), borderRadius: theme["hero-border-radius"], color: this.props.color }}
                className="d-flex align-items-center"
                maxWidth={false}>
                    
                <Grid xs={12}
                    dangerouslySetInnerHTML={{ __html: this.state.file }} />
                <br/>
            </Container>
        );
    }
}

Logo.propTypes = {
    src: PropTypes.string,
    noCircle: PropTypes.bool,
    repeat: PropTypes.bool,
    style: PropTypes.object,
    color: PropTypes.string
};

export default Logo;
