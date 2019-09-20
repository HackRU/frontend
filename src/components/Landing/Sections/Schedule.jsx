import React, { Component } from "react";
import GlowButton from "../../GlowButton";
import { defaults } from "../../../Defaults";
import { Table, TabContent, TabPane, Nav, NavItem, NavLink, Card, Container, Col, Row } from 'reactstrap';

/**
 * Schedule component for the landing page
 */

const saturday_date = "10/19/2019"
const sunday_date = "10/20/2019"

const sat_schedule = [
    ["10:00 AM","Check-In","Main Lobby"],
    ["11:00 AM", "Lunch", "Food Table"],
    ["11:30 AM", "Opening Ceremonies", "Main Stage"],
    ["1:00 PM", "Hacking Begins", "Hacking Stations"],
    ["6:00 PM", "Dinner", "Food Table"]
]

const sun_schedule = [
    ["12:00 AM", "Midnight Surprise", "(it's a surprise)"],
    ["2:00 AM", "Midnight Snack", "Food Table"],
    ["7:30 AM", "Breakfast", "Food Table"],
    ["11:30 AM", "Hacking Ends", "Hacking Stations"],
    ["11:30 AM", "Lunch", "Food Table"],
    ["12:00 PM", "Demos Begin", "Hacking Area"],
    ["2:00 PM", "Closing Ceremonies", "Main Stage"]
]

const heading = {
    color: "#FFF5e8"
}


const light_red = {
    backgroundColor: "#bf4d4d",
    border: "none !important"
}

const dark_red = {
    backgroundColor: "#ad4444",
    border: "none !important"
}

class Schedule extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activeTab: 'sat'
        }
    }

    fill_table = (schedule) => {
        let rows = [];
        schedule.forEach((row, index) => {
            rows.push(
                <tr style={index % 2 === 0 ? light_red : dark_red}>
                    <th scope="row">{row[0]}</th>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                </tr>
            );
        });
        console.log(rows);
        return (
            <Table borderless style={{borderCollapse: "collapse !important"}}>
                <thead>
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
            [
            <div className="col-12">
                <h1 className="display-4 theme-font"
                    >Schedule</h1><hr />
            </div>,
            <Card className="shadow" style={{backgroundColor:"#ad4444", margin: "0", padding: "0"}}>
                <Container fluid>
                    <Row>
                        <Col xs="6">
                            <h3 className="mt-2">SATURDAY {saturday_date}</h3>
                            {this.fill_table(sat_schedule)}
                        </Col>
                        <Col xs="6">
                            <h3 className="mt-2">SUNDAY {sunday_date}</h3>
                            {this.fill_table(sun_schedule)}
                        </Col>
                    </Row>
                </Container>
            </Card>]
        );
    }
}

export default Schedule;
