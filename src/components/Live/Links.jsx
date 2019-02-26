import React, { Component } from "react";
import { Button } from "reactstrap";
class Links extends Component {
    render() {
        return (
            <div style={{ marginBottom: 10 }}>
                <div style={{ width: "100%", textAlign: "left" }}>
                    <p className="lead">Important Links</p>
                    <Button color="info" outline>Test</Button>
                </div>
            </div>
        );
    }
}
export default Links;