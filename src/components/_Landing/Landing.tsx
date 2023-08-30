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
import SectionTitle from "./global_components/SectionTitle";

function LandingPage(props: any) {

    useEffect(() => {
        randomizeAnimationDurations("floating", 5, 9);
        randomizeAnimationDurations("clouds", 300, 500);
    }, []);

    return (
        <div
            className="w-full h-fit">
            <Sun />
            <Hero profile={props.profile} />
            <SectionTitle title="ABOUT" />
            <About />

            <SectionTitle title="SCHEDULE" />
            <Schedule />

            <SectionTitle title="SPONSORS" />
            <Sponsors />

            <SectionTitle title="FAQ" />
            <FAQ />

            <SectionTitle title="FOOTER" />
            <Footer />
        </div>
    );
}
export default LandingPage;
