# Happy Tux

### SETUP
+ Make a grid
	- #console
		+ flex
		+ space-evenly
		+ flex-wrap
	- Append `.tile`
		+ **Quantity**: `level.size * level.size`
		+ `onclick event` 
			- wrongTap
				+ decrease chances left
				+ play vibrate animation
				+ vibrate device
	- Select `.bounty` tiles
		+ **Quantity**: `level.bounties` (random)
		+ `onclick event`
			- rightTap
				+ decrease bounties remaing and check
				+ fade out (upwards)
				+ trigger levelPassed
	- Initiate Timer

+ Hide
	- Play button
	- Rules

### Level Passed
	+ Next / Retry
	+ clean up

### Pause
	+ Pause Timer
	+ Pause Time
	+
