define(['./objects/gameobject'],function(GameObject){

	function RiceBall(x, y){
		this.x = x*16;
		this.y = y*16;
		this.timer = -1;
		this.tilenumber = 4;
	}

	RiceBall.prototype = new GameObject();

	RiceBall.prototype.process = function(){
		alert("End levelRenderer!!!");
		this.remove = true;
	};



	return {
		riceBall : function(x, y){
			return new RiceBall(x, y);
		},
		life : function(x, y){
			return new Life(x, y);
		}
	}

});









//  Shockwave Protectile


