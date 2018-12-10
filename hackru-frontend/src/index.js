/**
 * @author Shivan Modha
 * @description Application Root. This is the first thing that the code executes
 * @version 3.1.2
 * Created 12/09/18
 */
/***************************************************************IMPORTS***************************************************************/
import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import {register as swRegister, unregister as swUnregister} from "./serviceWorker";
/***************************************************************IMPORTS***************************************************************/

/*****************************************************************APP*****************************************************************/
/**
 * Application entry point. Here we decide what to actually render to the user based on the url. We also control sitewide variables
 * and states here.
 * 
 * @param {boolean} worker Toggle the default react service worker.
 *      We default this to false because enabling the service worker brings with it application caching, which causes production
 *      issues during version updates. If you would like to know about this issue in depth, read through the react documentation.
 */
function main(worker) {
    // Render the default title
    ReactDOM.render("HackRU Spring 2019", document.getElementById("title"))
    ReactDOM.render(<div>Shivan</div>, document.getElementById("root"));
    // Decide whether or not we need to enable the default serviceworker
    if (worker) {
        swRegister();
    } else {
        swUnregister();
    }
}
main(false)
/*****************************************************************APP*****************************************************************/

// Kill me now ~ Vijay Modha @8:13pm,12/9/18