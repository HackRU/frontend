import React, { Component } from "react";

class MLHBadge extends Component {
    render() {
        return (
            <a id="mlh-trust-badge" style="display:block;max-width:100px;min-width:60px;position:fixed;right:50px;top:0;width:10%;z-index:10000" href="https://mlh.io/seasons/2022/events?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2022-season&utm_content=white" target="_blank">
                <img src="https://s3.amazonaws.com/logged-assets/trust-badge/2022/mlh-trust-badge-2022-white.svg" alt="Major League Hacking 2022 Hackathon Season" style="width:100%" />
            </a> 
        );
    }
}

export default MLHBadge;
