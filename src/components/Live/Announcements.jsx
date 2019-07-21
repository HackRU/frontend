import React, { Component } from "react";
import request from "request";
import { ListGroup, ListGroupItem, ListGroupItemText, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { ENDPOINTS } from "../Profile";
import { SyncLoader } from "react-spinners";
import PropTypes from "prop-types";

class Announcements extends Component {
    refresh = () => (
        this.setState({
            start: 0
        }, () => {
            request({
                uri: ENDPOINTS.slack,
                method: "GET",
                json: true
            }, (error, response, body) => {
                if (body.statusCode === 200) {
                    this.setState({
                        messages: body.body
                    });
                }
            });
        })
    )

    componentWillMount() {
        this.setState({ messages: [] });
        this.refresh();
        setInterval(this.refresh, 30000);
    }

    render() {
        let msgs = [];
        let end = this.state.start + 3;
        if (end > this.state.messages.length) {
            end = this.state.messages.length;
        }
        for (let i = this.state.start; i < end; i++) {
            let text = this.state.messages[i].text && this.state.messages[i].text.replace(/(:[^:\s]*:)|(<[^>\s]*>)/g, "").trim();
            let date = new Date(this.state.messages[i].ts * 1000).toLocaleDateString();
            let time = new Date(this.state.messages[i].ts * 1000).toLocaleTimeString();
            let opacity = 100;
            let style = {};
            if (this.props.hide) {
                style = { fontSize: 30 };
            }
            msgs.push(
                <ListGroupItem action
                    className="live-messages"
                    key={i}
                    style={{ opacity: opacity }}>
                    <ListGroupItemText className="pull-right">{date}, {time}</ListGroupItemText>
                    <ListGroupItemText className="live-messages-text"
                        style={style}>{text}</ListGroupItemText>
                </ListGroupItem>
            );
        }
        if (msgs.length === 0) {
            msgs.push(
                <div style={{ width: "100%", textAlign: "center" }}
                    align="center"
                    className="align-items-center"
                    key={0}>
                    <SyncLoader color="rgba(255, 255, 255, 0.25)" />
                </div>);
        }
        
        return (
            <div style={{ marginBottom: 10 }}>
                <div style={{ width: "100%", textAlign: "left" }}>
                    { !this.props.hide &&
                    <h3 className="mb-3">Announcements</h3> }
                    <ListGroup className="live-container"
                        flush>
                        {msgs}
                        { !this.props.hide &&
                        <div style={{ width: "100%", textAlign: "right" }}>
                            <Pagination className="live-page-container pull-right">
                                <PaginationItem>
                                    <PaginationLink className="live-page-btn"
                                        previous
                                        onClick={() => {
                                            this.setState({
                                                start: (this.state.start - 3 >= 0) ? (this.state.start - 3) : (0)
                                            });
                                        }} />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink className="live-page-btn"
                                        next
                                        onClick={() => {
                                            this.setState({
                                                start: (this.state.start + 3 <= this.state.messages.length - 2) ? (this.state.start + 3) : (this.state.messages.length - 2)
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

Announcements.propTypes = {
    hide: PropTypes.bool,
};

export default Announcements;
