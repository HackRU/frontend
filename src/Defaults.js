/**
 * @author Shivan Modha
 * @description Application default settings
 * @version 0.0.1
 * Created 12/09/18
 */
import React from "react";
import About from "./components/Landing/Sections/About";
import AboutSponsorship from "./components/Sponsorship/Sections/AboutSponsorship";
import SponsorshipPackages from "./components/Sponsorship/Sections/SponsorshipPackages";
import Testimonials from "./components/Sponsorship/Sections/Testimonials";
import Recap from "./components/Sponsorship/Sections/Recap";
import Schedule from "./components/Landing/Sections/Schedule";
import Sponsors from "./components/Landing/Sections/Sponsors";
import FAQs from "./components/Landing/Sections/Faqs";
import Footer from "./components/Landing/Sections/Footer";

const defaults =  {
    "title": "HackRU Spring 2019",
    "dateText": "March 9th-10th",
    "locationText": "College Avenue Student Center",
    "universityText": "Rutgers University",
    "mobileWidthThresholdSensitive": 1500,
    "mobileWidthThresholdRelaxed": 1200,
    "poc": true,
    "rest": {
        "dev": "https://7c5l6v7ip3.execute-api.us-west-2.amazonaws.com/lcs-test",
        "prod": "https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest",
        "resumes": "https://hackru-resumes.s3.amazonaws.com",
    }
}

const navlinks = {
    "About Us": {
        "url": "#about",
        "enabled": true,
        "hideLink": false,
        "fullHeight": false,
        "component": (props) => <About {...props} />
    },
    "Schedule": {
        "url": "#schedule",
        "enabled": true,
        "hideLink": false,
        "fullHeight": false,
        "component": (props) => <Schedule {...props} />
    },
    "Sponsors": {
        "url": "#sponsors",
        "enabled": true,
        "hideLink": false,
        "fullHeight": false,
        "component": (props) => <Sponsors {...props} />
    },
    "FAQs": {
        "url": "#faqs",
        "enabled": true,
        "hideLink": false,
        "fullHeight": false,
        "component": (props) => <FAQs {...props} />
    },
    "Footer": {
        "url": "#footer",
        "enabled": true,
        "hideLink": true,
        "fullHeight": false,
        "skew": false,
        "component": (props) => <Footer {...props} />
    }
}

const sponsorshipLinks = {
    "About": {
        "url": "#about",
        "enabled": true,
        "hideLink": false,
        "fullHeight": false,
        "component": (props) => <AboutSponsorship {...props} />
    },
    "Packages": {
        "url": "#packages",
        "enabled": true,
        "hideLink": false,
        "fullHeight": false,
        "component": (props) => <SponsorshipPackages {...props} />
    },
    "Testimonials": {
        "url": "#testimonials",
        "enabled": true,
        "hideLink": false,
        "fullHeight": false,
        "component": (props) => <Testimonials {...props} />
    },
    "Recap": {
        "url": "#recap",
        "enabled": true,
        "hideLink": false,
        "fullHeight": false,
        "component": (props) => <Recap {...props} />
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
// To unify styling between javascript and css, we define these variables in "index.css" as a variable, and proceed to get a handle
// to the respective values through JavaScript
let computedStyle = getComputedStyle(document.body);
const theme = {
    "primary": [
        computedStyle.getPropertyValue("--primary-color"),
        computedStyle.getPropertyValue("--primary-color-alt")],
    "secondary": [
        computedStyle.getPropertyValue("--secondary-color"),
        computedStyle.getPropertyValue("--secondary-color-alt")],
    "accent": [
        computedStyle.getPropertyValue("--accent-color"),
        computedStyle.getPropertyValue("--accent-color-alt")],
}
// Populate the theme variable with css variables
let varList = [
    // Form Inputs
    "input-background",
    "input-placeholder",
    "input-border",
    "input-color",
    "input-border-radius",
    "select-background",
    "select-color",
    "select-input-background",
    // Hero Image
    "hero-width",
    "hero-height",
    "hero-border-radius",
    "hero-background"
];
varList.forEach((element) => {
    theme[element] = computedStyle.getPropertyValue("--" + element);
    return element;
});

export {
    defaults,
    navlinks,
    sponsorshipLinks,
    theme
};
