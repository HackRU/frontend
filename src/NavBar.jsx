import React, { Component } from "react";
import { NavLink } from "reactstrap";
import {
	Container,
	Collapse,
	Button,
	MenuItem,
	MenuList,
	AppBar,
	Toolbar,
	Box,
} from "@material-ui/core";
import { ToggleButton } from "@material-ui/lab";
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
			<MenuList style={{ display: "inline-block", marginLeft: "330px" }}>
				<Link to="/login">
					<Button variant="contained" outline>
						Login
					</Button>
				</Link>{" "}
				<Link to="/signup">
					<Button variant="contained" color="primary">
						Register
					</Button>
				</Link>
			</MenuList>
		);
	}
	getDashboardButton() {
		return (
			<div>
				<Link to="/dashboard">
					<Button variant="contained" color="primary">
						Dashboard
					</Button>
				</Link>
				<Link to="/logout">
					<Button variant="contained" outline color="secondary">
						Logout
					</Button>
				</Link>
			</div>
		);
	}
	getNavLinks() {
		let keys = Object.keys(navlinks);
		let navLinks = [];
		for (let i = 0; i < keys.length - 1; i++) {
			navLinks.push(
				<MenuItem
					style={{ display: "inline-block", margin: "-10px" }}
					key={i}
					className={i === 0 && window.innerWidth < 768 ? "pt-3" : ""}
				>
					<NavLink
						className="primary-link"
						href={"/" + navlinks[keys[i]].url}
						onClick={this.toggleFalse}
					>
						{keys[i].toString()}
					</NavLink>
				</MenuItem>
			);
		}
		return navLinks;
	}

	getLandingNav() {
		return (
			<MenuList className="mr-auto" style={{ display: "inline-block" }}>
				{/* <MenuList nav className="mr-auto"> */}
				{this.getNavLinks()}
				{/* </MenuList> */}
				{/* <MenuList nav className="ml-auto"> */}
				{this.props.profile.isLoggedIn
					? this.getDashboardButton()
					: this.getAuthButtons()}
				{/* </MenuList> */}
			</MenuList>
		);
	}

	getDashboardNav() {
		return (
			<Collapse isOpen={this.state.isOpen} navbar>
				<MenuList navbar className="mr-auto">
					<MenuItem className={window.innerWidth < 768 ? "pt-3" : ""}>
						<NavLink onClick={this.toggleFalse}>
							<Link className="primary-link" to="/#home">
								HOME
							</Link>
						</NavLink>
					</MenuItem>
					{defaults.dayof ? (
						<MenuItem>
							<NavLink onClick={this.toggleFalse}>
								<Link className="primaryLink" to="/live">
									LIVE
								</Link>
							</NavLink>
						</MenuItem>
					) : null}
				</MenuList>
				<MenuList navbar className="ml-auto">
					<MenuItem>
						<Link to="/logout">
							<Button className="pill-btn" outline color="warning">
								Logout
							</Button>
						</Link>
					</MenuItem>
				</MenuList>
			</Collapse>
		);
	}

	render() {
		let path = window.location.pathname;
		let onDashboard = path === "/dashboard";
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
						pointerEvents:
							this.state.shouldRender | !onLanding ? "auto" : "none",
						transition: !onLanding ? "" : "opacity 0.5s",
						boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
					}}
					fixed="top"
					dark
					expand="md"
					onBlur={this.toggleFalse}
				>
					<Container maxWidth={false} disableGutters={true}>
						<Toolbar
							fluid
							style={{ paddingBottom: 10, paddingTop: 10, paddingLeft: 10 }}
						>
							<Box>
								<div style={{ position: "relative", width: "100%" }}>
									<ToggleButton
										onClick={this.toggle}
										style={{
											position: "fixed",
											right: 0,
											top: 2,
											marginRight: 10,
										}}
									/>
								</div>
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
									<LinkSwitcher
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
											src="/assets/icons/hru-text-dyn.svg"
										/>
									</LinkSwitcher>
								</div>
							</Box>
							{onDashboard ? this.getDashboardNav() : this.getLandingNav()}
						</Toolbar>
					</Container>
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
