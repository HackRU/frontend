import React from "react";

const schedule = [
    {
        "day": "Saturday",
        "times": [
            { "time": "10:00 AM", "event": "Check-in" },
            { "time": "11:30 AM", "event": "Opening Ceremony" },
            { "time": "1:00 PM", "event": "Hacking Begins" },
            { "time": "3:00 PM", "event": "MLH CTF" },
        ],
    },

    {
        "day": "Sunday",
        "times": [
            { "time": "10:00 AM", "event": "Submission Reminder" },
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
        <div className="flex flex-col w-full ">
            <div className="text-5xl">{dayInfo.day}</div>

            <div className="w-full">
                {times.map((timeInfo, index) => (
                    <div className="flex flex-row w-full"
                        key={`${day}-${index}`}
                    >
                        <div className="w-14 h-fit bg-slate-500">{timeInfo.time}</div>
                        <div className="grow bg-blue-500">{timeInfo.event}</div>
                    </div>
                ))}
            </div>
        </div>
    );


}

function NewSchedule() {

    return (
        <div className="w-full h-fit max-w-7xl px-4 flex flex-col items-center">
            <div className="text-7xl text-text glow-subtitles font-semibold">Schedule</div>

            <div className="transparent-black-background w-full text-text">
                {schedule.map((dayInfo, index) => (
                    <ScheduleOfTheDay
                        dayInfo={dayInfo}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
}

export default NewSchedule;