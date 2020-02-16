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
import Logo from "../Landing/Sections/Logo.jsx";
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
        let mobile = this.props.isMobile;
        let rolesString = "";
        Object.keys(user.role).forEach((key) => { if (user.role[key]) { rolesString += `${key}, `; }});
        rolesString = rolesString.substring(0, rolesString.length - 2);
        return (
            <Container style={{ width: "100%", minHeight: "100vh", paddingTop: 90 }}>
                <ProfileMessage message={this.state.profileMSG} />
                <Row>
                    <Col className="dashboard-row" lg={12} >
                        <div className="dashboard-card">
                            <div className="dashboard-left-strip dashboard-strip-red"></div>
                            <div style={{ position: "relative", top: -75, height: 200 }}>
                                <Logo repeat={false} color={theme.secondary[1]} noCircle src="./assets/icons/hru-text-dyn.svg" />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="dashboard-row" xl={8} lg={8} md={6} sm={12} xs={12}>
                        <div className="dashboard-card">
                            <div className="dashboard-left-strip dashboard-strip-yellow"></div>
                            <h1 className="display-4 dashboard-header dashboard-strip-yellow">Welcome, {user.first_name}</h1>
                            <i style={{ position: "absolute", bottom: 10, left: 40 }}>{rolesString}</i>
                            <div className="d-flex align-items-center" style={{ height: "60%", textAlign: "center" }}>
                                <div style={{ marginTop: 50, textAlign: "center", width: "100%" }}>
                                    <ApplicationStatus onComing={() => {
                                            user.registration_status = "coming";
                                            this.submitUser(user);
                                        }} onNotComing={() => {
                                            user.registration_status = "not-coming";
                                            this.submitUser(user);
                                        }} travelling_from={user.travelling_from} status={user.registration_status} />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col className="dashboard-row" xl={4} lg={4} md={6} sm={12} xs={12}>
                        <div className="dashboard-card" style={{ textAlign: "center" }}>
                            <div className="dashboard-left-strip dashboard-strip-green"></div>
                            <h1 className="display-4 dashboard-header dashboard-strip-green">QR</h1>
                            <div className="d-flex align-items-center" style={{ height: "60%", textAlign: "center" }}>
                                <div style={{ marginTop: 50, textAlign: "center", width: "100%" }}>
                                    <QR email={user.email} />
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
                        <AdminControl profile={this.props.profile} user={user} />}
                </Row>
                {/* <div style={{ zIndex: 3, color: "white", width: "100%", paddingTop: "4rem" }}
                    align="center">
                        <div style={{ width: "100%", textAlign: "left", marginBottom: 0, paddingTop: 35 }}>
                            <Row>
                                <Col md={8}
                                    xs={12}>
                                    <h1 className="display-4">Welcome, {user.first_name}</h1>
                                    <i>{rolesString}</i>
                                </Col>
                                <Col style={{ textAlign: "center" }}
                                    md={4}
                                    xs={12}>
                                    <img width="150"
                                        style={{ marginTop: 0 }}
                                        alt="logo"
                                        src="./assets/icons/hru-logo-white.svg" />
                                </Col>
                            </Row>
                        </div>
                        <ApplicationStatus
                            onComing={() => {
                                user.registration_status = "coming";
                                this.submitUser(user);
                            }}
                            onNotComing={() => {
                                user.registration_status = "not-coming";
                                this.submitUser(user);
                            }}
                            travelling_from={user.travelling_from}
                            status={user.registration_status}
                        />
                        {(user.registration_status === "confirmed" || user.registration_status === "waitlist" || user.registration_status === "coming" || user.registration_status === "registered" || (user.role && user.role.director) || (user.role && user.role.organizer) || (user.role && user.role.volunteer)) &&
                            <div>
                                <div style={{ width: "100%", textAlign: "left" }}>
                                    <p className="lead">Day Of</p>
                                </div>
                                <Section className="mb-5"
                                    title="Your QR Code"
                                    subtitle="Please have this avaliable when you arrive for check-in." 
                                    isOpen={true}>
                                    <div style={{ width: "100", textAlign: "center" }}>
                                        <QR email={user.email} />
                                    </div>
                                </Section>
                            </div>}
                        <div>
                            <div style={{ width: "100%", textAlign: "left" }}>
                                <p className="lead">User Profile</p>
                            </div>
                            <ProfileMessage message={this.state.profileMSG} />
                            <Section title="Basics"
                                subtitle="Introduce yourself, don't be shy!"
                                isOpen={this.state.openDetails} >
                                <UserProfileForm mobile={mobile}
                                    user={user}
                                    onChange={(user) => {
                                        this.setState({ user: user });
                                    }}
                                    onSubmit={(user) => {
                                        user.registration_status = "registered";
                                        this.submitUser(user);
                                    }}
                                    profile={this.props.profile}
                                />
                            </Section>
                            <Section className="mb-5"
                                title="Travel Reimbursements"
                                subtitle="Let us know where you're coming from!">
                                <TravelReimbursementsForm mobile={mobile}
                                    travelling_from={user.travelling_from}
                                    onSubmit={(travel) => {
                                        user.travelling_from = travel;
                                        this.submitUser(user);
                                    }} />
                            </Section>
                        </div>
                </div> */}
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
