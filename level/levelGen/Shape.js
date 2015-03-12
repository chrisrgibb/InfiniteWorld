function Shape(type){
	this.vectors = [[0,0],[1,0],[0,4],[1,4]]; 
	this.types = {
		triangle : [],
		square: [],
		line: []

	};

	this.getLine = function(x1, y1, dx, dy){
		var x2 = dx + x1;
		var y2 = dy + y1;
		var y = y1;
		var error = 0;
		var derror = Math.abs(dy / (dx!=0 ? dx : 1));
		var vectors = [];

		for (var x = x1; x < x2; x++){
			this.addToArray(vectors, [x,y])
			error += derror;
			while( error > 0) {
				this.addToArray(vectors, [x,y])
				y = y + Math.sign(y2- y1);
				error -= 1;
			}
		}
		return vectors;
	};

	this.addToArray = function(array, item){
		for (var i = 0; i < array.length; i++){
			if(array[i][0] == item[0] && array[i][1] == item[1] ){
				return false;
			}
		}
		array.push(item);
		return true;
	};
}

function Line(x1, y1, dx, dy){
	var x2 = dx + x1;
		var y2 = dy + y1;
		var y = y1;
		var error = 0;
		var derror = Math.abs(dy / (dx!=0 ? dx : 1));
		var vectors = [];

		for (var x = x1; x < x2; x++){
			Utils.addToArray(vectors, [x,y])
			error += derror;
			while( error > 0) {
				Utils.addToArray(vectors, [x,y])
				y = y + Math.sign(y2- y1);
				error -= 1;
			}
		}
		return vectors;
}

function Square(x, y, w, h){
	var coordinates = [];
	for(var i = y; i < y+h; i++){
		for(var j = x; j < x+w; j++){
			coordinates.push([j, i]);
		}
	}
	return coordinates;
}
