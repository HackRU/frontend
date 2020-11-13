import React, { Component } from "react";
import { Container, Grid } from "@material-ui/core";
import Logo from "./Logo";
import { Motion, spring } from "react-motion";
import { theme } from "../../../Defaults";

class Freeze extends Component {
    constructor() {
        super();
        this._event_onResize = this._event_onResize.bind(this);
        window.addEventListener("resize", this._event_onResize);
    }
    _event_onResize() {
        if (this.refs.anime) {
            console.log(this.refs.anime.refs.grid.width);
            this.setState({
                subWidth: (this.refs.anime.refs.grid.width / 2) + 75
            });
        }
        this.setState({
            IGNOREME: "YAS"
        });
    }
    UNSAFE_componentWillMount() {
        this.setState({
            subWidth: 325
        });
    }
    componentDidMount() {
        this._event_onResize();
    }
    render() {
        let leftPos = (window.innerWidth > 500) ? (window.innerWidth / 2) - this.state.subWidth + 10 : window.innerWidth / 12;
        return (
            <Container fluid
                maxWidth={false}
                id="landing-section"
                style={{ zIndex: 3,  width: "100%", minHeight: "100vh", userSelect: "none" }}>
                <Grid  style={{ minWidth: "50%", minHeight: "100vh", textAlign: "right" }} >
                    <div style={{ display: "block", position: "absolute", width: window.innerWidth - (2 * leftPos), top: window.innerHeight / 2 - 200, left: leftPos}}>
                        <br/>
                        <Grid
                            className="justify-content-center"
                            style={{ marginLeft: 8, width: "100%", backgroundColor: theme.secondary[1], padding: 10, textAlign: "center", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.8)", outline: 3, outlineColor: "white", outlineStyle: "solid", outlineOffset: -20}}>
                            <div style={{marginLeft: 100, marginRight: 100, marginTop: 100, marginBottom: -100}}>
                                <Motion defaultStyle={{ opacity: 0 }}
                                    style={{ opacity: spring(1, { stiffness: 1, damping: 1 }) }}>
                                    {
                                        ({ opacity }) =>
                                            <Logo repeat={true}
                                                style={{ opacity }}
                                                noCircle
                                                src="./assets/icons/hru-text.svg" />
                                    }
                                </Motion>
                            </div>
                            <div style={{display: "inline-block", textAlign: "left", padding: 100, fontSize: 30}}>
                                <div>
                                    WILL RETURN <br/>
                                    {/* NOV 7-8 <br/> */}
                                </div>
                            </div>
                            <hr style={{borderTop: "15px dotted", width: 75, backgroundColor: "rgba(255, 255, 255, 0)", marginBottom: 100, marginTop: -75}} /> 
                            <div style={{ marginBottom: 25  , textAlign: "center" }}>Stay Tuned for Registration</div>
                        </Grid>
                    </div>
                </Grid>
            </Container>
        );
    }
}
export default Freeze;