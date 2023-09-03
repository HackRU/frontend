import React from "react";
import QuestionContainer from "./QuestionContainer";
import cloud from "../../assets/clouds/cloud1.png";
import cloud3 from "../../assets/clouds/cloud3.png";
import owl from "../../assets/animals/owl-min.png";

function FAQ() {
    return (
        <div
            id="FAQ"
            className="w-full flex h-fit
    relative overflow-visible items-center
    flex-col justify-start min-h-[600px]">
            <div className="w-full h-full max-w-7xl relative flex flex-col items-center pb-[24rem]">
                <QuestionContainer />
                <img src={owl}
                    loading="lazy"
                    alt="owl"
                    className="absolute owl w-[24rem] z-20
                    -left-[7rem] -top-[7rem]
                    md:w-[28rem]
                    lg:w-[32rem] lg:-left-[10rem] lg:-top-[8rem]
                    xl:w-[40rem] xl:-left-[15rem] xl:-top-[8rem]
                    floating" />
                <img src={cloud}
                    className="absolute cloud w-[24rem] z-10" />
                <img src={cloud3}
                    className="absolute top-[44rem] left-96 cloud w-[20rem] z-10 opacity-40" />
            </div>
        </div>
    );
}

export default FAQ;