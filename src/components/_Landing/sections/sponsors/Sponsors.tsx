import React from "react";
import echo_3d from "../../assets/sponsors/echo_3d.png";
import nj_transit from "../../assets/sponsors/nj_transit.png";
import merck from "../../assets/sponsors/merck.png";
import cloud3 from "../../assets/clouds/cloud3.png";
import cloud2 from "../../assets/clouds/cloud2.png";

function Sponsors() {
    return (
        <div
            id="Sponsors"
            className="w-full h-fit
                    pb-24 relative overflow-hidden
                    flex flex-col items-center px-6">
            <div className="w-full max-w-6xl relative ">
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
                                transparent-black-background rounded-lg flex flex-row
                                flex-wrap justify-center items-center z-20 relative">
                    <a href="https://www.njtransit.com/hackathons"
                        target="_blank"
                        rel="noopener noreferrer">
                        <img src={nj_transit}
                            alt="NJ Transit"
                            className="w-44 h-auto m-10" />
                    </a>

                    <img src={merck}
                        alt="Merck"
                        className="m-10 -mt-5" />
                </div>
            </div>
        </div>
    );
}

export default Sponsors;