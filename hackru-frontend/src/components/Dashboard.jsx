/**
 * @author Shivan Modha
 * @description The standard login page
 * @version 0.1.2
 * Created 12/09/18
 */
/***************************************************************IMPORTS***************************************************************/
import React, { Component } from "react";
import { Container } from "reactstrap";
import { theme } from "../Defaults";
import { Redirect } from "react-router-dom";
/***************************************************************IMPORTS***************************************************************/

/**************************************************************DASHBOARD**************************************************************/
/**
 * Application dashboard
 */
class Dashboard extends Component {
    render() {
        // Authorized personal only!
        if (!this.props.profile.isLoggedIn) {
            return (<Redirect to="/login"/>)
        }
        return (
            <Container fluid style={{ width: "100%", minHeight: "100vh", textAlign: "center", backgroundColor: theme.secondary[1] }} className="d-flex align-items-center">
                Dashboard
            </Container>
        );
    }
}
/**************************************************************DASHBOARD**************************************************************/

/***************************************************************EXPORTS***************************************************************/
export default Dashboard;
/***************************************************************EXPORTS***************************************************************/