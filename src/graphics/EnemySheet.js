define(function(){

	var EnemySheet = function(){
		this.image = new Image();
		this.image.src = "images/enemies.png";
	}

	EnemySheet.prototype.draw = function(tilenumber, x, y, width, height){
		var xtoDraw = tilenumber % width;
		var ytoDraw = tilenumber / height | 0;

		var ctx = document.getElementById('canvas').getContext('2d');

		ctx.drawImage(this.image, xtoDraw* width, ytoDraw * height, width, height, x, y, width, height);
	};

	return new EnemySheet();
});

