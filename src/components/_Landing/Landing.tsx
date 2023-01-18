import React from "react";
import "./Landing.css";
// import About from "../Landing/Sections/About";
import Footer from "./sections/footer/Footer";
import About from "./sections/about/about";
import FAQ from "./sections/faq/FAQ";
import Hero from "./sections/hero/hero";
import Schedule from "./sections/schedule/Schedule";
import Sponsors from "./sections/sponsors/Sponsors";
import ParticleBackground from "./assets/Particles";

function LandingPage(props: any) {
    return (
        <div className="w-full h-fit bg-gradient-to-b from-mainBg to-endBg">
            <ParticleBackground />
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
