define(['./themes'],function(themes){


	var themeOption = 0;

	return {
		difficulty : {
			EASY : 0, 
			HARD : 2
		},
		height : 12,
		heightVariance : 1,
		theme : themes[themeOption]
	}
});