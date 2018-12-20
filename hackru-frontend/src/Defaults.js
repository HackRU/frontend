/**
 * @author Shivan Modha
 * @description Application default settings
 * @version 0.0.1
 * Created 12/09/18
 */
/***************************************************************IMPORTS***************************************************************/
import React from "react";
import About from "./components/Landing/Sections/About";
import Schedule from "./components/Landing/Sections/Schedule";
import Sponsors from "./components/Landing/Sections/Sponsors";
import FAQs from "./components/Landing/Sections/Faqs";
/***************************************************************IMPORTS***************************************************************/

/***************************************************************STRINGS***************************************************************/
const defaults =  {
    "title": "HackRU Spring 2019",
    "dateText": "March 9th-10th",
    "locationText": "College Avenue Student Center",
    "universityText": "Rutgers University",
    "mobileWidthThresholdSensitive": 1500,
    "mobileWidthThresholdRelaxed": 1200,
    "poc": true
}
/***************************************************************STRINGS***************************************************************/

/***************************************************************NAVLINK***************************************************************/
const navlinks = {
    "About Us": {
        "url": "#about",
        "enabled": true,
        "component": (<About />)
    },
    "Schedule": {
         "url": "#schedule",
         "enabled": true,
         "component": (<Schedule />)
    },
    "Sponsors": {
        "url": "#sponsoers",
        "enabled": true,
        "component": (<Sponsors />)
    },
    "FAQs": {
        "url": "#faqs",
        "enabled": true,
        "component": (<FAQs />)
    }
}
/***************************************************************NAVLINK***************************************************************/

/****************************************************************THEME****************************************************************/
const theme = {
    "primary": ["#26E8BD", "#5FFFDC"],
    "secondary": ["#5A7A96", "#354a5f"],
    "accent": ["#FF80CF", "#F8A5FF"]
}
/****************************************************************THEME****************************************************************/

/***************************************************************EXPORTS***************************************************************/
export {
    defaults,
    navlinks,
    theme
};
/***************************************************************EXPORTS***************************************************************/