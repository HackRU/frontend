import React, { useEffect } from "react";
import "./Landing.css";
// import About from "../Landing/Sections/About";
import Footer from "./sections/footer/Footer";
import About from "./sections/about/about";
import FAQ from "./sections/faq/FAQ";
import Hero from "./sections/hero/hero";
import Schedule from "./sections/schedule/Schedule";
import Sponsors from "./sections/sponsors/Sponsors";
import { randomizeAnimationDurations } from "./utilities";

function LandingPage(props: any) {

    useEffect(() => {
        randomizeAnimationDurations("floating", 5, 9);
        randomizeAnimationDurations("clouds", 300, 500);
    }, []);

    return (
        <div className="w-full h-fit bg-gradient-to-b from-mainBg to-endBg">
            <Hero profile={props.profile} />
            <About />
            <Schedule />
            <FAQ />
            <Sponsors />
            <Footer />
        </div>
    );
}
export default LandingPage;
