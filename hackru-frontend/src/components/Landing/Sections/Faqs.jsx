/**
 * @author Shivan Modha
 * @description Landing Page: FAQs Component 
 * @version 0.0.1
 * Created 12/10/18
 */
/***************************************************************IMPORTS***************************************************************/
import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { defaults, theme } from "../../../Defaults";
/***************************************************************IMPORTS***************************************************************/

/*****************************************************************FAQS****************************************************************/
/**
 * FAQs component for the landing page
 */
class FAQs extends Component {
    constructor(props) {
        super(props);
        this._event_onResize = this._event_onResize.bind(this);
        window.addEventListener("resize", this._event_onResize);
    }
    _event_onResize() {
        this.setState({
            mobile: window.innerWidth < defaults.mobileWidthThresholdRelaxed
        });
    }
    componentWillMount() {
        this._event_onResize();
    }
    render() {
        let cols = 6;
        if (this.state.mobile) {
            cols = 12;
        }
        return (
            <div>
                <h1 className="display-4 theme-font">FAQs</h1>
                <hr style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }} />
                <Container fluid>
                    <Row>
                        <Col xs={cols}>
                            <h2>What is HackRU?</h2>
                            <p className="lead">HackRU is a 24-hour hackathon at Rutgers University. We welcome hundreds of students to join us in building awesome software and hardware projects. Industry experts and mentors come from all over the country to create an environment that fosters an atmosphere of learning through tech talks and one-on-one guidance. We encourage beginner and advanced hackers alike to challenge themselves and expand their skills.</p>

                            <h2>Who Can Come?</h2>
                            <p className="lead">HackRU welcomes undergraduate and graduate students of all majors, backgrounds, and skill levels to come create. Unfortunately, if you are not a Rutgers student and you are under 18, you will not be able to attend. High school students who will be 18 by HackRU are allowed to register.</p>

                            <h2>What Should I Bring?</h2>
                            <p className="lead">Yourself, your ingenuity, hacking gear (laptop, laptop charger, monitor, hardware), photo ID, toiletries, sleeping gear, a change of clothes.</p>
                        
                            <h2>What Shouldn't I Bring?</h2>
                            <p className="lead">Weapons (or anything that can be construed as a weapon), alcohol, illegal drugs, and/or animals. Use your common sense - if you wouldn't bring it on a plane or to school, don't bring it here.</p>

                            <h2>How do I Register?</h2>
                            <p className="lead">HackRU will run registration on a first-come-first-serve basis for those with qualifying applications. Registration can fill up quickly, so make sure to register early and answer questions thoroughly!</p>
                        </Col>
                        <Col xs={cols}>
                            <h2>Any Travel Reimbursements?</h2>
                            <p className="lead">HackRU is considering offering reimbursements on a first come first serve basis to students who do not attend Rutgers University. Please note that putting down where you are traveling from does not guarantee you any travel reimbursement for Spring HackRU 2019. We will notify you if you are accepted, based on region and availability (upto $59 per person). We do not support international travel needs such as visa sponsorship.</p>

                            <h2>I'm New, What Do I Do?</h2>
                            <p className="lead">That's great! We'd love to have you at HackRU. There will be workshops for you to get started, project ideas for you to try out, and mentors to guide you through the process.</p>

                            <h2>What's the Price?</h2>
                            <p className="lead">Like the best things in life, HackRU is completely free to attend! We will be providing meals, snacks, and drinks for the entire event along with swag on swag on swag.</p>

                            <h2>Can I Work With Others?</h2>
                            <p className="lead">Hackers can (and are encouraged to) work in teams of up to 4 humans max. The knowledge you gain from teammates is invaluable, along with the opportunity to build lifetime friendships - you might leave with a new best friend! We will be having a team-building exercise after opening ceremonies for people who are looking for teammates.</p>

                            <h2>I Have More Questions!</h2>
                            <p className="lead">Reach out to us at <a style={{ color: theme.accent[0] }} href="mailto:info@hackru.org">info@hackru.org!</a> We'll be happy to answer.</p>                    
                      </Col>
                    </Row>
                </Container>
                <hr style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }} />
            </div>
        )
    }
}
/*****************************************************************FAQS****************************************************************/

/***************************************************************EXPORTS***************************************************************/
export default FAQs;
/***************************************************************EXPORTS***************************************************************/