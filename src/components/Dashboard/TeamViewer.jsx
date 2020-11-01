import React, { useState, useEffect } from "react";
import { Button, TextField, ListItemSecondaryAction,IconButton, List, ListItemAvatar, ListItem, ListItemText, Chip, Divider, Container, Grid, Avatar, Typography, AppBar, Tabs, Tab } from "@material-ui/core";
import Section from "./Section";
import GroupAdd from "@material-ui/icons/GroupAdd";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import LinkOffOutlinedIcon from "@material-ui/icons/LinkOffOutlined";
import { ProfileType } from "../Profile.js";
import PropTypes from "prop-types";
import ChipInput from "material-ui-chip-input";
import TeamLoading from "./TeamLoading";
import Loading from "./Loading";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
function UserItem(props){
    const {member, skills} = props;
    console.log(member);
    return(
        <ListItem>
            <ListItemAvatar>
                <Avatar style={{ "width": "2.5em", "height": "2.5em" }}>
                    {member.user_id ? member.user_id.substring(0,1).toUpperCase() : "-"}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={member.user_id}
                secondary={skills} />
        </ListItem>
    );
}
UserItem.propTypes = {
    name: PropTypes.string,
    skills: PropTypes.array,
};
function MyTeam(props){
    const [team, setTeam] = useState({});
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState("Loading your team info...");

    useEffect(() => {
        props.profile.getTeamUser().then((userResponse) => {            
            if (userResponse.error && userResponse.error.message) {
                // In this instance, we will assume the user just doesn't have a team enabled!
                setLoading(false);
            } else {
                setUser(userResponse.response);
                const team_id = userResponse.response.team_id;
                props.profile.getTeam(team_id).then(teamResponse => {
                    setTeam(teamResponse.response);
                    setLoading(false);
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
                style={{paddingTop: "1.4em"}}>
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
                                {team.skills
                                    ? team.skills.map((skill, index) => (
                                        <Chip label={skill}
                                            key={index} />
                                    ))
                                    : "No Skills Listed"}
                            </div>
                        </div>
                        <Divider variant="middle" />

                        <div style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
                            <Typography gutterBottom
                                variant="body1">
                                Prizes
                            </Typography>
                            <div>
                                {team.prizes
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
                style={{paddingTop: "1.4em"}}>
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
function RenderRow(props) {
    const { invitingTeam, originalTeamId } = props;

    return (
        <ListItem
            style={{padding: "1em"}}>
            <ListItemAvatar>
                <Avatar>
                    {invitingTeam.name ? invitingTeam.name.substring(0, 1) : ""}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={invitingTeam.name ? invitingTeam.name : ""}
                secondary={`${invitingTeam.members ? invitingTeam.members.length : ""}/4`}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end"
                    aria-label="add"
                    onClick={() => props.profile.inviteTeam(originalTeamId, invitingTeam.team_id)}
                >
                    <GroupAdd />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}
RenderRow.propTypes = {
    invitingTeam: PropTypes.object,
    originalTeamId: PropTypes.string,
    profile: PropTypes.object
};
function Explore(props) {
    const [matches, setMatches] = useState({});
    const [originalTeamId, setOriginalTeam] = useState({});
    const [loading, setLoading] = useState("Loading your matches...");
    useEffect(() => {
        props.profile.getTeamUser().then((success) => {
            const team_id = success.response.team_id;
            setOriginalTeam(success.response.team_id);
            props.profile.matches(team_id).then((success)=>{
                console.log(success.response);
                setMatches(success.response);
                setLoading(false);
            });

        });
    }, []);

    if (loading) {
        return (<TeamLoading text={loading} />);
    }
    return (
        <Grid item
            container
            direction="column"
            justify="center"
            alignItems="center">
            <List
                style={{ maxHeight: "300px", width: "600px", overflow: "auto" }}
                className="no-scrollbars no-style-type"
            >
                {matches.matches ? matches.matches.map((invitingTeamId, i) => (<RenderRow key={i}
                    invitingTeam={invitingTeamId}
                    originalTeamId={originalTeamId}
                    {...props}/>)) : <Typography variant="subtitle1">No Matches Yet</Typography>}
            </List>
        </Grid>
    );
}
Explore.propTypes = {
    invitingTeam: PropTypes.object,
    originalTeamId: PropTypes.string,
    profile: PropTypes.object,
};
function ManageTeam(props){
    const [team, setTeam] = useState({});
    const [team_id, setTeamId] = useState("");
    const [isSubmitted, setSubmit] = useState(true);
    const [loading, setLoading] = useState("Loading your team info...");
    const {profile} = props;

    useEffect(() => {
        getCurrentTeam();
    },[]);

    function getCurrentTeam(){
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
    const onSubmit = () => {
        setSubmit(true);
        profile.updateTeam(team, team_id);
    };
    const handleDeleteChip = (name, i) => { 
        setTeam(prevState => ({
            ...prevState,
            [name]: prevState[name].filter(function(value) {return i !== value;})
        }));
        setSubmit(false);
    };
    function deleteItem(id, isOutgoing){

        console.log("deleteed", id);
        var name = "outgoing_inv";
        if(!isOutgoing){
            name = "incoming_inv";
        }
        setTeam(prevState => ({
            ...prevState,
            [name]: prevState[name].filter(el => el != prevState[name][id])
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
                                team.outgoing_inv.map((t, index) => (
                                    <InviteItem
                                        isOutgoing={true}
                                        key={index}
                                        invitedTeamId={t}
                                        originalTeam={team}
                                        profile={profile}
                                        del={() => deleteItem(index, true)}
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
                                team.outgoing_inv.map((t, index) => (
                                    <InviteItem
                                        isOutgoing={false}
                                        key={index}
                                        invitedTeamId={t}
                                        originalTeam={team}
                                        profile={profile}
                                        del={() => deleteItem(index, false)}
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
                            <Typography variant="subtitle">
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
function InviteItem(props){
    const {isOutgoing, invitedTeamId, originalTeam,  profile, del} = props;
    const [invitedTeam, setInvitedTeam] = useState({});
    useEffect(() => {

        profile.getTeam(invitedTeamId).then((success)=>{
            setInvitedTeam(success.response);
        });        

    },[]);
    
    return (
        <ListItem
            style={{ padding: "1em" }}>
            <ListItemAvatar>
                <Avatar>
                    {invitedTeam.name ? invitedTeam.name.substring(0,1) : ""}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={invitedTeam.name ? invitedTeam.name : ""}
                secondary={`${invitedTeam.members ? invitedTeam.members.length : ""}/4`}

            />
            <ListItemSecondaryAction>
                {
                    isOutgoing ? 
                        <React.Fragment>
                            <IconButton edge="end"
                                aria-label="rescind"
                                style={{ color: "blue" }}
                                onClick={() => {profile.rescindInvite(originalTeam.team_id, invitedTeam.team_id); del();}}
                            >
                                <LinkOffOutlinedIcon />
                            </IconButton>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <IconButton edge="end"
                                aria-label="accept"
                                style={{ color: "green" }}
                                onClick={() => { profile.confirmInvite(originalTeam.team_id, invitedTeam.team_id); del();}}
                            >
                                <CheckCircleOutlineIcon />
                            </IconButton>
                            <IconButton edge="end"
                                aria-label="reject"
                                style={{color: "red"}}
                                onClick={() => { profile.rejectInvite(originalTeam.team_id, invitedTeam.team_id); del();}}
                            >
                                <HighlightOffIcon />
                            </IconButton>
                        </React.Fragment>
                }
            </ListItemSecondaryAction>
        </ListItem>
    );
}
InviteItem.propTypes = {
    isOutgoing: PropTypes.bool,
    invitedTeamId: PropTypes.string,
    originalTeam: PropTypes.object,
    profile: PropTypes.object,
    del: PropTypes.func,
};
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
                        isOpen={true}
                    >
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
                                    style={{ background: "transparent", boxShadow: "none" }}
                                >
                                    <Tabs
                                        value={value}
                                        variant="fullWidth"
                                        onChange={handleChange}
                                    >
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
