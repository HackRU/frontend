import React, { useState, useEffect } from "react";
import { Button, TextField, List, Chip, Divider, Grid, Typography, Collapse } from "@material-ui/core";
import PropTypes from "prop-types";
import TeamLoading from "../TeamLoading";
import UserItem from "./UserItem";
import Alert from "@material-ui/lab/Alert";


function MyTeam(props) {
    const [team, setTeam] = useState({});
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState("Loading your team info...");
    const [userEmail, setUserEmail] = useState("");
    const {profile} = props;
    const [team_id, setTeamId] = useState("");
    const [inviteUserResults, setInviteUserResults] = useState("");
    const [alertColor, setAlertColor] = useState("");
    const [isAlertOpen, setisAlertOpen] = useState(false);
    //const [isSubmitted, setSubmit] = useState(true);

    useEffect(() => {
        getCurrentTeam();
        props.profile.getTeamUser().then((userResponse) => {
            if (userResponse.error && userResponse.error.message) {
                // In this instance, we will assume the user just doesn't have a team enabled!
                setLoading(false);
            } else {
                const team_id = userResponse.response.team_id;
                props.profile.getTeam(team_id).then(teamResponse => {
                    setTeam(teamResponse.response);
                    props.profile.Get()
                        .then((msg) => {
                            if (!msg.error && msg.response && msg.response.want_team) {
                                setUser(userResponse.response);
                            }
                            setLoading(false);
                        });
                });
            }
        });
    }, []);



    function getCurrentTeam() {
        profile.getTeamUser().then((success) => {
            setTeamId(success.response.team_id);
            const id = success.response.team_id;
            profile.getTeam(id).then((success) => {
                setTeam(success.response);
                setLoading(false);
            });
        });
    }

    const handleInviteUserChange = e => {
        const { value } = e.target;
        setUserEmail(value);
    };

    const onInviteUserSubmit = async () => {
        let msg = await profile.inviteUser(team_id, userEmail);
        if (msg.error) {
            setInviteUserResults("Failed: "+msg.error.message);
            setAlertColor("error");
        } else {
            setInviteUserResults("Success");
            setAlertColor("success");
        }
        setisAlertOpen(true);
        setUserEmail("");
    };
 
    if (loading) {
        return (<TeamLoading text={loading} />);
    }
    if (!user) {
        return (
            <Grid container
                direction="column"
                alignItem="center"
                style={{ paddingTop: "1.4em" }}>
                <Typography variant="subtitle1"
                    align="center">Enable TeamRU in your profile to start finding teams!</Typography>
            </Grid>
        );
    }
    else if (user.hasateam) {
        return (
            <Grid container
                direction="row"
                justify="space-between">
                <Grid container
                    direction="column"
                    xs={6}>
                    <div style={{ width: "100%", maxWidth: 360 }}>
                        <div>
                            <Grid container
                                alignItems="center">
                                <Grid item
                                    xs>
                                    <Typography gutterBottom
                                        variant="h5">
                                        {team.name}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Typography color="textSecondary"
                                variant="body2">
                                {team.desc}
                            </Typography>
                        </div>
                        <Divider variant="middle" />
                        <div style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
                            <Typography gutterBottom
                                variant="body1">
                                Skills
                            </Typography>
                            <div>
                                {team.skills.length != 0
                                    ? team.skills.map((skill, index) => (
                                        <Chip label={skill}
                                            key={index} />
                                    ))
                                    : "No Skills Listed"}
                            </div>
                        </div>
                        <Divider variant="middle" />

                        <div style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
                            {console.log(team.prizes)}
                            <Typography gutterBottom
                                variant="body1">
                                Prizes
                            </Typography>
                            <div>
                                {team.prizes.length != 0 
                                    ? team.prizes.map((prize, index) => (
                                        <Chip label={prize}
                                            key={index} />
                                    ))
                                    : "No Prizes Listed"}
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid container
                    direction="column"
                    xs={6}>
                    <Typography variant="h5">
                        Members:
                    </Typography>
                    {/* Iterating through members  */}
                    <List style={{ width: "100%", maxWidth: 360 }}>

                        {team.members
                            ? team.members.map((member, index) => (
                                <UserItem member={member}
                                    key={index} />
                            ))
                            : "No Members Listed"}
                    </List>
                    <Typography variant = "h5">Invite Users Via Email:</Typography>
                    <TextField
                        name="inviteUser"
                        id="outlined-basic"
                        label="User Email"
                        style={{ textAlign: "center" }}
                        margin="normal"
                        value={userEmail}
                        variant="outlined"
                        onChange={handleInviteUserChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className="teamViewerInput"
                    />
                    <Button
                        variant="outlined"
                        style={{ margin: 8 }}
                        disabled={userEmail === ""}
                        onClick={onInviteUserSubmit}
                    >
                        Submit
                    </Button>
                    <Collapse in={isAlertOpen}>
                        <Alert
                            onClose = {() => {setisAlertOpen(false);}}
                            color = {alertColor}
                        >
                            {inviteUserResults}
                        </Alert>
                    </Collapse>

                </Grid>
                <Grid container
                    direction="row"
                    alignItems="right">
                    <Grid item></Grid>
                    
                </Grid>
                <Divider />
                <Grid
                    item
                    container
                    direction="row"
                    style={{ paddingBottom: "0.5em", paddingTop: "0.5em" }}
                >
                    <Grid item
                        style={{ paddingBottom: "0.5em", paddingTop: "0.5em" }}></Grid>
                </Grid>
                <Grid item
                    style={{paddingBottom: "0 em", paddingTop: "0 em"}} >
                </Grid>
            </Grid>
        );
    } else {
        return (
            <Grid container
                direction="column"
                alignItem="center"
                style={{ paddingTop: "1.4em" }}>
                <Typography variant="subtitle1"
                    align="center">Check the explore tab to join a team</Typography>
            </Grid>
            
        );
    }
}
MyTeam.propTypes = {
    invitingTeamId: PropTypes.string,
    originalTeamId: PropTypes.string,
};
export default MyTeam;