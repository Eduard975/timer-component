import { Timer } from "./components/timer";
import "./App.css";
import { TimerErrorBoundary } from "./components/errorBoundary";
import TimeInput from "./components/timeInput";
import { useTimeS } from "./hooks/app";
import { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("Title from props");

  const {
    timeS: endTimeS,
    handleTimeSecondsChange: handleEndTimeSecondsChange,
  } = useTimeS();

  const {
    timeS: elapsedTimeS,
    handleTimeSecondsChange: handleElapsedTimeSecondsChange,
  } = useTimeS();

  // max time limit intentionally set on 60 for testing
  const endTimeLimits = [0, 60] as const;

  const timeLimits = [0, 59] as const;

  const timeKey = `${elapsedTimeS - endTimeS}`;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  return (
    <div>
      <div className="App-header">Task timer</div>
      <div className="App">
        <div
          style={{
            display: "flex",
            fontFamily: "sans-serif",
            flexDirection: "column",
            textAlign: "left",
            marginRight: "75px",
            width: "400px",
          }}
        >
          <p>
            The End Time input can accept values up to 60:60, allowing you to
            test the feature that throws an error for times exceeding 59:59.
          </p>
          <p>Title input:</p>
          <input
            type="text"
            placeholder="Type something..."
            maxLength={20}
            value={inputText}
            onChange={handleInputChange}
          />

          <TimeInput
            title="End Time Input(mm:ss):"
            timeLimits={endTimeLimits}
            onTotalSecondsChange={handleEndTimeSecondsChange}
          />

          <TimeInput
            title="Elapsed Time Input(mm:ss):"
            timeLimits={timeLimits}
            onTotalSecondsChange={handleElapsedTimeSecondsChange}
          />
        </div>
        <div key={timeKey}>
          <TimerErrorBoundary>
            <Timer
              title={inputText}
              endTime={endTimeS}
              elapsedTime={elapsedTimeS}
            />
          </TimerErrorBoundary>
        </div>
      </div>
    </div>
  );
}

export default App;
