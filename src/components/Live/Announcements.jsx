import React, { Component } from "react";
import request from "request";
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { ENDPOINTS } from "../Profile";
import { SyncLoader } from "react-spinners";
class Announcements extends Component {
    componentWillMount() {
        this.setState({
            messages: [],
            start: 0
        }, () => {            
            request({
                uri: ENDPOINTS.slack,
                method: "GET",
                json: true
            }, (error, response, body) => {
                if (error) {
                    
                } else {
                    if (body.statusCode === 200) {
                        this.setState({
                            messages: body.body
                        });
                    } else {
                        
                    }
                }
            });
        });
    }
    render() {
        let msgs = [];
        let end = this.state.start + 5;
        if (end > this.state.messages.length) {
            end = this.state.messages.length;
        }
        let num = 0;
        for (let i = this.state.start; i < end; i++) {
            num++;
            let text = this.state.messages[i].text && this.state.messages[i].text.replace(/(:[^:\s]*:)|(<[^>\s]*>)/g, '').trim();
            let date = new Date(this.state.messages[i].ts * 1000).toLocaleDateString();
            let time = new Date(this.state.messages[i].ts * 1000).toLocaleTimeString();
            let opacity = ((5 - (num)) / 5.0) + 0.05;
            msgs.push(
                <ListGroupItem action className="live-slack-messages" key={i} style={{ opacity: opacity }}>
                    <ListGroupItemText className="pull-right">{date}, {time}</ListGroupItemText>
                    <ListGroupItemText className="live-slack-messages-text">{text}</ListGroupItemText>
                </ListGroupItem>
            );
        }
        if (msgs.length === 0) {
            msgs.push(
                <div style={{ width: "100%", textAlign: "center" }} align="center" className="align-items-center">
                    <SyncLoader color="rgba(255, 255, 255, 0.25)" />
                </div>)
        }
        return (
            <div style={{ marginBottom: 10 }}>
                <div style={{ width: "100%", textAlign: "left" }}>
                    <p className="lead">Announcements</p>
                    <ListGroup className="live-slack-container" flush>
                        <div style={{ width: "100%", textAlign: "right" }}>
                            <Pagination className="pull-right" style={{ display: "relative", right: 0 }}>
                                <PaginationItem>
                                    <PaginationLink className="live-slack-page-btn" previous href="#" onClick={(e) => {
                                        this.setState({
                                            start: (this.state.start - 3 >= 0) ? (this.state.start - 3) : (0)
                                        });
                                    }} />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink className="live-slack-page-btn" next href="#" onClick={(e) => {
                                        this.setState({
                                            start: (this.state.start + 3 <= this.state.messages.length - 2) ? (this.state.start + 3) : (this.state.messages.length - 2)
                                        });
                                    }} />
                                </PaginationItem>
                            </Pagination>
                        </div>
                        {msgs}
                    </ListGroup>
                </div>
            </div>
        );
    }
}
export default Announcements;