import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./TeamBuilder/LandingPage";
import TeamRecommendations from "./TeamBuilder/Links/TeamRecommendations";
import ViewAllTeams from "./TeamBuilder/Links/ViewAllTeams";
import MyProfile from "./TeamBuilder/Links/MyProfile";
import LeaveMyTeam from "./TeamBuilder/Links/TeamMenu/LeaveMyTeam";
import StartNewTeam from "./TeamBuilder/Links/TeamMenu/StartNewTeam";
import ViewMyTeam from "./TeamBuilder/Links/TeamMenu/ViewMyTeam";
import MyNav from "./TeamBuilder/MyNav"
import "./TeamBuilder/styling.css";

function TeamBuilder(props) {

    return (
        <div>
        <MyNav/>
        <Router>
            <Switch>
                <Route path="/Teambuilder/MyProfile">
                    <MyProfile />
                </Route>
                <Route path="/Teambuilder/LeaveMyTeam">
                    <LeaveMyTeam />
                </Route>
                <Route path="/Teambuilder/StartNewTeam">
                    <StartNewTeam />
                </Route>
                <Route path="/Teambuilder/ViewMyTeam">
                    <ViewMyTeam />
                </Route>
                <Route path="/Teambuilder/TeamRecommendations">
                    <TeamRecommendations />
                </Route>
                <Route path="/Teambuilder/ViewAllTeams">
                    <ViewAllTeams />
                </Route>
                <Route path="/TeamBuilder">
                    <LandingPage props={props} />
                </Route>
            </Switch>
        </Router>
        </div>
    );
}

export default TeamBuilder;
