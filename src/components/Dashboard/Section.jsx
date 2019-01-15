import React, { Component } from 'react';
import { Collapse, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { Icon } from "react-fa";
import { theme } from "../../Defaults";
/**
 * A collapsable section on the dashboard
 * It takes four props, 'children', 'isOpen' (if it is initially expanded), 'title', and 'subtitle'
 */
class Section extends Component {
    /**
     * Set the default object state
     * @param {Object} props React properties 
     */
    constructor(props) {
        super(props)
        this.state = {
            isOpen: props.isOpen
        }
    }
    /**
     * The default render method
     */
    render() {
        let { children, title, subtitle, isOpen, ...rest } = this.props;
        return (
            <div style={{ width: "100%", textAlign: "left", marginBottom: 25 }} {...rest} >
                <ListGroup>
                    <ListGroupItem action tag="button" href="#" style={{ background: theme.primary[0] + "2F", color: theme.primary[1] + "FF", borderRadius: 0 }} onClick={(e) => 
                        this.setState({ isOpen: !this.state.isOpen })
                    }>
                        <ListGroupItemHeading>
                            {title}
                        </ListGroupItemHeading>
                        <ListGroupItemText>
                            {subtitle}
                        </ListGroupItemText>
                        <Icon style={{ position: "absolute", right: 25, top: 25 }} name={(this.state.isOpen) ? ("chevron-up") : ("chevron-down")} />
                    </ListGroupItem>
                    <Collapse isOpen={this.state.isOpen}>
                        <ListGroupItem style={{ background: theme.primary[1] + "1F", borderRadius: 0 }}>
                            {children}
                        </ListGroupItem>
                    </Collapse>
                </ListGroup>
            </div>
        )
    }
}
export default Section