import { Timer } from './components/timer';
import './App.css';
import { TimerErrorBoundary } from './components/errorBoundry';
import { useState } from 'react';
import TimeInput from './components/timeInput';



function App() {
  const [endTimeS, setEndTimeS] = useState<number>(0);
  const [elapsedTimeS, setElapsedTimeS] = useState<number>(0);

  // max time limit intentionally set on 60 for testing 
  const endTimeLimits = [0, 60]

  const timeLimits = [0, 59]


  const handleEndTimeSecondsSecondsChange = (seconds: number) => {
    setEndTimeS(seconds);
  };

  const handleElapsedTimeSecondsChange = (seconds: number) => {
    setElapsedTimeS(seconds);
  };

  const timeKey = `${elapsedTimeS - endTimeS}`

  return (
    <div>
      <div className='App-header'>Task timer</div>
      <div className="App">
        <div style={{
          display: 'flex',
          fontFamily: 'sans-serif',
          flexDirection: 'column',
          textAlign: 'left',
          marginRight: '75px',
          width: '400px'
        }}>
          <p >End Time input can accept up to 60:60 time if you wish to test the throw on more than 59:59 feature</p>
          <TimeInput
            title="End Time Input(mm:ss):"
            timeLimits={endTimeLimits}
            onTotalSecondsChange={handleEndTimeSecondsSecondsChange}
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
              title="Title from Props"
              endTime={endTimeS}
              elapsedTime={elapsedTimeS}
            />
          </TimerErrorBoundary>
        </div>
      </div>
    </div >
  );
}

export default App;
