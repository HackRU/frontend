import React, { Component } from "react";
import { theme } from "../../Defaults";
class Person extends Component {
    render() {
        return (
	    <div style={{marginBottom: 10}}>
		{this.props.image &&
		 <img style={{ borderRadius:80 }} src={this.props.image} alt={this.props.name} />
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
