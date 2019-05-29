import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { defaults, theme } from "../../Defaults.js";
import Person from './Person.jsx';
import TeamNames from './TeamNames.jsx';
import { SyncLoader } from "react-spinners";

class Team extends Component {
    
    state = {
	loading: "Our lastest team list is loading ...",
	directors: null,
	organizers: null,
	organizer_app: null
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

	fetch(defaults.teamInfo + "organizer_app.json",
	      {
		  method: "GET", 
		  mode: "cors"
	      }
	).then(response => response.json())
         .then(data =>
             this.setState({
                 organizer_app: data
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
				<p> The organizing team for HackRU plans and runs the hackathon twice a year, making HackRU the best event it can be for the 700+ participants involved! We strive to organize an event that brings together people interested in working on tech projects. The HackRU organizing team helps to foster a fun, creative, and supportive environment for hackers to learn new tech skills and explore new ideas! </p>
				<p>Want to help organize a hackathon? Want to be part of a dedicated team? Want to meet some amazing people? Join the HackRU organizing team! </p>

				{this.state.organizer_app ?
				 (
				     <p> Our application can be found <a href={this.state.organizer_app.organizer_app}>  here </a>.</p>
				 )
				:
				 (
				    <p> Our organizing teams are not currently accepting applications, but please keep in touch with us by visiting our website, hackru.org, and checking out our social media! </p>
				)}
				
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
				    {this.state.organizers.map((team) =>
					<Col xs={6} sm={3}>
					    <TeamNames key={team.id} teamName={team.team_name} people={team.members} />
					</Col>
				    )}
				</Row>
				
			    </Container>
			</div>
		    </Container>
		
	    );} else {
		return (
		    <Container fluid style={{ width: "100%", minHeight: "100vh", textAlign: "center", backgroundColor: theme.secondary[1] }} className="d-flex align-items-center">
			<div style={{ zIndex: 3, color: "white", width: "100%", marginTop: 50 }}>
			    <Container>				
				<div style={{ width: "100%", textAlign: "center" }} align="center" className="align-items-center" key={0}>
				    <SyncLoader color="rgba(255, 255, 255, 0.25)" />
				</div>
			    </Container>
			</div>
		    </Container>

		)
	    }
    }
}
export default Team;
