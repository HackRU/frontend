import React, { useState, useEffect } from "react";
import { Button, TextField, ListItemSecondaryAction,IconButton, List, ListItemAvatar, ListItem, ListItemText, Chip, Divider, Container, Grid, Avatar, Typography, AppBar, Tabs, Tab, Box } from "@material-ui/core";
import Section from "./Section";
import { FixedSizeList } from 'react-window';
import GroupAdd from "@material-ui/icons/GroupAdd";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import LinkOffOutlinedIcon from '@material-ui/icons/LinkOffOutlined';
import { ProfileType } from "../Profile.js";
import PropTypes from "prop-types";

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
function UserItem(props){
    return(
        <ListItem>
            <ListItemAvatar>
                <Avatar style={{ "width": "2.5em", "height": "2.5em" }}>
                    {props.name.substring(0,1).toUpperCase()}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.name} secondary={props.skills} />
        </ListItem>
    )
}
function MyTeam(props){
    const [team, setTeam] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
        props.profile.getTeamUser().then((success) => {
            setUser(success.response);
            const team_id = success.response.team_id;
            props.profile.getTeam(team_id).then(teamResponse => {
                setTeam(teamResponse)
            });
        });
    }, []);
    if(user.hasateam){
    return (
        <Grid container direction="row" justify="space-between">
            <Grid container direction="column" xs={6}>
                <div style={{ width: "100%", maxWidth: 360 }}>
                    <div>
                        <Grid container alignItems="center">
                            <Grid item xs>
                                <Typography gutterBottom variant="h5">
                                    {team.name}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography color="textSecondary" variant="body2">
                            {team.desc}
                        </Typography>
                    </div>
                    <Divider variant="middle" />
                    <div style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
                        <Typography gutterBottom variant="body1">
                            Skills
                        </Typography>
                        <div>
                            {team.skills
                                ? team.skills.map((skill) => <Chip label={skill} />)
                                : "No Skills Listed"}
                        </div>
                    </div>
                    <Divider variant="middle" />

                    <div style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
                        <Typography gutterBottom variant="body1">
                            Prizes
                        </Typography>
                        <div>
                            {team.prizes
                                ? team.prizes.map((prize) => <Chip label={prize} />)
                                : "No Prizes Listed"}
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid container direction="column" xs={6}>
                <List style={{ width: "100%", maxWidth: 360 }}>
                    {team.members
                        ? team.members.map((member) => <UserItem name={member} />)
                        : "No Members Listed"}
                </List>
            </Grid>
        </Grid>
    );
    }else{
        return(
        <Grid container direction="column" alignItem="center" style={{paddingTop: "1.4em"}}>
            <Typography variant="subtitle1" align="center">Check the explore tab to join a team</Typography>
        </Grid>);
        
    }
    

}
function RenderRow(props) {
    const { index } = props;

    return (
        <ListItem key={index} style={{padding: "1em"}}>
            <ListItemAvatar>
                <Avatar>
                    {index+1}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={`Team ${index + 1}`}
                secondary={`0/4`}

            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="add">
                    <GroupAdd />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

function Explore(props) {
    const [matches, setMatches] = useState({});
    useEffect(() => {
        props.profile.getTeamUser().then((success) => {
            const team_id = success.response.team_id;
            
            props.profile.matches(team_id).then((success)=>{
                setMatches(success.response);
            })
            
        });
    }, []);
    return (
        <Grid item container direction="column" justify="center" alignItems="center">
            <List
                style={{ maxHeight: "300px", width: "600px", overflow: "auto" }}
                className="no-scrollbars no-style-type"
            >
                
                {/* {matches ? matches.map((x) => (<RenderRow index={x}/>)) : ""} */}
            </List>
        </Grid>
    );
}
function ManageTeam(){

    return (
        <Grid container direction="column">
            <Grid item container direction="column">
                <Grid item style={{paddingBottom: "2em", paddingTop: "0.5em"}}>
                    <TextField
                        id="outlined-full-width"
                        label="Name"
                        style={{ margin: 8 }}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className="teamViewerInput"

                    />
                </Grid>
                <Grid item style={{ margin: 8, paddingBottom: "2em", paddingTop: "1em" }}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        style={{ margin: 8 }}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className="teamViewerInput"
                        color="primary"
                        style={{background: "none"}}
                        variant="outlined"
                    />
                </Grid>
                <Grid item container direction="row" style={{ paddingBottom: "2em", paddingTop: "2em" }}>
                    <Grid item>
                        <TextField
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label="Prizes"
                            style={{ margin: 8 }}                            
                            margin="normal"
                            className="teamViewerInput"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Skills"
                            style={{ margin: 8 }}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className="teamViewerInput"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item direction="column">
                <Grid item>
                    <Typography variant="h5">
                        Outgoing Invites
                    </Typography>
                </Grid>
                <Divider />

                <Grid item>
                    <List style={{ maxHeight: "300px", width: "600px", overflow: "auto" }} className="no-scrollbars no-style-type" >
                        <InviteItem isOutgoing={true} index={0} />
                        <InviteItem isOutgoing={true} index={1} />
                        <InviteItem isOutgoing={true} index={2} />
                        <InviteItem isOutgoing={true} index={3} />
                        <InviteItem isOutgoing={true} index={4} />
                    </List>
                </Grid>
            </Grid>
            <Grid item direction="column" style={{paddingTop: "1em", paddingBottom: "2em"}}>
                <Grid item>
                    <Typography variant="h5">
                        Incoming Invites
                    </Typography>
                </Grid>
                <Divider />

                <Grid item>
                    <List style={{ maxHeight: "300px", width: "600px", overflow: "auto" }} className="no-scrollbars no-style-type" >
                        <InviteItem isOutgoing={false} index={0} />
                        <InviteItem isOutgoing={false} index={1} />
                        <InviteItem isOutgoing={false} index={2} />
                        <InviteItem isOutgoing={false} index={3} />
                        <InviteItem isOutgoing={false} index={4} />                    
                        </List>
                </Grid>
            </Grid>
            <Grid item direction="column">
                <Grid item style={{paddingBottom: "1em"}}>
                    <Typography variant="h5">
                        Danger Zone
                    </Typography>
                </Grid>
                <Divider />
                <Grid 
                    item 
                    container 
                    style={{
                        outlineColor: "red", 
                        outlineStyle: "solid",
                        outlineWidth: "1px",
                        padding: "1.5em"
                    }}>
                    <Grid item container direction="row" justify="space-between">
                        <Grid item>
                            <Typography variant="h6">
                                Leave this team
                            </Typography>
                            <Typography variant="subtitle">
                                Removes you from your current team
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" style={{color: "red"}}>
                                Leave
                            </Button>
                        </Grid>

                        
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    )
}
function InviteItem(props){
    const {isOutgoing, team, index} = props;
    return (
        <ListItem key={index} style={{ padding: "1em" }}>
            <ListItemAvatar>
                <Avatar>
                    {index + 1}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={`Team ${index + 1}`}
                secondary={`0/4`}

            />
            <ListItemSecondaryAction>
                {
                isOutgoing ? 
                <React.Fragment>
                            <IconButton edge="end" aria-label="rescind" style={{ color: "blue" }}>
                        <LinkOffOutlinedIcon />
                    </IconButton>
                </React.Fragment>
                :
                <React.Fragment>
                        <IconButton edge="end" aria-label="accept" style={{ color: "green" }}>
                        <CheckCircleOutlineIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="reject" style={{color: "red"}}>
                        <HighlightOffIcon />
                    </IconButton>
                </React.Fragment>
                }
            </ListItemSecondaryAction>
        </ListItem>
    )
}
const TeamViewer = (props) => {
    const [value, setValue] = useState(0);
    const [user, setUser] = useState({});

    const handleChange = async (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        props.profile.getTeamUser().then((s) => {
            setUser(s.response);
        });
    });


    return (
        <Container maxWidth={false} style={{ paddingTop: 90 }}>
            <Grid container>
                <Grid xs={12}>
                    <Section
                        title="Team"
                        subtitle="Introduce yourself, don't be shy!"
                        color="yellow"
                        isOpen={true}
                    >
                        <Grid container direction="column" alignItems="center">
                            <Grid container direction="row" justify="center">
                                <Grid item style={{ "margin-right": "2em" }}>
                                    <Avatar style={{ width: "6em", height: "6em" }}>
                                        {user.user_id ? user.user_id.substring(0,1) : " "}
                                    </Avatar>
                                </Grid>
                                <Grid item direction="column">
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
                            <Grid item style={{ marginTop: "2em" }}>
                                <AppBar
                                    position="static"
                                    color="transparent"
                                    style={{ background: "transparent", boxShadow: "none" }}
                                >
                                    <Tabs
                                        value={value}
                                        variant="fullWidth"
                                        onChange={handleChange}
                                        aria-label="simple tabs example"
                                    >
                                        <Tab label="My Team" {...a11yProps(0)} />
                                        <Tab label="Explore" {...a11yProps(1)} />
                                        <Tab label="Manage Team" {...a11yProps(2)} />
                                    </Tabs>
                                </AppBar>
                            </Grid>
                        </Grid>
                        <Grid container>

                            {value == 0 ? (
                                <MyTeam {...props} />
                            ) : value == 1 ? (
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
}
TeamViewer.propTypes = {
    profile: ProfileType,
    isMobile: PropTypes.bool,
};
export default TeamViewer;
