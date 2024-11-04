export function formatTime(timeFormat: "mm:ss", timeMs: number) {
    if (timeFormat !== "mm:ss") {
        throw new Error("Wrong time format")
    }

    if (timeMs < 0) {
        return "00:00"
    }

    const timeInSeconds = Math.round(timeMs / 1000);
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${minutes < 10 ? `0${minutes}` : minutes}`
        + `:${seconds < 10 ? `0${seconds}` : seconds}`;
}