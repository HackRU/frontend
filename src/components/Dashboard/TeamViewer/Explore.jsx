import React, { useState, useEffect } from "react";
import { List, Grid, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import PropTypes from "prop-types";
import TeamLoading from "../TeamLoading";

import RenderRow from "./RenderRow";
import ExploreSearchBox from "./ExploreSearchBox";

function Explore(props) {
    const [matches, setMatches] = useState({}); // all matches
    const [originalTeamId, setOriginalTeam] = useState({});
    const [teamPage, setTeamPage] = React.useState(1); // all teams page
    const [teamPageCount, setTeamPageCount] = React.useState(1); // all teams total page count
    const [allTeams, setAllTeams] = useState({}); // all teams
    const [totalSearchTeams, setTotalSearchTeams] = useState({}); // all teams matching input
    const [sliceSearchTeams, setSliceSearchTeams] = useState({}); // all teams matching input shown on single pagination
    const [loading, setLoading] = useState("Loading your matches...");
    const [searchText, setSearchText] = useState("");
    useEffect(() => {
        props.profile.getTeamUser().then((success) => {
            const team_id = success.response.team_id;
            setOriginalTeam(success.response.team_id);
            props.profile.matches(team_id).then((success) => {
                setMatches(success.response);

                props.profile.getAllTeams(0, 4).then((success) => {
                    setSliceSearchTeams(success.response.all_open_teams);
                    setLoading(false);
                });

                props.profile.getAllTeams().then((success) => {
                    setAllTeams(success.response);
                    setTeamPageCount(Math.ceil(success.response.total_teams / 4));
                    setTotalSearchTeams(success.response.all_open_teams);
                });
            });
        });
    }, []);

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
        console.log(searchText);
    }, [searchText]); // Runs on search box change

    useEffect(() => {
        console.log(totalSearchTeams);
        setTeamPageCount(Math.ceil(totalSearchTeams.length / 4));
    }, [totalSearchTeams]); // Runs on search box change

    // Checks if user searches while past total search teams page count
    useEffect(() => {
        if (teamPage > teamPageCount) {
            handleTeamPagination(null, 1);
        }
    }, [teamPageCount]); // Runs on search box change

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

    const handleTeamPagination = async (event, value) => {
        setTeamPage(value);
        let sliceTeams = totalSearchTeams.slice(((value - 1) * 4), value * 4);
        setSliceSearchTeams(sliceTeams);
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
                style={{ maxHeight: "300px", width: "600px", overflow: "auto" }}
                className="no-scrollbars no-style-type"
            >
                {matches.matches && matches.matches.length > 0 ? (
                    matches.matches.map((invitingTeamId, i) => (
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
            <Typography variant="h5">All Teams</Typography>
            <ExploreSearchBox setSearchText={setSearchText} />
            <List
                style={{ maxHeight: "300px", width: "600px", overflow: "auto" }}
                className="no-scrollbars no-style-type"
            >
                {allTeams.all_open_teams && allTeams.all_open_teams.length > 0 ? (
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