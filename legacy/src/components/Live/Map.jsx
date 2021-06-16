import React, { Component } from "react";
import { defaults } from "../../Defaults";
class Map extends Component {
    render() {
        return (
            <div style={{ marginBottom: 10 }}>
                <div style={{ width: "100%", textAlign: "left" }}>
                    <h3 >Map</h3>
                    <img width="100%"
                        alt="map"
                        src={defaults.rest.s3 + "floorplan.jpg"}/>
                </div>
            </div>
        );
    }
}
export default Map;