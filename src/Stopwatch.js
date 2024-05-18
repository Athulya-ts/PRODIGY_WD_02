import React, { useState, useRef } from 'react';
import './Stopwatch.css';

const Stopwatch = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerInterval = useRef(null);

  const startTimer = () => {
    const startTime = Date.now() - elapsedTime;
    timerInterval.current = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 10);
    setRunning(true);
  };

  const pauseTimer = () => {
    clearInterval(timerInterval.current);
    setRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerInterval.current);
    setElapsedTime(0);
    setRunning(false);
    setLaps([]);
  };

  const addLap = () => {
    setLaps([...laps, elapsedTime]);
  };

  const timeToString = (time) => {
    let date = new Date(time);
    let minutes = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();
    let centiseconds = Math.floor(date.getUTCMilliseconds() / 10);

    return {
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
      centiseconds: centiseconds.toString().padStart(2, '0'),
    };
  };

  const { minutes, seconds, centiseconds } = timeToString(elapsedTime);

  return (
    <>
    <h1 style = {{marginLeft:30}}>Online Timer & Stopwatch</h1>
    <div className="stopwatch">
      <div id="display">{minutes}:{seconds}:{centiseconds}</div>
      <div className="buttons">
        <button className={`btn ${running ? 'pause' : 'start'}`} onClick={running ? pauseTimer : startTimer}>
          {running ? 'Pause' : 'Start'}
        </button>
        <button className="btn reset" onClick={resetTimer}>Reset</button>
        {running && <button className="btn lap" onClick={addLap}>Lap</button>}
      </div>
      <ul id="laps">
        {laps.map((lap, index) => {
          const { minutes, seconds, centiseconds } = timeToString(lap);
          return (
            <li key={index}>
              {index + 1}. {minutes}:{seconds}:{centiseconds}
            </li>
          );
        })}
      </ul>
    </div>
    </>
  );
};

export default Stopwatch;
