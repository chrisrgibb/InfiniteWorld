var ObjectRenderer = function(camera, player, levelState, ctx){


	var objectSheet = new ObjectSheet();
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

			objectSheet.drawTile(obj.tilenumber, drawX, drawY, ctx);
			obj.draw(camera, ctx, objectSheet);
		}
	}


	return {
		draw : draw,
		objectSheet : objectSheet
	}

};