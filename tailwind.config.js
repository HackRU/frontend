/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/components/_Landing/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                "xs": "480px",
                //replace this with section specific breakpoints
                "sm-about": "300px",
                "md-about": "900px",
                "lg-about": "1000px",
                "xl-about": "1440px"
            },
            colors: {
                "mainBg": "#1f6aa0",
                "endBg": "#0f3854",
                "text": " #d1e9ef",
                "textSubtitle": "#95dcf0"
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
