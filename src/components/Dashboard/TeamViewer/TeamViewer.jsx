import React, { useState, useEffect } from "react";
import { Container, Grid, Avatar, Typography, AppBar, Tabs, Tab, createMuiTheme, ThemeProvider } from "@material-ui/core";
import Section from "../Section";
import { ProfileType } from "../../Profile.js";
import PropTypes from "prop-types";
import Loading from "../Loading";
import MyTeam from "./MyTeam";
import Explore from "./Explore";
import ManageTeam from "./ManageTeam";
import { Redirect, Route, Switch } from "react-router-dom";
import { theme } from "../../../Defaults";
import E404 from "../../Errors/E404";
import TeamPosts from "./TeamPosts/TeamPosts";


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const color_theme = createMuiTheme({
    palette: {
        primary: {
            main: theme.primary[1].trim(),
        },
        secondary: {
            main: theme.secondary[1].trim(),
        },
    },
});


const TeamViewer = (props) => {
    const location = props.location;

    const tab_val = ["/teamru/myteam", "/teamru/explore", "/teamru/manage", "/teamru/posts"].findIndex((el) => el === location.pathname);

    const [value, setValue] = useState(tab_val !== - 1 ? tab_val : 0);
    const [user, setUser] = useState({});
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState("Loading your team");


    const handleChange = async (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        props.profile.getTeamUser().then((s) => {
            setUser(s.response);
            props.profile.Get()
                .then((msg) => {
                    if (!msg.error && msg.response) {
                        setProfile(msg.response);
                    }
                    setLoading(false);
                });
        }, []);
        // return () => {
        //     console.log("Unmounting");
        // };
    }, []);

    if (!["/teamru", "/teamru/myteam", "/teamru/explore", "/teamru/manage", "/teamru/posts"].includes(location.pathname)) {
        return (<E404/>);
    }

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
        <ThemeProvider theme={color_theme}>
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
                                            <Tab label="Posts"
                                                onClick={() => {
                                                    props.history.push("/teamru/posts");
                                                }}
                                                {...a11yProps(3)} />
                                        </Tabs>
                                    </AppBar>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Switch>
                                    <Route 
                                        exact 
                                        path="/teamru">
                                        <MyTeam {...props}/>
                                    </Route>
                                    <Route 
                                        exact
                                        path="/teamru/myteam">
                                        <MyTeam {...props}/>
                                    </Route>
                                    <Route
                                        exact
                                        path="/teamru/explore">
                                        <Explore {...props}/>
                                    </Route>
                                    <Route 
                                        exact
                                        path="/teamru/manage">
                                        <ManageTeam {...props}/>
                                    </Route>
                                    <Route
                                        exact
                                        path="/teamru/posts">
                                        <TeamPosts {...props}/>
                                    </Route>
                                </Switch>
                                {/* {value === 0 ? (
                                    <MyTeam {...props} />
                                ) : value === 1 ? (
                                    <Explore {...props} />
                                ) : (
                                    <ManageTeam {...props} />
                                )} */}
                            </Grid>
                        </Section>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
};
TeamViewer.propTypes = {
    profile: ProfileType,
    isMobile: PropTypes.bool,
    showAlert: PropTypes.func,
    tab: PropTypes.number,
    history: PropTypes.object,
    location: PropTypes.object,
};
export default TeamViewer;
