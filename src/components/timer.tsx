import "../css/component.css";
import { useTimer } from "../hooks/timer";

/**
 * Props for the Timer component.
 */
export type MyTimerProps = {
  /** Title displayed at the top of the timer */
  title: string;

  /**
   * The total duration for the timer in seconds.
   * Must be between 0 and 3599 (59 minutes and 59 seconds).
   */
  endTime: number;

  /**
   * The time that has already elapsed in seconds before the timer starts.
   * This value is optional and must not exceed the endTime if provided.
   */
  elapsedTime?: number;
};

/**
 * Timer Component
 *
 * Displays both a countup timer and visually represents its progress with a circular indicator
 * that fills up as time goes. When the Timer ends, the indicator will start flashing colors.
 * The time left until the timer ends is also displayed.
 *
 * @throws {Error} If `endTime` is negative, or exceeds 3599 seconds, or if `elapsedTime` is greater than `endTime`.
 * @returns {JSX.Element} The rendered Timer component.
 *
 * @example
 * ```tsx
 * <Timer title="Title from props" endTime={200} />
 * ```
 */
export const Timer = ({ title, endTime, elapsedTime }: MyTimerProps) => {
  if (endTime < 0) {
    throw new Error("End Time can't be negative");
  }

  if (endTime >= 3600) {
    throw new Error("End Time can't exceed 59 minutes and 59 seconds");
  }

  if (elapsedTime && elapsedTime > endTime) {
    throw new Error("End Time can't be lower than ElapsedTime");
  }

  const {
    elapsedTimeFormatted,
    timeLeftFormatted,
    progressPercent,
    progressColor,
    start,
    pause,
    reset,
  } = useTimer(endTime, elapsedTime);

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
        <button className="timer-button" onClick={start}>
          Start
        </button>

        <button className="timer-button" onClick={pause}>
          Pause
        </button>

        <button className="timer-button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};
