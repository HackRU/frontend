
import React, { Component } from "react";
import { Container, Row, Col} from "reactstrap";
import FaqsCollapse from './FaqsCollapse';

/**
 * FAQs component for the landing page
 */


const FAQTextOne = {
    one: {
      title: 'What is HackRU?',
      text: [<p key={1}>HackRU is a 24-hour hackathon at Rutgers University. We welcome hundreds of students to join us in building awesome software and hardware projects. Industry experts and mentors come from all over the country to create an environment that fosters an atmosphere of learning through tech talks and one-on-one guidance. We encourage beginner and advanced hackers alike to challenge themselves and expand their skills.</p>]
    },
    two: {
        title: 'What should I bring?',
        text: 'Yourself, your ingenuity, hacking gear (laptop, laptop charger, monitor, hardware), photo ID, toiletries, sleeping gear, a change of clothes'
    },
    three: {
        title: 'What is the application process like?',
        text: 'HackRU will run registration on a first-come-first-serve basis for those with qualifying applications. That means registration can fill up quickly, so make sure to register early and answer questions thoroughly!'
    },
    four: {
        title: 'Travel Reimbursements?',
        text: 'HackRU is considering offering reimbursements on a first come first serve basis to students who do not attend Rutgers University - New Brunswick. Please note that putting down where you are traveling from does not guarantee you any travel reimbursement for Spring HackRU 2019. If you are accepted, you will be notified if you qualify for reimbursement based on region and availability. We would only be able to reimburse up to $59 per person and we do not support international travel needs such as visa sponsorship.'
    },
    five: {
        title: 'Can I win anything?',
        text: 'Yes! We\'ll release more information about prizes as the event draws near.'
    },
    six: {
        title: 'I have more questions!',
        text: [<span key={1}>Reach out to us at <a href="mailto:info@hackru.org"> info@hackru.org!</a> We'll be happy to answer.</span>]
    }

}

const FAQTextTwo = {
    one: {
      title: 'Who can come?',
      text: 'HackRU welcomes undergraduate and graduate students of all majors, backgrounds, and skill levels to come create. Unfortunately, if you are not a Rutgers student and you are under 18, you will not be able to attend. High school students who will be 18 by HackRU are allowed to register.'
    },
    two: {
        title: 'I\'m new, What should I do?',
        text: 'That\'s great! We\'d love to have you at HackRU. Throughout the weekend there will be workshops for you to get your feet wet, project ideas for you to try out, and mentors to guide you through the process.'
    },
    three: {
        title: 'How much does it cost to attend?',
        text: 'Like the best things in life, HackRU is completely free to attend! We will be providing meals, snacks, and drinks for the entire event along with swag on swag on swag.'
    },
    four: {
        title: 'Can I work with others?',
        text: 'Hackers can (and are encouraged to) work in teams of up to 4 humans max. The knowledge you gain from teammates is invaluable, along with the opportunity to build lifetime friendships - you might leave with a new best friend! We will be having a team-building exercise after opening ceremonies for people who are looking for teammates.'
    },
    five: {
        title: 'What shouldn\'t I bring?',
        text: 'Weapons (or anything that can be construed as a weapon), alcohol, illegal drugs, and/or animals. Use your common sense - if you wouldn\'t bring it on a plane or to school, don\'t bring it here.'
    },
    six: {
        title: 'Do you have any hardware?',
        text: 'Hardware will be provided by the MLH Hardware labs and a full list of available hardware will be released during the week of the event.'
    }
}

class FAQs extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }
    
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }


    render() {
        let cols = (this.props.isMobile) ? (12) : (6);
        return (
            <div>
                <h1 className="display-4 theme-font">FAQs</h1>
                <hr />
                <Container fluid>
                    <Row>
                        <Col xs={cols}>
                            {Object.keys(FAQTextOne).map((key, index) =>
                                <FaqsCollapse key={index + "1"} cat={FAQTextOne[key]} />
                            )}
                        </Col>
                        <Col xs={cols}>
                            {Object.keys(FAQTextTwo).map((key, index) =>
                                <FaqsCollapse key={index + "2"} cat={FAQTextTwo[key]} />
                            )}                 
                      </Col>
                    </Row>
                </Container>
                
            </div>
        )
    }
}
/*****************************************************************FAQS****************************************************************/

/***************************************************************EXPORTS***************************************************************/
export default FAQs;
/***************************************************************EXPORTS***************************************************************/