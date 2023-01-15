import { createContext } from "react";
import { AboutConfigPresets } from "./config/aboutConfigAbout";

const AboutContext = createContext<AboutConfigPresets>(2);
export default AboutContext;
