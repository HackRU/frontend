/**
 * @author Shivan Modha
 * @description Application Root. This is the first thing that the code executes
 * @version 3.1.2
 * Created 12/09/18
 */
/***************************************************************IMPORTS***************************************************************/
import React from "react";
import ReactDOM from "react-dom";
import { register, unregister } from "./serviceWorker";
import App from "./App";
import strings from "./Strings";
/***************************************************************IMPORTS***************************************************************/

/*****************************************************************APP*****************************************************************/
/**
 * Application entry point. Here we render the standard root components that are standard to all pages in the website
 * 
 * @param {boolean} worker Toggle the default react service worker.
 *      We default this to false because enabling the service worker brings with it application caching, which causes production
 *      issues during version updates. If you would like to know about this issue in depth, read through the react documentation.
 */
function main(worker) {
    // Render the default title
    ReactDOM.render(strings.title, document.getElementById("title"))
    // Render the default root object
    ReactDOM.render(<App />, document.getElementById("root"));
    // Decide whether or not we need to enable the default serviceworker
    if (worker) {
        register();
    } else {
        unregister();
    }
}
main(false)
/*****************************************************************APP*****************************************************************/

// Kill me now ~ Vijay Modha @8:13pm,12/9/18