import LandingConfig from "./core/landing/LandingConfig.js";

import LANDING_LINKER from "./core/landing/LandingLinker.js";
const RouteLinker = [
    {
        config: LandingConfig,
        linker: LANDING_LINKER,
        store: "",
        path: "/",
    },
];

export default RouteLinker;
