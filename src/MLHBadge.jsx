import React, { Component } from "react";

class MLHBadge extends Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.state = {
            isVisible: true,
            badgeHeight: 0,
        };
    }

    handleResize() {
        let badge = document.getElementById("mlh-trust-badge");
        if (badge == null) {
            return;
        }
        this.setState({
            badgeHeight: parseFloat(
                window
                    .getComputedStyle(badge)
                    .getPropertyValue("height")
                    .replace("px", "")
            ),
        });
    }

    handleScroll() {
        let badgeHeight = this.state.badgeHeight;
        let offset = window.pageYOffset;
        if (offset < badgeHeight) {
            //At top
            this.setState({
                isVisible: true,
            });
        } else if (offset > badgeHeight) {
            this.setState({
                isVisible: false,
            });
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("resize", this.handleResize);
    }

    render() {
        return (
            this.state.isVisible 
            &&
            <a id="mlh-trust-badge"
                style={{display:"block",maxWidth:"100px",minWidth:"60px",position:"fixed",right:"50px",top:0,width:"10%", zIndex:10000}}
                href="https://mlh.io/seasons/2022/events?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2022-season&utm_content=white">
                <img src="https://s3.amazonaws.com/logged-assets/trust-badge/2022/mlh-trust-badge-2022-white.svg"
                    alt="Major League Hacking 2022 Hackathon Season"
                    style={{width:"100%"}} />
            </a> 
        );
    }
}

export default MLHBadge;
