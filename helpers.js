export class Timer {
	constructor() {
		this.totalTime = 0;
		this.previousStart = null;
		this.isPaused = false;
		this.wasStarted = false;
		this.wasStoped = false;
	}

	start() {
		if(!this.wasStoped){
			if(this.isPaused) {
				this.isPaused = false;
				this.previousStart = performance.now();
			}
			else if(!this.wasStarted) {
				this.previousStart = performance.now();
				this.wasStarted = true;
			} else {
				console.log('Timer was started');
			}
		} else {
			console.log('Timer was stoped!');
		}
	}

	stop() {
		if(this.isPaused) {
			return this.totalTime;
		}
		else if(this.wasStarted) {
			// In case time was paused at any time but now started again
			// totalTime is sum of all interval plus current interval
			this.totalTime += performance.now() - this.previousStart;
		} else {
			console.log("Timer wasn't started");
		}
	}
	pause() {
		if(!this.isPaused && this.wasStarted && !this.wasStoped) {
			this.totalTime += performance.now() - this.previousStart;
			this.isPaused = true;
			console.log('Timer paused!');
		} else {
			console.log('pause conditions not met!!');
		}
	}
	reset() {
		this.totalTime = 0;
		this.previousStart = null;
		this.isPaused = false;
		this.wasStarted = false;
		this.wasStoped = false;
	}
	elapsedTimeMiliSeconds() {
		return this.totalTime;
	}
}


export function randomSubArray(array, size) {
  /*
   * Return random array with unique elements of size length
   * size can be skipped to get shuffled array
   */
  // Copying array
  var output = [...array];

  // Fisher-Yates Shuffle
  for (let i = output.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [output[i], output[j]] = [output[j], output[i]];
  }

  if (isNaN(size)) {
    return output;
  } else {
    return output.slice(0, size);
  }
}
