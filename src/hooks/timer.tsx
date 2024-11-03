import { useCallback, useEffect, useState } from "react";

function formatTime(timeFormat: "mm:ss", timeMs: number) {
    if (timeFormat !== "mm:ss") {
        throw new Error("Wrong time format")
    }

    if (timeMs < 0) {
        return "00:00"
    }
    const timeInSeconds = Math.round(timeMs / 1000);
    const minutes = Math.round((timeInSeconds % 3600) / 60);
    const seconds = Math.round(timeInSeconds % 60);

    return `${minutes < 10 ? `0${minutes}` : minutes}`
        + `:${seconds < 10 ? `0${seconds}` : seconds}`;
}

export function useTimer(endTime: number, elapsedTime?: number) {
    const [timerStarted, setTimerStarted] = useState(false)
    const [startTime, setStartTime] = useState(Date.now())

    const [endTimeMs, setEndTime] = useState(endTime * 1000 + startTime)
    const [elapsedTimeMs, setElapsedTimeMs] = useState(
        (elapsedTime ?? 0) * 1000
    );

    useEffect(() => {
        if (!timerStarted) {
            return;
        }

        const iId = setInterval(() => {
            setElapsedTimeMs((val) => val + 1000)
        }, 1000);

        return () => clearInterval(iId)
    }, [timerStarted, elapsedTimeMs])

    useEffect(() => {
        if (elapsedTimeMs + startTime >= endTimeMs) {
            setTimerStarted(false);
        }
    }, [elapsedTimeMs, endTimeMs, startTime]);


    const start = useCallback(() => {
        setStartTime(Date.now())
        setEndTime(endTime * 1000 + Date.now())
        setTimerStarted(true)
    }, [endTime])

    const stop = useCallback(() => {
        setTimerStarted(false)
    }, [])

    const reset = useCallback(() => {
        setEndTime(endTime * 1000 + Date.now())
        setStartTime(Date.now())
        setElapsedTimeMs((elapsedTime ?? 0) * 1000)
        setTimerStarted(true)
    }, [endTime])

    const timeLeftMs = endTimeMs - elapsedTimeMs - startTime;

    const elapsedTimeFormatted = formatTime("mm:ss", elapsedTimeMs)
    const timeLeftFormatted = formatTime("mm:ss", timeLeftMs)

    // de returnat const Timer%
    const percent = (elapsedTimeMs / (endTime * 1000)) * 100;

    return { elapsedTimeFormatted, timeLeftFormatted, elapsedTimeMs, timeLeftMs, percent, start, stop, reset }
}