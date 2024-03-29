import React from "react";
import { Link } from "react-router-dom";
import SocialMediaComponent from "../../global_components/SocialMediaComponent";

function LoginAndRegister(props: { isLoggedIn: boolean, registrationOpen: true, }) {
    const { isLoggedIn, registrationOpen } = props;
    return (
        <div className="z-10 py-10 px-10 sm:px-20 rounded-3xl flex flex-row justify-center space-x-10 sm:space-x-10">
            <div className="transparent-black-background font-extrabold grow
                    w-32 h-16 rounded-2xl text-text glow-subtitles flex items-center justify-center">
                {!isLoggedIn && <Link to="/login">Log In</Link>}
                {isLoggedIn && <Link to="/login">Dashboard</Link>}
            </div>
            <div className="transparent-black-background font-extrabold
                    w-fit p-4 h-16 rounded-2xl text-text glow-subtitles flex grow items-center justify-center">
                {!isLoggedIn && registrationOpen && <Link to="/signup">Sign Up</Link>}
                {!isLoggedIn && !registrationOpen && <span>Registration Closed</span>}
                {isLoggedIn && <Link to="/logout">Sign out</Link>}
            </div>
        </div>
    );
}

function HeroTitle() {
    return (
        <div className="w-full px-3 md:mt-28">
            <div className="z-30 rounded-3xl w-full h-full p-10 transparent-black-background">
                <div className="text-text glow-subtitles font-bold text-[4rem] sm:text-9xl md:text-10xl lg:text-12xl">
                    HACKRU
                </div>
                <div className="w-full flex justify-center">
                    <div className="text-2xl font-extrabold md:text-4xl lg:text-4xl glow-subtitles text-text flex">
                        Hack All Knight &nbsp;
                    </div>
                </div>
                <div className="text-2xl font-extrabold md:text-4xl lg:text-4xl glow-subtitles text-textSubtitle mt-4 flex flex-col md:flex-row md:justify-center md:items-center">
                    Fall 2023 <span className="text-sm mx-5 my-4 md:my-0 text-text ">&#9679;</span> Oct 7-8
                </div>
            </div>
        </div>
    );
}

function CenterContent({ isLoggedIn }: { isLoggedIn: boolean }) {
    return (
        <div className="w-full flex flex-col justify-start items-center
                    z-30 mt-[8rem] md:mt-0
                    md:items-start relative">
            <div className="flex flex-col space-y-1">
                <HeroTitle />
                <LoginAndRegister
                    isLoggedIn={isLoggedIn}
                    registrationOpen={true}
                />
                <SocialMediaComponent />
            </div >
        </div >
    );
}


export default CenterContent;

