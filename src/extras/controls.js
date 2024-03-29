define(function(){

	window.keys = {
		"jump" : false,
		"left" : false,
		"right" : false
	};

	var jumpKeyReleased = true;

	window.addEventListener('keydown', function(e){
		var player = Game.player;
		switch(e.keyCode){
			case 37:	
				keys.left = true;
				player.left = true;			
				break;							
			case 38:							
				keys.up = true;
				break;
			case 39:		
				keys.right = true;
				player.right = true;
				break;
			case 40:
				keys.down = true;
				break;
			case 65: // a
				keys.jump = true;
				break;
			case 83:
				keys.punch = true;
				break;
		}
	});


	window.addEventListener('keyup', function(e){
		var player = Game.player;
		switch(e.keyCode){
			case 37:
				keys.left = false;
				player.left = false;
				
				break;			
			case 38:
				keys.up = false;
				jumpKeyReleased = true;
				break;
			case 39:
				keys.right = false;
				player.right = false;
				break;
			case 40:

				keys.down = false;
				break;
			case 65: // a
				keys.jump = false;
				break;
			case 83:
				keys.punch = false;
				break;
		}
	});

	// return something;	
});

