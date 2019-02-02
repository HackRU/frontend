import React, { Component } from "react";
import { Col } from "reactstrap";
class SponsorItem extends Component {
    render() {
        return (
            <div style={{ float: "none", margin: "0 auto", maxWidth: this.props.size.width, maxHeight: this.props.size.height, padding: 25 }} className="d-flex align-items-center" xs={12} md={4}>
                <img style={{ maxHeight: "100%", maxWidth: "100%", margin: "0 auto" }} src={this.props.image}/>
            </div>
        );
    }
}
export default SponsorItem;