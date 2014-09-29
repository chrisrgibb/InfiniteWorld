var ObjectRenderer = function(camera, player, levelState){


	var objectSheet = new ObjectSheet();

	function draw(){
		levelState.objects.forEach(function(element){
			drawIfOnScreen(element, camera);
		});
		levelState.onScreenObjects.forEach(function(element){
			drawIfOnScreen(element, camera);
		})
		// draw enemies
		levelState.enemys.forEach(function(element){
			drawIfOnScreen(element, camera);
		});

		if(!levelState.shockWave.dead){
			levelState.shockWave.draw(camera);
		}
	}

	function drawIfOnScreen(obj, camera){
		if(isOnScreen(camera, obj)){
			obj.draw(camera);
		}
	}


	return {
		draw : draw,
		objectSheet : objectSheet
	}

};