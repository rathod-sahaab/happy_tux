import { randomSubArray, getProgress } from "../scripts/helpers";
import { setProgress } from "helpers";

function setTileSize(size) {
  styleSheet = document.getElementById("tile-size-sheet");

  /* Check if exists
   * if it doesn't, create it.
   */
  if (styleSheet == null || styleSheet == undefined) {
    styleSheet = document.createElement("style");
    styleSheet.id = "tile-size-sheet";
    document.querySelector("body").appendChild(styleSheet);
  }

  if (!isNaN(size)) {
    size = Math.floor(size);
    styleSheet.innerHTML = `.tile { width: ${size}px; height: ${size}px;}`;
  } else {
    console.log("setTileSize: size shoud be a number");
  }
}

function promote() {
  let progress = getProgress("HappyTux");
  setProgress("HappyTux", progress + 1);
}

function gameCompleted(level) {
  if (level == null) {
    return getProgress("HappyTux") > levels.length;
  } else {
    return level > levels.length;
  }
}

function renderMenu(menu) {
  // For all slide out effect
  if (gameComleted()) {
    menu = "game-completed";
  }
  let tiles = document.getElementsByClassName("tile");
  for (let i = 0; i < tiles.length; ++i) {
    tiles[i].classList.add("off-game");
  }

  setTimeout(function() {
    let terminal = document.getElementById("terminal");
    terminal.innerHTML = "";

    menu = document.getElementById(menu);
    menu.classList.add("visible");
  }, 1000);
}

function wrongTile(eve) {
  let vibrateInterval = 300; //Miliseconds
  Navigator.vibrateDuration(100);

  eve.target.classList.add("vibrating");
  setTimeout(function() {
    eve.target.classList.remove("vibrating");
  }, vibrateInterval);

  chancesLeft--;
  if (chanceLeft == 0) {
    renderMenu("retry-menu");
  }
}
function rightTile(eve) {
  eve.target.classList.add("off-game");
  bountiesLeft--;
  if (bountiesLeft == 0) {
	stopTime();
    promote(); // Promote to next level
    renderMenu("promotion-menu");
  }
}
export function setupLevel(level) {
  if (level == null) {
    level = getProgress("HappyTux");
	  if(gameCompleted(level)) {
		renderMenu("game-completed");
	  }
  }
  /* A level object has
   * size
   * bounties
   * time
   */
  const terminal = document.getElementById("terminal");

  /*Accepts a Number*/
  setTileSize(terminal.offsetWidth / (level.size * 1.1));

  for (let i = 0; i < level.size * level.size; ++i) {
    let tile = document.createElement("div");

    tile.classList.add("tile");
    tile.addEventListener("click", wrongTile);

    terminal.appendChild(tile);
  }

  // Select level.bounties number bounty tiles randomly from tiles
  let bountyTiles = randomSubArray(
    document.getElementsByClassName(".tile"),
    level.bounties
  );

  for (let i = 0; i < bountyTiles.length; ++i) {
    bountyTiles[i].removeEventListener("click", wrongTile);
    bountyTiles[i].addEventListener("click", rightTile);

    bountyTiles[i].classList.add("bounty");
  }
}
