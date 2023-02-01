type AboutConfigPresets = 0 | 1 | 2;

interface AboutConfig {
  mainComponent: {
    sidebarVisible: boolean;
    horizontalBarsVisible: boolean;
    headerTextBubblesVisible: boolean;
    headerTextAlignment: "left" | "middle" | "right" | "NA";
    subTextAlignment: "left" | "middle" | "right" | "NA";
    useSplitCards: boolean;
  };
}

const aboutOriginal: AboutConfig = {
    mainComponent: {
        sidebarVisible: true,
        horizontalBarsVisible: true,
        headerTextBubblesVisible: true,
        headerTextAlignment: "left",
        subTextAlignment: "left",
        useSplitCards: false,
    },
};
const aboutMiddleFocus: AboutConfig = {
    mainComponent: {
        sidebarVisible: false,
        horizontalBarsVisible: false,
        headerTextBubblesVisible: true,
        headerTextAlignment: "middle",
        subTextAlignment: "middle",
        useSplitCards: false,
    },
};

const aboutMIT: AboutConfig = {
    mainComponent: {
        sidebarVisible: false,
        horizontalBarsVisible: false,
        headerTextBubblesVisible: false,
        headerTextAlignment: "NA",
        subTextAlignment: "NA",
        useSplitCards: true,
    },
};
export { aboutOriginal, aboutMiddleFocus, aboutMIT };
export type { AboutConfig, AboutConfigPresets };
