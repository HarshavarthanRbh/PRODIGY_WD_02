let startTime, updatedTime, difference, tInterval;
let running = false;
let paused = false;
let pausedTime = 0;

const startStopBtn = document.getElementById('startStopBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const milliseconds = document.getElementById('milliseconds');
const lapsList = document.getElementById('lapsList');
const circle = document.querySelector('.circle');

startStopBtn.addEventListener('click', startStop);
pauseBtn.addEventListener('click', pauseResume);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        if (paused) {
            startTime = new Date().getTime() - pausedTime;
        } else {
            startTime = new Date().getTime();
        }
        tInterval = setInterval(updateTime, 10);
        startStopBtn.innerText = 'Stop';
        pauseBtn.style.display = 'inline-block';
        running = true;
        paused = false;
        updateDisplayStyle(true);
    } else {
        clearInterval(tInterval);
        startStopBtn.innerText = 'Start';
        running = false;
        updateDisplayStyle(false);
    }
}

function pauseResume() {
    if (running) {
        clearInterval(tInterval);
        pausedTime = new Date().getTime() - startTime;
        running = false;
        paused = true;
        pauseBtn.innerText = 'Resume';
        startStopBtn.innerText = 'Start';
        updateDisplayStyle(false);
    } else if (paused) {
        startTime = new Date().getTime() - pausedTime;
        tInterval = setInterval(updateTime, 10);
        running = true;
        paused = false;
        pauseBtn.innerText = 'Pause';
        startStopBtn.innerText = 'Stop';
        updateDisplayStyle(true);
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    pausedTime = 0;
    startStopBtn.innerText = 'Start';
    pauseBtn.style.display = 'none';
    pauseBtn.innerText = 'Pause';
    minutes.innerText = '00';
    seconds.innerText = '00';
    milliseconds.innerText = '00';
    lapsList.innerHTML = '';
    updateDisplayStyle(false);
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const minutesElapsed = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const secondsElapsed = Math.floor((difference % (1000 * 60)) / 1000);
    const millisecondsElapsed = Math.floor((difference % 1000) / 10);
    
    minutes.innerText = pad(minutesElapsed);
    seconds.innerText = pad(secondsElapsed);
    milliseconds.innerText = pad(millisecondsElapsed);
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}

function recordLap() {
    if (running || paused) {
        const lapTime = `${minutes.innerText}:${seconds.innerText}:${milliseconds.innerText}`;
        const lapItem = document.createElement('li');
        lapItem.innerText = lapTime;
        lapsList.appendChild(lapItem);
    }
}

function updateDisplayStyle(active) {
    const borderColor = active ? '#ff4757' : '#ff6b6b';
    const color = active ? '#ff4757' : '#444';
    const transform = active ? 'scale(1.1)' : 'scale(1.0)';
    
    circle.style.borderColor = borderColor;
    document.querySelectorAll('.circle span').forEach(span => {
        span.style.color = color;
        span.style.transform = transform;
    });
}
