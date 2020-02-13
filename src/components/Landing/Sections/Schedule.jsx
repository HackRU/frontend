import React, { Component } from "react";
// import { defaults } from "../../../Defaults";
import { Table, Container, Row, Col } from "reactstrap";
import { theme } from "../../../Defaults";
import { Icon } from "react-fa";

/**
 * Schedule component for the landing page
 */

const saturday_date = "10/19/2019";
const sunday_date = "10/20/2019";

const sat_schedule = [
    ["10:00 AM","Check-In","Main Lobby"],
    ["10:30 AM", "Lunch", "Food Table"],
    ["11:30 AM", "Opening Ceremonies", "Main Stage"],
    ["1:00 PM", "Hacking Begins", "Hacking Stations"],
    ["6:00 PM", "Dinner", "Food Table"],
];

const sun_schedule = [
    ["12:00 AM", "Midnight Snack", "(it's a surprise)"],
    ["1:00 AM", "Late Night Meal", "Food Table"],
    ["7:30 AM", "Breakfast", "Food Table"],
    ["10:30 AM", "Lunch", "Food Table"],
    ["11:30 AM", "Hacking Ends", "Hacking Stations"],
    ["12:00 PM", "Demos Begin", "Hacking Area"],
    ["3:00 PM", "Closing Ceremonies", "Main Stage"]
];

const light_red = {
    backgroundColor: "#bf4d4d",
    border: "none !important"
};

const dark_red = {
    backgroundColor: "#ad4444",
    border: "none !important"
};

class Schedule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: "sat"
        };
    }

    fill_table = (schedule) => {
        let rows = [];
        schedule.forEach((row, index) => {
            rows.push(
                <tr style={index % 2 === 0 ? light_red : dark_red}
                    key={index}>
                    <th scope="row">{row[0]}</th>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                </tr>
            );
        });
        return (
            <Table borderless>
                <thead key="table-head">
                    <tr>
                        <th>Time</th>
                        <th>Event</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        );
    }

    render() {
        return (
            <Container fluid style={{ backgroundColor: theme.secondary[1], color: "white", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", padding: 50 }}>
                <div style={{ position: "absolute", left: "calc(15px)", top: 0, height: "100%", backgroundColor: theme.primary[1], width: 10 }}></div>
                <h1 className="display-4 theme-font">Schedule</h1>  
                <Row>
                    <Col xs="6" style={{ marginLeft: -50, marginRight: -50 }}>
                        <div style={{ color: "white", padding: 50, paddingBottom: 0 }} className="col-xs-12 col-sm-12">
                            <div style={{ position: "absolute", left: 190, height: 10, backgroundColor: theme.primary[1], width: "calc(100% - 190px)", marginTop: 25 }}></div>
                            <h2 className="display-6" style={{ display: "inline-block", marginBottom: 25, backgroundColor: theme.primary[1], padding: 10, marginLeft: -50, paddingLeft: 50, borderTopRightRadius: 25, borderBottomRightRadius: 25, paddingRight: 25 }}><Icon name="question-circle" /> What?</h2>
                            <p style={{ display: "inline-block" }} className="lead">
                                HackRU is a 24-hour hackathon at Rutgers University. We welcome hundreds of students to join us in building awesome tech projects. Industry experts and mentors help foster an atmosphere of learning through tech-talks and one-on-one guidance. We encourage all students, no matter their experience level or educational background, to challenge themselves and expand their creative, technical, and collaboration skills at HackRU.
                            </p>
                        </div>
                    </Col>
                    <Col xs="6" style={{ marginLeft: -50, marginRight: -50 }}>
                        <div style={{ color: "white", padding: 50, paddingBottom: 0 }} className="col-xs-12 col-sm-12">
                            <div style={{ position: "absolute", left: 190, height: 10, backgroundColor: theme.primary[1], width: "calc(100% - 190px)", marginTop: 25 }}></div>
                            <h2 className="display-6" style={{ display: "inline-block", marginBottom: 25, backgroundColor: theme.primary[1], padding: 10, marginLeft: -50, paddingLeft: 50, borderTopRightRadius: 25, borderBottomRightRadius: 25, paddingRight: 25 }}><Icon name="question-circle" /> What?</h2>
                            <p style={{ display: "inline-block" }} className="lead">
                                HackRU is a 24-hour hackathon at Rutgers University. We welcome hundreds of students to join us in building awesome tech projects. Industry experts and mentors help foster an atmosphere of learning through tech-talks and one-on-one guidance. We encourage all students, no matter their experience level or educational background, to challenge themselves and expand their creative, technical, and collaboration skills at HackRU.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
        /*return (
            [
                <div className="col-12"
                    key="schedule-header">
                    <h1 className="display-4 theme-font">Schedule</h1>
                    <hr/>
                </div>,
                <Card className="mb-lg-4 shadow-lg rounded-0"
                    key="schedule-card"
                    style={{backgroundColor:"#ad4444", margin: "0", padding: "0"}}>
                    <Container fluid>
                        <Row>
                            <Col xs="12"
                                md="6">
                                <h3 className="mt-2 text-center">SATURDAY {saturday_date}</h3>
                                {this.fill_table(sat_schedule)}
                            </Col>
                            <Col xs="12"
                                md="6">
                                <h3 className="mt-2 text-center">SUNDAY {sunday_date}</h3>
                                {this.fill_table(sun_schedule)}
                            </Col>
                        </Row>
                    </Container>
                </Card>]
        );*/
    }
}

export default Schedule;
