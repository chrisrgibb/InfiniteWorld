define(function(){

	function Renderer(){
		this.canvas = document.getElementById('canvas');
		this.ctx = canvas.getContext('2d');
		this.tileSize = 8;
		this.tileimage = new Image();
		this.tileimage.src = "../../../images/tiles8px.png";
		this.canvasDirection = "horizontal";
		this.highlightedSections = [];

		this.drawMap = function(map) {
	
			canvas.width = map.getWidth() * this.tileSize;
			canvas.height = map.getHeight() * this.tileSize;	

			var tiles = map.tiles;
			this.clearCanvas(map.backgroundColor);

			for(var row = 0; row < tiles.length; row++) {
				for(var col = 0; col < tiles[0].length; col++) {
					var num = tiles[row][col];
					this.drawTile(num, row, col);
				}
			}
		};

		this.drawTile = function(num, row, col){
			var tileimage = this.tileimage;
			var tileSize = this.tileSize;
			var tx = num % 16;
			var ty = num / 16 | 0;
			this.ctx.drawImage(tileimage, tx*tileSize , ty * tileSize, tileSize, tileSize, col * tileSize, row * tileSize, tileSize, tileSize);
		};

		this.drawLine = function (x, y, dx, dy){
			var ctx = this.ctx;
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(dx, dy);
			ctx.stroke();
		};

		this.clearCanvas = function(color){
			this.ctx.fillStyle = color;
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		};

		this.resizeCanvas = function(){
			this.canvas.width = tiles[0].length * this.tileSize;
			this.canvas.height = tiles.length * this.tileSize;
		};

		this.drawSections = function(map){
			if ( !map.sections){
				return;
			}
			map.sections.forEach(function(section){
				this.drawChunk(section);
			}, this);
		};

		this.highlightSection = function(section) {
			this.highlightedSections = [section];
		};

		this.highlightLedge = function(ledge) {
			this.ctx.strokeStyle = "yellow";
			var ts = this.tileSize
			this.ctx.strokeRect(ledge.x * ts, ledge.y * ts, ledge.width * ts, ledge.height * ts);
		}


		this.drawChunk = function(chunk){
		  // chunk.children.forEach(this.drawChunk, this)

			var ctx = this.ctx,
			tileSize = this.tileSize;
			ctx.strokeStyle = "yellow";
			
			if (this.highlightedSections.indexOf(chunk) > -1) {
				ctx.strokeStyle = "green";
			}

			var groundHeight = 12;

			var x = chunk.x * tileSize; 
			var y = 0;
			var width = chunk.length * tileSize;
			var height = groundHeight * tileSize; 
			ctx.strokeRect(x, y, width, height);
		};

		this.drawHeights = function(map){
			var ctx = this.ctx;
			var tileSize = this.tileSize;

			ctx.strokeStyle = "#ff0000";
			ctx.lineWidth = 2;
			ctx.beginPath();
			var oldY = this.canvas.height;
			var oldX = 0;

			// draw the height
			// var lastHeight = null;
			var nodes = map.nodes || [];

			nodes.forEach(function(n){

				var x = n.x * tileSize;
				var y = n.y * tileSize;
				this.drawLine(oldX, oldY, x, oldY);
				oldX = x;
				oldY = y;
			}, this);
			ctx.lineWidth = 1;
		};
	  }
  return new Renderer();
});