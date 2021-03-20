import LandingLinker from "./core/Landing/LandingLinker";
import LandingConfig from "./core/Landing/LandingConfig";
import { defaults, theme, navlinks } from "./Defaults";

const RouteLinker = [
    {
        config: LandingConfig,
        store: {
            defaults,
            theme,
            navlinks,
        },
        linker: LandingLinker,
        path: "/",
    },
    {
        config: LandingConfig,
        store: {
            defaults,
            theme,
            navlinks,
        },
        linker: LandingLinker,
        path: "/test",
    },
];

export default RouteLinker;
