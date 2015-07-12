// requirejs(['./graphics/ObjectSheet']);

define(['./ObjectSheet', './camera', '../game/player', '../level/levelState'],function(objectSheet, camera, player, levelState){
	var ObjectRenderer = function(){

		var canvas = document.getElementById('canvas');
			var ctx = canvas.getContext('2d');

		// var objectSheet = new ObjectSheet();
		var obRenderer = this;

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
				var drawX = ( obj.x - camera.x ) ;
				var drawY = ( obj.y - camera.y ) ;
				
				obj.draw(camera, ctx);
			}
		}


		return {
			draw : draw,
			objectSheet : objectSheet
		}

	};

	return new ObjectRenderer();
});

