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

    const green = "#67cb88"
    const red = "#cb6767"

    const [progressColor, setProgressColor] = useState(green)

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
        if (elapsedTimeMs >= endTimeMs - startTime) {
            setTimerStarted(false);
        }
    }, [elapsedTimeMs, endTimeMs, startTime]);

    const progressPercent = (elapsedTimeMs / (endTime * 1000)) * 100;

    useEffect(() => {
        let iId: any;
        if (progressPercent > 99) {
            iId = setInterval(() => {
                setProgressColor((prevColor) => prevColor === green ? red : green);
            }, 200);
        }

        return () => clearInterval(iId)
    }, [progressColor, progressPercent])


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
        setProgressColor(green)
        setTimerStarted(true)
    }, [endTime])

    const elapsedTimeFormatted = formatTime("mm:ss", elapsedTimeMs)

    const timeLeftMs = endTimeMs - elapsedTimeMs - startTime;
    const timeLeftFormatted = formatTime("mm:ss", timeLeftMs)


    return { elapsedTimeFormatted, timeLeftFormatted, elapsedTimeMs, timeLeftMs, progressPercent, progressColor, start, stop, reset }
}