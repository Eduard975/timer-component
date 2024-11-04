import { useCallback, useEffect, useState } from "react";
import { formatTime } from "../lib/time";

export function useTimer(endTime: number, elapsedTime?: number) {
    const green = "#67cb88"
    const red = "#cb6767"

    const [timerStarted, setTimerStarted] = useState(false)
    const [elapsedTimeMs, setElapsedTimeMs] = useState(
        (elapsedTime ?? 0) * 1000
    )

    const [startTime, setStartTime] = useState(Date.now())
    const [endTimeMs, setEndTime] = useState(endTime * 1000 + startTime)
    const [progressColor, setProgressColor] = useState(green)


    const timeLeftMs = endTimeMs - elapsedTimeMs - startTime;

    const progressFraction = (elapsedTimeMs / (endTime * 1000));

    const progressPercent = (Number.isNaN(progressFraction) ? 0 : progressFraction) * 100;

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

    // Used to make the flashing colors when the time si up
    useEffect(() => {
        let flashId: NodeJS.Timer;
        if (progressPercent >= 100) {
            flashId = setInterval(() => {
                setProgressColor((prevColor) => prevColor === green ? red : green);
            }, 200);
        }

        return () => clearInterval(flashId)
    }, [progressColor, progressPercent])


    const start = useCallback(() => {
        setStartTime(Date.now())
        setEndTime(endTime * 1000 + Date.now())
        setTimerStarted(true)
    }, [endTime])

    const pause = useCallback(() => {
        setTimerStarted(false)
    }, [])

    const reset = useCallback(() => {
        setEndTime(endTime * 1000 + Date.now())
        setStartTime(Date.now())
        setElapsedTimeMs(0)
        setProgressColor(green)
        setTimerStarted(true)
    }, [endTime])


    const elapsedTimeFormatted = formatTime("mm:ss", elapsedTimeMs)
    const timeLeftFormatted = formatTime("mm:ss", timeLeftMs)

    return { elapsedTimeFormatted, timeLeftFormatted, elapsedTimeMs, timeLeftMs, progressPercent, progressColor, start, pause, reset }
}