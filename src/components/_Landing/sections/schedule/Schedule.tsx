import React from "react";

const schedule = [
    {
        "day": "Saturday",
        "times": [
            { "time": "2:00 PM", "event": "Check-in starts" },
            { "time": "3:00 PM", "event": "Opening Ceremony" },
            { "time": "3:25 PM", "event": "Team Building Event" },
            { "time": "4:00 PM", "event": "Hacking Starts" },
            { "time": "4:25 PM", "event": "Event" },
            { "time": "6:00 PM", "event": "Rutgers Ethitech Presentation" },
            { "time": "7:00 PM", "event": "WiCS Presentation" },
            { "time": "8:00 PM", "event": "Dinner & Another Event" },
            { "time": "11:45 PM", "event": "T-Shirts!" },
        ],
    },

    {
        "day": "Sunday",
        "times": [
            { "time": "8:00 AM", "event": "Breakfast" },
            { "time": "9:00 AM", "event": "RUMad Presentation" },
            { "time": "11:00 AM", "event": "Event" },
            { "time": "12:00 PM", "event": "Lunch" },
            { "time": "5:00 PM", "event": "Submissions Due" },
            { "time": "5:30 PM", "event": "Submissions Due (Hard Deadline)" },
            { "time": "6:30 PM", "event": "Judging Begins" },
            { "time": "7:00 PM", "event": "Dinner" },
            { "time": "7:30 PM", "event": "Judging Ends" },
            { "time": "8:00 PM", "event": "Closing Ceremony" },
            // { "time": "9:00 PM", "event": "Venue closes" },
        ],
    }
];

interface DayInfo {
    day: string,
    times: { time: string, event: string }[]
}

function ScheduleOfTheDay(props: { dayInfo: DayInfo }) {
    const { dayInfo } = props;
    const { day, times } = dayInfo;

    return (
        <div className="flex flex-col w-full my-5">
            <div className="text-5xl w-full text-center mb-4 font-semibold glow-subtitles text-textSubtitle">{dayInfo.day}</div>

            <div className="w-full">
                {times.map((timeInfo, index) => (
                    <div className="flex flex-row w-full text-xl font-semibold my-2 md:my-5 md:px-3"
                        key={`${day}-${index}`}
                    >
                        <div className="w-1/2 h-fit text-right pr-5">{timeInfo.time}</div>
                        <div className="w-1/2">{timeInfo.event}</div>
                    </div>
                ))}
            </div>
        </div>
    );


}

function Schedule() {
    // TOOD: ADD THE FOX ASSET
    // TOOD: ADD EMOJIS
    // TODO INCREASE FONT SIZE WHEN WIDTH INCREASES
    // TOOD: FIX SCHEDULE SCROLL BUTTON

    return (
        <div className="w-full flex justify-center px-4 my-14">
            <div className="w-full max-w-7xl h-fit flex flex-col items-center">
                <div className="text-7xl text-text glow-subtitles font-semibold">Schedule</div>

                <div className="transparent-black-background w-full text-text rounded-3xl mt-10 flex flex-col
                                md:flex-row">
                    {schedule.map((dayInfo, index) => (
                        <ScheduleOfTheDay
                            dayInfo={dayInfo}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Schedule;