define(function(){
	
	var state = {
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


	return {
		update : function(key, value){
			state[key] = value;
		},
		get : function(key){
			return state[key];
		}
	}

});