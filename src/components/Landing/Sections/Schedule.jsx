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
        "date": "2021-10-16",
        "events": [
            { startDate: "2021-10-16T10:00", endDate: "2021-10-16T11:30", title: "Check-in" },
            { startDate: "2021-10-16T11:30", endDate: "2021-10-16T13:00", title: "Opening Ceremony" },
            { startDate: "2021-10-16T13:00", endDate: "2021-10-17T12:00", title: "Hacking"},
            { startDate: "2021-10-16T15:00", endDate: "2021-10-16T15:30", title: "MLH CTF"},
            { startDate: "2021-10-16T15:30", endDate: "2021-10-16T16:30", title: "MLH Mini-Event"},
            { startDate: "2021-10-16T17:00", endDate: "2021-10-16T18:00", title: "WiCS Kahoot + Discussion"},
            { startDate: "2021-10-16T18:30", endDate: "2021-10-16T19:30", title: "RnD Workshop"},
            { startDate: "2021-10-16T19:30", endDate: "2021-10-16T20:30", title: "Blueprint Workshop"},
        ]
    }, {
        "date": "2021-10-17",
        "events": [
            { startDate: "2021-10-17T10:00", endDate: "2021-10-17T10:00", title: "Submission Reminder"},
            { startDate: "2021-10-16T13:00", endDate: "2021-10-17T12:00", title: "Hacking"},
            { startDate: "2021-10-17T13:00", endDate: "2021-10-17T15:00", title: "Judging"},
            { startDate: "2021-10-17T15:30", endDate: "2021-10-17T16:00", title: "Closing Ceremony"},
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