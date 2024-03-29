define(function(){

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
	}

	Odds.prototype.next = function() {
		var odds = this.config;
		var calculatedOdds = {};
		var total = 0;
		var val;
		// compute total odds
		for(var key in odds){
			val = odds[key];
			total += val;
			calculatedOdds[key] = total;
		}
		
		// var chance = this.noise.nextInt(1,14);
		var chance = this.noise.nextInt(0, total);
		
		for(key in calculatedOdds){
			val = calculatedOdds[key];
			if(val >= chance){
				// remove the choice from the array of odds
				// this.config[key]--;

				return key;
			}
		}
		return null;

	};

	return Odds;
});







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