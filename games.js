import {randomSubArray, Timer} from './helpers.js';

const CHANCES = 3;
export class HappyTux {
  constructor(terminal, clock, screen) {
    // Accepts indivisual DOM element as base of tiles
    this.state = 'not started';
    this.timer = new Timer();
    this.clock = clock;
    this.chancesLeft = CHANCES;
    this.bounties = 1;
    this.terminal = terminal;
    this.screen = screen;
    this.resultStatus = document.querySelector('#result .status');
    this.resultTime = document.querySelector('#result .time');
    this.stage = 0;
  }
  /* Time systems should be started only after all preprations have been done
   * and stopped before any other thing so players aren't charged extra time.
   */
  start(stage /*level number*/) {
    if (this.state == 'not started') {
      if (stage !== null && stage !== undefined && stage >= 0 &&
          stage < HappyTux.levels.length) {
        this.stage = stage;
      } else {
        console.log('stage passsed is irrelavent');
      }

      if (0 <= this.stage < HappyTux.levels.length) {
        this.setupDOM(HappyTux.levels[this.stage]);

        // Failsafe in case game is started, but screen isn't removed
        this.screen.classList.add('off-screen');

        // Start clock bar
        this.clock.classList.add('playing');

        this.state = 'started';

        // Start counting when everything ready
        this.timer.start();
      } else {
        console.log('this.stage overshot');
      }
    } else {
      console.log(`Error: Game was already started.`);
    }
  }
  pause() {
    this.timer.pause();
    this.state = 'paused';
    this.clock.classList.remove('playing');
    this.screen.className = 'paused';
  }
  resume() {
    this.clock.classList.add('playing');
    this.state = 'started';
    this.screen.className = 'off-screen';
    this.timer.start();
  }
  restart() {
    this.timer.reset();
    this.state = 'not started';
    this.start();
    this.chancesLeft = CHANCES;
  }
  next() {
    this.stage += 1;
    this.restart();
  }
  setupDOM(level) {
    this.terminal.innerHTML = '';
    this.bounties = level.bounties;

    this.setGrid(level.size, terminal.offsetWidth / (level.size * 1.2));

    for (let i = 0; i < level.size * level.size; ++i) {
      let tile = document.createElement('div');
      tile.classList.add('tile');

      tile.clickArguments = new Object();
      tile.clickArguments.game = this;

      tile.addEventListener('click', wrongTile);
      this.terminal.appendChild(tile);
    }

    let allTiles = document.getElementsByClassName('tile');
    let bountyTiles = randomSubArray(allTiles, level.bounties);

    for (let i = 0; i < bountyTiles.length; ++i) {
      bountyTiles[i].classList.add('bounty');
      bountyTiles[i].removeEventListener('click', wrongTile);
      bountyTiles[i].addEventListener('click', rightTile);
    }

    this.clock.preventDefault;
    this.clock.classList.remove('animated');
    void this.clock.offsetWidth;
    this.clock.classList.add('animated');
    this.clock.style.animationDuration = level.time;
  }
  setGrid(size, tileWidth) {
    if (isNaN(tileWidth) || !isFinite(tileWidth)) {
      console.log('Invalid size:', tileWidth);
    } else {
      tileWidth = Math.floor(tileWidth);

      this.terminal.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
      this.terminal.style.fontSize = `${tileWidth}px`;
      // tiles inherit fontSize from terminal and have width, height set to 1em
    }
  }
  stop() {
    this.timer.stop();
    this.clock.classList.remove('playing');
    return this.timer.elapsedTimeMiliSeconds();
  }
}

HappyTux.levels = [
  {
    size : 3,
    bounties : 1,
    time : '10s',
    /* Suggested time, for #clock bar
     * Not a filter criteria just placebo.
     */
  },
  {
    size : 3,
    bounties : 3,
    time : '7s',
  },
  {
    size : 3,
    bounties : 2,
    time : '3s',
  },
  {
    size : 3,
    bounties : 6,
    time : '5s',
  },
  {
    size : 4,
    bounties : 3,
    time : '7s',
  },
];

function vibrate(object) {
  object.preventDefault;

  object.classList.remove('vibrating');

  // To tell the interpreter something is changed
  void object.offsetWidth;

  object.classList.add('vibrating');

  // Physical vibration
  navigator.vibrate(100);
}

function wrongTile(eve) {
  let clickedTile = eve.target;

  vibrate(clickedTile);
  navigator.vibrate = navigator.vibrate || navigator.webkitVibrate ||
                      navigator.mozVibrate || navigator.msVibrate;
  navigator.vibrate(150);

  let game = clickedTile.clickArguments.game;

  game.chancesLeft--;
  console.log('chancesLeft', game.chancesLeft);
  if (game.chancesLeft <= 0) {
    game.stop();

    let allTiles = game.terminal.getElementsByClassName('tile');
    for (let i = 0; i < allTiles.length; ++i) {
      allTiles[i].classList.add('poped');
    }

    setTimeout(function() { game.terminal.innerHTML = ''; }, 300);

    game.resultStatus.innerHTML = 'You Lost';
    game.screen.className = 'lost';
    navigator.vibrate(500);
  }
}
function rightTile(eve) {
  let clickedTile = eve.target;

  clickedTile.classList.add('poped');

  let game = clickedTile.clickArguments.game;
  game.bounties--;

  if (game.bounties <= 0) {
    let timeTaken = game.stop();

    let allTiles = game.terminal.getElementsByClassName('tile');
    for (let i = 0; i < allTiles.length; ++i) {
      allTiles[i].classList.add('poped');
    }

    setTimeout(function() { game.terminal.innerHTML = ''; }, 300);

    game.resultStatus.innerHTML = 'Respect++';
    game.resultTime.innerHTML = Math.floor(timeTaken) / 1000 + 's';
    // Change color of text based on time taken
    // [HACK] Judge color by width of clock
    let hue = 123 * (game.clock.offsetWidth / window.innerWidth);
    game.resultTime.style.color = `hsl(${hue}, 100%, 50%)`;
    if (game.stage < HappyTux.levels.length - 1) {
      game.screen.className = 'won';
    } else {
      game.screen.className = 'completed';
      game.resultStatus.innerHTML = 'You Won!!';
    }
  }
}
