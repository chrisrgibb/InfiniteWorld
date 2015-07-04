function Odds(config, noise){
	/**
	* config is a map of the probabilites of a number you want
	* { probability : value}
	*
	*/
	this.config = config || {
		"box" : 5,
		"gap" : 10
	};

	this.noise = noise;
};


Odds.prototype.calc = function() {
	var odds = this.config;
	var calculatedOdds = {};
	var total = 0;
	// compute total odds
	for(var key in odds){
		var val = odds[key]
		total += val;
		calculatedOdds[key] = total;
	}
	
	// var chance = this.noise.nextInt(1,14);
	var chance = this.noise.nextInt(0, total);
	
	for(var key in calculatedOdds){
		var val = calculatedOdds[key];
		if(val >= chance){
			// remove the choice from the array of odds
			this.config[key]--;

			return key;
		}
	}
	return null;

};


// var Odds = function(){
// 	//72 
// 	// var odds = {
// 	// 	"breakable" : 56,
// 	// 	"unbreakable" :0,
// 	// 	"star" : 30,
// 	// 	"skull" : 1,
// 	// 	"question" : 2
// 	// };

// 	// var odds = {
// 	// 	"breakable" : 72,
// 	// 	"unbreakable" :25,
// 	// 	"star" : 11,
// 	// 	"skull" : 6,
// 	// 	"question" : 0,
// 	// 	"total" : 0
// 	// };


// };