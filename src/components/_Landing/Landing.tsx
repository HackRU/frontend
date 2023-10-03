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
import { scrollToSectionName, useUserScrolled } from "./sections/hero/utilities";
import { FaArrowDown } from "react-icons/fa";

function LandingPage(props: any) {
    const userHasScrolled = useUserScrolled(7);

    useEffect(() => {
        randomizeAnimationDurations("floating", 5, 9);
        randomizeAnimationDurations("clouds", 300, 500);
    }, []);

    return (
        <div
            className="w-full h-fit">
            <Sun />

            <FaArrowDown
                className={`fixed z-50 bottom-9 text-f23-yellowGreen text-6xl hover:cursor-pointer
                    left-[46vw] ml-0 opacity-90
                    floating ${!userHasScrolled ? "visible" : "invisible"}`}
                onClick={() => scrollToSectionName("About")}
            />

            <Hero profile={props.profile} />
            <div id = "About" className = "pt-3">
                <SectionTitle title="ABOUT" />
            </div>
            <About />

            <div id = "Schedule" className = "pt-3">
                <SectionTitle title="SCHEDULE" />
            </div>
            <Schedule />
            <div id = "Sponsors" className = "pt-3">
                <SectionTitle title="SPONSORS" />
            </div>
            <Sponsors />
            <div id = "FAQ" className = "pt-3">
                <SectionTitle title="FAQ" />
            </div>
            <FAQ />

            <Footer />
        </div>
    );
}
export default LandingPage;
