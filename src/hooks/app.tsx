import { useState } from "react";

export function useTimeS() {
    const [timeS, setTimeS] = useState<number>(0);

    const handleTimeSecondsChange = (seconds: number) => {
        setTimeS(seconds);
    };

    return { timeS, handleTimeSecondsChange }
}