import React from "react";

const schedule = [
    {
        "day": "Saturday",
        "times": [
            { "time": "10:00 AM", "event": "Check-in" },
            { "time": "11:30 AM", "event": "Opening Ceremony" },
            { "time": "1:00 PM", "event": "Hacking Begins" },
            { "time": "1:00 PM", "event": "Hacking Ends" },

            { "time": "3:00 PM", "event": "MLH CTF" },
        ],
    },

    {
        "day": "Sunday",
        "times": [
            { "time": "10:00 AM", "event": "Submission Reminder" },
            { "time": "1:00 PM", "event": "Hacking Ends" },
            { "time": "1:00 PM", "event": "Hacking Ends" },
            { "time": "1:00 PM", "event": "Hacking Ends" },
            { "time": "3:00 PM", "event": "Judging" },
            { "time": "5:30 PM", "event": "Closing Ceremony" },
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

function NewSchedule() {

    return (
        <div className="w-full flex justify-center px-4">
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

export default NewSchedule;