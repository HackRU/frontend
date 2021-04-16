import React from "react";
import { theme } from "../../../Defaults";
import { Grid } from "@material-ui/core";
import Card from "../../Card";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { Scheduler, DayView, Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import PropTypes from "prop-types";
/**
 * Schedule component for the landing page
 */
function Schedule() {
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
    
    const schedule = [{
        "date": "2021-04-17",
        "events": [
            { startDate: "2021-04-17T10:00", endDate: "2021-04-17T11:00", title: "Check-in" },
            { startDate: "2021-04-17T11:30", endDate: "2021-04-17T13:00", title: "Opening Ceremony" },
            { startDate: "2021-04-17T13:00", endDate: "2021-04-18T12:59", title: "Hacking"},
            { startDate: "2021-04-17T16:00", endDate: "2021-04-17T16:45", title: "Blueprint Presents: Introduction to Flutter"},
            { startDate: "2021-04-17T17:00", endDate: "2021-04-17T18:00", title: "Rutgers QFC Presents: Dimensionality Reduction and Manifold Learning"},
            { startDate: "2021-04-17T19:30", endDate: "2021-04-17T20:00", title: "WICS Live Panel: Join us for a Q&A panel with WICS (Women in Computer Science)"},
            { startDate: "2021-04-17T20:15", endDate: "2021-04-17T21:15", title: "HackRU CTF"},
            { startDate: "2021-04-17T22:00", endDate: "2021-04-17T22:45", title: "RU COGS Presents: Game Dev 101"},
        ]
    }, {
        "date": "2021-04-18",
        "events": [
            { startDate: "2021-04-17T13:00", endDate: "2021-04-18T12:59", title: "Hacking"},
            { startDate: "2021-04-18T13:00", endDate: "2021-04-18T15:00", title: "Judging"},
            { startDate: "2021-04-18T15:30", endDate: "2021-04-18T16:00", title: "Closing Ceremony"},
        ]
    }];
    return (
        <Card backgroundColor={"white"}
            sideBar={theme.primary[1]}>
            <h1 style={{color: "black"}}
                className="display-4 theme-font">Schedule</h1>
            <div className="row mb-3"
                style={{ marginLeft: -50, marginRight: -50, paddingLeft: 25 }}>
                <Grid container
                    spacing={3}>
                    {schedule.map((item) => 
                        <Grid item
                            key={item["date"]}
                            md={6}
                            xs={12}>
                            <Scheduler
                                data={item["events"]}>
                                <ViewState
                                    currentDate={item["date"]}
                                />
                                <DayView
                                    startDayHour={9}
                                    endDayHour={23}
                                />
                                <Appointments
                                    appointmentComponent={Appointment}
                                />
                            </Scheduler>
                        </Grid>
                    )}
                </Grid>
            </div>
        </Card>
    );
}

Schedule.propTypes = {
    children: PropTypes.object,
    style: PropTypes.object,
};
export default Schedule;