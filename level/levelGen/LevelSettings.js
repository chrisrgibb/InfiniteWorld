var LevelSettings = function(){
	var stuff = "stuff",

	_currentTheme = "one";
	var themeOptions = {
		"one" : { 
			"groundTile" : 18,
			"hazard1" : 28,
			"hazard2" : 27,
			"breakable" : 11,
			"unbreakable" : 20,
			// "backgroundColor" : 
		},
		"two" : {
			"groundTile" : 13,
			"hazard1" : 23,
			"hazard2" : 22,
			"breakable" : 21,
			"unbreakable" : 20
		},
		'three' : {
			"groundTile" : 13,
			"hazard1" : 28,
			"hazard2" : 27,
			"breakable" : 11,
			"unbreakable" : 12
		},
		'four' : {
			"groundTile" : 13,
			"hazard1" : 42,
			"hazard2" : 41,
			"breakable" : 40,
			"unbreakable" : 39,
			"background" : 0
		}
	};

	var groundTile = themeOptions[_currentTheme].groundTile,
		hazard1 = themeOptions[_currentTheme].hazard1,
		hazard2 = themeOptions[_currentTheme].hazard2,
		breakable =	themeOptions[_currentTheme].breakable;

	function unbreakable(){
		return themeOptions[_currentTheme].unbreakable;
	}

	function setTheme(theme){
		_currentTheme = String(theme);
		// something.thing = theme;
		return _currentTheme;
	}

	return {
		groundTile : function(){
			return themeOptions[_currentTheme].groundTile;
		},
		hazard1 : function(){
			return themeOptions[_currentTheme].hazard1;
		},
		hazard2 : function(){
			return themeOptions[_currentTheme].hazard2;
		},
		unbreakable : function(){
			return themeOptions[_currentTheme].unbreakable;
		},
		breakable : function(){
			return themeOptions[_currentTheme].breakable;
		},
		backgroundColor : function(){
			return "#0000ff";
		},
		getTheme : function(){
			return _currentTheme;
		},
		setTheme : setTheme
		// fing : something.thing
	};

}
