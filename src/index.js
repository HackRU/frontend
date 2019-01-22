import React from "react"; // Required react dependencies
import ReactDOM from "react-dom"; // Required react dependencies
import { register, unregister } from "./serviceWorker"; // Service worker dependencies
import App from "./App"; // Default app and component to be rendered
import { defaults } from "./Defaults"; // The standard list of strings that we will be using throughout the application
import "bootstrap/dist/css/bootstrap.min.css"; // Boostrap import
/**
 * Application entry point. Here we render the standard root components that are standard to all pages in the website
 * 
 * @param {boolean} worker Toggle the default react service worker.
 *      We default this to false because enabling the service worker brings with it application caching, which causes production
 *      issues during version updates. If you would like to know about this issue in depth, read through the react documentation.
 */
function main(worker) {
    // Render the default title
    ReactDOM.render(defaults.title, document.getElementById("title"))
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
