import React from "react";
import AboutSponsorship from "./Sections/AboutSponsorship"; 
import SponsorshipPackages from "./Sections/SponsorshipPackages";
import Testimonials from "./Sections/Testimonials"; 
import Recap from "./Sections/Recap";  
import Footer from "./Sections/Footer"; 


const sponsorshipLinks = {
    "About": {
        "url": "#about",
        "enabled": true,
        "hideLink": false,
        "fullHeight": false,
        "component": (props) => <AboutSponsorship {...props} />
    },
    "Recap": {
        "url": "#recap",
        "enabled": true,
        "hideLink": false,
        "fullHeight": false,
        "component": (props) => <Recap {...props} />
    },
    "Testimonials": {
        "url": "#testimonials",
        "enabled": true,
        "hideLink": false,
        "fullHeight": false,
        "component": (props) => <Testimonials {...props} />
    },
    "Packages": {
        "url": "#packages",
        "enabled": true,
        "hideLink": false,
        "fullHeight": false,
        "component": (props) => <SponsorshipPackages {...props} />
    },
    "Footer": {
        "url": "#footer",
        "enabled": true,
        "hideLink": true,
        "fullHeight": false,
        "skew": false,
        "component": (props) => <Footer {...props} />
    },

}

export {
    sponsorshipLinks
}
