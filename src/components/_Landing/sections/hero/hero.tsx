/* eslint-disable indent */
import React from "react";
import MainHeroContent from "./MainHeroContent";
import "./hero.css";
import Navbar from "./Navbar";
import rabbit from "../../assets/suminRabbit2.png";
import cloud from "../../assets/clouds/cloud1.svg";
import cloud2 from "../../assets/clouds/cloud2.svg";
import cloud3 from "../../assets/clouds/cloud3.svg";
import cloud4 from "../../assets/clouds/cloud4.svg";
import { FaArrowDown } from "react-icons/fa";
import { scrollToSectionName, useUserScrolled } from "./utilities";
import { Profile } from "../../../Profile";

function Rabbit() {
    return (
        <div className="absolute z-10 w-[27rem] sm:w-128 bottom-[20rem] -right-32 md:top-60 md:-right-10 lg:w-144 floating">
            <img src={rabbit}
                alt="rabbit" />
        </div>
    );
}

function Hero(props: { profile: Profile }) {
    const userHasScrolled = useUserScrolled(20);
    const { isLoggedIn } = props.profile;

    return (
        <div className="w-[100%] h-[100vh] px-5
                        flex text-white space-y-3 overflow-hidden
                        flex-col items-center text-center justify-start md:justify-start relative
                        md:min-h-[1060px] min-h-[940px]
                        "
            style={{
                minWidth: "372px",
                maxHeight: "1500px"
            }}
        >
            <Navbar />
            <MainHeroContent isLoggedIn={isLoggedIn} />
            <Rabbit />

            <FaArrowDown
                className={`fixed z-10 bottom-5 text-white text-4xl hover:cursor-pointer
                    floating ${!userHasScrolled ? "visible" : "invisible"}`}
                onClick={() => scrollToSectionName("About")}
            />

            <div className="absolute z-0 w-96 top-[30rem] left-[20rem] opacity-50
          md:top-44 md:left-[30rem]
          lg:w-144 lg:left-[20rem]
          cloud">
                <img src={cloud}
                    alt="cloud" />
            </div>
            <div className="absolute z-0 w-96 top-[40rem] left-[35rem]
       opacity-70 md:top-80 md:left-[60rem]
       lg:w-144 lg:left-[70rem] lg:top-[20rem]
       cloud">
                <img src={cloud2}
                    alt="cloud" />
            </div>

            <div className="absolute z-0 w-96 top-[10rem] left-[45rem]
       opacity-50 md:opacity-80 md:top-[30rem] md:left-[40rem]
       lg:top-[40rem] lg:left-[50rem]
       lg:w-144 cloud">
                <img src={cloud3}
                    alt="cloud" />
            </div>

            <div className="absolute z-0 w-96 top-[10rem] left-[-10rem]
       opacity-50 md:opacity-80 md:top-[30rem] md:left-[-10rem]
       lg:top-[40rem] lg:left-[-10rem]
       lg:w-144 cloud">
                <img src={cloud4}
                    alt="cloud" />
            </div>
        </div >
    );
}

Hero.prototypes = {
    config: null
};

export default Hero;
