import React, { Component } from "react"; // Default react imports for the component
import { defaults } from "./Defaults"; // Get a handle to the default application settings
const imageDefs = [{
    source: "./assets/background/circle-largedotted_white.svg",
    top: null,
    left: "-400px",
    bottom: "-400px",
    right: null,
    height: 1000,
    multiplier: 0.99
}, {
    source: "./assets/background/square-dotted_white.svg",
    top: "calc(50% - 250px)",
    left: null,
    bottom: null,
    right: -250,
    height: 500
}, {
    source: "./assets/background/square-largedotted_yellow.svg",
    top: "calc(100% - 300px)",
    left: null,
    bottom: null,
    right: 600,
    height: 300,
    multiplier: 0.8
}, {
    source: "./assets/background/target_yellow.svg",
    top: null,
    left: 400,
    bottom: "140px",
    right: null,
    height: 200
}, {
    source: "./assets/background/target_green.svg",
    top: null,
    left: null,
    bottom: "0px",
    right: 300,
    height: 400
}, {
    source: "./assets/background/circle_white.svg",
    top: null,
    left: null,
    bottom: "250px",
    right: 300,
    height: 50
}, {
    source: "./assets/background/shape_yellow.svg",
    top: null,
    left: null,
    bottom: "calc(50%)",
    right: 50,
    height: 300
}, {
    source: "./assets/background/cross_green.svg",
    top: null,
    left: null,
    bottom: "500px",
    right: 300,
    height: 50,
    multiplier: 0.2
}, {
    source: "./assets/background/cross_yellow.svg",
    top: "564px",
    left: null,
    bottom: null,
    right: 325,
    height: 50
}, {
    source: "./assets/background/circle_green.svg",
    top: "600px",
    left: 400,
    bottom: null,
    right: 300,
    height: 50
}, {
    source: "./assets/background/cross_green.svg",
    top: null,
    left: 100,
    bottom: "100px",
    right: null,
    height: 50,
    multiplier: 0.99
}, {
    source: "./assets/background/line_green.svg",
    top: null,
    left: -300,
    bottom: "150px",
    right: null,
    height: 750,
    transform: "rotate(-60deg)"
}, {
    source: "./assets/background/line_green.svg",
    top: "175px",
    left: -325,
    bottom: null,
    right: null,
    height: 750,
    transform: "rotate(-60deg)"
}, {
    source: "./assets/background/line_yellow.svg",
    top: null,
    left: -275,
    bottom: "50px",
    right: null,
    height: 750,
    transform: "rotate(-60deg)"
}, {
    source: "./assets/background/line_yellow.svg",
    top: "200px",
    left: -425,
    bottom: null,
    right: null,
    height: 750,
    transform: "rotate(-60deg)"
}
];
class Background extends Component {
    constructor(props) {
        super(props);
        this.renderImage = this.renderImage.bind(this);
        this._event_onResize = this._event_onResize.bind(this);
        this._event_onScroll = this._event_onScroll.bind(this);
        window.addEventListener("resize", this._event_onResize);
        window.addEventListener("scroll", this._event_onScroll);
    }
    /**
     * Handle whenever the window resizes due to a user window resize or a zoom
     */
    _event_onResize() {
        this.setState({
            isMobile: (window.innerWidth < defaults.mobileWidthThresholdRelaxed) || (window.innerHeight < defaults.mobileHeightThresholdRelaxed)
        });
    }
    /**
     * Handle the scroll event from the mouse
     */
    _event_onScroll() {
        this.setState({
            scrollFeature: window.scrollY / (document.body.scrollHeight - window.innerHeight)
        });
    }
    /**
     * Initial Pre Render Method
     */
    componentWillMount() {
        this._event_onResize();
        this.setState({
            scrollFeature: 0
        });
    }
    renderImage(icon, top, left, bottom, right, height, transform, multiplier) {
        let style = { position: "fixed", opacity: 0.25 };
        let scrollFeature = `${this.state.scrollFeature * 100 * multiplier}%`;
        style["top"] = top ? `calc(${top} - ${scrollFeature})` : null;
        style["left"] = left ? left : null;
        style["bottom"] = bottom ? `calc(${bottom} - ${scrollFeature})` : null;
        style["right"] = right ? right : null;
        style["transform"] = transform ? transform : null;
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
                images.push(this.renderImage(image.source, image.top, image.left, image.bottom, image.right, image.height, image.transform, image.multiplier ? 1 - image.multiplier : 1));
            }
            return (
                <div className="theme-background"
                    style={{ position: "fixed", top: 100 }}>
                    {images}
                </div>
            );
        } else {
            return null;
        }
    }
}
export default Background;