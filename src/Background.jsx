import React, { Component } from "react"; // Default react imports for the component
import { theme } from "./Defaults";
import { Container, Row, Col } from "reactstrap";

const imageDefs = [
    {
        source: "/assets/background/line_green.svg",
        bottom: -300,
        right: -300,
        height: 750,
        opacity: 1,
    },
    {
        source: "/assets/background/line_yellow.svg",
        bottom: -250,
        right: -350,
        height: 750,
        opacity: 1,
    },
    {
        source: "/assets/background/line_red.svg",
        bottom: -200,
        right: -400,
        height: 750,
        opacity: 1,
    },
    {
        source: "/assets/background/circle_red.svg",
        bottom: -100,
        right: -200,
        height: 400,
        opacity: 1,
    }, //END BOTTOM RIGHT SECTION
    {
        source: "/assets/background/line_green.svg",
        top: -250,
        left: -400,
        height: 750,
        opacity: 1,
    },
    {
        source: "/assets/background/line_yellow.svg",
        top: -200,
        left: -500,
        height: 750,
        opacity: 1,
    },
    {
        source: "/assets/background/target-thick_green.svg",
        top: 175,
        left: -200,
        height: 400,
        opacity: 1,
    },
    {
        source: "/assets/background/line_red.svg",
        top: -150,
        left: -300,
        height: 750,
        opacity: 1,
    }, //END TOP LEFT SECTION
];

class Background extends Component {
    constructor(props) {
        super(props);
        this.renderImage = this.renderImage.bind(this);
        this._event_onResize = this._event_onResize.bind(this);
        window.addEventListener("resize", this._event_onResize);
    }
    /**
     * Handle whenever the window resizes due to a user window resize or a zoom
     */
    _event_onResize() {
        this.setState({
            isMobile: (window.innerWidth < 500) || (window.innerHeight < 500)
        });
    }
    /**
     * Initial Pre Render Method
     */
    UNSAFE_componentWillMount() {
        this._event_onResize();
    }

    renderImage(icon, top, left, bottom, right, height, transform, multiplier, opacity) {
        let style = { position: "fixed"};
        style["top"] = top ? top : null;
        style["left"] = left ? left : null;
        style["bottom"] = bottom ? bottom : null;
        style["right"] = right ? right : null;
        style["transform"] = transform ? transform : null;
        style["opacity"] = opacity ? opacity : 0.25;
        return (
            <div style={style}>
                <img alt={icon.split("/").pop()}
                    src={icon}
                    height={height} /> 
            </div>
        );
    }

    render() {
        if (!this.state.isMobile) {
            let images = [];
            for (let i = 0; i < imageDefs.length; i++) {
                let image = imageDefs[i];
                images.push(this.renderImage(image.source, image.top, image.left, image.bottom, image.right, image.height, image.transform, image.multiplier ? 1 - image.multiplier : 1, image.opacity));
            }
            return (
                <Container fluid
                    style={{ position: "fixed" }}
                    className="theme-background">
                    <Row className="justify-content-center">
                        <Col xs="2"
                            sm="2"
                            md="2"
                            lg="1"
                            style={{ transform: "rotate(45deg)", height: "100vh", backgroundColor: theme.primary[1] }}/>
                        <Col xs="2"
                            sm="2"
                            md="2"
                            lg="1"
                            style={{ transform: "rotate(45deg)", height: "100vh", backgroundColor: theme.accent[1] }}/>
                        <Col xs="2"
                            sm="2"
                            md="2"
                            lg="1"
                            style={{ transform: "rotate(45deg)", height: "100vh", backgroundColor: theme.secondary[1] }}/>
                    </Row>
                    {images}
                </Container>
            );
        } else {
            return null;
        }
    }
}
export default Background;