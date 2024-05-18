let startTime;
let elapsedTime = 0;
let timerInterval;
let running = false;

const displayElement = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsElement = document.getElementById('laps');

function timeToString(time) {
    let date = new Date(time);
    let minutes = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();
    let milliseconds = date.getUTCMilliseconds();

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        displayElement.innerHTML = timeToString(elapsedTime);
    }, 10);
    running = true;
    startPauseBtn.innerHTML = 'Pause';
}

function pauseTimer() {
    clearInterval(timerInterval);
    running = false;
    startPauseBtn.innerHTML = 'Start';
}

function resetTimer() {
    clearInterval(timerInterval);
    running = false;
    elapsedTime = 0;
    displayElement.innerHTML = '00:00:00';
    startPauseBtn.innerHTML = 'Start';
    lapsElement.innerHTML = '';
}

function addLap() {
    const lapTime = timeToString(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.innerText = lapTime;
    lapsElement.appendChild(lapItem);
}

startPauseBtn.addEventListener('click', () => {
    if (running) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);
