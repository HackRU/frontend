/**
 * @author Shivan Modha
 * @description App object class, which is the first thing to be rendered
 * @version 0.0.2
 * Created 12/09/18
 */
/***************************************************************IMPORTS***************************************************************/
import React, { Component } from "react"; // Default react imports for the component
import { BrowserRouter, Route, Switch } from "react-router-dom"; // React router components
import {
    LandingPage,
    DashboardPage,
    LoginPage,
    E404 } from "./components/Pages"; // Router Pages
import FlyingLogo from "./FlyingLogo" // The logos that go up through the page
import MLHBadge from "./MLHBadge"; // We need this to qualify as an official MLH event
/***************************************************************IMPORTS***************************************************************/

/*****************************************************************APP*****************************************************************/
/**
 * Root application class. This is the object rendered in <div id="root" />
 * 
 * This component will handle route handling based on the URL, so that we can show the user specific things based on the requested
 * page, and whether or not they are signed in.
 */
class App extends Component {
    render() {
        return (
            <BrowserRouter style={{ width: "100%" }}>
                {/* BrowserRouter wil allow us to switch between the different pages in our SPA based on the URL routing */}
                <div>
                    {/* We need to show this on our webpage at all times, so we're just going to dump it in the root */}
                    <MLHBadge />
                    {/* We put the background here so that even after the page reroutes to different urls, the flying
                        logos will stay constant, allowing for a seemless user experience. First, we render the logos
                        then we render the background ontop of them, allowing the logos to fly behind the clouds */}
                    <div style={{ position: "fixed", zIndex: 1, width: "100%", height: "100%", left: 0, top: 0, opacity: 0.5 }}>
                        <FlyingLogo url={"./assets/icons/hru-alien-noplat-white.png"} />
                    </div>
                    <div style={{ position: "fixed", zIndex: 2, width: "100%", height: "100%", left: 0, top: 0, background: "url(./assets/hru-background-small.png)", backgroundSize: "cover", opacity: 0.5 }}></div>
                    <Switch>
                        {/* This is where the URL routing magic actually happens */}
                        <Route exact path="/" component={LandingPage} />
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/dashboard" component={DashboardPage} />
                        {/* If none of the other urls were matched, we will show a 404 page to the user */}
                        <Route component={E404} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
/*****************************************************************APP*****************************************************************/

/***************************************************************EXPORTS***************************************************************/
export default App;
/***************************************************************EXPORTS***************************************************************/