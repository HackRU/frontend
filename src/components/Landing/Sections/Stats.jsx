import React, { Component } from "react";
import { Row, Col } from 'reactstrap';

class Stat extends Component {
          render() {
                  return (
                                 <div>
                                                <h1 className="display-2"> {this.props.number} </h1>             
                                                <h1> {this.props.text} </h1>
                                 </div>
                  );

          }
}

class Stats extends Component {
          render() {
                           return (
                                          <div>
                                          <h1 className="display-4 theme-font">The Numbers</h1>
                      <hr />
                                          <Row className="d-flex align-items-center" style={{ textAlign: "center"}}> 
                                                        <Col> <Stat text="Hackers" number="600+"/> </Col>
                                                        <Col> <Stat text="In Prizes" number="$14,000+"/> </Col>
                                                        <Col> <Stat text="Projects" number="50+"/> </Col>
                                          </Row>
                                          <hr />
                                          </div>
                           )      
          }
}

export default Stats;