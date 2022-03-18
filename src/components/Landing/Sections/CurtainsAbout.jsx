import React from "react";
import LottieFile from "./LottieFile";
import curtains from "./curtains.json";

function CurtainsAbout() {
    return (
        <LottieFile data={curtains} />
    );
}

export default CurtainsAbout;
