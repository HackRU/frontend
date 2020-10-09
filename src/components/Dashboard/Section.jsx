import React, { Component } from "react";
import { Collapse, Col, Button } from "reactstrap";
import { Icon } from "react-fa";
import PropTypes from "prop-types";
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
        super(props);
        this.state = {
            isOpen: props.isOpen
        };
    }
    /**
     * The default render method
     */
    render() {
        let { children, title, ...rest } = this.props;
        let color = this.props.color;
        if(!color){
            color = "red";
        }
        return (
            <Col className="dashboard-row"
                {...rest} >
                <div className="dashboard-card">
                    <div className={`dashboard-left-strip dashboard-strip-${color}`} ></div>
                    <h2 className={`dashboard-header dashboard-strip-${color}`}>
                        {title}
                        <Button color="white"
                            className="pill-btn"
                            style={{ position: "absolute", right: 25, top: 55, fontSize: 25 }}
                            onClick={() => this.setState({ isOpen: !this.state.isOpen })}>
                            <Icon name={(this.state.isOpen) ? ("chevron-up") : ("chevron-down")} />
                        </Button>
                    </h2>
                    <Collapse isOpen={this.state.isOpen}>
                        <div>
                            {children}
                        </div>
                    </Collapse>
                </div>
            </Col>
        );
    }
}
Section.propTypes = {
    isOpen: PropTypes.bool,
    children: PropTypes.any,
    title: PropTypes.string
};
export default Section;
