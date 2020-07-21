import React, { Component } from "react";
import { theme } from "../../../Defaults";
// import { Col, Row } from "reactstrap";
import { Table, TableContainer, TableRow, TableCell, TableHead, Grid } from "@material-ui/core";

/**
 * Schedule component for the landing page
 */

const saturday_date = "APRIL 18";
const sunday_date = "APRIL 19";

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
class Schedule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: "sat"
        };
    }

    fill_table = (schedule) => {

        const light_red = {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            border: "none !important",
        };
        
        const dark_red = {
            border: "none !important"
        };
        let rows = [];
        schedule.forEach((row, index) => {
            rows.push(
                <TableRow style={index % 2 === 0 ? light_red : dark_red}
                    key={index}
                    className="lead">
                    <TableCell scope="row">{row[0]}</TableCell>
                    <TableCell>{row[1]}</TableCell>
                    <TableCell>{row[2]}</TableCell>
                </TableRow>
            );
        });
        return (
            <div style={{ overflowX: "auto" }}>
                <TableContainer>
                    <Table size="large" style={{ minWidth: 300 }}
                        hover
                        borderless>
                        <TableHead key="table-head">
                            <TableRow className="lead">
                                <TableCell style={{color: "rgba(255, 255, 255, 1)"}}>Time</TableCell>
                                <TableCell style={{color: "rgba(255, 255, 255, 1)"}}>Event</TableCell>
                                <TableCell style={{color: "rgba(255, 255, 255, 1)"}}>Location</TableCell>
                            </TableRow>
                        </TableHead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
    render() {
        return (
            <div style={{ backgroundColor: theme.secondary[1], color: "white", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", padding: 50 }}>
                <div style={{ position: "absolute", left: "calc(15px)", top: 0, height: "100%", backgroundColor: theme.primary[1], width: 10 }}></div>
                <h1 className="display-4 theme-font">Schedule</h1>
                <div className="row mb-3"
                    style={{ marginLeft: -50, marginRight: -50 }}>
                    <div style={{ color: "white", padding: 50, paddingBottom: 0 }}
                        className="col-xs-12 col-sm-12">
                        <Grid container>
                            <Grid item xs={1} style={{ padding: 0, margin: 0, writingMode: "vertical-lr", transform: "rotate(180deg)", marginRight: -10, marginLeft: 10 }}
                                className="text-center"> 
                                <h3 style={{ paddingLeft: 10 }}
                                    className="lead">{saturday_date}</h3>
                            </Grid>
                            <Grid item xs={11} style={{ borderLeft: "1px solid white" }}>
                                {this.fill_table(sat_schedule)}
                            </Grid>
                            <Grid item xs={1} style={{ padding: 0, margin: 0, writingMode: "vertical-lr", transform: "rotate(180deg)", marginRight: -10, marginLeft: 10 }}
                                className="text-center"> 
                                <h3 style={{ paddingLeft: 10 }}
                                    className="lead">{sunday_date}</h3>
                            </Grid>
                            <Grid item xs={11} style={{ borderLeft: "1px solid white" }}>
                                {this.fill_table(sun_schedule)}
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        );
    }
}
export default Schedule;