import React, { Component } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { Icon } from "react-fa";
import { liveImportantLinks } from "../../Defaults";
class Links extends Component {
    render() {
        let items = [];
        for (let i = 0; i < liveImportantLinks.length; i++) {
            items.push(
                <Button key={i} href={liveImportantLinks[i].href} className="live-links" size="lg" color="info" outline>
                    <Icon size="2x" name={liveImportantLinks[i].icon}/>
                    <br/>                                
                    {liveImportantLinks[i].title}
                </Button>
            )
        }
        return (
            <div style={{ marginBottom: 10 }}>
                <div style={{ width: "100%", textAlign: "left" }}>
                    <p className="lead">Important Links</p>
                    <div align="center">
                        <ButtonGroup>
                            {items}
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        );
    }
}
export default Links;