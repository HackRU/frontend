/**
 * @author Shivan Modha
 * @description The website homepage navigation bar
 * @version 0.0.1
 * Created 12/09/18
 */
/***************************************************************IMPORTS***************************************************************/
import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { navlinks, defaults } from "../../Defaults";
/***************************************************************IMPORTS***************************************************************/

/*****************************************************************APP*****************************************************************/
/**
 * This is a helper object for the landing page. This object will simply handle the navigation bar and the way it renders
 */
class Navigation extends Component {
    /**
     * Object constructor
     * @param {object} props React properties that are passed in to this component 
     */
    constructor(props) {
        super(props);
        // Add a onresize event listener so that we can switch the navigation to mobile
        window.addEventListener("resize", () => {
            // Recalculate the mobile, and change the state to trigger a render
            this.setState({
                isMobile: window.innerWidth <= defaults.mobileWidthThresholdSensitive,
            });
        })
    }
    /**
     * The first pre-render state
     */
    componentWillMount() {
        // Set the initial state so that the render function works properly
        this.setState({
            isMobile: window.innerWidth <= defaults.mobileWidthThresholdSensitive,
        });
    }
    render() {
        // Differentiate between left and right buttons
        let navigationButtons = [[], []];
        // Read from the default.js file
        let keys = Object.keys(navlinks);
        for (let i = 0; i < keys.length; i++) {
            // Render the navigation button
            navigationButtons[(i < keys.length / 2) ? (0) : (1)].push(
                <NavItem key={i}>
                    <NavLink key={i} href={navlinks[keys[i]].url}>
                        <div id="navigation-link" className="bold-text" style={{ width: "12vh", textShadow: "0px 0px 5px black" }}>{keys[i]}</div>
                    </NavLink>
                </NavItem>
            );
        }
        // Place the navigation buttons in the correct navbar depending on the size of the window
        let navigation = [(
            <Navbar key="0A" light expand="md">
                <Nav className="ml-auto" navbar>
                    {(() => { if (!this.state.isMobile) { return navigationButtons[0]; } else { return null; } })()}
                </Nav>
                <NavbarBrand href="/"><img alt="HackRU Logo" src="./assets/logo.svg" style={{ height: "calc(15vh)" }} /></NavbarBrand>
                <Nav className="mr-auto" navbar>
                    {(() => { if (!this.state.isMobile) { return navigationButtons[1]; } else { return null; } })()}
                </Nav>
            </Navbar>
        )];
        if (this.state.isMobile) {
            // Instead of rendering the navigation in the navbar above, we will render it in another navbar so that it appears below the icon
            navigation.push((
                <Navbar key="1A" light expand="md">
                    {/* The two navs here gives us the two column effect as we decrease the size */}
                    <Nav className="ml-auto mr-auto" navbar>
                        {navigationButtons[0]}
                    </Nav>
                    <Nav className="ml-auto mr-auto" navbar>
                        {navigationButtons[1]}
                    </Nav>
                </Navbar>
            ));
        }
        // Render!
        return (
            <div style={{ position: "absolute", width: "100%", left: "0px", top: "0px", backgroundColor: "rgba(0, 0, 0, 0)" }}>
                {navigation}
            </div>
        )
    }
}
/*****************************************************************APP*****************************************************************/

/***************************************************************EXPORTS***************************************************************/
export default Navigation;
/***************************************************************EXPORTS***************************************************************/