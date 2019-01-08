import React, { Component } from 'react';
import { Collapse, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { Icon } from "react-fa";
import { theme } from "../../Defaults";

// A collapsable section on the dashboard
// It takes four props, 'children', 'open' (if it is initially expanded), 'title', and 'subtitle'
class Section extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: props.open
        }
    }

    render() {
        return (
            <div style={{ width: "100%", textAlign: "left", marginBottom: 25 }}>
                <ListGroup>
                    <ListGroupItem
                        action 
                        tag="button"
                        href="#"
                        style={{ background: theme.primary[0] + "2F", color: theme.primary[1] + "FF", borderRadius: 0 }}
                        onClick={(e) => 
                            this.setState({ isOpen: !this.state.isOpen })
                        }
                    >
                        <ListGroupItemHeading>
                            { this.props.title }
                        </ListGroupItemHeading>
                        <ListGroupItemText>
                            { this.props.subtitle }
                        </ListGroupItemText>
                        <Icon style={{ position: "absolute", right: 25, top: 25 }} name={(this.state.isOpen) ? ("chevron-up") : ("chevron-down")} />
                    </ListGroupItem>
                    <Collapse isOpen={this.state.isOpen}>
                        <ListGroupItem style={{ background: theme.primary[1] + "1F", borderRadius: 0 }}>
                            { this.props.children }
                        </ListGroupItem>
                    </Collapse>
                </ListGroup>
            </div>
        )
    }

}

export default Section
