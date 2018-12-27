/**
 * @author Shivan Modha
 * @description The standard login page
 * @version 0.1.2
 * Created 12/09/18
 */
/***************************************************************IMPORTS***************************************************************/
import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from "reactstrap";
import { theme } from "../Defaults";
import { Redirect } from "react-router-dom";
import { BounceLoader, PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";
/***************************************************************IMPORTS***************************************************************/

/**************************************************************DASHBOARD**************************************************************/
/**
 * Application dashboard
 */
class Dashboard extends Component {
    componentWillMount() {
        this.setState({
            loading: true,
            errors: [],
            user: null
        });
        this.props.profile.Get((msg, data) => {
            if (msg) {

            } else {
                if (data) {
                    console.log(data);
                    this.setState({
                        user: data,
                        loading: false
                    })
                }
            }
        });        
    }
    render() {
        // Authorized personal only!
        if (!this.props.profile.isLoggedIn) {
            return (<Redirect to="/login"/>)
        }
        if (this.state.loading) {
            return (
                <Container fluid style={{ width: "100%", minHeight: "100vh", textAlign: "center", backgroundColor: theme.secondary[1] }} className="d-flex align-items-center">
                    <div style={{ width: "100%", color: "rgba(255, 255, 255, 0.1)" }} align="center">
                        <div style={{ display: "inline-block" }}>
                            <h1 className="display-1">L</h1>
                        </div>
                        <div style={{ display: "inline-block" }}>
                            <BounceLoader color="rgba(255, 255, 255, 0.1)" />
                        </div>
                        <div style={{ display: "inline-block" }}>
                            <h1 className="display-1">ading</h1>
                        </div>
                        <div style={{ display: "inline-block" }}>
                            <PulseLoader color="rgba(255, 255, 255, 0.1)" />
                        </div>
                        <p className="lead">Configuring your personalized dashboard</p>
                    </div>
                </Container>
            ); // This is such a sexy loading screen, I am totally going to use this again in my other applications
        }
        let user = this.state.user;
        return (
            <Container fluid style={{ width: "100%", minHeight: "100vh", textAlign: "center", backgroundColor: theme.secondary[1] }} className="d-flex align-items-center">
                <div style={{ zIndex: 3, color: "white", width: "100%" }} align="center">
                    <Container>
                        <div style={{ width: "100%", textAlign: "left", marginBottom: 0 }}>
                            <h1 className="display-4 theme-font">Welcome, {user.first_name}</h1>
                            <div style={{ display: "inline-block", margin: 10 }}><p className="lead"><Link to="/" className="theme-home-link" style={{ color: theme.secondary[0] + "ff", textDecoration: "none" }}>Home</Link></p></div>
                            <div style={{ display: "inline-block", margin: 10 }}><p className="lead"><Link to="/logout" className="theme-home-link" style={{ color: theme.secondary[0] + "ff", textDecoration: "none" }}>Logout</Link></p></div>
                            <div style={{ display: "inline-block", margin: 10 }}><p className="lead"><a href="/resources/waiver.pdf" className="theme-home-link" style={{ color: theme.secondary[0] + "ff", textDecoration: "none" }}>Waiver</a></p></div>
                            <div style={{ display: "inline-block", margin: 10 }}><p className="lead"><a href="/resources/menu.pdf" className="theme-home-link" style={{ color: theme.secondary[0] + "ff", textDecoration: "none" }}>Food</a></p></div>
                        </div>            
                        <div style={{ width: "100%", textAlign: "left" }}>
                            <p className="lead">User Profile</p>
                        </div>
                        <div style={{ width: "100%", textAlign: "left" }}>
                            <ListGroup>
                                <ListGroupItem tag="button" href="#" action style={{ background: theme.primary[0] + "2F", color: theme.primary[1] + "FF" }}>
                                    <ListGroupItemHeading>Basics</ListGroupItemHeading>
                                    <ListGroupItemText>Introduce yourself, don't be shy!</ListGroupItemText>
                                </ListGroupItem>
                                <ListGroupItem tag="button" href="#" action style={{ background: theme.primary[0] + "2F", color: theme.primary[1] + "FF" }}>
                                    <ListGroupItemHeading>School</ListGroupItemHeading>
                                    <ListGroupItemText>All about your school!</ListGroupItemText>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Container>
                </div>
            </Container>
        );
    }
}
/**************************************************************DASHBOARD**************************************************************/

/***************************************************************EXPORTS***************************************************************/
export default Dashboard;
/***************************************************************EXPORTS***************************************************************/