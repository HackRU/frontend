import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { defaults, theme } from "../../Defaults.js";
import Person from './Person.jsx';
import TeamNames from './TeamNames.jsx';

class Team extends Component {
    
    state = {
	loading: "Our lastest team list is loading ...",
	directors: null,
	organizers: null
    }
    
    componentWillMount() {

	fetch(defaults.teamInfo + "directors.json",
	      {
		  method: "GET", 
		  mode: "cors"
	      }
	).then(response => response.json())
         .then(data =>
             this.setState({
                 directors: data.directors
             })   
         )

	fetch(defaults.teamInfo + "organizers.json",
	      {
		  method: "GET", 
		  mode: "cors"
	      }
	).then(response => response.json())
         .then(data =>
             this.setState({
                 organizers: data
             })   
         )

    }
    


    
    render() {

	if (this.state.directors && this.state.organizers) {
	    return (	    
		<Container fluid style={{ width: "100%", minHeight: "100vh", textAlign: "center", backgroundColor: theme.secondary[1] }} className="d-flex align-items-center">
		<div style={{ zIndex: 3, color: "white", width: "100%", marginTop: 50 }}>
		<Container>
		<h1 className="display-3"> The HackRU Organizing Team </h1>
		<p> Here falls the team page.  These are the people that make the things happen. </p>

		<h4 className="display-4" > Directors </h4>
		<Row>
		{this.state.directors.map((person) =>
		    <Col xs={6} sm={3}>
			<Person key={person.id}
				name={person.name} title={person.title}  image={ defaults.teamInfo + 'images/' + person.image} />
		    </Col>
		)}
		
		</Row>

		<h4 className="display-4"> Organizers </h4>
		
		<Row>
		    <Col xs={6} sm={4}>
			<TeamNames teamName={"Research and Development"} people={this.state.organizers.rnd} />
		    </Col>
		    <Col xs={6} sm={4}>
			<TeamNames teamName={"Marketing and Design"} people={this.state.organizers.mnd} />
		    </Col>
		    <Col xs={6} sm={4}>
			<TeamNames teamName={"Day-of and Events Coordination"} people={this.state.organizers.dayof} />
		    </Col>
		    <Col xs={6} sm={4}>
			<TeamNames teamName={"Logistics"} people={this.state.organizers.logistics} />
		    </Col>
		    <Col xs={6} sm={4}>
			<TeamNames teamName={"Volunteers and Hacker Experience"} people={this.state.organizers.vhx} />
		    </Col>
		    <Col xs={6} sm={4}>
			<TeamNames teamName={"Finance"} people={this.state.organizers.finance} />
		    </Col>
		</Row>
		
			    </Container>
			</div>
		    </Container>
		
	    );} else {
		return (
		    <Container fluid style={{ width: "100%", minHeight: "100vh", textAlign: "center", backgroundColor: theme.secondary[1] }} className="d-flex align-items-center">
			<div style={{ zIndex: 3, color: "white", width: "100%", marginTop: 50 }}>
			    <Container>
				<h1> Loading ... </h1>
			    </Container>
			</div>
		    </Container>

		)
	    }
    }
}
export default Team;
