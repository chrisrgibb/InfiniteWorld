define(['./levelgenerator', './Renderer', './settings/options', './localstorageadapter'],
	function(levelGenerator, Renderer, LevelOptions, LocalStorageAdapter){





	var map;
	var options = {};
	/**
	*
	*
	*/
	function updateLevel(){
		// var direction = 

		map = levelGenerator.createNewMap({ 
			isRandom : true, 
			seedvalue : options.seedValue,
			direction : options.direction
		});

		tiles = map.tiles;

		Renderer.drawMap(map);
		Renderer.drawHeights(map);
		Renderer.drawSections(map);
	}


	function addDirectionToggleListeners () {
		var directionToggle = document.getElementById('select-direction');
		directionToggle.value = LocalStorageAdapter.get('direction') === "1" ? "vertical" : "horizontal";
		
		directionToggle.addEventListener('change', function(){
			options.direction = this.value === "vertical" ? 1 : 0;
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
		
		var ledgos = mofos.filter(function(mofo){
			if (x > mofo.x && x < mofo.x + mofo.width){
				if (mofo.y < y && y < mofo.y + mofo.height){
					return mofo;
				}	
			}
		});
		
		Renderer.highlightLedge(ledgos[0].connectingPlatform);
		Renderer.highlightLedge(ledgos[0].partnerLedge);

		// ledgos.forEach(Renderer.highlightLedge, Renderer);

	});


	return {
		updateLevel : updateLevel
	};
});
