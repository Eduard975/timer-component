import React from 'react';
import { Timer } from './components/timer';
import './App.css';
import { TimerErrorBoundry } from './components/errorBoundry';


function App() {
  return (
    <div className="App">
      <TimerErrorBoundry>
        <Timer title="bobi" endTime={1000}></Timer>
      </TimerErrorBoundry>
    </div>
  );
}

export default App;
