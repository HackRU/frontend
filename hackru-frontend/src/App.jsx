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
    SchedulePage,
    E404 } from "./components/Pages"; // Router Pages
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
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route exact path="/schedule" component={SchedulePage} />
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