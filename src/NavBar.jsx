import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavLink, NavItem, Collapse, NavbarToggler, Button, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { navlinks, theme } from "./Defaults";
const buttonStyle = {
    border: "1px solid white",
    color: "white"
}

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggleIfMobile = this.toggleIfMobile.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);


        this.state = {
            isOpen: false,
            shouldRender: 0,
            badgeHeight: 0,
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleResize);

        this.handleResize();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
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
            })
        }
    }


    toggleIfMobile() {
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
                <Link to="/login" style={{ textDecoration: 'none' }}><Button style={buttonStyle} color="Login">Login</Button></Link>{' '}
                <Link to="/signup" style={{ textDecoration: 'none' }}><Button style={buttonStyle} color="link">Sign Up</Button></Link>
            </div>
        );
    }
    getDashboardButton() {
        return (
            <Link to="/dashboard" style={{ textDecoration: 'none' }}><Button style={buttonStyle} color="link">Dashboard</Button></Link>
        );
    }
    getNavLinks() {
        let keys = Object.keys(navlinks);
        let navLinks = [];
        for (let i = 0; i < keys.length - 1; i++) {
            navLinks.push(
                <NavItem>
                    <NavLink href={"/" + navlinks[keys[i]].url} onClick={this.toggleIfMobile}>{keys[i].toString()}</NavLink>
                </NavItem>
            );
        }
        return (
            navLinks
        )
    }

    getLandingNav() {
        return (
        <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar className="mr-auto">
                {this.getNavLinks()}
            </Nav>
            <Nav navbar className="ml-auto">
                { this.props.profile.isLoggedIn ?
                    this.getDashboardButton() :
                    this.getAuthButtons()}
            </Nav>
        </Collapse>
        );
    }

    getDashboardNav() {
        return (
        <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar className="mr-auto">
                <NavItem>
                    <NavLink onClick={this.toggleIfMobile}><Link to="/#">Home</Link></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={this.toggleIfMobile}><Link to="/live">Live</Link></NavLink> 
                </NavItem>
            </Nav>
            <Nav navbar className="ml-auto">
                <NavItem>
                    <Link to="/logout" style={{ textDecoration: 'none' }}><Button style={buttonStyle} color="link">Logout</Button></Link>
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
            <Navbar id="navbar" style={{ width: "100%", zIndex: "20", backgroundColor: theme.secondary[1], opacity: this.state.shouldRender | !onLanding, pointerEvents: this.state.shouldRender | !onLanding ? "auto":"none", transition: !onLanding ? "" : "opacity 0.5s" }} fixed="top" dark expand="md">
                <Container>
                    <NavbarBrand>
                        <NavbarToggler onClick={this.toggle} style={{ marginRight: 10 }} />
                        <Link style={{ color: theme.accent[0] }} onClick={this.toggleIfMobile} to="/#">HackRU</Link>
                    </NavbarBrand>
                    { onDashboard ? 
                        this.getDashboardNav() :
                        this.getLandingNav() }
                </Container>
            </Navbar> );
    }
}
export default NavBar;