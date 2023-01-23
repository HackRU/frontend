import { Grid } from "@material-ui/core";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { Scheduler, DayView, Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import PropTypes from "prop-types";
import React, { PropsWithChildren } from "react";

/**
 * Schedule component for the landing page
 */

function Schedule() {

    const Appointment: React.FC<PropsWithChildren<any>> = ({ children, style, ...restProps }: any) => (
        <Appointments.Appointment
            {...restProps}
            style={{
                ...style,
                backgroundColor: "#1f6aa0",
                borderRadius: 8,
            }}>
            {children}
        </Appointments.Appointment>
    );

    const schedule = [{
        "date": "2023-10-16",
        "events": [
            { startDate: "2021-10-16T10:00", endDate: "2021-10-16T11:30", title: "Check-in" },
            { startDate: "2021-10-16T11:30", endDate: "2021-10-16T13:00", title: "Opening Ceremony" },
            { startDate: "2021-10-16T13:00", endDate: "2021-10-17T12:00", title: "Hacking" },
            { startDate: "2021-10-16T15:00", endDate: "2021-10-16T15:30", title: "MLH CTF" },
            { startDate: "2021-10-16T15:30", endDate: "2021-10-16T16:30", title: "MLH Mini-Event" },
            { startDate: "2021-10-16T17:00", endDate: "2021-10-16T18:00", title: "WiCS Kahoot + Discussion" },
            { startDate: "2021-10-16T18:30", endDate: "2021-10-16T19:30", title: "RnD Workshop" },
            { startDate: "2021-10-16T19:30", endDate: "2021-10-16T20:30", title: "Blueprint Workshop" },
        ]
    }, {
        "date": "2023-10-17",
        "events": [
            { startDate: "2021-10-17T10:00", endDate: "2021-10-17T10:00", title: "Submission Reminder" },
            { startDate: "2021-10-16T13:00", endDate: "2021-10-17T12:00", title: "Hacking" },
            { startDate: "2021-10-17T13:00", endDate: "2021-10-17T15:00", title: "Judging" },
            { startDate: "2021-10-17T15:30", endDate: "2021-10-17T16:00", title: "Closing Ceremony" },
        ]
    }];
    /*const schedule = [
        {"date": "2022-04-02"},
        {"date": "2022-04-03"}
    ];*/
    return (
        <div
            id="Schedule"
            className="w-full flex h-fit
        relative overflow-hidden
        flex-col items-center justify-start min-h-[600px]">
            <div className="text-7xl text-text glow-subtitles font-semibold">Schedule</div>

            <div className="max-w-7xl rounded-3xl transparent-black-background relative flex flex-col items-center mt-10 p-10">

                <div className="row mb-3"
                    style={{ marginLeft: "5%", marginRight: "5%" }}>
                    <Grid container
                        spacing={3}>
                        {schedule.map((item) =>
                            <Grid item
                                key={item["date"]}
                                md={6}
                                xs={12}
                            >
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
            </div>
        </div>
    );
}

Schedule.propTypes = {
    children: PropTypes.object,
    style: PropTypes.object,
};
export default Schedule;