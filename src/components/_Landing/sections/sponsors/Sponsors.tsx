import React from "react";
import echo_3d from "../../assets/sponsors/echo_3d.png";
import nj_transit from "../../assets/sponsors/nj_transit.png";
import merck from "../../assets/sponsors/merck.png";
import pig from "../../assets/sammiPig.png";
import cloud3 from "../../assets/clouds/cloud3.png";
import cloud2 from "../../assets/clouds/cloud2.png";

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

                <div className="w-full py-12 px-5
                                transparent-black-background mt-10 rounded-lg flex flex-row
                                flex-wrap justify-center items-center z-20 relative">
                    <img src={echo_3d}
                        alt="Echo 3D"
                        className="w-[20rem] h-[4rem] sm:w-[24rem] sm:h-[5rem] md:w-[35rem] md:h-auto m-10" />
                    <img src={nj_transit}
                        alt="NJ Transit"
                        className="w-44 h-auto m-10" />
                    <img src={merck}
                        alt="Merck"
                        className="m-10 -mt-5" />
                </div>
            </div>
        </div>
    );
}

export default Sponsors;