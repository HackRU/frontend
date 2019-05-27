import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { defaults, theme, navlinks } from "../../Defaults";
class Person extends Component {
    render() {
        return (
	    <div style={{marginBottom: 10}}>
		{this.props.image &&
		 <img style={{ borderRadius:80 }} src={this.props.image} />
		}
		<h5 style={{marginBottom: 2}}>{this.props.name} </h5>
		{this.props.title &&
		 <span style={{color: theme.secondary[0]}}> {this.props.title} </span>
		}
	    </div>
        );
    }
}
export default Person;
