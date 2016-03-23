define(['./ObjectSheet', './camera', '../game/player/player', '../level/levelState'], 
	function(objectSheet, camera, player, levelState){
	

		var ctx = canvas.getContext('2d');

		function draw(tick){
			levelState.objects.forEach(function(element){
				drawIfOnScreen(element, camera, tick);
			});
			levelState.onScreenObjects.forEach(function(element){
				drawIfOnScreen(element, camera, tick);
			});

			levelState.animations.forEach(function(element){
				drawIfOnScreen(element, camera, tick);
			});

			// draw enemies
			levelState.enemys.forEach(function(element){
				drawIfOnScreen(element, camera, tick);
			});

			if(!levelState.shockWave.dead){
				levelState.shockWave.draw(camera);
			}
		}

		function drawIfOnScreen(obj, camera, tick){
			if(camera.isOnScreen(obj)) {
				obj.draw(camera, ctx, tick);
			}
		}

		return {
			draw : draw,
			objectSheet : objectSheet
		};
});

