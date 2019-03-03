import React, { Component } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { Icon } from "react-fa";
class Links extends Component {
    render() {
        return (
            <div style={{ marginBottom: 10 }}>
                <div style={{ width: "100%", textAlign: "left" }}>
                    <p className="lead">Important Links</p>
                    <div align="center">
                        <ButtonGroup>
                            <Button className="live-links" size="lg" color="info" outline>
                                <Icon size="2x" name="file"/>
                                <br/>                                
                                Waiver
                            </Button>
                            <Button className="live-links" size="lg" color="info" outline>
                                <Icon size="2x" name="code"/>
                                <br/>                                
                                Devpost
                            </Button>
                            <Button className="live-links" size="lg" color="info" outline>
                                <Icon size="2x" name="slack"/>
                                <br/>                                
                                Slack
                            </Button>
                            <Button className="live-links" size="lg" color="info" outline>
                                <Icon size="2x" name="stack-overflow"/>
                                <br/>                                
                                HelpQ
                            </Button>
                            <Button className="live-links" size="lg" color="info" outline>
                                <Icon size="2x" name="utensils"/>
                                <br/>
                                Food Menu
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        );
    }
}
export default Links;