define(['./Enemy'],function(Enemy){


	function Frog(x, y){

		this.width = 16;
		this.height = 24;

		this.x = (this.width / 2 )  + x * 16;
		this.y = (this.height / 2 ) + y * 16 + 2;

		this.imagesrc = {
			x : 0,
			y : 64
		}

	}

	Frog.prototype = new Enemy();


	Frog.prototype.move = function(levelState){
		


	};

	return Frog;
});