import React, { Component } from "react";
import { Container, Grid, Button} from "@material-ui/core";
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
                        <Grid
                            className="justify-content-center"
                            style={{ marginLeft: 8, width: "100%", backgroundColor: theme.secondary[1], padding: 10, textAlign: "center", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.8)" }}>
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
                        </Grid>
                        <br/>
                        <Grid
                            className="justify-content-center"
                            style={{ marginLeft: 8, width: "100%", backgroundColor: theme.secondary[1], padding: 10, textAlign: "center", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.8)" }}>
                            <h1 className="display-4 theme-font">Announcement</h1>
                            <p className="text-center">Due to Rutgers University's recent restrictions in concern of COVID-19, the HackRU team has made the decision to cancel HackRU Spring 2020 for the safety of everyone involved. We wish it didn’t have to be this way, but the health and well-being of all our hackers, volunteers, organizers, and sponsors is our first priority. We hope that you stay in touch by connecting with us on social media, and we promise to come back stronger at our next HackRU in the fall! Stay safe and healthy!</p>    
                            <br></br>
                            <Grid container>
                                <Grid item
                                    xs={6}>
                                    <i><p style={{ marginBottom: 3, color: "rgba(255, 255, 255, 0.5)" }}>Stay in the know!</p></i>
                                    <a href="https://hackru1.typeform.com/to/OEtQEO"><Button color="light"
                                        style={{ border: "none", color: "rgba(255, 255, 255, 1)" }}
                                        outline>Join Mailing List</Button></a>
                                </Grid>
                                <Grid item
                                    xs={6}>
                                    <i><p style={{ marginBottom: 3, color: "rgba(255, 255, 255, 0.5)" }}>Past Submissions</p></i>
                                    <a href="https://hackru-s19.devpost.com"><Button color="light"
                                        style={{ border: "none", marginRight: 10, color: "rgba(255, 255, 255, 1)" }}
                                        outline>Spring 2019</Button></a>
                                    <a href="https://hackru-f19.devpost.com"><Button color="light"
                                        style={{ border: "none", color: "rgba(255, 255, 255, 1)" }}
                                        outline>Fall 2019</Button></a>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Container>
        );
    }
}
export default Freeze;