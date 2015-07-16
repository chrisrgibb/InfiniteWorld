define(['./player/player', '../graphics/camera', '../level/levelState', '../graphics/levelRenderer', '../graphics/objectRenderer', './gamestate'],function(Player, Camera, LevelState, LevelRenderer, ObjectRenderer, gamestate){

	// main game function
	var Game = {
		fps : 50, //50 is fps
		then : Date.now(), // for fps


		/**
			Main draw function
		**/
		draw : function(){
			this.levelRenderer.draw();
			this.objectRenderer.draw();
			this.player.draw(this.player.ctx, this.levelRenderer.camera);
			debug.render(this.player.ctx);
			// Game.drawDebugGrid(ctx, this.levelRenderer.camera);
		},

		init : function(ctx){
			
			initCanvas();

			this.camera = Camera;

			this.player = Player;

			var seedValue;// = rangeSlider.value;

			
			// this.gamestate = gamestate;

			// this.gamestate.init();

			this.levelState = LevelState;

			this.levelState.init(seedValue);

			this.levelRenderer = LevelRenderer;
			this.objectRenderer = ObjectRenderer;


			function initCanvas(){
				var canvas = document.getElementById('canvas');
				ctx = canvas.getContext('2d');
				ctx.imageSmoothingEnabled = false;
				CONSTANTS.WIDTH = canvas.width;
				CONSTANTS.HEIGHT = canvas.height;
				// TODO use function below to scale
				if(!haveScaled){
					var scale = CONSTANTS.scale;
					ctx.scale(scale, scale);
					haveScaled =true;
				}	
			}
		},


		update : function(){
			COUNTER++;
			if(COUNTER>23){
				COUNTER=0;
			}
			// this.gamestate.update();
			this.levelState.update();
			this.player.move(this.levelState);
		},

		/*
		* Main game loop
		*/

		run : function(){
			Game.update();
			Game.draw();
			requestAnimationFrame(Game.run);
			Game.calcFPS();
			Game.running = true;
		},

		calcFPS : function(){
			var now = Date.now();
			var elapsed = ( now - Game.then) / 1000;
			var otherone = 1000 / (now - Game.then);

			Game.then = Date.now();
			var fps = 1 / elapsed;
			// Game.drawFPS(fps);
		},

		drawDebugGrid : function(ctx, camera){
			if(debug.drawGrid){
				var y , x, tilesize = CONSTANTS.tileSize;
				for(y = 0; y < map.getHeight(); y++ ){
					for(x = 0; x < map.getWidth(); x++ ){
						if(x%5 === 0){
							ctx.font = "bold 8px sans-serif";
							ctx.fillText(x, 5 + x * tilesize, 10);
						}
					}
				}
			}
		},
		
		drawFPS : function(text) {
			ctx.fillStyle = "yellow";
			ctx.font = "bold 18px sans-serif";
			ctx.fillText(text, 20, 20);
		}
	};

	return Game;
	var debugStuff = [];



});


