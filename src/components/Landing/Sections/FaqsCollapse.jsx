import React from "react";
import { Collapse } from "reactstrap";
import { Icon } from "react-fa";
import PropTypes from "prop-types";

class FaqsCollapse extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }
    componentWillMount() {
        this.setState({
            collapse: false
        });
    }
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }
    render() {
        let cat = this.props.cat;

        return (
            <div style={{ cursor: "pointer" }} >
                <h5 onClick={this.toggle}>{cat.title} <Icon className="faq-hover pull-right"
                    name={(this.state.collapse) ? ("chevron-up") : ("chevron-down")} /></h5>
                <hr className="faq-hover"/>
                <Collapse isOpen={this.state.collapse}>{cat.text}<div style={{ minHeight: 25 }} /></Collapse>
            </div>
        );
    }
}

FaqsCollapse.propTypes = {
    cat: {
        title: PropTypes.string,
        text: PropTypes.string,
    }
};

export default FaqsCollapse;
