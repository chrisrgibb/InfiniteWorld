define(function(){

	var friction = 0.0425;

	var calcFriction = function(player) {
		if(!player.onGround) {
			if (!player.left && !player.right){
				if(player.xVel > 0 ){
					player.xVel -= friction;
				}
				if(player.xVel < 0){
					 player.xVel += friction;
				}
			}
		}
	};

	var calcGravity = function(player) {
		if(!player.onGround){
			player.yVel += 0.25;
		}
		if(player.yVel > 3.5){
			player.yVel = 3.5;
		}
	}


	return {
		calculate : function(player){
			calcFriction(player);
			calcGravity(player);
		}
	}

});