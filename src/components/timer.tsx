import { EndTimeOutOfBoundsError } from "./customError";
import "../css/component.css"
import { useEffect, useState } from "react";
import { useTimer } from "../hooks/timer";

export type MyTimerProps = { title: string; endTime: number; elapsedTime?: number };



export const Timer = ({ title, endTime, elapsedTime }: MyTimerProps) => {
    if (endTime < 0) {
        throw new EndTimeOutOfBoundsError("EndTime can't be negative");
    }

    if (endTime >= 3600) {
        throw new EndTimeOutOfBoundsError("EndTime can't exceed 3599 seconds");
    }

    const { elapsedTimeFormatted, timeLeftFormatted, percent, start, stop, reset } = useTimer(endTime, elapsedTime);
    console.log(percent)
    return (
        <div className="container">
            <div
                className="progress"
                style={{
                    background: `conic-gradient(#67cb88 ${percent}%, #545576 0)`,
                }}
            >
                <div className="circle-content">
                    <p className="timer-top">{title}</p>
                    <p className="timer">{elapsedTimeFormatted}</p>
                    <p className="timer-bottom">{timeLeftFormatted} Left</p>
                </div>
            </div>

            <div className="buttons-row">
                <button className="timer-button" onClick={start}>Start</button>
                <button className="timer-button" onClick={stop}>Stop</button>
                <button className="timer-button" onClick={reset}>Reset</button>
            </div>
        </div>
    );
};