import "../css/component.css"
import { useEffect, useState } from "react";
import { useTimer } from "../hooks/timer";

export type MyTimerProps = { title: string; endTime: number; elapsedTime?: number };

/*
    Timer Component

    The Timer component displays a countdown timer with start, pause, and reset functionality.
    It visually represents the progress of the timer using a circular progress indicator which starts
    flashing colors when its finished.

    Props:
    - title (string): The title to be displayed at the top of the timer.
    - endTime (number): The maximum duration for the timer, specified in seconds. This value must be between 0 and 3599 seconds.
    - elapsedTime (number, optional): The amount of time (in seconds) that has already elapsed before the timer starts. 
                                      If provided, this value must not exceed the endTime.

    Errors:
    - Throws an error if endTime is negative.
    - Throws an error if endTime exceeds 59 minutes and 59 seconds.
    - Throws an error if elapsedTime is provided and is greater than endTime.
*/

export const Timer = ({ title, endTime, elapsedTime }: MyTimerProps) => {
    if (endTime < 0) {
        throw new Error("EndTime can't be negative")
    }

    if (endTime >= 3600) {
        throw new Error("EndTime can't exceed 59 minutes and 59 seconds")
    }

    if (elapsedTime && elapsedTime > endTime) {
        throw new Error("EndTime can't be lower than ElapsedTime")
    }

    const { elapsedTimeFormatted, timeLeftFormatted, progressPercent, progressColor, start, pause, reset } = useTimer(endTime, elapsedTime)
    return (
        <div className="container">
            <div
                className="progress"
                style={{
                    background: `conic-gradient(${progressColor} ${progressPercent}%, #545576 0)`,
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
                <button className="timer-button" onClick={pause}>Pause</button>
                <button className="timer-button" onClick={reset}>Reset</button>
            </div>
        </div >
    );
};