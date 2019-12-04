export function getProgress(game) {
  let progress = localStorage.getItem(game);
  if (progress == "" || level == null) {
    return 0;
  } else {
    return parseInt(progress);
  }
}

export function saveProgress(game, progress) {
  if (progress > getProgress()) {
    localStorage.setItem(game, progress);
  }
}

