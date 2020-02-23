import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import ApplicationStatus from "./ApplicationStatus";
import Section from "./Section";
import Loading from "./Loading";
import ProfileMessage from "./ProfileMessage";
import AdminControl from "./AdminControl";
import QR from "./QR";
import TravelReimbursementsForm from "./Forms/TravelReimbursementsForm";
import UserProfileForm from "./Forms/UserProfileForm/UserProfileForm";
import { ProfileType } from "../Profile";
import PropTypes from "prop-types";
import { theme } from "../../Defaults";

class Dashboard extends Component {
    state = {
        loading: "Loading your personal dashboard...",
        user: null,
        openDetails: false,
        profileMSG: null,
        qr: null
    }
    UNSAFE_componentWillMount() {
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
            loading: "Saving your information",
            profileMSG: null,
            user,
        }, () => {
            this.props.profile.Set(this.state.user, (err) => {
                this.setState({
                    loading: false,
                    profileMSG: err ?
                        { color: "danger", value: err } :
                        { color: "success", value: "Profile Updated!" }
                });
            });
        });
    }
    render() {
        // Authorized personal only!
        if (!this.props.profile.isLoggedIn) {
            return (<Redirect to="/login"/>);
        }
        if (this.state.loading) {
            return (<Loading text={this.state.loading} />);
        }
        let user = this.state.user;
        user.phone_number = user.phone_number || "";
        user.ethnicity = user.ethnicity || "";
        user.how_you_heard_about_hackru = user.how_you_heard_about_hackru || "";
        user.reasons = user.reasons || "";
        let mobile = this.props.isMobile;
        let rolesString = "";
        Object.keys(user.role).forEach((key) => { if (user.role[key]) { rolesString += `${key}, `; }});
        rolesString = rolesString.substring(0, rolesString.length - 2);
        return (
            <Container style={{ width: "100%", minHeight: "100vh", paddingTop: 90 }}>
                <ProfileMessage message={this.state.profileMSG} />
                <Row>
                    <Col className="dashboard-row"
                        lg={12} >
                        <div className="dashboard-card">
                            <div className="dashboard-left-strip dashboard-strip-red"></div>
                            <h1 className="display-3"
                                style={{ textAlign: "center", color: theme.secondary[0], textTransform: "capitalize" }}>Welcome, {user.first_name}</h1>
                            <p style={{ textAlign: "center", color: theme.secondary[0], textTransform: "capitalize" }}>{rolesString}</p>
                            {/* <div style={{ position: "relative", top: 20 }}>
                                <Logo repeat={false}
                                    color={theme.secondary[1]}
                                    noCircle
                                    src="./assets/icons/hru-text-dyn.svg" />
                            </div> */}
                        </div>
                    </Col>
                </Row>
                <Row>
                    {(user.registration_status === "confirmed" || user.registration_status === "waitlist" || user.registration_status === "coming" || user.registration_status === "registered" || (user.role && user.role.director) || (user.role && user.role.organizer) || (user.role && user.role.volunteer)) &&
                        <Col className="dashboard-row"
                            xl={4}
                            lg={4}
                            md={12}
                            sm={12}
                            xs={12}>
                            <div className="dashboard-card"
                                style={{ textAlign: "center", paddingBottom: 0 }}>
                                <div className="dashboard-left-strip dashboard-strip-green"></div>
                                <h1 className="display-4 dashboard-header dashboard-strip-green">QR</h1>
                                <div className="d-flex align-items-center"
                                    style={{ height: "60%", textAlign: "center" }}>
                                    <div style={{ marginTop: 50, textAlign: "center", width: "100%", color: theme.secondary[0] }}>
                                        <p>Please have this QR avaliable when you check in at HackRU.</p>
                                        <QR email={user.email} />
                                    </div>
                                </div>
                            </div>
                        </Col>}
                    <Col className="dashboard-row">
                        <div className="dashboard-card">
                            <div className="dashboard-left-strip dashboard-strip-yellow"></div>
                            <h1 className="display-4 dashboard-header dashboard-strip-yellow">Application Status</h1>
                            <div className="d-flex align-items-center"
                                style={{ height: "60%", textAlign: "center" }}>
                                <div style={{ marginTop: 0, textAlign: "center", width: "100%" }}>
                                    <ApplicationStatus onComing={() => {
                                        user.registration_status = "coming";
                                        this.submitUser(user);
                                    }}
                                    onNotComing={() => {
                                        user.registration_status = "not-coming";
                                        this.submitUser(user);
                                    }}
                                    travelling_from={user.travelling_from}
                                    status={user.registration_status} />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Section title="Profile: Basics"
                        subtitle="Introduce yourself, don't be shy!"
                        isOpen={this.state.openDetails}>
                        <UserProfileForm mobile={mobile}
                            user={user}
                            onChange={(user) => {
                                this.setState({ user: user });
                            }}
                            onSubmit={(user) => {
                                user.registration_status = "registered";
                                console.log(user.want_bus);
                                this.submitUser(user);
                            }}
                            profile={this.props.profile}
                        />
                    </Section>
                </Row>
                <Row>
                    <Section
                        title="Travel Reimbursements"
                        subtitle="Let us know where you're coming from!">
                        <TravelReimbursementsForm mobile={mobile}
                            travelling_from={user.travelling_from}
                            onSubmit={(travel) => {
                                user.travelling_from = travel;
                                this.submitUser(user);
                            }} />
                    </Section>
                </Row>
                <Row>
                    {(user.role && user.role.director) &&
                        <AdminControl profile={this.props.profile}
                            user={user} />}
                </Row>
            </Container>
        );
    }
}

Dashboard.propTypes = {
    clearMagic: PropTypes.func,
    isMobile: PropTypes.bool,
    magic: PropTypes.string,
    profile: ProfileType,
};

export default Dashboard;
