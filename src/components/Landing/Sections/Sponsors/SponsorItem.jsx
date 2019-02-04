import React, { Component } from "react";
import { Button } from "reactstrap";
import { Icon } from "react-fa";
class SponsorItem extends Component {
    render() {
        return (
            <div style={{ position: "relative", float: "none", margin: "0 auto", maxWidth: this.props.size.width, maxHeight: this.props.size.height }} className="" xs={12} md={4}>
                <div className="sponsor-item-overlay d-flex align-items-center">
                    <div className="sponsor-item-overlay-content">
                        <h1 style={{ color: this.props.color }}>{this.props.name}</h1>
                        <Button href={this.props.href} style={{ color: "white", borderRadius: 100, border: 0 }} color="light" outline>Visit <Icon name="chevron-right" /></Button>
                    </div>
                </div>
                <img alt={this.props.name} className="sponsor-item-image" src={this.props.image}/>
            </div>
        );
    }
}
export default SponsorItem;