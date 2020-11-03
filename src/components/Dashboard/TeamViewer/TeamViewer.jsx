import React, { useState, useEffect } from "react";
import { Container, Grid, Avatar, Typography, AppBar, Tabs, Tab } from "@material-ui/core";
import Section from "../Section";
import { ProfileType } from "../../Profile.js";
import PropTypes from "prop-types";
import Loading from "../Loading";
import MyTeam from "./MyTeam";
import Explore from "./Explore";
import ManageTeam from "./ManageTeam";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}


const TeamViewer = (props) => {
    const [value, setValue] = useState(0);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState("Loading your team");

    const handleChange = async (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        props.profile.getTeamUser().then((s) => {
            setUser(s.response);
            setLoading(false);
        }, []);
    }, []);

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
                        color="yellow"
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
                                        {user.user_id ? user.user_id.substring(0,1) : " "}
                                    </Avatar>
                                </Grid>
                                <Grid item
                                    direction="column">
                                    <Grid item>
                                        <Typography variant="h5">{user.user_id}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h7">{user.bio}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h7">
                                            Skills:{" "}
                                            {user.skills
                                                ? user.skills.map((skill) => skill + " ")
                                                : "No Skills Listed"}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h7">
                                            Interests:{" "}
                                            {user.interests
                                                ? user.interests.map((interest) => interest + " ")
                                                : "No Interests Listed"}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h7">
                                            Prizes:{" "}
                                            {user.prizes
                                                ? user.prizes.map((prize) => prize + " ")
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
                                            {...a11yProps(0)} />
                                        <Tab label="Matches"
                                            {...a11yProps(1)} />
                                        <Tab label="Manage Team"
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
};
export default TeamViewer;
