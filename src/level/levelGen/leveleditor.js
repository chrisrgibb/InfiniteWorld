define(['./levelgenerator', './Renderer', './settings/options', './localstorageadapter'],function(levelGenerator, Renderer, LevelOptions, LocalStorageAdapter){



	var map;
	var options = {};



	/**
	*
	*
	*/
	function updateLevel(){

		var seedValue = rangeSlider.value || 1231231;
		// var direction = 
		map = levelGenerator.createNewMap({ 
			isRandom : true, 
			seedvalue : options.seedvalue,
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
		updateLevel();
		options.seedValue = parseInt(rangeSlider.value);
	});


	return {
		updateLevel : updateLevel
	}
});
