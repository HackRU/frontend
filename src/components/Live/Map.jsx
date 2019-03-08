import React, { Component } from "react";
import { defaults } from "../../Defaults";
class Map extends Component {
    render() {
        return (
            <div style={{ marginBottom: 10 }}>
                <div style={{ width: "100%", textAlign: "left" }}>
                    <p className="lead">Map</p>
                    <img width="100%" alt="map" src={defaults.rest.s3 + "floorplan.jpg"}/>
                </div>
            </div>
        );
    }
}
export default Map;