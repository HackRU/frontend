import React, { Component } from "react"; // Default react imports for the component
import { Parallax } from "react-scroll-parallax";
class Background extends Component {
    render() {
        return (
            <div className="theme-background">
                <div style={{ position: "absolute", bottom: "32%", left: "25%", width: "50%" }}>
                    <Parallax
                        offsetXMin={200}
                        offsetXMax={-100}
                        offsetYMin={0}
                        offsetYMax={1000}>
                        <img alt="circle" src="./assets/background/circle-dotted_white.svg" width={"100%"} height={1000} />
                    </Parallax>
                </div>
                <div style={{ position: "absolute"}}>
                    <Parallax
                        offsetXMin={200}
                        offsetXMax={-100}
                        offsetYMin={0}
                        offsetYMax={1000}>
                        <img alt="circle" src="./assets/background/square-dotted_white.svg" width={"100%"} height={1000} />
                    </Parallax>
                </div>
            </div>
        );
    }
}
export default Background;