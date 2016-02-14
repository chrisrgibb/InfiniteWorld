define(function(){

	var EnemySheet = function(){
		this.image = new Image();
		this.image.src = "images/enemies.png";
	};

	EnemySheet.prototype.draw = function(tilenumber, x, y, width, height){
		// var xtoDraw = tilenumber % width;
		// var ytoDraw = tilenumber / height | 0;
		var xtoDraw = tilenumber.x;
		var ytoDraw = tilenumber.y;

		var ctx = document.getElementById('canvas').getContext('2d');

		ctx.drawImage(this.image, xtoDraw, ytoDraw, width, height, x, y, width, height);
	};

	return new EnemySheet();
});

