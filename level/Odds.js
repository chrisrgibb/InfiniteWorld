var Odds = function(){
	//72 
	// var odds = {
	// 	"breakable" : 56,
	// 	"unbreakable" :0,
	// 	"star" : 30,
	// 	"skull" : 1,
	// 	"question" : 2
	// };

	var odds = {
		"breakable" : 72,
		"unbreakable" :25,
		"star" : 11,
		"skull" : 6,
		"question" : 0
	}

	// configs.

	

	function myOdds(){
		var i, totalOdds = 0;
		for (key in odds) {
			totalOdds += odds[key];
			odds[key] = totalOdds - odds[key];
		}
		odds["total"] = totalOdds;
		return odds;
	}


	return{
		newBrickOdds : function(odds){

		},
		myOdds : myOdds
	}
};



function countMap(){
	// get counts of tiles in map
	var map = levelState.map;
	var tiles = map.tiles;

	var count = {

	};
	var othercount = {

	};
	tiles.forEach(function(element, index, array){
		element.forEach(function(element, index){
			switch(element){
				
				case 8:
				case 9:
				case 10:
				case 11:
					count[element] = count[element] ? count[element]+1 : 1;
					break;
			}
		});
	});
	return count;
}