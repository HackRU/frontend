
import React, { Component } from "react";

/**
 * About component for the landing page
 */
class About extends Component {
    render() {
        return (
            <div>
                <h1 className="display-4 theme-font">About <img width="150" alt="logo" src="./assets/icons/hru-logo-white.svg" ></img></h1>
                <hr />
                <h2>Who and What?</h2>
                <p>HackRU is a 24-hour hackathon at Rutgers University. We welcome hundreds of students to join us in building awesome software and hardware projects. Industry experts and mentors come from all over the country to create an environment that fosters an atmosphere of learning through tech talks and one-on-one guidance. We encourage beginner and advanced hackers alike to challenge themselves and expand their skills. Learn more about HackRU by reading our articles on <a href="https://medium.com/the-hackru">medium!</a></p>
                <h2>When and Where?</h2>
                <p>HackRU is from March 9th to 10th, 2019 at the College Ave Student Center in New Brunswick, NJ. The College Ave Student Center is located at 126 College Ave, New Brunswick, NJ 08901.</p>
                <iframe title="about-map" frameBorder={0} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1516.8805467681675!2d-74.45265422104657!3d40.5026657080946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3c6555ac2d7f7%3A0x8820e7c83ea74250!2sCollege+Avenue+Student+Center!5e0!3m2!1sen!2sus!4v1502828160852" width="100%" style={{ minHeight: "300px", height: "100%" }}></iframe>
                <hr  />
             </div>
        )
    }
}

export default About;
