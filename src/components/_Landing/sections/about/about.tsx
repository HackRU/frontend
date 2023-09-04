import React from "react";
import Error from "../error";
import AboutContent from "./components/AboutContent";
import useAboutConfig, { useVerifyPreset } from "./hooks/useConfigAbout";

function About() {
    const validPreset = useVerifyPreset();

    const { mainComponent } = useAboutConfig();
    const {
        useSplitCards,
    } = mainComponent;

    if (!validPreset) {
        return <Error
            title={"Invalid Preset"}
            message={"Please check that you set the hero preset to a valid one."} />;
    }
    // probably not the most dynamic code. Instead of useSplitCards, it should be based on the presents #. derp
    if (useSplitCards) {
        return (
            <div className="flex flex-col items-center"
                id="About">
                <AboutContent />

            </div>
        );
    } else {
        return (
            <div style={{ height: "850px" }}
                id="About">
                <AboutContent />
            </div>
        );
    }


}


export default About;