import React from "react";
// import About from "../Landing/Sections/About";
import Footer from "../Landing/Sections/Footer";
import FAQ from "./sections/faq/FAQ";
import Hero from "./sections/hero/hero";
import Sponsors from "./sections/sponsors/Sponsors";

function LandingPage() {
    return (
        <div className="w-full h-fit bg-gradient-to-b from-mainBg to-endBg">
            <Hero />
            {/* <About /> */}
            {/* <Schedule /> */}
            <FAQ />
            <Sponsors />
            <Footer />
        </div>
    );
}
export default LandingPage;
