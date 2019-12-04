import { HappyTux } from '../games.js';

let terminal = document.getElementById('terminal');
let clock = document.getElementById('clock');
let screen = document.getElementById('bus-stop');
screen.classList.add('welcome');
let selectedLevel = 0;
const happyTux = new HappyTux(terminal, clock, screen);
// Pass DOM elements
// webkitRequestFullscreen();
// mozRequestFullScreen();

let pause = document.getElementById('pause');
pause.addEventListener('click', function(eve) {
    happyTux.pause();
    eve.target.classList.add('invisible');
});

let retry = document.getElementById('retry');
retry.addEventListener('click', function() {
    happyTux.restart();
    screen.classList.add('off-screen');
});

let play = document.getElementById('play');
play.addEventListener('click', function() {
	console.log('played!');
    if (happyTux.state == 'paused') {
        happyTux.resume();
    } else {
        happyTux.start(selectedLevel);
    }
    screen.classList.add('off-screen');
});

let next = document.getElementById('next');
next.addEventListener('click', function() {
    happyTux.next();
    screen.classList.add('off-screen');
});
