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
            <Navbar color="light"
                light
                expand="md">
                {/* <img
          src={Logo}
          height={40}
          style={{ marginRight: 8 }}
          alt={"HackRULogo"}
        ></img> */}

                <NavbarBrand href="/">HackRU TeamBuilder</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen}
                    navbar>
                    <Nav className="mr-auto"
                        navbar>
                        <NavItem>
                            <NavLink href="/TeamRecommendations">
                Team Recommendations
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/ViewAllTeams">View All Teams</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav
                            inNavbar>
                            <DropdownToggle nav
                                caret>
                My Team Menu
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem href="/StartNewTeam">
                  Start a New Team
                                </DropdownItem>
                                <DropdownItem href="/ViewMyTeam">View My Team</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem href="LeaveMyTeam">Leave team</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <Nav className="ml-auto"
                        navbar>
                        <NavLink href="/MyProfile">My Profile</NavLink>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default MyNav;
