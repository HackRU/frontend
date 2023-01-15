import "../src/index.css";

let computedStyle = getComputedStyle(document.body);

const defaults = {
    volunteers: {
        display: true,
        vol_url:
            "https://docs.google.com/forms/d/e/1FAIpQLSe_qBzqsJIKWd_BohZ7Xuju3XQhI2f6xtrwX7WO-otR0Q7ofg/viewform?usp=sf_link",
        mentor_url:
            "https://docs.google.com/forms/d/e/1FAIpQLScG3eyzY67q58k52zh5nSscUBWRoYn8KayVNAXqYvJl8oqD8Q/viewform",
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