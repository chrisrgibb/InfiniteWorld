define(['./animation', './fallingbrick', './cloud'],function(Animation, Fallingbrick, Cloud){


	return {
		hello : 5,
		getAnimation : function(x, y){
			// return new Animation(x, y);
			return new Fallingbrick(x, y);
		},
		fallingbrick : function(x, y){
			return new Fallingbrick(x, y);
		},
		getCloud : function(x, y){
			return new Cloud(x, y);
		}
	};

});