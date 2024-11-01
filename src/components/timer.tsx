import { EndTimeOutOfBoundsError } from "./customError";
import "../css/component.css"
import { useEffect, useState } from "react";
import { time } from "console";

export type MyTimerProps = { title: string; endTime: number; elapsedTime?: number };

function calcTimeFromMS(time: number) {
    time = (time / 1000);
    const minutes = ((time % 3600) / 60);
    const seconds = (time % 60);


    return `${minutes > 9 ? minutes.toFixed(0) : `0${minutes.toFixed(0)}`}`
        + `:${seconds > 9 ? seconds.toFixed(0) : `0${seconds.toFixed(0)}`}`;
}

export const Timer = ({ title, endTime }: MyTimerProps) => {
    if (endTime < 0) {
        throw new EndTimeOutOfBoundsError("EndTime can't be negative");
    }

    if (endTime >= 3600) {
        throw new EndTimeOutOfBoundsError("EndTime can't exceed 3599 seconds");
    }

    const [timerStarted, setTImerStarted] = useState(true)
    const [startTime, setStartTime] = useState(Date.now())
    const [currentTime, setCurrentTime] = useState(Date.now())
    const endTimeMs = endTime * 1000 + startTime;

    useEffect(() => {
        if (!timerStarted) {
            return;
        }

        const iId = setInterval(() => {
            setCurrentTime(Date.now())
        }, 1000);

        return () => clearInterval(iId)
    }, [timerStarted])

    useEffect(() => {
        if (currentTime >= endTimeMs) {
            setTImerStarted(false)
        }

    }, [currentTime, endTimeMs])

    return (
        <div className="container">
            <p className="timer-top-buttom ">
                {title}
            </p>
            <p className="timer">
                {
                    calcTimeFromMS((currentTime - startTime))
                    //(endTime - (endTimeMs - currentTime) / 1000).toFixed(0)
                }
            </p>
            <p className="timer-top-buttom">
                {calcTimeFromMS((endTimeMs - currentTime))} Left
            </p>

            <div className="buttons-row">
                <button>Start</button>
                <button>Pause</button>
                <button>Stop</button>
            </div>

        </div>
    );
};