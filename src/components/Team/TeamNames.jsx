import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Person from './Person.jsx';
class TeamNames extends Component {
    render() {
	const ppl = this.props.people;
	return (
	    <Col>
		<h4> {this.props.teamName} </h4>
		{ppl.map((person) =>
		    <Person key={person.id}
			    name={person.name} title={person.title} />
		)}
	    </Col>
	    
	)}
}
export default TeamNames;
