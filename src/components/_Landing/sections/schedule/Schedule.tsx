import React, { useEffect } from "react";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { FaHourglassStart, FaPizzaSlice, FaUtensils } from "react-icons/fa";
import { MdCelebration, MdFreeBreakfast, MdLunchDining, MdOutlineDirectionsTransitFilled } from "react-icons/md";
import { defaults } from "../../../../Defaults";

interface DayInfo {
    day: string,
    times: { time: string, event: string, reactIcon?: JSX.Element }[]
}

const schedule: { [day: string]: DayInfo } = {
    "Saturday": {
        "day": "Saturday",
        "times": [
            { "time": "10:00 AM", "event": "Check-in starts" },
            { "time": "11:00 AM", "event": "Opening Ceremony", "reactIcon": <MdCelebration /> },
            { "time": "12:00 PM", "event": "Team Building Event" },
            { "time": "12:00 PM", "event": "Hacking Starts", "reactIcon": <FaHourglassStart /> },
            { "time": "12:30 PM", "event": "Lunch", "reactIcon": <FaHourglassStart /> },
            { "time": "1:30 PM", "event": "NJ TRANSIT API Demo" },
            { "time": "2:00 PM", "event": "Algorithms in Society Workshop by Ethitech" },
            { "time": "2:30 PM", "event": "MLH Mini Event" },
            { "time": "5:30 PM", "event": "Tech Talk by NJ TRANSIT" },
            { "time": "8:00 PM", "event": "Dinner" },

        ],
    },

    "Sunday": {
        "day": "Sunday",
        "times": [
            { "time": "12:00 AM", "event": "Midnight Surprise" },
            { "time": "8:00 AM", "event": "Breakfast", "reactIcon": <MdFreeBreakfast /> },
            // { "time": "11:00 AM", "event": "Event" },
            { "time": "12:00 PM", "event": "Submissions Due", "reactIcon": <BsFillExclamationTriangleFill /> },
            { "time": "12:30 PM", "event": "Lunch", "reactIcon": <MdLunchDining /> },
            { "time": "1:00 PM", "event": "Judging Begins" },
            { "time": "3:00 PM", "event": "Judging Ends" },
            { "time": "3:30 PM", "event": "Closing Ceremony", "reactIcon": <MdCelebration /> },
            // { "time": "7:00 PM", "event": "Dinner", "reactIcon": <FaUtensils /> },
            // { "time": "9:00 PM", "event": "Venue closes" },
        ],
    }
};

function ScheduleOfTheDay(props: { dayInfo: DayInfo }) {
    const { dayInfo } = props;
    const { day, times } = dayInfo;

    return (
        <div className="flex flex-col w-full my-5">
            <div className="text-5xl md:text-7xl w-full text-center mb-4 font-semibold glow-subtitles text-textSubtitle">{dayInfo.day}</div>
            <div className="w-full">
                {times.map((timeInfo, index) => (
                    <div className="flex flex-row w-full text-xl my-2 md:my-5 md:px-3 pr-4"
                        key={`${day}-${index}`}
                    >
                        <div className="w-2/5 h-fit text-right pr-2 font-black">{timeInfo.time}</div>
                        <div className="w-3/5">
                            {timeInfo.event}
                            &nbsp;&nbsp;
                            {timeInfo.reactIcon &&
                                <span className="inline-block relative w-4">
                                    <div className="absolute -top-4">{timeInfo.reactIcon}</div >
                                </span >
                            }
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );


}

function Schedule() {
    return (
        <div className="w-full flex justify-center px-4 mb-20 relative"
            id="Schedule">
            <div className="w-full max-w-7xl h-fit flex flex-col items-center">
                <div className="transparent-black-background w-full text-text rounded-3xl
                                flex flex-col items-center md:flex-row md:items-start relative">
                    <ScheduleOfTheDay dayInfo={schedule["Saturday"]} />
                    <div className="w-20 h-2 bg-text md:invisible md:absolute rounded-sm" />
                    <ScheduleOfTheDay dayInfo={schedule["Sunday"]} />
                </div>
            </div>
        </div>
    );
}
export default Schedule;