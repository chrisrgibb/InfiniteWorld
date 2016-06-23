define(['./themes'],function(themes){


	var themeOption = 0;

	var topDownOptions = {
		startY : 7,
		width :16,
		height : 100 //random
	};

	var sideWaysOptions = {
		startX : 10 // the gap at the start of the level to start generating from

	};


	return {
		difficulty : {
			EASY : 0, 
			HARD : 2
		},
		groundLevel : 10,
		height : 12,
		heightVariance : 1,
		theme : themes[themeOption],
		gapAtStartOfLevel : 10,
		direction : {
			leftRight : 0,
			vertical : 1,
			rightLeft : 2
		},
		themeOption : themeOption,
		topDownOptions : topDownOptions
	};
});