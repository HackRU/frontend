import React, { Component } from "reac";
import { Collapse, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from "reactstrap";
import { Icon } from "react-fa";
import { theme } from "../Defaults";

// A collapsable ListGroup
class CollapseSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: props.open
        }
    }
    render() {
        return (
            <ListGroup>
                <ListGroupItem tag="button" href="#" action style={{ background: theme.primary[0] + "2F", color: theme.primary[1] + "FF", borderRadius: 0 }} onClick={(e) => { this.setState({ openDetails: !this.state.openDetails }) }}>
                    <ListGroupItemHeading>Basics</ListGroupItemHeading>
                    <ListGroupItemText>Introduce yourself, don't be shy!</ListGroupItemText>
                    <Icon style={{ position: "absolute", right: 25, top: 25 }} name={(this.state.openDetails) ? ("chevron-up") : ("chevron-down")} />
                </ListGroupItem>
                <Collapse isOpen={this.state.openDetails}>
                    {this.props.children}
                </Collapse>
            </ListGroup>
        );
    }

}
export default CollapseSection