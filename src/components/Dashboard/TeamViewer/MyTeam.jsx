import React, { useState, useEffect } from "react";
import { List, Chip, Divider, Grid, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import TeamLoading from "../TeamLoading";
import UserItem from "./UserItem";

function MyTeam(props) {
    const [team, setTeam] = useState({});
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState("Loading your team info...");

    useEffect(() => {
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