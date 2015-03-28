function RandomShape(x, y, width, noise){
	this.x = x;
	this.y = y;
	this.width = width;
	this.noise = noise;
	this.points = [{x : x, y: y}];
	var dx = 0, dy = 0;

	var maxLength = this.width + 2;
	var point = { x : x, y : y };

	for(var i = 0; i < maxLength; i++){

		var changeDir = this.noise.nextBool();

		if(changeDir) {
			dx = this.noise.nextInt(0, 1);
			dy = this.noise.nextInt(-1, 1);
		}


		newPoint = { x : point.x + dx,
					 y : point.y + dy };

		// point.x += dx;
		// point.y += dy;
		this.points.push(newPoint);
		point = newPoint;
	}



}

RandomShape.prototype.create = function(tiles) {

	var tileNumber = 11;
	for(var i = 0; i< this.points.length; i++){
		tiles.setTile(11, this.points[i].x, this.points[i].y);
	}

	// for(x = this.x ; x < this.width + this.x; x++){
	// 	this.tilecreater.setTile(tileNumber, x, this.y);
	// }

};