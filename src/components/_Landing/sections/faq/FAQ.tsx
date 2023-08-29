import React from "react";
import QuestionContainer from "./QuestionContainer";
import catPATH from "../../assets/judyCat.png";
import dogPATH from "../../assets/judyDog4.png";
import cloud from "../../assets/clouds/cloud1.png";
import cloud3 from "../../assets/clouds/cloud3.png";

function FAQ() {
    return (
        <div
            id="FAQ"
            className="w-full flex h-fit
    relative overflow-hidden
    flex-col items-center justify-start min-h-[600px]">
            <div className="w-full h-full max-w-7xl relative flex flex-col items-center pt-64 pb-[24rem]">
                <div className="text-7xl text-text glow-subtitles font-semibold">FAQs</div>
                <QuestionContainer />

                <img src={catPATH}
                    className="absolute floating w-[24rem] -left-48 top-12 z-40
                     md:-left-24
                     lg:w-[24rem]
                     xl:w-[30rem] xl:-left-44 xl:top-10" />
                <img src={dogPATH}
                    className="absolute floating w-[24rem] z-30
                                     top-[54rem] -right-[12rem]
                                     sm:top-[42rem]
                                     lg:-right-32 lg:top-[36rem] lg:w-[24rem]
                                     xl:w-[30rem]" />
                <img src={cloud}
                    className="absolute cloud w-[24rem] z-10" />
                <img src={cloud3}
                    className="absolute top-[44rem] left-96 cloud w-[20rem] z-10 opacity-40" />
            </div>
        </div>
    );
}

export default FAQ;