import React, { Component } from "react";
import request from "request";
import { ENDPOINTS } from "../Profile";
import { ListGroup } from "reactstrap";
import { Grid } from "@material-ui/core";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { Scheduler, DayView, Appointments, AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import { theme } from "../../Defaults";
import RoomIcon from "@material-ui/icons/Room";
import PropTypes from "prop-types";

const Content = ({ appointmentData, ...restProps }) => (
    <AppointmentTooltip.Content {...restProps}
        appointmentData={appointmentData}>
        <Grid container
            alignItems="center">
            <Grid item
                xs={10}
                style={{ paddingLeft: 20, paddingBottom: 10, color: "rgba(150, 150, 150, 1)" }}>
                <RoomIcon /> <span style={{ paddingLeft: 17 }}
                    dangerouslySetInnerHTML={{ __html: appointmentData.location ? appointmentData.location : "<i>nothing to see here</i>" }} />
            </Grid>
            <Grid item
                xs={10}
                style={{ marginLeft: 30, paddingTop: 10,  borderTop: "1px solid rgba(200, 200, 200, 1)", color: "rgba(150, 150, 150, 1)" }}>
                <div> <span dangerouslySetInnerHTML={{ __html: appointmentData.description ? appointmentData.description : "<i>nothing to see here</i>" }} /> </div>
            </Grid>
        </Grid>
    </AppointmentTooltip.Content>
);
Content.propTypes = {
    appointmentData: PropTypes.object
};
const Appointment = ({ children, style, ...restProps }) => (
    <Appointments.Appointment
        {...restProps}
        style={{
            ...style,
            backgroundColor: theme.primary[1],
            borderRadius: 8,
        }}>
        {children}
    </Appointments.Appointment>
);
Appointment.propTypes = {
    children: PropTypes.object,
    style: PropTypes.object
};
class Schedule extends Component {
    UNSAFE_componentWillMount() {
        this.setState({ events: [] });
        this.refresh();
        setInterval(this.refresh, 30000);
    }

    refresh = () => (
        this.setState({
            start: 0
        }, () => {
            request({
                uri: ENDPOINTS.schedule,
                method: "GET",
                json: true
            }, (error, response, body) => {
                if (!error && body.statusCode === 200) {
                    let events = [];
                    for (let i = 0; i < body.body.length; i++) {
                        events.push({
                            title: body.body[i].summary,
                            description: body.body[i].description,
                            location: body.body[i].location,
                            startDate: body.body[i].start.dateTime,
                            endDate: body.body[i].end.dateTime
                        });
                    }
                    events.sort((a, b) => {
                        return a.start - b.start;
                    });
                    this.setState({
                        events: events
                    });
                }
            });
        })
    )

    render() {
        return (
            <div style={{ marginBottom: 10 }}>
                <div style={{ width: "100%", textAlign: "left" }}>
                    <ListGroup className="live-container"
                        flush>
                        <Scheduler
                            data={this.state.events}>
                            <ViewState
                                currentDate={"11-07-2020"}
                            />
                            <DayView
                                startDayHour={(new Date()).getHours()}
                                endDayHour={(new Date()).getHours() + 6 > 24 ? 24 : (new Date()).getHours() + 4}
                            />
                            <Appointments
                                appointmentComponent={Appointment}
                            />
                            <AppointmentTooltip
                                contentComponent={Content}
                            />
                        </Scheduler>
                    </ListGroup>
                </div>
            </div>
        );
    }
}

Schedule.propTypes = {
    hide: PropTypes.bool,
};

export default Schedule;
