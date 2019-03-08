import React from "react";
import About from "./components/Landing/Sections/About";
import Schedule from "./components/Landing/Sections/Schedule";
import Sponsors from "./components/Landing/Sections/Sponsors/Sponsors.jsx";
import Partners from "./components/Landing/Sections/Partners.jsx";
import FAQs from "./components/Landing/Sections/Faqs";
import Footer from "./components/Landing/Sections/Footer";

const defaults =  {
    "title": "HackRU Spring 2019",
    "dateText": "March 9th-10th",
    "locationText": "College Avenue Student Center",
    "universityText": "Rutgers University",
    "mobileWidthThresholdSensitive": 1500,
    "mobileWidthThresholdRelaxed": 1200,
    "mobileHeightThresholdRelaxed": 650,
    "enableFlyingLogo": false,
    "poc": true,
    "rest": {
        "dev": "https://7c5l6v7ip3.execute-api.us-west-2.amazonaws.com/lcs-test",
        "prod": "https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest",
        "resumes": "https://hackru-resumes.s3.amazonaws.com",
        "s3": "http://hackru-misc.s3-website-us-west-2.amazonaws.com/"
    },
    "sponsorshipLogos": "https://s3-us-west-2.amazonaws.com/hackru-misc/sponsorship-logos/",
    "partnerLogos": "https://s3-us-west-2.amazonaws.com/hackru-misc/partners-logos/"
    
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
    "Partners": {
        "url": "#partners",
        "enabled": true,
        "hideLink": false,
        "fullHeight": false,
        "component": (props) => <Partners {...props} />
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
    "disabled": [
        computedStyle.getPropertyValue("--disabled-color")
    ]
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
    "hero-background",
    // Sponsors
    "sponsors-title-color",
    "sponsors-platinum-color",
    "sponsors-gold-color",
    "sponsors-silver-color",
    "sponsors-bronze-color"
];
varList.forEach((element) => {
    theme[element] = computedStyle.getPropertyValue("--" + element);
    return element;
});
// Live "important links"
const liveImportantLinks = [
    {
        "title": "Waiver",
        "href": "https://hackru.org/resources/waiver.pdf",
        "icon": "file"
    },
    {
        "title": "Devpost",
        "href": "http://hackru-s19.devpost.com",
        "icon": "code"
    },
    {
        "title": "Slack",
        "href": "http://bit.ly/hackru-s19",
        "icon": "slack"
    },
    {
        "title": "HelpQ",
        "href": "http://hackru-helpq.herokuapp.com",
        "icon": "stack-overflow"
    },
    {
        "title": "Food Menu",
        "href": "https://s3-us-west-2.amazonaws.com/hackru-misc/menu.pdf",
        "icon": "cutlery"
    }
];

export {
    defaults,
    navlinks,
    theme,
    liveImportantLinks
};
