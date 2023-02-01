let computedStyle = getComputedStyle(document.body);

const defaults = {
    volunteers: {
        display: true,
        vol_url:
            "https://forms.gle/E5vYLKRV7BnCQ97c9",
        mentor_url:
            "https://forms.gle/59f4Bzzrv1Anomss5",
    },
    mailing:
        "https://hackru.us3.list-manage.com/subscribe?u=457c42db47ebf530a0fc733fb&id=fb01885829",

};
const theme = {
    primary: [
        computedStyle.getPropertyValue("--primary-color"),
        computedStyle.getPropertyValue("--primary-color-alt"),
    ],
    secondary: [
        computedStyle.getPropertyValue("--secondary-color"),
        computedStyle.getPropertyValue("--secondary-color-alt"),
    ],
    accent: [
        computedStyle.getPropertyValue("--accent-color"),
        computedStyle.getPropertyValue("--accent-color-alt"),
    ],
    disabled: [computedStyle.getPropertyValue("--disabled-color")],

    splitCard:[
        computedStyle.getPropertyValue("--splitCard-color"),
    ],
};

let varList = [
    // Form Inputs
    "input-background",
    "input-placeholder",
    "input-border",
    "input-color",
    "input-border-radius",
    "select-background",
    "select-color",
    "select-input-background",
    // Hero Image
    "hero-width",
    "hero-height",
    "hero-border-radius",
    "hero-background",
    // Sponsors
    "sponsors-title-color",
    "sponsors-platinum-color",
    "sponsors-gold-color",
    "sponsors-silver-color",
    "sponsors-bronze-color",
];
varList.forEach((element) => {
    theme[element] = computedStyle.getPropertyValue("--" + element);
    return element;
});

export {theme,defaults};