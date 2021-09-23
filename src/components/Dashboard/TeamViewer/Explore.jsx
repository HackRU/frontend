import React, { useState, useEffect } from "react";
import { List, Grid, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import PropTypes from "prop-types";
import TeamLoading from "../TeamLoading";

import RenderRow from "./RenderRow";
import ExploreSearchBox from "./ExploreSearchBox";

function Explore(props) {
    const [matches, setMatches] = useState({}); // all matches
    const [matchesPage, setMatchesPage] = React.useState(0); // matches page
    const [matchesPageCount, setMatchesPageCount] = React.useState(0); // matches total page count
    const [sliceMatches, setSliceMatches] = useState({}); // matches shown on single pagination
    const [originalTeamId, setOriginalTeam] = useState({});
    const [teamPage, setTeamPage] = React.useState(0); // all teams page
    const [teamPageCount, setTeamPageCount] = React.useState(0); // all teams total page count
    const [allTeams, setAllTeams] = useState({}); // all teams
    const [totalSearchTeams, setTotalSearchTeams] = useState({}); // all teams matching input
    const [sliceSearchTeams, setSliceSearchTeams] = useState([{}]); // all teams matching input shown on single pagination
    const [loading, setLoading] = useState("Loading your matches...");
    const [searchText, setSearchText] = useState("");
    
    // On page load
    useEffect(() => {
        props.profile.getTeamUser().then((success) => {
            const team_id = success.response.team_id;
            setOriginalTeam(success.response.team_id);
            props.profile.matches(team_id).then((success) => {
                setMatches(success.response);
                if (success.response.matches) {
                    setSliceMatches(success.response.matches.slice(0, 4));
                    setMatchesPageCount(Math.ceil(success.response.matches.length / 4));
                    setMatchesPage(1);
                }
                props.profile.getAllTeams(0, 4).then((success) => {
                    setSliceSearchTeams(success.response.all_open_teams);
                    setLoading(false);
                });

                props.profile.getAllTeams().then((success) => {
                    setAllTeams(success.response);
                    setTeamPageCount(Math.ceil(success.response.total_teams / 4));
                    setTotalSearchTeams(success.response.all_open_teams);
                    setTeamPage(1);
                });
            });
        });
    }, []);

    // On page load and search box change, set the paginated and total teams that match search
    useEffect(() => {
        if (allTeams.all_open_teams !== undefined) {
            const checkTeam = (team) => {
                const lowerTeam = team.name.toLowerCase();
                const upperTeam = team.name.toUpperCase();
                if (lowerTeam.includes(searchText.toLowerCase()))
                    return lowerTeam.includes(searchText.toLowerCase());
                else if (upperTeam.includes(searchText.toUpperCase()))
                    return upperTeam.includes(searchText.toUpperCase());
            };
            setSliceSearchTeams(allTeams.all_open_teams.filter(checkTeam).slice(((teamPage - 1) * 4), teamPage * 4));
            setTotalSearchTeams(allTeams.all_open_teams.filter(checkTeam));
        }
    }, [searchText]);

    // Set total number of team pages
    useEffect(() => {
        if (allTeams.all_open_teams && allTeams.all_open_teams.length !== 0) {
            setTeamPageCount(Math.ceil(totalSearchTeams.length / 4));
        }
    }, [totalSearchTeams]);

    // Checks if user searches while past total search teams page count
    useEffect(() => {
        if (teamPage > teamPageCount) {
            handleTeamPagination(null, 1);
        }
    }, [teamPageCount]);

    const onInvite = async (id) => {
        // let all_teams = await props.profile.getAllTeams(((page - 1) * 4), 4);
        setAllTeams(prevState => ({
            ...prevState,
            all_open_teams: prevState.all_open_teams.filter(el => el !== id)
        }));
        setMatches(prevState => ({
            ...prevState,
            matches: prevState.matches.filter(el => el !== id)
        }));
    };

    // Request new slice of matches
    const handleMatchesPagination = async (event, value) => {
        setMatchesPage(value);
        props.profile.getTeamUser().then((success) => {
            const team_id = success.response.team_id;
            props.profile.matches(team_id).then((success) => {
                if (success.response.matches && !JSON.stringify(matches.matches) == JSON.stringify(success.response.matches)) {
                    setMatches(success.response);
                    setSliceMatches(success.response.matches.slice(((value - 1) * 4), value * 4));
                } else {
                    setSliceMatches(matches.matches.slice(((value - 1) * 4), value * 4));
                }
            });
        });
    };

    // Request new slice of teams
    const handleTeamPagination = async (event, value) => {
        setTeamPage(value);
        if (totalSearchTeams) {
            props.profile.getAllTeams(((value - 1) * 4), 4).then((success) => {
                if (success.response.all_open_teams && !JSON.stringify(success.response.all_open_teams) == JSON.stringify(totalSearchTeams.slice(((value - 1) * 4), value * 4))) {
                    setSliceSearchTeams(success.response.all_open_teams);
                    props.profile.getAllTeams().then((success) => {
                        setTotalSearchTeams(success.response.all_open_teams);
                    });
                } else {
                    setSliceSearchTeams(totalSearchTeams.slice(((value - 1) * 4), value * 4));
                }
            });
        }
    };
    if (loading) {
        return (<TeamLoading text={loading} />);
    }
    return (
        <Grid item
            container
            direction="column"
            justify="center"
            alignItems="center">
            <Typography variant="h5"
                style={{ marginTop: "2em" }}>
                Matches
            </Typography>
            <List
                style={{ maxHeight: "400px", width: "600px", overflow: "auto" }}
                className="no-scrollbars no-style-type"
            >
                {matches.matches && matches.matches.length > 0 ? (
                    sliceMatches.map((invitingTeamId, i) => (
                        <RenderRow
                            index={invitingTeamId}
                            key={invitingTeamId+i}
                            invitingTeam={invitingTeamId}
                            originalTeamId={originalTeamId}
                            onInvite={onInvite}
                            {...props}
                        />
                    ))
                ) : (
                    <Typography variant="subtitle1">No Matches Yet</Typography>
                )}
            </List>
            <Pagination
                count={matchesPageCount}
                variant="outlined"
                page={matchesPage}
                onChange={handleMatchesPagination}
                shape="rounded"
            />
            <Typography variant="h5" 
                style={{ marginTop: "2em", marginBottom: "1em" }} >All Teams</Typography>
            <ExploreSearchBox setSearchText={setSearchText} />
            <List
                style={{ maxHeight: "400px", width: "600px", overflow: "auto" }}
                className="no-scrollbars no-style-type"
            >
                {totalSearchTeams && totalSearchTeams.length > 0 ? (
                    sliceSearchTeams.map((invitingTeamId, i) => (
                        <RenderRow
                            index={invitingTeamId}
                            key={invitingTeamId+i}
                            invitingTeam={invitingTeamId}
                            originalTeamId={originalTeamId}
                            onInvite={onInvite}
                            {...props}
                        />
                    ))
                ) : (
                    <Typography variant="subtitle1">No Teams Yet</Typography>
                )}
            </List>
            <Pagination
                count={teamPageCount}
                variant="outlined"
                page={teamPage}
                onChange={handleTeamPagination}
                shape="rounded"
            />
        </Grid>
    );
}
Explore.propTypes = {
    invitingTeam: PropTypes.object,
    originalTeamId: PropTypes.string,
    profile: PropTypes.object,
};

export default Explore;