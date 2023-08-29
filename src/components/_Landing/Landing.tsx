import React, { useEffect } from "react";
import "./Landing.css";
// import About from "../Landing/Sections/About";
import Footer from "./sections/footer/Footer";
import About from "./sections/about/about";
import FAQ from "./sections/faq/FAQ";
import Hero from "./sections/hero/hero";
import { randomizeAnimationDurations } from "./utilities";
import Schedule from "./sections/schedule/Schedule";
import Sponsors from "./sections/sponsors/Sponsors";
import Sun from "./assets/sun/sun";
import initStars from "./assets/scripts/stars";


function LandingPage(props: any) {

    useEffect(() => {
        randomizeAnimationDurations("floating", 5, 9);
        randomizeAnimationDurations("clouds", 300, 500);
        initStars(500);
    }, []);

    return (
        <div
            className="w-full h-fit bg-gradient-to-b
        from-f23-lightGreen via-f23-mediumGreen to-f23-darkGreen
        to-f23-">
            <Sun />
            <Hero profile={props.profile} />
            <About />
            <Schedule />
            <Sponsors />
            <FAQ />
            <Footer />
        </div>
    );
}
export default LandingPage;
