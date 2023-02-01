import { useContext } from "react";
import AboutContext from "../contextAbout";
import {
    aboutMIT,
    aboutMiddleFocus,
    aboutOriginal,
    AboutConfig,
    AboutConfigPresets,
} from "../config/aboutConfigAbout";

/**
 * Contains all the configurations for the hero components.
 * ORDERING OF PRESETS IS IMPORTANT
 */

const configs = [aboutOriginal, aboutMiddleFocus, aboutMIT];

/**
 * Verifies that the preset is valid by checking with the configs array.
 * @returns {boolean} Whether the preset is valid or not.
 */
function useVerifyPreset() {
    const preset: AboutConfigPresets = useContext(AboutContext);
    return !(preset > configs.length || preset < 0 || !configs[preset]);
}

/**
  This is the hero config hook used by hero components to retrieve configuration.
  The configuration they receive is determined by the HeroContext provider.
  To change the HeroContext, you would need to go to contexts.tsx and change the value of the HeroContext.
  @returns {AboutConfig} The configuration for the hero component.
 */
function useAboutConfig(): AboutConfig {
    if (!useVerifyPreset()) {
        throw new Error("Invalid preset. ");
    }
    const preset: AboutConfigPresets = useContext(AboutContext);
    return configs[preset];
}

export default useAboutConfig;
export { useVerifyPreset };
