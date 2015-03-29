function Renderer(levelGenerator, tileimage){
  this.canvas = document.getElementById('canvas');
  this.ctx = canvas.getContext('2d');
  this.tileSize = 8;
  this.tileimage = new Image();
  this.tileimage.src = "../images/tiles8px.png";

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
    ctx.beginPath();
    ctx.strokeStyle = "#ff0000";
    ctx.beginPath();
    var oldY = this.canvas.height;
    var oldX = 0;
    
    // draw the height
    map.nodes.forEach(function(n){

      var x = n.x* tileSize;
      var y = n.y * tileSize;
      this.drawLine(oldX, oldY, x, y);
      oldX = x;
      oldY = y;
    }, this);
  };
}


  var lg = new levelGen2(); 
  var tiles;
  var map;
  var rangeSlider = document.getElementById('range');
  var renderer = new Renderer();
  var levelInfo = {};

  /**
  *
  *
  */
  function updateLevel(){
    var seedValue = rangeSlider.value || 1231231;
    this.map = lg.createNewMap(true, seedValue);
    tiles = this.map.tiles;

    // renderer
    // var renderer = new Renderer();
    renderer.drawMap(tiles);
    renderer.drawHeights(map);
    renderer.drawSections(map);
  }

  function renderLevelInfo(){
    levelInfo['difficulty'] = lg.difficulty;
    var text = "";
    for(var key in levelInfo){

      if(levelInfo[key].constructor == Array){
      
        var array = levelInfo[key];
        text += turnIntoText(array);
      
      } else{
        text += "<li> " + key + " : " + levelInfo[key] + "</li>";
      }
    }
    document.getElementById('text').innerHTML = text;
  }

  function turnIntoText(arr){
    var text = ""
    for(var i = 0; i < arr.length; i++){
      var item = arr[i];
      text += "<li>height : " + item.height + ", length : " + item.length + "</li>";
    }
    return text;
  }

  /**
  *
  *
  */
  rangeSlider.addEventListener('change', function(){
    updateLevel();
    levelInfo['seed'] = rangeSlider.value;
    renderLevelInfo();
    
  });