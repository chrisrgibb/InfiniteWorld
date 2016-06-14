define(['./player/player', '../graphics/camera', '../level/levelState', '../graphics/levelRenderer', '../graphics/objectRenderer', './gamestate', '../extras/controls'],
	function(Player, Camera, LevelState, LevelRenderer, ObjectRenderer, gamestate, controls){

	// main game function
	var Game = {
		fps : 60, //50 is fps
		then : Date.now(), // for fps
		tick : 1,
		dt : 0,
		step : 1000/ 60,
		throttle : false,
		COUNTER : 0,

		/**
		 * start the game 
		 */
		startGame : function(options){
			this.init(options);

			if(!this.running){
				this.run();
			}
		},


		/**
			Main draw function
		**/
		draw : function(tick){
			this.levelRenderer.draw();
			this.objectRenderer.draw(tick);
			this.player.draw(this.player.ctx, this.levelRenderer.camera);
			
			Game.drawFPS(this.tick);
			debug.render(this.player.ctx);
			// Game.drawDebugGrid(ctx, this.levelRenderer.camera);
		},
		/***
		 * Initialize everything
		 */
		init : function(options){
			controls.init();
			initCanvas();

			this.camera = Camera;
			this.camera.init();

			this.player = Player;

			this.levelState = LevelState;

			this.levelState.init(options);

			this.levelRenderer = LevelRenderer;
			this.objectRenderer = ObjectRenderer;


			function initCanvas(){
				var canvas = document.getElementById('canvas');
				ctx = canvas.getContext('2d');
				ctx.imageSmoothingEnabled = false;
				CONSTANTS.WIDTH = canvas.width;
				CONSTANTS.HEIGHT = canvas.height;
				// TODO use function below to scale
				if(!CONSTANTS.haveScaled){
					var scale = CONSTANTS.scale;
					ctx.scale(scale, scale);
					CONSTANTS.haveScaled =true;
				}	
			}
		},


		update : function(){
			Game.COUNTER++;
			if(Game.COUNTER>23){
				Game.COUNTER=0;
			}
			this.levelState.update();
			this.player.update(this.levelState);
		},

		/**
		* Main game loop
		* handles the drawing and updates the game
		*/
		run : function(){
			requestAnimationFrame(Game.run);	
			
			var now = Date.now();
			var delta = now - Game.then;
			
			if(Game.throttle){
				if(delta > Game.step){

					Game.then = now - (delta % Game.step);
					Game.update();
					Game.tick = Game.COUNTER;
			
				}
			} else {
				Game.update();
			}
		
			Game.draw(Game.COUNTER);
			
			Game.running = true;
		},

		calcFPS : function(){
			// var now = Date.now();
			// var elapsed = ( now - Game.then) / 1000;
			// this.dt = this.dt + Math.min(1, elapsed);
			// var count = 0;
			// while(this.dt > this.step){
			// 	this.dt = this.dt - this.step;
			// 	count++;
			// }
			// // console.log(count);

		
			// var otherone = 1000 / (now - Game.then);
			// Game.then = Date.now();

			// var fps = 1 / elapsed;
			// this.tick = otherone;
			// // this.tick = fps;
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
			ctx = this.player.ctx;
			ctx.fillStyle = "yellow";
			ctx.font = "bold 18px sans-serif";
			ctx.fillText(text, 20, 20);
		}
	};
	return Game;
});