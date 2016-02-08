define(['./levelgenerator', './Renderer', './settings/options'],function(levelGenerator, Renderer, LevelOptions){



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

	/**
	*
	*
	*/

	var map;
	var rangeSlider = document.getElementById('range');
	var levelInfo = {};
	var options = {};


	var rangeSlider = document.getElementById('range');


	rangeSlider.addEventListener('change', function(){
		updateLevel();
		levelInfo['seed'] = rangeSlider.value;
		options.seedValue = parseInt(rangeSlider.value);
	});

	document.getElementById('select-direction').addEventListener('change', function(){
		options.direction = this.value === "vertical" ? 1 : 0;
		localStorage['infinite.alexkidd.direction'] = options.direction;
	});

	return {
		updateLevel : updateLevel
	}
});
