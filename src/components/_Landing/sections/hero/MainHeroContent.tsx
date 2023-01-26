import React from "react";
import { IoMoon } from "react-icons/io5";
import { Link } from "react-router-dom";

function LoginAndRegister(props: { isLoggedIn: boolean }) {
    const { isLoggedIn } = props;
    return (
        <div className="z-10 p-10 rounded-3xl flex flex-row justify-center space-x-10 sm:space-x-24">
            <div className="transparent-black-background font-extrabold
                    w-32 h-16 rounded-2xl text-text glow-subtitles flex items-center justify-center">
                {!isLoggedIn && <Link to="/login">Log In</Link>}
                {isLoggedIn && <Link to="/login">Dashboard</Link>}
            </div>
            <div className="transparent-black-background font-extrabold
                    w-32 h-16 rounded-2xl text-text glow-subtitles flex items-center justify-center">
                {!isLoggedIn && <Link to="/signup">Sign Up</Link>}
                {isLoggedIn && <Link to="/logout">Sign out</Link>}
            </div>
        </div>
    );
}

function HeroTitle() {
    return (
        <div className="w-full px-3 md:mt-16">
            <div className="z-30 rounded-3xl w-full h-full p-10 transparent-black-background">
                <div className="text-text glow-subtitles font-bold text-[4rem] sm:text-9xl md:text-10xl lg:text-12xl">
                    HACKRU
                </div>
                <div className="w-full flex justify-center">
                    <div className="text-2xl font-extrabold md:text-4xl lg:text-4xl glow-subtitles text-text flex">
                        Hack All Knight &nbsp;
                        <span className="relative mt-1 md:mt-0">
                            <div className="glowing-moon-container" />
                            <IoMoon className="rotate-[270deg]" />
                        </span>
                    </div>
                </div>
                <div className="text-2xl font-extrabold md:text-4xl lg:text-4xl glow-subtitles text-textSubtitle mt-4 flex flex-col md:flex-row md:justify-center md:items-center">
                    Spring 2023 <span className="text-sm mx-5 my-4 md:my-0 text-text ">&#9679;</span> Feb 25 - 26
                </div>
            </div>
        </div>
    );
}

function CenterContent({ isLoggedIn }: { isLoggedIn: boolean }) {
    return (
        <div className="w-full flex flex-col justify-start items-center
                    z-30
                    md:items-start relative">
            <div className="flex flex-col space-y-1">
                <HeroTitle />
                <LoginAndRegister isLoggedIn={isLoggedIn} />
            </div>
        </div>
    );
}


export default CenterContent;

