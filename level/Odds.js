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
	var map = levelState.map;
	var tiles = map.tiles;

	var count = {

	};
	var othercount = {

	};
	tiles.forEach(function(element, index, array){
		// debugger;
		element.forEach(function(element, index){
			// debugger;
			switch(element){
				
				case 8:
				case 9:
				case 10:
				case 11:
					count[element] = count[element] ? count[element]+1 : 1;
					// debugger;
					
					if(othercount[element]){
						othercount[element] ++;
					}else {
						othercount[element] = 1;
					}
					// debugger;
					break;
			}
		});
	});
	console.log(count);
	console.log(othercount);
	return count===othercount;
}