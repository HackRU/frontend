import React, { Component } from "react";
import { AvField } from "availity-reactstrap-validation";
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
    componentWillMount() {
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
                    <AvField className="avfield-hide-inner" name={this.props.name} label={this.props.label} type="text" value={this.props.value} validate={this.props.validate} />
                </div>
                <div style={{ position: "absolute", top: 32, width: this.state.width }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default CustomAVInput;