import React, { useState, useEffect } from "react";

interface TimeInputProps {
  title: string;
  timeLimits: readonly [number, number];
  onTotalSecondsChange: (totalSeconds: number) => void;
}

const TimeInput = ({
  title,
  timeLimits,
  onTotalSecondsChange,
}: TimeInputProps) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const updateTotalSeconds = () => {
    const total = minutes * 60 + seconds;
    onTotalSecondsChange(total);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= timeLimits[0] && value <= timeLimits[1]) {
      setMinutes(value);
    }
  };

  const handleSecondChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= timeLimits[0] && value <= timeLimits[1]) {
      setSeconds(value);
    }
  };

  const handleMinuteBlur = () => {
    if (minutes < timeLimits[0] || minutes > timeLimits[1]) {
      setMinutes(0);
    }
    updateTotalSeconds();
  };

  const handleSecondBlur = () => {
    if (seconds < timeLimits[0] || seconds > timeLimits[1]) {
      setSeconds(0);
    }
    updateTotalSeconds();
  };

  return (
    <div>
      <h3>{title}</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "20px",
          alignItems: "center",
        }}
      >
        <input
          type="number"
          id="minutes"
          min={timeLimits[0]}
          max={timeLimits[1]}
          value={minutes}
          onChange={handleMinuteChange}
          onBlur={handleMinuteBlur}
        />
        <p style={{ fontSize: "1.3rem" }}>:</p>
        <input
          type="number"
          id="seconds"
          min={timeLimits[0]}
          max={timeLimits[1]}
          value={seconds}
          onChange={handleSecondChange}
          onBlur={handleSecondBlur}
        />
      </div>
    </div>
  );
};

export default TimeInput;
