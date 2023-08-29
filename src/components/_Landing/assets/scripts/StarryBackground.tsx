import React, { useEffect } from "react";
import initStars from "./stars";

function StarryBackground() {

    useEffect(() => {
        initStars(500);
    }, []);

    return <div id="starryBackground"
        className="w-[100vw] h-full absolute top-0 overflow-hidden" />;
}

export default StarryBackground;