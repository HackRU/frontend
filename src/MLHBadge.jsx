/**
 * @author Shivan Modha
 * @description The MLH Badge, but in an object so that we can use it more easily
 * @version 0.0.1
 * Created 12/09/18
 */
/***************************************************************IMPORTS***************************************************************/
import React, { Component } from "react";
/***************************************************************IMPORTS***************************************************************/

/*****************************************************************APP*****************************************************************/
/**
 * This is the MLH Badge that we need to show on our webpage at all times in order to be compliant with MLH standards
 */
class MLHBadge extends Component {
    render() {
        return (
            <a id="mlh-trust-badge" style={{ display: "block", maxWidth: "100px", minWidth: "60px", position: "absolute", right: "50px", top: "0", width: "10%", zIndex: "10" }} href="https://mlh.io/seasons/na-2019/events?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2019-season&utm_content=black" target="_blank" rel="noopener noreferrer">
                <img src="https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-black.svg" alt="Major League Hacking 2019 Hackathon Season" style={{ width: "100%" }} />
            </a>
        );
    }
}
/*****************************************************************APP*****************************************************************/

/***************************************************************EXPORTS***************************************************************/
export default MLHBadge;
/***************************************************************EXPORTS***************************************************************/