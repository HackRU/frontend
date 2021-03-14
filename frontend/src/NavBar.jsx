import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { Link } from "react-router-dom";
import "./NavBar.css";
const NavBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <h2 id="header-text">HackRU</h2>
                <Tabs indicatorColor="primary">
                    <Tab component={Link} to="/" label="Home" value="0" index={0} />
                </Tabs>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
