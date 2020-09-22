import React, { Component } from "react";
import { AppBar, Toolbar, IconButton, Button, MenuItem, Menu, Tabs, Tab } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import { navlinks, theme, defaults } from "./Defaults";
import { ProfileType } from "./components/Profile";
import PropTypes from "prop-types";
import "./NavBar.css";
import Logo from "./components/Landing/Sections/Logo.jsx";

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
                    <Button 
                        color="success" 
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
                        to="/dashboard"
                    >
                        Dashboard
                    </MenuItem>
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
                    className={i === 0 && window.innerWidth < 768 ? "pt-3" : ""}
                    component={Link}
                    to={"/" + navlinks[keys[i]].url}
                    label={keys[i].toString()}
                />
            );
        }
        return navLinks;
    }

    getLandingNav() {
        return (
            <React.Fragment>

                <Tabs indicatorColor="white" 
                    style={{ marginLeft: "auto" }} 
                    value={0}>

                    {this.getNavLinks()}
                </Tabs>
                {this.props.profile.isLoggedIn ? this.getDashboardButton() : this.getAuthButtons()}
            </React.Fragment>
        );
    }

    getDashboardNav() {
        return ( 
            <React.Fragment>
                <Tabs indicatorColor="white" 
                    style={{ marginLeft: "auto" }} 
                    value={0}>
                    <Tab
                        style={{ color: "white", minWidth: 10, marginLeft: "25px" }}
                        className={window.innerWidth < 768 ? "pt-3" : ""}
                        component={Link}
                        to={"/profile"}
                        label="PROFILE"
                    />
                    <Tab
                        style={{ color: "white", minWidth: 10, marginLeft: "25px" }}
                        className={window.innerWidth < 768 ? "pt-3" : ""}
                        component={Link}
                        to={"/dashboard"}
                        label="DASHBOARD"  
                    />
                </Tabs>
                {this.getDashboardButton()}
            </React.Fragment> );
    }

    render() {
        let path = window.location.pathname;
        let onDashboard = path === "/dashboard" || path === "/profile";
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
                        <div>
                            {/* <div style={{ position: "relative", width: "100%" }}>
                                <NavbarToggler
                                    onClick={this.toggle}
                                    style={{ position: "fixed", right: 0, top: 2, marginRight: 10 }}
                                />
                            </div> */}
                            <div
                                style={{
                                    display: "block",
                                    paddingRight: 0,
                                    marginTop: -50,
                                    marginBottom: -200,
                                    width: 200,
                                    marginRight: -20,
                                    marginLeft: -40,
                                    height: 225,
                                }}
                            >
                                <Link
                                    style={{ height: "10px !important" }}
                                    onClick={this.toggleFalse}
                                    root={onLanding.toString()}
                                    href="/#home"
                                    to="/#home"
                                >
                                    <Logo
                                        color="white"
                                        repeat={false}
                                        noCircle
                                        style={{ marginLeft: "10px" }}
                                        src="/assets/icons/hru-text-dyn.svg"
                                    />
                                </Link>
                            </div>
                        </div>
                        {onDashboard ? this.getDashboardNav() : this.getLandingNav()}
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
