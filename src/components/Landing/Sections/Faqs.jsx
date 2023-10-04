import React, { Component } from "react";
import { Container, Grid } from "@material-ui/core";
import { theme } from "../../../Defaults";
import FaqsCollapse from "./FaqsCollapse";
import PropTypes from "prop-types";
import Card from "../../Card";

/**
 * FAQs component for the landing page
 */

const FAQTextOne = {
    one: {
        title: "What is HackRU?",
        text: [
            <p key={1}>
                HackRU is a 24-hour hackathon at Rutgers University. We welcome
                hundreds of students to join us in building awesome software and
                hardware projects. Industry experts and mentors come from all
                over the country to create an environment that fosters an
                atmosphere of learning through tech talks and one-on-one
                guidance. We encourage beginner and advanced hackers alike to
                challenge themselves and expand their skills.
            </p>,
        ],
    },
    //two: {
    //title: "What should I bring?",
    //text: "Yourself, your ingenuity, hacking gear (laptop, laptop charger, monitor, hardware), photo ID, toiletries, sleeping gear, a change of clothes"
    //},
    three: {
        title: "What is the application process like?",
        text:
            "HackRU will be back in person this Fall! We will be accepting anywhere between 300-500 hackers based on when you register for the event. After you register, you'll get a notification 1-2 weeks before the hackathon whether we have accepted you or not to the hackathon. You then will have to let us know if you plan on coming or not and then you're all set!",
    },
    // four: {
    //     title: "Are there travel reimbursements?",
    //     text: [<p key={1}>HackRU is considering offering travel reimbursements to qualified students who do not attend Rutgers University—New Brunswick. Information about travel reimbursements is available on the application and your dashboard. Reach out to <a href="mailto:travel@hackru.org">travel@hackru.org</a> if you have any additional questions.</p>]
    // },
    five: {
        title: "Can I win anything?",
        text:
            "Yes! We'll release more information about prizes as the event draws near.",
    },
    six: {
        title: "Will there be a mask mandate?",
        text: "No, HackRU will not have a mask mandate but it is encouraged throughout the duration of the event."
    },
    seven: {
        title: "I have more questions!",
        text: [
            <span key={1}>
                Reach out to us at{" "}
                <a href="mailto:info@hackru.org"> info@hackru.org!</a> We'll be
                happy to answer.
            </span>,
        ],
    },
};

const FAQTextTwo = {
    one: {
        title: "Who can come?",
        text: [
            <p key={1}>
                HackRU welcomes undergraduate and graduate students of all
                majors, backgrounds, and skill levels to come create.
                Additionally, high school students who will be 18 by HackRU are
                allowed to register.{" "}
                <i>
                    Unfortunately, if you are under 18, you will not be able to
                    attend.
                </i>
            </p>,
        ],
    },
    two: {
        title: "I'm new. What should I do?",
        text:
            "That's great! We'd love to have you at HackRU. Throughout the weekend there will be workshops for you to get your feet wet, project ideas for you to try out, and mentors to guide you through the process.",
    },
    three: {
        title: "How much does it cost to attend?",
        text:
            "Like the best things in life, HackRU is completely free to attend!",
    },
    four: {
        title: "Can I work with others?",
        text:
            "Hackers can (and are encouraged to) work in teams of up to 4 humans max. The knowledge you gain from teammates is invaluable, along with the opportunity to build lifetime friendships - you might leave with a new best friend! We will be having a team-building exercise after opening ceremonies for people who are looking for teammates.",
    },
    //five: {
    //title: "What shouldn't I bring?",
    //text:
    //"Weapons (or anything that can be construed as a weapon), alcohol, illegal drugs, and/or animals. Use your common sense - if you wouldn't bring it on a plane or to school, don't bring it here.",
    //},
    // six: {
    //     title: "Do you have any hardware?",
    //     text: "Hardware will be provided by the MLH Hardware labs and a full list of available hardware will be released during the week of the event."
    // }
};

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
        // let cols = (this.props.isMobile) ? (12) : (6);
        return (
            <Card
                backgroundColor={theme.secondary[1]}
                sideBar={theme.primary[1]}
                style={{ marginTop: 25 }}
            >
                <div
                    style={{
                        position: "absolute",
                        left: "calc(15px)",
                        top: 0,
                        height: "calc(100%)",
                        backgroundColor: theme.accent[1],
                        width: 10,
                    }}
                ></div>
                <h1
                    style={{ marginBottom: 25 }}
                    className="display-4 theme-font"
                >
                    FAQs
                </h1>
                <Container fluid
                    maxWidth={false}>
                    <Grid container
                        spacing={3}>
                        <Grid item
                            xs>
                            {Object.keys(FAQTextOne).map((key, index) => (
                                <FaqsCollapse
                                    key={index + "1"}
                                    cat={FAQTextOne[key]}
                                />
                            ))}
                        </Grid>
                        <Grid item
                            xs>
                            {Object.keys(FAQTextTwo).map((key, index) => (
                                <FaqsCollapse
                                    key={index + "2"}
                                    cat={FAQTextTwo[key]}
                                />
                            ))}
                        </Grid>
                    </Grid>
                </Container>
            </Card>
        );
    }
}

FAQs.propTypes = {
    isMobile: PropTypes.bool,
};

export default FAQs;
