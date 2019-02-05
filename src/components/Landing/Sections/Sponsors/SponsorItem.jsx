import React, { Component } from "react";
import { Button } from "reactstrap";
import { Icon } from "react-fa";
class SponsorItem extends Component {
    render() {
        return (
            <div style={{ position: "relative", float: "none", margin: "0 auto", maxWidth: this.props.size.width, maxHeight: this.props.size.height }} className="d-flex align-items-center" >
                <img alt={this.props.name} className="sponsor-item-image" src={this.props.image}/>
            </div>
        );
    }
}
export default SponsorItem;