import React, { Component } from "react"; // Default react imports for the component
import Parallax from "parallax-js";

const bucket_count = 3;

const imageDefs = [{
    source: "./assets/background/circle-largedotted_white.svg",
    left: "-400px",
    right: null,
    height: 1000,
    opacity: 0.1,
    multiplier: 0.99
}, {
    source: "./assets/background/square-dotted_white.svg",
    left: null,
    right: -250,
    height: 500
}, {
    source: "./assets/background/square-largedotted_yellow.svg",
    left: null,
    right: 600,
    height: 300,
    opacity: 0.1,
    multiplier: 0.8
}, {
    source: "./assets/background/target_yellow.svg",
    left: 400,
    right: null,
    height: 200,
    opacity: 0.25
}, {
    source: "./assets/background/target_green.svg",
    left: null,
    right: 300,
    height: 400,
    opacity: 0.25
}, {
    source: "./assets/background/circle_white.svg",
    left: null,
    right: 300,
    height: 50
}, {
    source: "./assets/background/shape_yellow.svg",
    left: null,
    right: 50,
    height: 300,
    opacity: 0.75
}, {
    source: "./assets/background/cross_green.svg",
    left: null,
    right: 300,
    height: 50,
    opacity: 0.5,
    multiplier: 1
}, {
    source: "./assets/background/cross_yellow.svg",
    left: null,
    right: 325,
    height: 50,
    opacity: 1
}, {
    source: "./assets/background/circle_green.svg",
    left: 400,
    right: 300,
    height: 50,
    opacity: 0.25
}, {
    source: "./assets/background/cross_green.svg",
    left: 100,
    right: null,
    height: 50,
    opacity: 1,
    multiplier: 0.99
}, {
    source: "./assets/background/line_green.svg",
    left: -300,
    right: null,
    height: 750,
    opacity: 1,
    transform: "rotate(-60deg)"
}, {
    source: "./assets/background/line_green.svg",
    left: -325,
    right: null,
    height: 750,
    transform: "rotate(-60deg)",
    opacity: 1
}, {
    source: "./assets/background/line_yellow.svg",
    left: -275,
    right: null,
    height: 750,
    opacity: 1,
    transform: "rotate(-60deg)"
}, {
    source: "./assets/background/line_yellow.svg",
    left: -425,
    right: null,
    height: 750,
    opacity: 1,
    transform: "rotate(-60deg)"
}, 
];
class Background extends Component {
    constructor(props) {
        super(props);
        this.renderImage = this.renderImage.bind(this);
        this._event_onResize = this._event_onResize.bind(this);
        this._event_onScroll = this._event_onScroll.bind(this);
        window.addEventListener("resize", this._event_onResize);
        window.addEventListener("scroll", this._event_onScroll);
        this.scene_ref = React.createRef();
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

    componentDidMount() {
        this.parallax = new Parallax(this.scene_ref.current, {
            relativeInput: true
        });
    }

    componentWillUnmout() {
        this.parallax.disable()
    }

    renderImage(icon, top, left, bottom, right, height, transform, multiplier, opacity) {
        let style = { position: "fixed"};
        style["left"] = left ? left : null;
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
        let images = [];
        let bucketcount = imageDefs.length % bucket_count === 0 ? bucket_count: bucket_count + 1;
        let bucket_size = imageDefs.length / bucketcount;
        let depth_modifier = 1.00 / bucketcount;
        let rendered_images = imageDefs.map((image) => {
            return this.renderImage(image.source, image.top, image.left, image.bottom, image.right, image.height, image.transform, image.multiplier ? 1 - image.multiplier : 1, image.opacity)
        });

        for (let i = 0; i < bucketcount; i++) {
            let end_index = (i + 1) * bucket_size + 1 > imageDefs.length ? imageDefs.length : (i + 1) * bucket_size; 
            let image_bucket = rendered_images.slice(i * bucket_size, end_index);
            console.log(depth_modifier * (i + 1));
            images.push(
                <div className="layer" data-depth={depth_modifier * (i + 1)}>
                    {image_bucket}
                </div>
            );
        }

        return (
            <div className="scene" ref={this.scene_ref} style={{ top: 100 }}>
                {images}
            </div>
        );
    }
}
export default Background;
