var files = [
"Map.js",
"Block.js",
"levelGen/levelGenerator.js",
"levelGen/Settings/levelSettings.js",
"levelGen/noise.js",
"levelGen/Settings/Odds.js",
"levelGen/CreateTiles.js",
"levelGen/newlevelgen.js",
"levelGen/Settings/HeightMap.js",
"levelGen/Settings/Odds.js",
"leveleditor.js",
"../game/GameObject.js",
"levelGen/Sections/Section.js",
"levelGen/Sections/Box.js",
"levelGen/Sections/Gap.js",
"levelGen/Sections/RandomShape.js",
"levelGen/Sections/Platform.js",

];

var graphicsFiles = [
	


];

files.forEach(function(filename){
	var fileref = document.createElement('script');
	fileref.setAttribute('type', 'text/javascript');
	fileref.setAttribute('src', filename);
	document.body.appendChild(fileref);
});

