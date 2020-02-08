import React, { Component } from "react";
import { AvField } from "availity-reactstrap-validation";
import PropTypes from "prop-types";

/**
 * AVField wrapper object that allows for a custom input for validation
 * Expects props: {
 *     name: String,
 *     label: React Renderable,
 *     value: String,
 *     validate: JSON Object
 * }
 */
class CustomAVInput extends Component {s
    UNSAFE_componentWillMount() {
        this.setState({
            width: "100%"
        });
    }
    componentDidMount() {
        this.setState({
            width: this.refs.avfield.offsetWidth
        });
    }
    render() {
        return (
            <div>
                <div ref="avfield">
                    <AvField className="avfield-hide-inner"
                        name={this.props.name}
                        label={this.props.label}
                        type="text"
                        value={this.props.value}
                        validate={this.props.validate} />
                </div>
                <div style={{ position: "absolute", top: 32, width: "calc(100% - 30px)" }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

CustomAVInput.propTypes = {
    children: PropTypes.node,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    validate: PropTypes.bool,
};

export default CustomAVInput;
