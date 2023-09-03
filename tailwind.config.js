/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    blocklist: [
        "collapse",
    ],
    theme: {
        extend: {
            screens: {
                "xs-about": "300px",
                //replace this with section specific breakpoints
                "sm-about": "300px",
                "md-about": "900px",
                "lg-about": "1000px",
                "xl-about": "1440px"
            },
            colors: {
                "mainBg": "#1f6aa0",
                "endBg": "#0f3854",
                "text": "#f1e192",
                "textSubtitle": "#f1e192",

                "f23-darkGreen": "#133d35",
                "f23-mediumGreen": "#3e8169",
                "f23-lightGreen": "#8db67e",
                "f23-yellowGreen": "#f1e192"
            },
            fontSize: {
                "10xl": "9rem",
                "11xl": "10rem",
                "12xl": "11rem",
                "13xl": "12rem"
            },
            spacing: {
                "128": "32rem",
                "144": "36rem",
            }
        },
    },
    plugins: [],
};
