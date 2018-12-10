/**
 * @author Shivan Modha
 * @description App object class, which is the first thing to be rendered
 * @version 0.0.1
 * Created 12/09/18
 */
/***************************************************************IMPORTS***************************************************************/
import React, { Component } from "react"; // Default react imports for the component
import { BrowserRouter, Route, Switch } from "react-router-dom"; // React router components
import {
    LandingPage,
    DashboardPage,
    E404 } from "./components/Pages"; // Router Pages
import MLHBadge from "./MLHBadge";
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
                    <Switch>
                        {/* This is where the URL routing magic actually happens */}
                        <Route exact path="/" component={LandingPage} />
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