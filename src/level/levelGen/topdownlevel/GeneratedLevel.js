define(function(){

	function sortFunc(a, b){
		// var indexA = a.y * mapDetails.width  

		if (a.y < b.y) {
			return -1;
		} 
		if(a.y > b.y) {
			return 1;
		}
		if (a.x < b.x ) {
			return -1;
		}
		return 1;
	}
	
	function GeneratedLevel(){
		this.ledges = [];
		this.nearestLedges = {}; // { index : [ ]}
	}

	GeneratedLevel.prototype = {
		// body...
		add : function(ledge) {
			this.ledges.push(ledge);
		},

		sort : function() {
			this.ledges.sort(sortFunc);
		}
	};

	return GeneratedLevel;

});