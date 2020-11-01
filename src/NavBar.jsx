import React, { Component } from "react";
import { AppBar, Toolbar, IconButton, Button, MenuItem, Menu, Tabs, Tab } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import { navlinks, theme, defaults } from "./Defaults";
import { ProfileType } from "./components/Profile";
import PropTypes from "prop-types";
import "./NavBar.css";
import Logo from "./components/Landing/Sections/Logo.jsx";
import { goToAnchor } from "react-scrollable-anchor";

const LinkSwitcher = (props) => {
    return props.root ? <a {...props}>{props.children}</a> : <Link {...props} />;
};
LinkSwitcher.propTypes = {
    root: PropTypes.bool,
    children: PropTypes.any,
};

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggleFalse = this.toggleFalse.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);

        this.state = {
            isOpen: false,
            shouldRender: 0,
            badgeHeight: 0,
            anchorEl: null,
            open: false,
            landingValue: 0,
        };

        this.setAnchorEl = this.setAnchorEl.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("resize", this.handleResize);

        this.handleResize();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("resize", this.handleResize);
    }

    handleResize() {
        let badge = document.getElementById("mlh-trust-badge");
        if (badge == null) {
            return;
        }
        this.setState({
            badgeHeight: parseFloat(
                window
                    .getComputedStyle(badge)
                    .getPropertyValue("height")
                    .replace("px", "")
            ),
        });
    }

    handleScroll() {
        let badgeHeight = this.state.badgeHeight;
        let offset = window.pageYOffset;
        if (offset < badgeHeight) {
            //At top
            this.setState({
                shouldRender: 0,
            });
        } else if (this.state.shouldRender === 0 && offset > badgeHeight) {
            this.setState({
                shouldRender: 1,
            });
        }
        let currentHash = window.location.href.substring(window.location.href.indexOf("#") + 1);
        switch (currentHash) {
        case "home":
            this.setState({ landingValue: 0 });
            break;
        case "about":
            this.setState({ landingValue: 1 });
            break;
        case "schedule":
            this.setState({ landingValue: 2 });
            break;
        case "sponsors":
            this.setState({ landingValue: 3 });
            break;
        case "partners":
            this.setState({ landingValue: 4 });
            break;
        case "numbers":
            this.setState({ landingValue: 5 });
            break;
        }
    }
    toggleFalse() {
        if (window.innerWidth < 768) {
            this.setState({
                isOpen: false,
            });
        }
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    getAuthButtons() {
        return (
            <div style={{ marginLeft: "auto" }}>
                <Link to="/login">
                    <Button outline
                        color="warning"
                        className="pill-btn">
                        Login
                    </Button>
                </Link>{" "}
                <Link to="/signup">
                    <Button color="success"
                        className="pill-btn">
                        Register
                    </Button>
                </Link>
            </div>
        );
    }
    handleClick(event) {
        this.setAnchorEl(event.currentTarget);
    }
    setAnchorEl(value) {
        this.setState({
            anchorEl: value,
            open: !this.state.open,
        });
    }
    handleClose() {
        this.setAnchorEl(null);
    }

    getDashboardButton() {
        return (
            <div style={{ marginLeft: "auto" }}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="Profile"
                    aria-haspopup="true"
                    aria-owns={this.state.open ? "Profile" : undefined}
                    onClick={this.handleClick}
                    color="inherit"
                    iconStyle={{ width: 80, height: 80 }}
                >
                    <AccountCircle style={{ fontSize: "40px" }} />
                </IconButton>
                <Menu
                    id="Profile"
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <MenuItem
                        onClick={this.handleClose}
                        style={{ color: "black" }}
                        component={Link}
                        to="/profile"
                    >
                        Profile
                    </MenuItem>
                    <MenuItem
                        onClick={this.handleClose}
                        style={{ color: "black" }}
                        component={Link}
                        to="/logout"
                    >
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        );
    }
    getNavLinks() {
        let keys = Object.keys(navlinks);
        let navLinks = [];

        for (let i = 0; i < keys.length - 1; i++) {
            navLinks.push(
                <Tab
                    style={{ color: "white", minWidth: 10, marginLeft: "25px" }}
                    key={i}
                    value={i + 100}
                    index={i}
                    component={Link}
                    onClick={() => goToAnchor(navlinks[keys[i]].url, true)}
                    to={navlinks[keys[i]].url}
                    scrollButtons="auto"
                    label={keys[i].toString()}
                />
            );
        }
        return navLinks;
    }
    handleLandingChange = (event, newValue) => {
        this.setState({ landingValue: newValue });
    };
    getLandingNav() {
        return (
            <React.Fragment>
                {this.getNavLinks()}
            </React.Fragment>
        );
    }
    getDashboardNav() {
        return (
            <React.Fragment>
                <Tab
                    style={{ color: "white", minWidth: 10, marginLeft: "25px" }}
                    className={window.innerWidth < 768 ? "pt-3" : ""}
                    component={Link}
                    to={"/dashboard"}
                    label="DASHBOARD"
                />
                <Tab
                    style={{ color: "white", minWidth: 10, marginLeft: "25px" }}
                    className={window.innerWidth < 768 ? "pt-3" : ""}
                    component={Link}
                    to={"/teamviewer"}
                    label="TEAM"
                />
            </React.Fragment>
        );
    }

    render() {
        let path = window.location.pathname;
        let onDashboard = path === "/dashboard" || path === "/profile" || path === "/teamviewer";
        let onLogin = path === "/login" || path === "/signup";
        let onLanding = path === "/";
        // Show no navbar on the projector page
        if (path === "/projector") {
            return null;
        }
        if (!defaults.freeze) {
            return (
                <AppBar
                    id="navbar"
                    style={{
                        width: "100%",
                        zIndex: "20",
                        backgroundColor: theme.secondary[1],
                        opacity: this.state.shouldRender | !onLanding,
                        pointerEvents: this.state.shouldRender | !onLanding ? "auto" : "none",
                        transition: !onLanding ? "" : "opacity 0.5s",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                    }}
                    fixed="top"
                    dark
                    expand="md"
                    onBlur={this.toggleFalse}
                >
                    <Toolbar style={{ marginLeft: "0em" }}>
                        <Tabs
                            style={{ marginLeft: "auto", overflowY: "hidden" }}
                            scrollButtons="on"
                            value={-1}
                            variant="scrollable">
                            <div>
                                <div
                                    style={{
                                        display: "block",
                                        paddingRight: 0,
                                        marginTop: -25,
                                        marginBottom: -250,
                                        width: 200,
                                        marginRight: -10,
                                        marginLeft: -30,
                                        overflowY: "hidden"
                                    }}>
                                    <a href="/#home"
                                        className="logo-no-underline"
                                        style={{ height: "10px !important", textDecoration: "none" }}
                                        root={onLanding.toString()}>
                                        <Logo
                                            color="white"
                                            repeat={false}
                                            noCircle
                                            style={{ marginLeft: "10px" }}
                                            src="/assets/icons/hru-text-dyn.svg"
                                        />
                                    </a>
                                </div>
                            </div>
                            <div>
                                {onLogin ? <div/> : onDashboard ? this.getDashboardNav() : this.getLandingNav()}
                            </div>
                        </Tabs>
                        {this.props.profile.isLoggedIn ? this.getDashboardButton() : this.getAuthButtons()}
                    </Toolbar>
                </AppBar>
            );
        } else {
            return null;
        }
    }
}

NavBar.propTypes = {
    profile: ProfileType,
};

export default NavBar;
