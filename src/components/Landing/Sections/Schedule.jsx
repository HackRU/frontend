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
        "date": "2020-11-07",
        "events": [
            { startDate: "2020-11-07T10:00", endDate: "2020-11-07T11:00", title: "Check-in" },
            { startDate: "2020-11-07T11:30", endDate: "2020-11-07T13:00", title: "Opening Ceremony" },
            { startDate: "2020-11-07T13:00", endDate: "2020-11-08T12:30", title: "Hacking"},
            { startDate: "2020-11-07T15:00", endDate: "2020-11-07T15:20", title: "Blueprint Workshop"},
            { startDate: "2020-11-07T15:30", endDate: "2020-11-07T16:30", title: "MLH CTF"},
            { startDate: "2020-11-07T16:30", endDate: "2020-11-07T17:30", title: "RUMAD Workshop"},
            { startDate: "2020-11-07T18:00", endDate: "2020-11-07T19:00", title: "MLH Bob Ross"},
            { startDate: "2020-11-07T19:00", endDate: "2020-11-07T20:00", title: "WICS Live Panel"},
            { startDate: "2020-11-07T20:00", endDate: "2020-11-07T21:00", title: "Cog Sci Workshop"}
        ]
    }, {
        "date": "2020-11-08",
        "events": [
            { startDate: "2020-11-07T13:00", endDate: "2020-11-08T12:30", title: "Hacking"},
            { startDate: "2020-11-08T13:30", endDate: "2020-11-08T15:00", title: "Judging"},
            { startDate: "2020-11-08T15:00", endDate: "2020-11-08T16:00", title: "Presentations"},
            { startDate: "2020-11-08T16:00", endDate: "2020-11-08T17:00", title: "Closing Ceremony"},
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
                                    endDayHour={22}
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