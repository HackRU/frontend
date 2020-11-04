import React, { useState, useEffect } from "react";
import { Container, Grid, Avatar, Typography, AppBar, Tabs, Tab } from "@material-ui/core";
import Section from "../Section";
import { ProfileType } from "../../Profile.js";
import PropTypes from "prop-types";
import Loading from "../Loading";
import MyTeam from "./MyTeam";
import Explore from "./Explore";
import ManageTeam from "./ManageTeam";
import { Redirect } from "react-router-dom";


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}


const TeamViewer = (props) => {
    const [value, setValue] = useState(props.tab);
    const [user, setUser] = useState({});
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState("Loading your team");

    const handleChange = async (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        props.profile.getTeamUser().then((s) => {
            setUser(s.response);
            props.profile.Get((msg, data) => {
                if (!msg && data) {
                    setProfile(data);
                }
                setLoading(false);
            });
        }, []);
    }, []);

    
    if (!props.profile.isLoggedIn) {
        return (<Redirect to="/login"/>);
    }
    if (profile.registration_status === "unregistered") {
        props.showAlert("warning", "Please register before accessing TeamRU", 60);
        return (<Redirect to="/profile"/>);
    }
    if (loading) {
        return (<Loading text={loading} />);
    }
    return (
        <Container maxWidth={false}
            style={{ paddingTop: 90 }}>
            <Grid container>
                <Grid xs={12}>
                    <Section
                        title="Team"
                        subtitle="Introduce yourself, don't be shy!"
                        color="red"
                        hideButton={true}
                        hideTopStrip={true}
                        isOpen={true}>
                        <Grid container
                            direction="column"
                            alignItems="center">
                            <Grid container
                                direction="row"
                                justify="center">
                                <Grid item
                                    style={{ "margin-right": "2em" }}>
                                    <Avatar style={{ width: "6em", height: "6em" }}>
                                        {user.user_id ? user.user_id.substring(0,1) : ": "}
                                    </Avatar>
                                </Grid>
                                <Grid item
                                    direction="column">
                                    <Grid item>
                                        <Typography variant="h5">My Info</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography >{"Email: " + user.user_id}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography >
                                            Skills:{" "}
                                            {user.skills
                                                ? user.skills.map((skill) => skill + ", ")
                                                : "No Skills Listed"}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography >
                                            Interests:{" "}
                                            {user.interests
                                                ? user.interests.map((interest) => interest + ", ")
                                                : "No Interests Listed"}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography >
                                            Prizes:{" "}
                                            {user.prizes
                                                ? user.prizes.map((prize) => prize + ", ")
                                                : "No Prizes Listed"}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item
                                style={{ marginTop: "2em" }}>
                                <AppBar
                                    position="static"
                                    color="transparent"
                                    style={{ background: "transparent", boxShadow: "none" }}>
                                    <Tabs
                                        value={value}
                                        variant="fullWidth"
                                        onChange={handleChange}>
                                        <Tab label="My Team"
                                            onClick={() => {
                                                props.history.push("/teamru/myteam");
                                            }}
                                            {...a11yProps(0)} />
                                        <Tab label="Explore"
                                            onClick={() => {
                                                props.history.push("/teamru/explore");                                            
                                            }}
                                            {...a11yProps(1)} />
                                        <Tab label="Manage Team"
                                            onClick={() => {
                                                props.history.push("/teamru/manage");                                                 
                                            }}
                                            {...a11yProps(2)} />
                                    </Tabs>
                                </AppBar>
                            </Grid>
                        </Grid>
                        <Grid container>
                            {value === 0 ? (
                                <MyTeam {...props} />
                            ) : value === 1 ? (
                                <Explore {...props} />
                            ) : (
                                <ManageTeam {...props} />
                            )}
                        </Grid>
                    </Section>
                </Grid>
            </Grid>
        </Container>
    );
};
TeamViewer.propTypes = {
    profile: ProfileType,
    isMobile: PropTypes.bool,
    showAlert: PropTypes.func,
    tab: PropTypes.number,
    history: PropTypes.object
};
export default TeamViewer;
