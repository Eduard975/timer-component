import React from 'react';
import { Timer } from './components/timer';
import './App.css';
import { TimerErrorBoundary } from './components/errorBoundry';


function App() {
  return (
    <div>
      <div className='App-header'>Task timer</div>
      <div className="App">
        <TimerErrorBoundary>
          <Timer title="bobi" endTime={1000}></Timer>
        </TimerErrorBoundary>
      </div>
    </div>
  );
}

export default App;
