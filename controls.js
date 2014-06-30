var keys = {
	"jump" : false,
	"left" : false,
	"right" : false
};

var jumpKeyReleased=true;

window.addEventListener('keydown', function(e){

	switch(e.keyCode){
						case 37:	
							keys["left"] = true;
							player.left = true;			
							break;
							
						case 38:							
							keys["up"] = true;
							break;
						case 39:
		
							keys["right"]= true;
							player.right = true;
							break;
						case 40:
							keys["down"] = true;
							break;
						case 90: // z
							keys["jump"] = true;
							break;
					}
	});


window.addEventListener('keyup', function(e){
	switch(e.keyCode){
						case 37:
							keys["left"] = false;
							player.left = false;
							
							break;			
						case 38:
							keys["up"] = false;
							jumpKeyReleased = true;
							break;
						case 39:
							keys["right"] = false;
							player.right = false;
							break;
						case 40:

							keys["down"] = false;
							break;
						case 90: // z
							keys["jump"] = false;
							break;
					}
});