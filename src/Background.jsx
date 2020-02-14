import React, { Component } from "react"; // Default react imports for the component

const imageDefs = [
    {
        source: "./assets/background/line_green.svg",
        top: null,
        left: -300,
        bottom: "150px",
        right: null,
        height: 750,
        opacity: 1,
    },
    {
        source: "./assets/background/line_green.svg",
        top: null,
        left: -300,
        bottom: "150px",
        right: null,
        height: 750,
        opacity: 1,
    }
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
    componentWillMount() {
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