import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavLink, NavItem, Collapse, NavbarToggler, Button, Container } from "reactstrap";
import { Link } from "react-router-dom";
import { navlinks, theme, defaults } from "./Defaults";
import { ProfileType } from "./components/Profile";
import "./NavBar.css";

const LinkSwitcher = (props) => {
    return (props.root) ? <a {...props}>{props.children}</a> : <Link {...props} />;
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
        };
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
            badgeHeight: parseFloat(window.getComputedStyle(badge).getPropertyValue("height").replace("px", ""))
        });
    }

    handleScroll() {
        let badgeHeight = this.state.badgeHeight;
        let offset = window.pageYOffset;
        if (offset < badgeHeight) {
            //At top
            this.setState({
                shouldRender: 0
            });
        } else if (this.state.shouldRender === 0 && offset > badgeHeight) {
            this.setState({
                shouldRender: 1
            });
        }
    }


    toggleFalse() {
        if (window.innerWidth < 768) {
            this.setState({
                isOpen: false
            });
        }
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    getAuthButtons() {
        return (
            <div>
                <Link to="/login" ><Button color="link"
                    className="customButton">Login</Button></Link>{" "}
                <Link to="/signup" ><Button color="link"
                    className="customButton">Sign Up</Button></Link>
            </div>
        );
    }
    getDashboardButton() {
        return (
            <Link to="/dashboard"
                style={{ textDecoration: "none" }}><Button className="customButton"
                    color="link">Dashboard</Button></Link>
        );
    }
    getNavLinks() {
        let keys = Object.keys(navlinks);
        let navLinks = [];
        for (let i = 0; i < keys.length - 1; i++) {
            navLinks.push(
                <NavItem key={i}>
                    <NavLink
                        className="primary-link"
                        href={"/" + navlinks[keys[i]].url}
                        onClick={this.toggleFalse}>
                        {keys[i].toString()}
                    </NavLink>
                </NavItem>
            );
        }
        return (
            navLinks
        );
    }

    getLandingNav() {
        return (
            <Collapse isOpen={this.state.isOpen}
                navbar>
                <Nav navbar
                    className="mr-auto">
                    {this.getNavLinks()}
                </Nav>
                <Nav navbar
                    className="ml-auto">
                    { this.props.profile.isLoggedIn ?
                        this.getDashboardButton() :
                        this.getAuthButtons()}
                </Nav>
            </Collapse>
        );
    }

    getDashboardNav() {
        return (
            <Collapse isOpen={this.state.isOpen}
                navbar>
                <Nav navbar
                    className="mr-auto">
                    <NavItem>
                        <NavLink onClick={this.toggleFalse}>
                            <Link
                                className="primary-link"
                                to="/#home"> 
                                Home
                            </Link>
                        </NavLink>
                    </NavItem>
                    {defaults.dayof ? 
                        <NavItem>
                            <NavLink onClick={this.toggleFalse}>
                                <Link 
                                    className="primaryLink"
                                    to="/live">
                                    Live
                                </Link>
                            </NavLink> 
                        </NavItem> : null}
                </Nav>
                <Nav navbar
                    className="ml-auto">
                    <NavItem>
                        <Link to="/logout"
                            style={{ textDecoration: "none" }}><Button className="customButton"
                                color="link">Logout</Button></Link>
                    </NavItem>
                </Nav>
            </Collapse>
        );
    }

    render() {
        let path = window.location.pathname;
        let onDashboard = (path === "/dashboard");
        let onLanding = (path === "/");
        return(
            <Navbar id="navbar"
                style={{ width: "100%", zIndex: "20", backgroundColor: theme.secondary[1], opacity: this.state.shouldRender | !onLanding, pointerEvents: this.state.shouldRender | !onLanding ? "auto":"none", transition: !onLanding ? "" : "opacity 0.5s" }}
                fixed="top"
                dark
                expand="md"
                onBlur={this.toggleFalse}>
                <Container>
                    <NavbarBrand>
                        <NavbarToggler onClick={this.toggle}
                            style={{ marginRight: 10 }} />
                        <LinkSwitcher style={{ color: theme.accent[0] }}
                            onClick={this.toggleFalse}
                            href="/#home"
                            to="/#home"
                            root={onLanding.toString()}>HackRU</LinkSwitcher>
                    </NavbarBrand>
                    { onDashboard ?
                        this.getDashboardNav() :
                        this.getLandingNav() }
                </Container>
            </Navbar> );
    }
}

NavBar.propTypes = {
    profile: ProfileType,
};

export default NavBar;
