define(function(require, exports, module){

	var levelGenerator = require('./levelgenerator');
	var Renderer = require('./Renderer');
	var LevelOptions = require('./settings/options');
	var LocalStorageAdapter = require('./localstorageadapter');
	var handlers = require('../../UI/eventhandlers');
	var optionsManager = require('./useroptions');


	var map;
	var options = {};
	var level; 
	/**
	*
	*
	*/
	function updateLevel(){
		// var direction = 
		var generatedLevel = levelGenerator.createNewMap({ 
			isRandom : true, 
			seedValue : options.seedValue,
			direction : options.direction,
			numberOfPlatforms : 3
		});

		map = generatedLevel.map;
		level = generatedLevel;

		tiles = map.tiles;

		Renderer.drawMap(map);
		Renderer.drawHeights(map);
		Renderer.drawSections(map);
	}


	function addDirectionToggleListeners () {
		var directionToggle = document.getElementById('select-direction');
		directionToggle.value = LocalStorageAdapter.get('direction');
		options.direction = directionToggle.value; 
		
		directionToggle.addEventListener('change', function(){
			options.direction = this.value;
			LocalStorageAdapter.update('direction', options.direction);
		});
	}

	addDirectionToggleListeners();
	
	var rangeSlider = document.getElementById('range');

	rangeSlider.addEventListener('change', function(){
		options.seedValue = parseInt(rangeSlider.value);
		var rs = document.getElementById('randomSeed');
		rs.value = options.seedValue;
		updateLevel(options);
	});

	document.getElementById('go').addEventListener('click', function(e){
		options.seedValue = parseInt(rangeSlider.value);
		var rs = document.getElementById('randomSeed');
		rs.value = options.seedValue;
		updateLevel(options);
	});

	document.getElementById('randomSeed').addEventListener('change',function(){
		options.seedValue = parseInt(this.value);
		updateLevel(options);
	});

	Renderer.canvas.addEventListener('click', function(e){
		
		var x = e.offsetX / Renderer.tileSize;
		var y = e.offsetY / Renderer.tileSize;
		
		var ledgos = level.levelData.ledges.filter(function(mofo){
			if (x > mofo.x && x < mofo.x + mofo.width){
				if (mofo.y < y && y < mofo.y + mofo.height){
					return mofo;
				}	
			}
		});
		
		Renderer.highlightLedge(ledgos[0]);
		// Renderer.highlightLedge(ledgos[0].partnerLedge);

		// ledgos.forEach(Renderer.highlightLedge, Renderer);

	});


	return {
		updateLevel : updateLevel
	};
});
