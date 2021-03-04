import React, { useState, useEffect } from "react";
import { Button, TextField, List, Divider, Grid, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import ChipInput from "material-ui-chip-input";
import TeamLoading from "../TeamLoading";
import InviteItem from "./InviteItem";
function ManageTeam(props) {
    const [team, setTeam] = useState({});
    const [team_id, setTeamId] = useState("");
    const [isSubmitted, setSubmit] = useState(true);
    const [userEmail, setUserEmail] = useState("");
    const [loading, setLoading] = useState("Loading your team info...");
    const { profile } = props;

    useEffect(() => {
        getCurrentTeam();
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
    const handleChange = e => {
        const { name, value } = e.target;
        setTeam(prevState => ({
            ...prevState,
            [name]: value
        }));
        setSubmit(false);
    };
    const handleAddChip = (name, e) => {
        setTeam(prevState => ({
            ...prevState,
            [name]: [...prevState[name], e]
        }));
        setSubmit(false);
    };
    const handleInviteUserChange = e => {
        const { value } = e.target;
        setUserEmail(value);
    };
    const onInviteUserSubmit = () => {
        profile.inviteUser(team_id, userEmail);
    };
    const onSubmit = () => {
        setSubmit(true);
        profile.updateTeam(team, team_id);
    };
    const handleDeleteChip = (name, i) => {
        setTeam(prevState => ({
            ...prevState,
            [name]: prevState[name].filter(function (value) { return i !== value; })
        }));
        setSubmit(false);
    };
    function deleteItem(id, isOutgoing) {

        var name = "outgoing_inv";
        if (!isOutgoing) {
            name = "incoming_inv";
        }
        setTeam(prevState => ({
            ...prevState,
            [name]: prevState[name].filter(el => el !== id)
        }));

    }
    if (loading) {
        return (<TeamLoading text={loading} />);
    }
    return (
        <Grid container
            direction="column">
            <Grid item
                container
                direction="column">
                <Grid item
                    style={{ paddingBottom: "2em", paddingTop: "0.5em" }}>
                    <TextField
                        name="name"
                        id="outlined-full-width"
                        label="Name"
                        style={{ margin: 8 }}
                        margin="normal"
                        value={team.name}
                        variant="outlined"
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className="teamViewerInput"
                    />
                </Grid>
                <Grid item
                    style={{ paddingBottom: "2em", paddingTop: "1em" }}>
                    <TextField
                        name="desc"
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        style={{ margin: 8 }}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={team.desc}
                        onChange={handleChange}
                        className="teamViewerInput"
                        color="primary"
                        variant="outlined"
                    />
                </Grid>
                <Grid
                    item
                    container
                    direction="row"
                    style={{ paddingBottom: "0.5em", paddingTop: "2em" }}
                >
                    <Grid item>
                        <ChipInput
                            label="Prizes"
                            name="prizes"
                            style={{ margin: 8 }}
                            className="teamViewerInput"
                            value={team.prizes}
                            onAdd={(e) => handleAddChip("prizes", e)}
                            onDelete={(index) => handleDeleteChip("prizes", index)}
                        />
                    </Grid>
                    <Grid item>
                        <ChipInput
                            label="Skills"
                            name="skills"
                            style={{ margin: 8, background: "none" }}
                            className="teamViewerInput"
                            value={team.skills}
                            onAdd={(e) => handleAddChip("skills", e)}
                            onDelete={(index) => handleDeleteChip("skills", index)}
                        />
                    </Grid>
                </Grid>
                <Grid item
                    style={{ paddingBottom: "1em" }}>
                    <Button
                        variant="outlined"
                        style={{ margin: 8 }}
                        disabled={isSubmitted ? true : false}
                        onClick={onSubmit}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
            <Grid item>
                <Typography variant="h5">Invite Users Via Email</Typography>
            </Grid>
            <Divider />
            <Grid
                item
                container
                direction="row"
                style={{ paddingBottom: "0.5em", paddingTop: "2em" }}
            >
                <Grid item
                    style={{ paddingBottom: "2em", paddingTop: "0.5em" }}>
                    <TextField
                        name="inviteUser"
                        id="outlined-full-width"
                        label="User Email"
                        style={{ margin: 8 }}
                        margin="normal"
                        value={userEmail}
                        variant="outlined"
                        onChange={handleInviteUserChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className="teamViewerInput"
                    />
                </Grid>
                <Grid item
                    style={{ paddingBottom: "0.5em", paddingTop: "0.5em" }}>
                    <Button
                        variant="outlined"
                        style={{ margin: 8 }}
                        disabled={userEmail === ""}
                        onClick={onInviteUserSubmit}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
            <Grid item
                direction="column">
                <Grid item>
                    <Typography variant="h5">Outgoing Invites</Typography>
                </Grid>
                <Divider />

                <Grid item>
                    <List
                        style={{ maxHeight: "300px", width: "600px", overflow: "auto" }}
                        className="no-scrollbars no-style-type"
                    >
                        {team.outgoing_inv ? (
                            team.outgoing_inv.length !== 0 ? (
                                team.outgoing_inv.map((t) => (
                                    <InviteItem
                                        isOutgoing={true}
                                        key={t}
                                        invitedTeamId={t}
                                        originalTeam={team}
                                        profile={profile}
                                        del={() => deleteItem(t, true)}
                                    />
                                ))
                            ) : (
                                <Typography variant="subtitle1">No Outgoing Invites</Typography>
                            )
                        ) : (
                            ""
                        )}
                    </List>
                </Grid>
            </Grid>
            <Grid item
                direction="column"
                style={{ paddingTop: "1em", paddingBottom: "2em" }}>
                <Grid item>
                    <Typography variant="h5">Incoming Invites</Typography>
                </Grid>
                <Divider />

                <Grid item>
                    <List
                        style={{ maxHeight: "300px", width: "600px", overflow: "auto" }}
                        className="no-scrollbars no-style-type"
                    >
                        {team.incoming_inv ? (
                            team.incoming_inv.length !== 0 ? (
                                team.incoming_inv.map((t) => (
                                    <InviteItem
                                        isOutgoing={false}
                                        key={t}
                                        invitedTeamId={t}
                                        originalTeam={team}
                                        profile={profile}
                                        del={() => deleteItem(t, false)}
                                    />
                                ))
                            ) : (
                                <Typography variant="subtitle1">No Incoming Invites</Typography>
                            )
                        ) : (
                            ""
                        )}

                    </List>
                </Grid>
            </Grid>
            <Grid item
                direction="column">
                <Grid item
                    style={{ paddingBottom: "1em" }}>
                    <Typography variant="h5">Danger Zone</Typography>
                </Grid>
                <Divider />
                <Grid
                    item
                    container
                    style={{
                        outlineColor: "red",
                        outlineStyle: "solid",
                        outlineWidth: "1px",
                        padding: "1.5em",
                    }}
                >
                    <Grid item
                        container
                        direction="row"
                        justify="space-between">
                        <Grid item>
                            <Typography variant="h6">Leave this team</Typography>
                            <Typography variant="subtitle1">
                                Removes you from your current team
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                style={{ color: "red" }}
                                onClick={() => profile.leaveTeam(team_id)}
                            >
                                Leave
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

}
ManageTeam.propTypes = {
    profile: PropTypes.object,
};

export default ManageTeam;