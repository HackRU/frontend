import { navlinks } from "../../Defaults";

const LandingConfig = [
    {
        module: "LANDING",
        params: {
            loggedOut: false,
            isMobile: false,
        },
        children: [
            {
                module: "HOME",
                params: {
                    loggedOut: false,
                    isMobile: false,
                    linkProps: navlinks.HOME,
                },
                children: [],
            },
            {
                module: "ABOUT",
                params: {
                    loggedOut: false,
                    isMobile: false,
                    linkProps: navlinks.ABOUT,

                },
                children: [],
            },
            {
                module: "SCHEDULE",
                params: {
                    loggedOut: false,
                    isMobile: false,
                    linkProps: navlinks.SCHEDULE,

                },
                children: [],
            },
            {
                module: "SPONSORS",
                params: {
                    loggedOut: false,
                    isMobile: false,
                    linkProps: navlinks.SPONSORS,

                },
                children: [],
            },
            {
                module: "PARTNERS",
                params: {
                    loggedOut: false,
                    isMobile: false,
                    linkProps: navlinks.PARTNERS,

                },
                children: [],
            },
            {
                module: "STATS",
                params: {
                    loggedOut: false,
                    isMobile: false,
                    linkProps: navlinks.STATS,

                },
                children: [],
            },
            {
                module: "FAQS",
                params: {
                    loggedOut: false,
                    isMobile: false,
                    linkProps: navlinks.FAQS,

                },
                children: [],
            },
            {
                module: "FOOTER",
                params: {
                    loggedOut: false,
                    isMobile: false,
                    linkProps: navlinks.FOOTER,

                },
                children: [],
            },
        ],
    },
];

export default LandingConfig;
