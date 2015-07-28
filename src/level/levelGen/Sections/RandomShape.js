function RandomShape(x, y, width, noise){
	this.x = x;
	this.y = y;
	this.width = width;
	this.noise = noise;
	this.points = [{x : x, y: y}];
	var dx = 0, dy = 0;

	var maxLength = this.width;
	var point = { x : x, y : y };

	for(var i = 0; i < maxLength; i++){

		var changeDir = this.noise.nextBool();

		if(changeDir) {
			dx = this.noise.nextInt(0, 1);
			dy = this.noise.nextInt(-1, 1);
		}

		newPoint = { x : point.x + dx,
					 y : point.y + dy };
		if(newPoint.y > 9) {
			newPoint.y = 9;
		}

		this.points.push(newPoint);
		point = newPoint;
	}



}

RandomShape.prototype.create = function(tiles) {

	var tileNumber = 11;
	for(var i = 0; i< this.points.length; i++){
		tiles.setTile(10, this.points[i].x, this.points[i].y);
	}

};