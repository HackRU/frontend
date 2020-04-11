import React, { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
//import Logo from "../HackRU-logo.svg";

const MyNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <br />
            <br />
            <br />

            <Navbar color="light"
                light
                expand="md">
                {/* <img
          src={Logo}
          height={40}
          style={{ marginRight: 8 }}
          alt={"HackRULogo"}
        ></img> */}

                <NavbarBrand href="/teambuilder">HackRU TeamBuilder</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen}
                    navbar>
                    <Nav className="mr-auto"
                        navbar>
                        <NavItem>
                            <NavLink href="/teambuilder">
                            Teambuilder home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/teambuilder/TeamRecommendations">
                            Team Recommendations
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/teambuilder/ViewAllTeams">View All Teams</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav
                            inNavbar>
                            <DropdownToggle nav
                                caret>
                                    My Team Menu
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem href="/teambuilder/StartNewTeam">
                                    Start a New Team
                                </DropdownItem>
                                <DropdownItem href="/teambuilder/ViewMyTeam">View My Team</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem href="/teambuilder/LeaveMyTeam">Leave team</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <Nav className="ml-auto"
                        navbar>
                        <NavLink href="/teambuilder/MyProfile">My Profile</NavLink>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default MyNav;
