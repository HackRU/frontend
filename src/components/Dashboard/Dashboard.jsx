import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { theme } from "../../Defaults";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import ApplicationStatus from './ApplicationStatus';
import Section from './Section';
import Loading from './Loading';
import ProfileMessage from './ProfileMessage';
import TravelReimbursementsForm from './Forms/TravelReimbursementsForm';
import UserProfileForm from "./Forms/UserProfileForm/UserProfileForm";

class Dashboard extends Component {
    state = {
        loading: "Loading your personal dashboard...",
        user: null,
        openDetails: false,
        profileMSG: null
    }
    componentWillMount() {
        if (this.props.magic) {
            this.props.profile.Eat(this.props.magic, (msg) => {
                if (msg) {
                    console.error(msg);
                    this.setState({
                        profileMSG: { color: "warning", value: msg }
                    });
                } else {
                    this.setState({
                        profileMSG: { color: "info", value: "Magic link applied!" }
                    });
                }
                this.props.clearMagic();
            });
        }
        this.props.profile.Get((msg, data) => {
            if (msg) {
                console.error(msg);
            } else {
                if (data) {
                    delete data.auth;
                    delete data.role;
                    delete data.day_of;
                    this.setState({
                        user: data,
                        loading: false,
                        openDetails: (data.registration_status === "unregistered")
                    });
                }
            }
        });
    }
    submitUser = (user) => {
        this.setState({
            loading: 'Saving your information',
            profileMSG: null,
            user,
        }, () => {
            this.props.profile.Set(this.state.user, (err) => {
                this.setState({
                    loading: false,
                    profileMSG: err ?
                        { color: "danger", value: err } :
                        { color: "success", value: 'Profile Updated!' }
                })
            });
        });
    }
    render() {
        // Authorized personal only!
        if (!this.props.profile.isLoggedIn) {
            return (<Redirect to="/login"/>);
        }
        if (this.state.loading) {
            return (<Loading text={this.state.loading} />)
        }
        let user = this.state.user;
        user.phone_number = user.phone_number || "";
        user.ethnicity = user.ethnicity || "";
        user.how_you_heard_about_hackru = user.how_you_heard_about_hackru || "";
        let mobile = this.props.isMobile;
        return (
            <Container fluid style={{ width: "100%", minHeight: "100vh", textAlign: "center", backgroundColor: theme.secondary[1] }} className="d-flex align-items-center">
                <div style={{ zIndex: 3, color: "white", width: "100%" }} align="center">
                    <Container>
                        <div style={{ width: "100%", textAlign: "left", marginBottom: 0, paddingTop: 35 }}>
                            <Row>
                                <Col md={9} xs={12}>
                                    <h1 className="display-4 theme-font">Welcome, {user.first_name}</h1>
                                    <div style={{ display: "inline-block", marginRight: 20 }}>
                                        <p className="lead">
                                            <Link to="/" className="theme-home-link" style={{ color: theme.primary[0] + "ff", textDecoration: "none" }}>
                                                Home
                                            </Link>
                                        </p>
                                    </div>
                                    <div style={{ display: "inline-block", marginRight: 20 }}>
                                        <p className="lead">
                                            <Link to="/live" className="theme-home-link" style={{ color: theme.primary[0] + "ff", textDecoration: "none" }}>
                                                Live
                                            </Link>
                                        </p>
                                    </div>
                                    <div style={{ display: "inline-block", marginRight: 20 }}><p className="lead"><Link to="/logout" className="theme-home-link" style={{ color: theme.accent[0] + "ff", textDecoration: "none" }}>Logout</Link></p></div>
                                </Col>
                                <Col style={{ textAlign: "center" }} md={3} xs={12}>
                                    <img width="250"  style={{ marginTop: 0 }} alt="logo" src="./assets/icons/hru-logo-green.svg" />
                                </Col>
                            </Row>
                        </div>

                        <ApplicationStatus
                            onComing={() => {
                                user.registration_status = 'coming'
                                this.submitUser(user)
                            }}
                            onNotComing={() => {
                                user.registration_status = 'not-coming'
                                this.submitUser(user)
                            }}
                            reimbursement={user.travelling_from && user.travelling_from.reimbursement}
                            status={user.registration_status}
                        />

                        <div style={{ width: "100%", textAlign: "left" }}>
                            <p className="lead">User Profile</p>
                        </div>
                        <ProfileMessage message={this.state.profileMSG} />
                        <Section title="Basics" subtitle="Introduce yourself, don't be shy!" isOpen={this.state.openDetails} >
                            <UserProfileForm mobile={mobile} user={user} onChange={(user) => {
                                this.setState({ user: user });
                            }} onSubmit={(user) => {
                                user.registration_status = "registered";
                                this.submitUser(user)
                            }} />
                        </Section>

                        <Section className="mb-5" title="Travel Reimbursements" subtitle="Let us know where you're coming from!">
                            <TravelReimbursementsForm mobile={mobile} travelling_from={user.travelling_from} onSubmit={(travel) => {
                                    user.travelling_from = travel;
                                    this.submitUser(user)
                                }} />
                        </Section>
                    </Container>
                </div>
            </Container>
        );
    }
}
export default Dashboard;
