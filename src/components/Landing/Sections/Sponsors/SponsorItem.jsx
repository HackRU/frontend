import React, { Component } from "react";
import { Button } from "reactstrap";
import { Icon } from "react-fa";
class SponsorItem extends Component {
    render() {
        return (
            <div style={{ position: "relative", float: "none",  maxWidth: this.props.size.width, maxHeight: this.props.size.height }} className="d-flex align-items-center p-4" >
                <a href={this.props.href}><img alt={this.props.name} className="sponsor-item-image" src={this.props.image}/></a>
            </div>
        );
    }
}
export default SponsorItem;