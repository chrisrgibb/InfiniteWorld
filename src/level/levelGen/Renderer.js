define(function(){

	function Renderer(){
	    this.canvas = document.getElementById('canvas');
	    this.ctx = canvas.getContext('2d');
	    this.tileSize = 8;
	    this.tileimage = new Image();
	    this.tileimage.src = "../../../images/tiles8px.png";

	    this.drawMap = function(tiles){
	      this.clearCanvas();
	      for(var row = 0; row < tiles.length; row++ ){
	        for(var col = 0; col < tiles[0].length; col++){
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
	    }

	    this.clearCanvas = function(){
	      this.ctx.fillStyle = "#005200";
	      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	    }

	    this.resizeCanvas = function(){
	      this.canvas.width = tiles[0].length * this.tileSize;
	      this.canvas.height = tiles.length * this.tileSize;
	    }

	    this.drawSections = function(map){
	      map.sections.forEach(function(section){
	        this.drawChunk(section);

	      }, this);

	    }

	    this.drawChunk = function(chunk){
	      // chunk.children.forEach(this.drawChunk, this)
	      var ctx = this.ctx,
	      tileSize = this.tileSize;
	      ctx.strokeStyle = "yellow";

	      var groundHeight = 8;

	      var x = chunk.x * tileSize; 
	      var y = chunk.height * tileSize;
	      var width = chunk.width * tileSize;
	      var height = groundHeight * tileSize; 
	      ctx.strokeRect(x, y, width, height);
	    }

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
	      map.nodes = [];

	      map.nodes.forEach(function(n){

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