import React, { Component } from "react";
import request from "request";
import { ENDPOINTS } from "../Profile";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
class Schedule extends Component {
    componentWillMount() {
        this.localizer = BigCalendar.momentLocalizer(moment);
        this.setState({
            events: []
        }, () => {            
            request({
                uri: ENDPOINTS.schedule,
                method: "GET",
                json: true
            }, (error, response, body) => {
                if (error) {
                    
                } else {
                    if (body.statusCode === 200) {
                        let events = [];
                        console.log(body.body);
                        for (let i = 0; i < body.body.length; i++) {
                            events.push({
                                id: i,
                                title: body.body[i].summary,
                                start: new Date(body.body[i].start.dateTime),
                                end: new Date(body.body[i].end.dateTime)
                            });
                        }
                        events = [
                            {
                                id: 14,
                                title: 'Today',
                                start: new Date(new Date().setHours(new Date().getHours() - 3)),
                                end: new Date(new Date().setHours(new Date().getHours() + 3)),
                            }
                        ]
                        console.log(events);
                        this.setState({
                            events: events
                        });
                    } else {
                        
                    }
                }
            });
        });
    }
    render() {
        console.log(this.state.events);
        return (
            <div style={{ marginBottom: 10 }}>
                <div style={{ width: "100%", textAlign: "left" }}>
                    <p className="lead">Schedule</p>
                    <div style={{ height: "1200px" }}>
                    { this.state.events.length > 0 && 
                        <BigCalendar
                            localizer={this.localizer}
                            events={this.state.events}
                            startAccessor="startDate"
                            endAccessor="endDate"
                            defaultView="day"
                    selectable /> }
                    </div>
                </div>
            </div>
        )
    }
}
export default Schedule;