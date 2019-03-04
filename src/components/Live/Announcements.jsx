import React, { Component } from "react";
import request from "request";
import { ListGroup, ListGroupItem } from "reactstrap";
import { ENDPOINTS } from "../Profile";
class Announcements extends Component {
    componentWillMount() {
        this.setState({
            messages: []
        }, () => {            
            request({
                uri: ENDPOINTS.slack,
                method: "GET",
                json: true
            }, (error, response, body) => {
                if (error) {
                    
                } else {
                    if (body.statusCode === 200) {
                        console.log(body.body);
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
        for (let i = 0; i < this.state.messages.length; i++) {
            msgs.push(
                <ListGroupItem key={i} style={{ color: "black" }}>
                    {this.state.messages[i].text}
                </ListGroupItem>
            )
        }
        return (
            <div style={{ marginBottom: 10 }}>
                <div style={{ width: "100%", textAlign: "left" }}>
                    <p className="lead">Announcements</p>
                    <ListGroup>
                        {msgs}
                    </ListGroup>
                </div>
            </div>
        );
    }
}
export default Announcements;