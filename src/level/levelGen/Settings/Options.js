define(['./themes'],function(themes){


	var themeOption = 0;

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
		themeOption : themeOption
	};
});