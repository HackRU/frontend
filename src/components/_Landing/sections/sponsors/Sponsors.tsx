import React from "react";
import rutgersLogo from "../../assets/rutgers.png";
import pig from "../../assets/sammiPig.png";
import cloud3 from "../../assets/clouds/cloud3.svg";
import cloud2 from "../../assets/clouds/cloud2.svg";

function Sponsors() {
    return (
        <div
            id="Sponsors"
            className="w-full h-fit
                    p-24 relative overflow-hidden
                    flex flex-col items-center px-6">
            <div className="w-full max-w-6xl relative ">
                <div className="text-text glow-subtitles font-semibold text-5xl sm:text-7xl text-left w-full">
                    Sponsors
                </div>

                <img src={pig}
                    alt="pig"
                    className="absolute -top-44 -right-10 w-64
          sm:-top-40 sm:-right-20 sm:w-96
          md:right-0 md:-top-40
          lg:right-20 lg:w-128 lg:-top-60
          z-40 floating" />

                <img src={cloud3}
                    alt="cloud"
                    className="absolute z-0 w-96 top-[30rem] left-[30rem] opacity-50
          md:top-44 md:left-[50rem]
          lg:w-144 lg:left-[50rem]
          cloud"/>

                <img src={cloud2}
                    alt="cloud"
                    className="absolute z-0 w-96 top-[10rem]
         left-[-20rem] opacity-50
          md:top-[30rem] md:left-[-20rem]
          lg:w-144 lg:left-[-20rem]
          cloud"/>

                <div className="w-full py-12 px-5 transparent-black-background mt-10 rounded-lg flex flex-row flex-wrap justify-center z-20 relative">
                    <img src={rutgersLogo}
                        alt="Rutgers Logo"
                        className="max-w-xs md:max-w-md" />
                    {/* <img src={rutgersLogo2} alt="Rutgers Logo" className="max-w-xl" /> */}
                    <img src={rutgersLogo}
                        alt="Rutgers Logo"
                        className="max-w-xs md:max-w-md" />
                    <img src={rutgersLogo}
                        alt="Rutgers Logo"
                        className="max-w-xs md:max-w-md" />
                    <img src={rutgersLogo}
                        alt="Rutgers Logo"
                        className="max-w-xs md:max-w-md" />
                    <img src={rutgersLogo}
                        alt="Rutgers Logo"
                        className="max-w-xs md:max-w-md" />
                    <img src={rutgersLogo}
                        alt="Rutgers Logo"
                        className="max-w-xs md:max-w-md" />
                </div>
            </div>
        </div>
    );
}

export default Sponsors;