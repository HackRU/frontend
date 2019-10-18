import React, { Component } from "react";
import request from "request";
import { ENDPOINTS } from "../Profile";
import { ListGroup, ListGroupItem, ListGroupItemText, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { SyncLoader } from "react-spinners";
import PropTypes from "prop-types";

const light_red = {
    backgroundColor: "#bf4d4d",
    border: "none !important"
};

const dark_red = {
    backgroundColor: "#ad4444",
    border: "none !important"
};

class Schedule extends Component {
    componentWillMount() {
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
                            id: i,
                            title: body.body[i].summary,
                            start: new Date(body.body[i].start.dateTime),
                            end: new Date(body.body[i].end.dateTime)
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
        let events = [];
        let end = this.state.start + ((!this.props.hide) ? (10) : (5));
        if (end > this.state.events.length) {
            end = this.state.events.length;
        }
        if (this.state.events.length === 0) {
            events.push(
                <div style={{ width: "100%", textAlign: "center" }}
                    align="center"
                    className="align-items-center"
                    key={0}>
                    <SyncLoader color="rgba(255, 255, 255, 0.25)" />
                </div>);
        } else {
            for (let i = this.state.start; i < end; i++) {
                let text = this.state.events[i].title;
                let startTime = this.state.events[i].start.toLocaleString();
                let endTime = this.state.events[i].end.toLocaleString();
                let style = {};
                if (this.props.hide) {
                    style = { fontSize: 30 };
                }
                events.push(
                    <ListGroupItem
                        className="rounded shadow-lg"
                        key={i}
                        style={ i % 2 === 0 ? dark_red : light_red}>
                        <ListGroupItemText className="pull-right live-messages-text">
                            {startTime} - {endTime}
                        </ListGroupItemText>
                        <ListGroupItemText className="live-messages-text"
                            style={style}>{text}</ListGroupItemText>
                    </ListGroupItem>
                );
            }
        }
        return (
            <div style={{ marginBottom: 10 }}>
                <div style={{ width: "100%", textAlign: "left" }}>
                    { !this.props.hide &&
                        <h3>Schedule</h3>}
                    <ListGroup className="live-container"
                        flush>
                        {events}
                        { !this.props.hide &&
                                    <div style={{ width: "100%", textAlign: "right" }}>
                                        <Pagination className="live-page-container pull-right">
                                            <PaginationItem>
                                                <PaginationLink className="live-page-btn"
                                                    previous
                                                    onClick={() => {
                                                        this.setState({
                                                            start: (this.state.start - 10 >= 0) ? (this.state.start - 10) : (0)
                                                        });
                                                    }} />
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink className="live-page-btn"
                                                    next
                                                    onClick={() => {
                                                        this.setState({
                                                            start: (this.state.start + 10 <= this.state.events.length - 10) ? (this.state.start + 10) : (this.state.events.length - 10)
                                                        });
                                                    }} />
                                            </PaginationItem>
                                        </Pagination>
                                        <div className="live-page-text">
                                                    Viewing {this.state.start} - {end}
                                        </div>
                                    </div>}
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
