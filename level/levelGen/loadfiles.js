var files = [
"Map.js",
"Block.js",
"levelGen/levelGenerator.js",
"levelGen/Settings/levelSettings.js",
"levelGen/noise.js",
"levelGen/Settings/Odds.js",
"levelGen/CreateTiles.js",
"levelGen/newlevelgen.js",
"levelGen/Shape.js",
"levelGen/Shape.js",
"levelGen/ShapeManager.js",
"levelGen/Settings/HeightMap.js",
"leveleditor.js",
"../game/GameObject.js",
"levelGen/Chunk.js",
];

var graphicsFiles = [
	


];

files.forEach(function(filename){
	var fileref = document.createElement('script');
	fileref.setAttribute('type', 'text/javascript');
	fileref.setAttribute('src', filename);
	document.body.appendChild(fileref);
});

