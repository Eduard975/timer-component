import { EndTimeOutOfBoundsError } from "./customError";
import "../css/component.css"

export type MyTimerProps = { title: string; endTime: number; elapsedTime?: number };

function calcTime(time: number) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    return { hours, minutes, seconds }
}

export const Timer = ({ title, endTime, }: MyTimerProps) => {
    if (endTime < 0) {
        throw new EndTimeOutOfBoundsError("EndTime can't be negative");
    }

    if (endTime >= 3600) {
        throw new EndTimeOutOfBoundsError("EndTime can't exceed 3599 seconds");
    }

    const { hours, minutes, seconds } = calcTime(endTime);

    return (
        <div className="container">
            <h1>{title}</h1>
            <p>
                {hours}h {minutes}m {seconds}s remaining
            </p>
        </div>
    );
};