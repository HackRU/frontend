import React from 'react';
import { Collapse } from 'reactstrap';
import { Icon } from "react-fa";

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
            <div className="faq">
                <strong>
                    <h5 className="" onClick={this.toggle}>{cat.title} <Icon className="faq-hover pull-right" name={(this.state.collapse) ? ("chevron-up") : ("chevron-down")} /></h5>
                </strong>
                <hr className="faq-hover"/>
                <Collapse className="mb-3" isOpen={this.state.collapse}>{cat.text}</Collapse>
            </div>
        );
    }
}

export default FaqsCollapse